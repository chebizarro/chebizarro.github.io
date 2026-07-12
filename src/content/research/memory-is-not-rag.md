---
title: "Memory is not RAG"
description: "Retrieval solves a different problem than memory. Conflating them costs you both."
date: "2026-03-05"
tags: ["memory", "rag", "architecture"]
---

Retrieval-augmented generation is a lookup. Memory is a *representation
of the agent's own history*. They serve different purposes, live in
different parts of the stack, and fail in different ways.

## Retrieval

- Stateless per query.
- Optimised for recall over a corpus you did not write.
- Correct answer: relevance-ranked chunks with citations.

## Memory

- Stateful across turns.
- Optimised for continuity of an ongoing relationship or task.
- Correct answer: a small, faithful representation of what the agent
  did, decided, and learned.

Building memory on top of a retrieval index is like building a diary on
top of a search engine. It technically works. It is not what a diary is
for.

## The practical consequence

If your agent forgets who the user is between turns, adding more RAG
will not help. You need to write, and re-read, an actual record.
