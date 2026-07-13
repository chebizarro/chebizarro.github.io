---
title: "The Cascadia fleet"
description: "The supporting services behind the flagships: reference truth, episodic recall, institutional memory, generated docs, and an ops console."
date: "2026-06-01"
tags: ["fleet", "memory", "knowledge", "nostr", "agents"]
stack: ["Go", "PostgreSQL", "Qdrant", "Nostr"]
role: "Author"
status: "active"
---

## Overview

Around Bahia, Signet and Arcana runs a fleet of smaller services, each
holding one kind of truth. The division of labour took a while to
earn, so it gets written down here: **Chartroom** is canonical
reference — what the documents say. **agent-memory** is episodic
recall — what a given agent did on a given task. **Mnemonic** is
institutional continuity — what the operation learned across time.
**Arcana** is where humans curate. **Bahia** is operational control.
Five kinds of memory, five services, and none of them pretending to be
the others.

## The services

### Chartroom

A Go service for building and operating reference corpora:
deterministic ingestion from git, local, manual and website sources;
normalisation into chunks with provenance; exact, keyword, semantic
and hybrid retrieval. PostgreSQL is canonical, Qdrant is a derived
index that can always be rebuilt, and lifecycle state publishes to
relays as concise replayable events. Three surfaces by doctrine —
HTTP for operators, MCP over stdio for agents, Nostr for the fleet.

### Mnemonic

The institutional memory: replayable operational episodes, causal
links between them, durable lessons, and reviewable doctrine with
semantic precedent retrieval. When something breaks the way it broke
last year, Mnemonic is the service that remembers, can prove where
the lesson came from, and shows the human review that approved it.

### Cartographer

A docs-generation pipeline worker: walks a repository, drafts
architecture overviews and API docs with an LLM (local models for
bulk, frontier for synthesis), strips secrets through a redaction
gate, signs via Signet, and publishes NIP-23 pages. Every generated
page cites the source files and commit SHA it came from, lands in
Chartroom marked `generated` with low trust, and stays a draft until
a human approves it in Arcana. The chart can be checked against the
territory.

### agent-memory

Task-scoped episodic recall for individual agents — the small,
faithful record of what an agent did and decided, kept deliberately
separate from the reference corpus. A Go service with pgvector-style
retrieval via Qdrant and local embeddings.

### Harbormaster Watch

The ops console. Renders project readiness, coverage, drift, human-
in-the-loop decisions and CI/CD state — entirely from structured
artifacts published to relays as standard Nostr events. If the relays
are empty, the pages say so honestly instead of fabricating sample
values. A dashboard that never lies about its sources was a design
goal, not an accident.

## Lessons learned

The fleet exists because one service kept trying to be all five and
was bad at each. Splitting along kinds of truth — reference, episode,
institution, curation, operation — made every component simpler and
made the boundaries defensible in a sentence.

The other pattern that repeats: PostgreSQL canonical, vector indexes
derived, Nostr as the shared-state fabric, MCP for the agents. Once
the doctrine was written down, new services stopped inventing their
own answers to solved questions.
