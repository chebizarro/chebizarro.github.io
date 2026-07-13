---
title: "Arcana"
description: "A relay-native knowledge production environment. Humans and agents transform artifacts as peers on the same event fabric."
date: "2026-01-25"
tags: ["knowledge", "nostr", "agents", "frontend"]
stack: ["React", "TypeScript", "Nostr", "Blossom"]
role: "Author"
status: "active"
repo: "https://github.com/chebizarro/living-library-forge"
---

## Overview

Arcana is where the humans work. It models knowledge production as an
artifact graph — `Artifact → Transformation → Artifact` — where the
transformations are performed by people and agents as peers on the
same event fabric. Documents, scripts, plans, images, audio: all
first-class nodes with lineage.

There is no application API behind it. Core actions publish signed
Nostr events; every screen is a projection derived from relay
subscriptions. The frontend's "backend" is whichever relays you point
it at.

## Architecture

The interesting engineering is in the event vocabulary. Arcana leans
on standard NIPs wherever the semantics fit — NIP-23 long-form for
text artifacts, NIP-94 file metadata with Blossom for binaries, NIP-22
comments for review threads, NIP-32 labels for stage transitions — and
NIP-90 Data Vending Machines for agent tasks, because Arcana agents
*are* DVMs: artifact in, transformed artifact out, job feedback along
the way. Custom kinds exist only where no standard fits, and legacy
kinds survive as subscribe-only aliases through migrations.

State flows one way: sign, publish, project. Reducers are
deterministic and idempotent, persisted in IndexedDB, rebuilt by
replay. If the projection is wrong, the fix is in the reducer, never
in the data.

## Lessons learned

Interoperability is a discipline, not a default. The kind registry
went through a real migration — three of the original custom kinds
collided with registered NIPs and had to be renumbered — and the
lesson stuck: check the registry first, use the standard kind when the
semantics genuinely align, and keep the old kinds readable while
clients catch up.

Projection-derived UI has a quality I did not expect: the entire
application state can be reconstructed by anyone with the relay set
and the reducers. Debugging becomes archaeology instead of forensics.

## Future work

Richer workflow templates, and closing the loop with Cartographer and
Chartroom so generated documentation flows into the same review
surfaces as human writing.
