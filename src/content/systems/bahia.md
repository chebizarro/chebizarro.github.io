---
title: "Bahia"
description: "A local-first knowledge store for long-running agents. Content-addressed, signed, replayable."
date: "2026-05-20"
tags: ["storage", "agents", "local-first"]
stack: ["Rust", "SQLite", "Nostr"]
role: "Author"
status: "active"
featured: true
repo: "https://github.com/example/bahia"
---

## Overview

Bahia is the persistence layer I kept re-writing until I gave in and
extracted it. Long-running agents need a place to put things they
learn — decisions, artefacts, transcripts, small facts about the user —
in a form that survives restarts, model changes, and platform migration.

Bahia stores those things as content-addressed, cryptographically signed
events. Any process holding the same key can reproduce the same log
byte-for-byte. Any process holding the public key can verify it.

## Architecture

- **Event kernel** — a tiny append-only log of signed events.
- **Views** — materialised indexes derived from the log, rebuilt on
  demand. No index is authoritative.
- **Sync** — replication over Nostr relays and plain HTTPS; the wire
  format is the same as the storage format.

The design principle: the log is the source of truth. Everything else
is a cache.

## Lessons learned

The single largest mistake I made early was treating "memory" as a bag
of embeddings. Embeddings are a lookup, not a record. Once I separated
the two — a durable, human-readable log alongside whatever indexes
happen to be useful this month — the whole system got simpler.

## Future work

- Selective disclosure: signed subsets that reveal one fact without the
  surrounding context.
- Portable identity handoff between devices.
