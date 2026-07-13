---
title: "The craft of context"
description: "Prompting is a red herring. The real work is arranging the world an agent operates in."
date: "2026-05-12"
tags: ["agents", "practice"]
---

A model, no matter how capable, is a function of what you show it. The
prompt is the last thing you write and the least interesting. Everything
upstream — retrieval, memory, tool surfaces, the shape of the workspace —
determines whether the model has a chance.

## Three moves that keep paying

1. **Name the workspace.** Give the agent a filesystem, a REPL, a
   sandbox — some bounded place where actions have effects and effects
   have traces.
2. **Prefer legibility to cleverness.** A boring, well-structured tool
   schema outperforms a clever one. The model can read the boring one.
3. **Write the log the agent will read.** Its future context is its past
   output. Treat that log like a public document.

I keep returning to the same pattern: the systems that behave well are
the ones where a human, dropped into the middle of them, could also
behave well.
