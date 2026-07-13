---
title: "Memory is not RAG"
description: "Retrieval solves a different problem than memory. I ended up running four services to keep them apart. Draft."
date: "2026-04-20"
tags: ["memory", "rag", "architecture", "agents"]
status: "draft"
---

> **Draft.** The argument is settled in the architecture; the essay is
> still catching up.

Retrieval-augmented generation is a lookup over a corpus you mostly
did not write. Memory is a representation of the system's own history.
They serve different purposes, fail differently, and — this is the
part people resist — they deserve different storage, different
services, and different trust models.

I know because I tried the shortcut, and the shortcut is why my fleet
now runs four separate services where one "knowledge base" was
supposed to be.

## The four-way split

- **Chartroom** holds reference truth: documents, deterministic
  snapshots, chunks with provenance, retrieval in four modes. It
  answers *what do the sources say?*
- **agent-memory** holds episodic recall: what a particular agent did
  and decided on a particular task. Small, faithful, task-scoped. It
  answers *what happened last time I was here?*
- **Mnemonic** holds institutional continuity: episodes linked by
  cause, distilled into lessons, promoted — through human review —
  into doctrine. It answers *what has the operation learned, and who
  approved it?*
- **Arcana** is where humans curate all of the above into something
  worth trusting.

Every one of these is queryable by embedding. None of them is "a RAG."
The vector index is a lookup structure, derived and disposable; the
record is the asset.

## The diary test

Building memory on a retrieval index is like building a diary on a
search engine. It technically works. It is not what a diary is for. A
diary is written by its owner, in order, with judgment about what
mattered — and doctrine, in particular, needs a review trail, because
"the agent remembered something and acted on it" is not a sentence any
operator should have to say out loud.

If your agent forgets who it works for between turns, more retrieval
will not help. You need to write, and re-read, an actual record.
