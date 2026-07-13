---
title: "Agent experience"
description: "The environments agents work in matter more than the models working in them. Notes toward a discipline. Draft."
date: "2026-06-05"
tags: ["agents", "ax", "design"]
status: "draft"
featured: true
---

> **Draft.** Notes toward a discipline, from someone who spends most
> days building the environments rather than the models.

We spent decades learning to design software for humans and called it
user experience. We are now shipping software whose primary users are
other software — code reviewers, doc writers, desktop operators,
deployment agents — and the design discipline for *their* working
environment mostly does not exist yet. Call it agent experience. The
models are less often the bottleneck than the shape of the world we
hand them.

What follows is not theory. Each claim has a system behind it.

## Semantic beats visual

metadesk gives agents the operating system's accessibility tree — the
same structure screen readers use — instead of screenshots. An agent
clicks an element by ID and receives a delta showing what changed.
Screenshot-driven agents burn their budget rediscovering what the OS
would have said for free, in structured form, with stable identifiers.
When semantics exist, hand the agent semantics.

## Determinism is a kindness

Drydock's review quality lives and dies by its context builder: a
deterministic assembly of what the model sees, inside a fixed budget.
Deterministic environments make agent behaviour reproducible, and
reproducible behaviour is the only kind you can evaluate, debug, or
improve on purpose.

## Close the loop or lose the agent

An agent that never sees the effect of its action cannot correct.
metadesk returns UI deltas after every action; Drydock's meta-review
grades reviews and feeds the grade back into prompts; Bahia publishes
runtime observations so drift is a fact the system can see rather than
a surprise an operator finds. The fastest wins in this field are
feedback loops, not model upgrades.

## Fail loudly, in a shape with a name

Harbormaster Watch renders empty and degraded states explicitly when
relays have no data, instead of fabricating samples. The same rule
saves agents: silent, ambiguous failure is where production agents go
to die. An error the agent can name is an error it can route around.

## Identity is part of the environment

An agent that signs its work is an agent whose work can be audited,
attributed and revoked. Signet exists so every agent in my fleet has
an identity without any of them holding a key. Accountability
infrastructure is AX too — it is what lets you *widen* an agent's
permissions without lying awake.

## Why bother naming it

Because the work is going to happen anyway, scattered across a
thousand codebases, and disciplines that get named early get standards
instead of folklore. The environment is the product. We may as well
design it like one.
