---
title: "Gus"
description: "A minimal terminal companion for pairing with code agents. Half REPL, half logbook."
date: "2025-09-04"
tags: ["cli", "agents"]
stack: ["Go", "SQLite"]
role: "Author"
status: "active"
---

## Overview

Gus is what I open when I sit down to work with a code agent. It is a
terminal-first UI that keeps the conversation, the diffs, and the
running command log in one buffer — and writes the whole session to a
signed log I can revisit.

## Architecture

A single process, three panes: chat, diff, shell. Everything is a
plain-text event stream on disk; the UI is a view over it.

## Lessons learned

The most valuable feature turned out to be the log, not the UI. Being
able to `grep` last month's agent sessions changes how you work.
