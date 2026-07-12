---
title: "Small tools, long half-life"
description: "In praise of the CLI that still works a decade later."
date: "2026-03-28"
tags: ["tools", "unix"]
---

The tools I use most are the ones I installed once and never thought
about again. `rg`, `jq`, `fzf`, `tmux`, `git`. None of them care what
year it is.

I try to write software the same way. If the interface is a text file
and the transport is stdin, the thing survives.

## What earns a place in the toolbox

- It reads from stdin, writes to stdout, exits with a status.
- It has one job and a man page shorter than its history.
- Its author would recognise the codebase a decade later.

Every ambitious platform I have watched fail lost to a shell script
someone wrote on a train.
