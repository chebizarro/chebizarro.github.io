---
title: "Context is infrastructure"
description: "Retrieval, memory and workspace are not features on top of a model. They are the load-bearing structure."
date: "2026-04-18"
tags: ["ax", "context", "infrastructure"]
featured: true
---

A working thesis: the most important thing about an AI system is the
context pipeline. The model is a rendering engine; the pipeline is the
architecture.

## The pipeline, named

Every serious agent system I have built or reviewed has, whether it
knows it or not, the same five stages:

1. **Ingest** — what does the world put in front of the agent?
2. **Filter** — what do we choose to show it *this turn*?
3. **Structure** — how is that information arranged in the window?
4. **Persist** — what carries forward, and in what form?
5. **Revise** — how does the pipeline itself learn?

Get these right and the model is quietly competent. Get them wrong and
no amount of prompt engineering will save you.

## Why "infrastructure"

Because it needs to be *boring*. Reliable, versioned, observable,
replaceable. The interesting behaviour lives above it. The pipeline
itself should not be interesting.

## What this replaces

The story where a clever prompt, held together with string, is what
made the demo work. That story does not scale, does not survive on-call,
and does not compose. Infrastructure does.
