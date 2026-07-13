---
title: "Zero-Trust identity for AI agent fleets"
description: "What MCP doesn't give you for free"
date: "2025-10-25"
tags: ["ai", "security", "mcp"]
featured: true
ogImage: "/og-images/zero-trust-Identity.png"
heroImage: "/images/zero-trust-Identity.png"
---

The Model Context Protocol solved a real problem. Before MCP, every agent-to-tool integration was a bespoke adapter, and the industry was drowning in them. Now an agent can discover a tool, read its schema, and call it through one standard surface. That's genuine progress, and it deserved the adoption it got.

But standardizing *how an agent calls a tool* is not the same as answering *who the agent is, what it's allowed to do, and how you take that permission away at 3am when a container is compromised.* MCP is a protocol for capability exposure. It is not an identity system, an authorization system, or a secrets system — and the moment you run more than one agent, in more than one place, doing anything that touches a credential, those three gaps become the whole job.

I spent the last stretch building a system to close them. This is what I learned about the shape of the problem.

## The thing nobody tells you about agent identity

Every human-facing signing and auth flow ever built assumes a person is watching. You see a `nostrconnect://` URI, an OAuth consent screen, a "Approve this login?" push notification — and you tap yes. That model is correct for humans authorizing apps. It is exactly wrong for an agent that restarts inside a fresh container six times a day and needs to re-authenticate every time without waking anyone up.

You can feel teams discover this the hard way. They start with an agent holding a long-lived API key or a private key baked into the image, because that's the only thing that survives a restart without a human in the loop. And now you have standing credentials distributed across every container in your fleet, in env vars, in compose files, in image layers — the precise anti-pattern every security program spends a decade trying to eradicate, reintroduced because the autonomous case had no better answer.

The better answer starts with one distinction that changes everything.

## Separate authorization from authentication

These two words get used interchangeably, and conflating them is the root cause of the standing-credential mess.

**Authorization** is a durable human act. A person with authority decides *this agent is allowed to exist and act on our behalf.* It should happen once, at provisioning time, and it should be revocable.

**Authentication** is a cryptographic act. The agent proves *I am the identity that was authorized.* It should happen automatically, on every restart, forever, with no human anywhere near it.

Once you split them, the standing-credential problem dissolves. A human authorizes an agent a single time — in my design, by signing the agent's public key into a fleet roster. From then on the agent re-authenticates purely by proving it holds the matching private key, via a challenge-response the broker verifies against that signed roster. No shared secret to distribute. No token to rotate. No human to wake. Adding a key to the roster grants access; removing it revokes access. That signed list *is* the authorization, and it's the only approval mechanism that exists.

The signing key itself never lives with the agent. It lives in a broker. The agent gets a session, not a secret.

## The bootstrapping paradox (and the cheap way out)

There's a chicken-and-egg problem hiding in the clean version above. An agent authenticates by proving it holds a key — but on very first boot it has no key yet, and its real key lives in the broker, which requires authentication to reach. How does an agent that can't yet authenticate perform its first authentication?

The tempting answer is a shared bootstrap secret, and that quietly reintroduces the standing-credential problem you just eliminated.

The cheap, correct answer is a **single-use, short-lived, tightly-scoped bootstrap token**, delivered out-of-band, that does exactly one thing: prove first contact, then burn itself. HMAC it against a master key the agent never sees. Give it a ten-minute TTL. Bind it to one agent identity. Enforce single-use with a seen-tokens table so a replay is dead on arrival. Deliver it through a channel that can't leak it — kernel-managed secrets, not env vars, never the image. After first boot the token is gone and the agent is on pure keypair auth for the rest of its life.

A stolen bootstrap token, in that design, buys an attacker nothing: it's expired, or already used, or for an identity that isn't on the roster. The blast radius of the riskiest moment in the agent's lifecycle is a ten-minute, single-use window — by construction, not by vigilance.

## Autonomy is a dial, and the dial belongs to policy

"Should agents be autonomous?" is the wrong question. The right one is: *how much, for which operations, and who decides?* Autonomy is not a property of the agent. It's a property of each thing the agent tries to do.

The same agent should be able to read a config file autonomously, propose a database migration for human approval, and be flatly forbidden from touching a signing key — all in the same session, all decided per call. That means the authorization decision cannot live at connection time, where most systems put it. It has to live at *every method call.*

So the broker runs a policy engine that evaluates each request against a per-agent policy: which operations are allowed, which credential types are in scope, what the rate limits are, which targets are reachable. A policy change takes effect on the next call — no re-provisioning, no redeploy. That's what lets you run the full spectrum, from advisory ("the agent can only suggest") to autonomous ("the agent can act"), and move an agent along it by editing one policy rather than rebuilding it.

This is the piece MCP most conspicuously doesn't have. MCP tells the agent a tool *exists.* It has no opinion on whether *this* agent may call it *right now.* That opinion is the entire security posture, and it has to live somewhere you control.

## The rest of the Zero-Trust checklist

Identity and per-call policy are the spine. Around them, a fleet you'd actually trust in production needs:

- **No secret ever leaves the broker.** Agents get scoped sessions and short-lived leases, not raw keys or passwords. For services that only speak password-for-session-token, the broker does the exchange on the agent's behalf — the password never transits the agent at all.
- **Secrets encrypted at rest and locked in memory.** Encrypted store on disk, `mlock`'d buffers when decrypted, never spilled to `/tmp`, never in a log line or an error message. Credentials are referenced by ID and label, never value.
- **Revocation that's instant and belt-and-suspenders.** A local deny-list that takes effect *now* for the compromised-container case, plus roster removal that propagates for the normal case — both checked on every auth. Revoking kills active sessions and burns outstanding leases immediately, not on next renewal.
- **An audit trail per operation, across every transport.** Who, what, which credential, over which channel, when — written before execution. This is what makes anomalies *detectable*: a local agent that suddenly authenticates from a remote address over a different transport is a story the log tells you, if you wrote the log.
- **Least privilege at the deployment layer, not just the app.** Each agent mounts only the sockets it needs; network paths are deny-by-default and segmented. The policy engine is the last line, not the only one.

None of this is exotic. It's the security posture we already demand of human-facing production systems. The only new thing is applying it to non-human principals that outnumber the humans and never sleep.

## Why this is the platform problem of the next few years

The framing I keep coming back to: **AI didn't create a new security problem, it created a new principal.** Every hard-won lesson about identity, least privilege, secret custody, revocation, and audit still holds. It now has to hold for actors that spin up and die on their own schedule, re-authenticate without a human, and want to act across the full autonomy range in a single session.

Models will keep getting better and it won't matter, because the models were never the bottleneck. The bottleneck is whether an organization can let software act inside its systems without either handing it the keys to everything or babysitting every call. That's not a modeling problem. It's an infrastructure problem — identity, policy, credentials, observability — and it's the difference between AI as a trustworthy teammate and AI as an unpredictable liability.

MCP got us a shared way for agents to reach tools. The connective tissue that makes reaching those tools *safe* — that part is still ours to build. It's the most interesting platform-engineering work on the board right now, and we're only at the beginning of it.

---

*I build agent infrastructure — identity, credential custody, policy, and the secure substrate that lets autonomous systems act without giving away the store. The ideas above come out of a system I built called Signet. If you're working on this, I'd like to compare notes: [github.com/chebizarro](https://github.com/chebizarro).*
