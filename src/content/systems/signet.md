---
title: "Signet"
description: "A NIP-46 Nostr bunker for agent fleets. Every agent gets an identity; no agent ever sees a private key."
date: "2026-05-30"
tags: ["identity", "security", "nostr", "agents"]
stack: ["C", "SQLCipher", "libsodium"]
role: "Author"
status: "active"
featured: true
repo: "https://github.com/chebizarro/nostrc"
---

## Overview

Run enough autonomous agents and you hit an unglamorous problem before
any of the interesting ones: key management. Every agent needs a Nostr
identity to sign its work, and the moment you paste an `nsec` into an
environment variable you have already lost.

Signet is the answer I built: a NIP-46 remote-signing bunker designed
for fleets rather than humans. Agents receive `nostrconnect://` URIs,
never key material. The keys live in one hardened process —
`sodium_malloc`'d, `mlock`'d, never swapped to disk — with SQLCipher
persistence underneath and a hash-chained audit log recording every
operation. It ships as part of [nostrc](https://github.com/chebizarro/nostrc),
my C Nostr stack.

## Architecture

The control plane is Nostr. All of it. There is no REST management
API — provisioning, revocation, policy changes and key rotation are
signed ContextVM intents (kind `25910`, usually gift-wrapped for
transport), authorised against a provisioner allowlist. The only HTTP
surface is `/health` and the bootstrap endpoints.

Around that core:

- **Policy engine** — per-identity allow/deny lists for clients,
  methods and event kinds, with token-bucket rate limiting and SIGHUP
  reload.
- **Transports** — NIP-46 over relays first, plus D-Bus, a Unix-socket
  NIP-46 framing, and an OpenSSH agent socket so the same custody
  model covers SSH keys. All off by default.
- **Onboarding** — single-use bootstrap tokens delivered as
  gift-wrapped NIP-17 DMs, consumed atomically; replays get a 403.
- **Revocation** — resolves the pubkey, denies it, burns leases, wipes
  the key from cache and store, and writes the audit entry. One
  command, no residue.

## Lessons learned

Agent identity is infrastructure, not configuration. Once provisioning
became a signed event, the fleet could grow and shrink without a human
in the loop — and the audit chain means I can prove, offline, exactly
what was signed and when. Tamper-evidence turns out to be the feature
you want *before* you need it.

Writing it in C with the hardening done properly — locked memory,
`explicit_bzero`, no core dumps — was slower than it would have been in
Go. It was also the point.

## Future work

Broader credential types in the lease broker, and tighter integration
with Bahia's Soul Factory so a provisioned agent arrives with identity,
policy and audit trail in one step.
