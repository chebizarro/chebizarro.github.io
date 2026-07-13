---
title: "Metiq"
description: "A telemetry pipeline for AI systems: traces, evals, and provenance in one signed stream."
date: "2026-02-28"
tags: ["observability", "evals", "agents"]
stack: ["TypeScript", "ClickHouse", "OpenTelemetry"]
role: "Author"
status: "active"
---

## Overview

Metiq answers a question I got tired of asking in every project: *what
actually happened, in this agent run, and how do I know?*

It is a telemetry pipeline built around the idea that a trace, an eval
score, and a provenance record are the same object viewed from
different angles.

## Architecture

- OpenTelemetry-compatible ingest.
- Content-addressed span store — every span references its exact
  inputs and outputs by hash.
- Eval hooks that attach scores as annotations on the same spans.

## Lessons learned

The most useful eval is not a benchmark. It is a small, versioned
assertion that runs on every trace, and fails loudly when a behaviour
regresses.

## Future work

Cross-run diffing: given two traces of the same prompt, show the
smallest structural difference that explains the outcome gap.
