---
title: "Rumen"
description: "A slow, patient background reader for long documents. Turns feeds into essays."
date: "2025-11-18"
tags: ["reading", "agents"]
stack: ["Python", "SQLite"]
role: "Author"
status: "active"
---

## Overview

Rumen watches the sources I already read — RSS, arXiv, a handful of
mailing lists — and produces, once a week, a single essay-shaped
summary of what changed and why it might matter to me.

It is deliberately slow. It re-reads. It cites. It is allowed to say
"nothing this week."

## Architecture

Two loops. A fast loop pulls new items and extracts structure. A slow
loop, run weekly, synthesises across the fast loop's output using the
last four weeks as context.

## Lessons learned

The best summariser I have built is the one that is allowed to be
boring. Novelty-seeking summarisers hallucinate. Patient ones don't.
