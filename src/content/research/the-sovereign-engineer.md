---
title: "The sovereign engineer"
description: "On owning your tools, your keys, your data, and the systems that shape your work. Draft — being rewritten from the actual practice."
date: "2026-06-10"
tags: ["sovereignty", "nostr", "practice"]
status: "draft"
featured: true
---

> **Draft.** This one is being rewritten from lived practice rather
> than first principles. The argument stands; the war stories are
> still being declassified.

There is a version of a software career where every tool is rented,
every artifact lives on someone else's server, and every working
relationship is mediated by a platform that can revoke it. I spent
years doing security work for people — activists, journalists,
NGOs — who discovered exactly what that dependency costs, usually at
the worst possible moment. Which is to say: this is not an aesthetic
position.

So I built the other version, and I run on it daily.

## The stack, concretely

- **Identity** is a keypair, not an account. Every service I run and
  every agent in my fleet signs with a Nostr identity. The keys for
  the agents live in Signet, a bunker I wrote precisely so that no
  agent — and no compromised box — ever holds a raw private key.
- **Code review** happens on my hardware. Drydock reviews patches with
  local models; nothing leaves the building. Git collaboration is
  NIP-34 events on relays I choose.
- **Deployment truth** is signed events. Bahia publishes what was
  deployed, by whom, and what is actually running. The audit trail is
  the transport, not a report generated after the fact.
- **The record** is replayable. Chartroom, Mnemonic and Arcana keep
  reference, history and doctrine as events and provenance-tracked
  documents. Lose any database and the state rebuilds from the log.

## The bet

None of this is nostalgia, and none of it requires believing platforms
are evil. It is a straightforward wager: signed, portable, boring
primitives will still be here in twenty years, and most of what we
currently call "the platform" will not. Price the exit before you
need it, and the exit costs nothing.

Keys before accounts. Protocols before platforms. Owned before rented.
