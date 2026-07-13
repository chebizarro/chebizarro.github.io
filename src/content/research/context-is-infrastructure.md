---
title: "Context is infrastructure"
description: "Retrieval, memory and provenance are not features on top of a model. They are the load-bearing structure. Draft."
date: "2026-05-15"
tags: ["agents", "context", "infrastructure"]
status: "draft"
featured: true
---

> **Draft.** Working thesis, grounded in systems that exist. Numbers
> and diagrams to follow.

A working thesis: the most important part of an AI system is the
context pipeline. The model is a rendering engine; the pipeline is the
architecture. I did not arrive at this by argument — I arrived at it
by watching where the quality actually came from in systems I run in
production.

## Exhibit A: the code reviewer

Drydock reviews patches with local LLMs. The single biggest quality
lever was never the model — it was the context builder: a
deterministic, seven-layer priority system that assembles what the
reviewer sees inside a fixed 64K budget. Deterministic context means
reproducible reviews, and reproducible reviews are the only kind an
eval harness can grade honestly. Swap the model and quality moves a
little. Break the context builder and quality falls off a cliff.

## Exhibit B: the corpus

Chartroom exists because "just RAG it" is not an engineering answer.
Reference material gets deterministic ingestion, versioned snapshots,
chunks that carry provenance back to source and commit, and a vector
index that is explicitly *derived* — rebuildable at any time from
canonical state. When retrieval misbehaves, there is a specific place
to look and a specific thing to replay. That is what makes it
infrastructure rather than vibes.

## Exhibit C: the generated docs

Cartographer writes documentation with an LLM, and every page cites
the files and commit SHA it was derived from. Provenance is what turns
generated text from a liability into a draft worth reviewing: a reader
can check the chart against the territory, and staleness is detectable
instead of ambient.

## The rule

Context work needs to be *boring* — versioned, observable, replayable,
replaceable. The interesting behaviour lives above it. If the pipeline
itself is interesting, something has gone wrong. A clever prompt held
together with string made the demo work; it does not survive on-call.
Infrastructure does.
