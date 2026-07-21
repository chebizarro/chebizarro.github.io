---
title: "Drydock"
description: "Automated code review for NIP-34 Nostr repositories. Local LLMs read your patches; nothing leaves your infrastructure."
date: "2026-04-15"
tags: ["code-review", "nostr", "llm", "git"]
stack: ["Go", "SQLite", "Ollama"]
role: "Author"
status: "active"
featured: true
heroImage: "/images/drydock.png"
ogImage: "/og-images/drydock.png"
---

## Overview

If git collaboration lives on Nostr — and mine does, as NIP-34 patch
and pull-request events — then code review should live there too.
Drydock listens for patches on relays, reviews them with local LLMs,
and publishes structured kind `1111` review comments back to the
protocol. No forge, no SaaS reviewer, and no code leaving my
infrastructure: all inference runs against local OpenAI-compatible
endpoints (Ollama, llama.cpp, vLLM).

## Architecture

When a patch arrives, Drydock clones the referenced repository, builds
a deterministic context bundle inside a 64K-token budget — a seven-layer
priority system deciding what the model gets to see — and routes it
through a planner→reviewer pipeline. The planner decides what deserves
attention; the reviewer produces findings against a schema. A
meta-review loop evaluates review quality after the fact and feeds
improvements back into prompts, with eval-gated rollback when a
"better" prompt turns out to be worse.

Beyond the core loop it grew the surfaces a review system apparently
wants: ensemble review with consensus scoring across multiple models,
codebase Q&A over encrypted DMs, IDE diagnostics for VS Code and
Neovim, and a reviewer marketplace with reputation — plus Lightning
and Cashu payments for paid review, because the rails were already
there.

## Lessons learned

The review model matters less than what you show it. Most of the
quality gains came from the context builder, not from swapping models —
deterministic context means reproducible reviews, and reproducible
reviews are the only kind you can evaluate honestly.

The meta-review loop earned its keep quickly: review systems drift, and
a system that grades its own output against a held-out set is the
difference between a tool and a liability.

## Future work

Deeper marketplace routing, and expanding the eval harness so prompt
changes ship with the same rigour as code changes.
