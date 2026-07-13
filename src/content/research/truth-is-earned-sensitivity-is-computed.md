---
title: "Truth is earned, sensitivity is computed"
description: "Organizational memory needs two independent axes — how much to trust a fact, and who may see it — with opposite enforcement mechanisms. Draft."
date: "2026-07-13"
tags: ["memory", "governance", "epistemics", "agents"]
status: "draft"
---

> **Draft.** From memory-governance work for AI-native organizations.
> The framework is real and running; the examples here are generic on
> purpose.

Give a fleet of agents a shared memory and you inherit two problems
that look similar and are not. The first: how much should anyone trust
what's in there? The second: who is allowed to see it? Most knowledge
systems conflate the two, which is how you end up with confidential
nonsense treated as gospel and public facts nobody can find. They are
different axes. They need different machinery.

## Axis one: how true is it?

Not everything in memory is equally true, and pretending otherwise is
how memory becomes a liability. Every entry carries an epistemic level:

- **Observed** — something happened. A data point, a result, a thing a
  customer said. Raw, minimally editorialized.
- **Inferred** — we think this is true. A pattern spotted, a hypothesis
  formed. Valuable and provisional.
- **Validated** — evidence supports it. Tested, replicated, or
  independently confirmed.
- **Canonical** — the organization's accepted truth, the stuff agents
  treat as ground truth and products get built on. Changing it requires
  explicit review.
- **Retired** — we once believed this; now we don't. Preserved, not
  deleted, with what replaced it and why.

Two details in that list do most of the work. First: an executive's
opinion enters at Inferred, exactly like everyone else's. Truth is
earned through evidence, not asserted through authority — the org
chart is not an epistemology. Second: Retired is a level, not a
deletion. An organization that remembers changing its mind cannot be
forced to re-learn the lesson, and "we used to believe X, here's why
we stopped" is some of the most valuable knowledge a memory can hold.

## Axis two: who may see it?

Orthogonal to all of that: sensitivity. Every entry also carries a
classification tier, from broadly-shareable through domain-restricted
and confidential up to regulated — plus a final tier, Excluded, for
content like credentials that is rejected at the write path and never
enters memory at all.

The axes are genuinely independent. A widely shareable observation is
not the same object as a widely shareable canonical fact. A
confidential inference has very different implications from a
confidential validated finding. Collapse the axes and you get two
failure modes at once: treating restricted data as high-quality
*because* it is restricted, and treating accessible data as low-quality
because it is not.

## Opposite enforcement

Here is the part I think generalizes furthest: the two axes demand
opposite enforcement mechanisms.

Epistemic level is a human judgment. Validation, review, promotion to
canonical — these run through people, because deciding what the
organization believes is precisely the kind of decision accountability
attaches to. Slow is acceptable here. Wrong-but-confident is not.

Sensitivity is an infrastructure judgment. Classification happens
automatically on the write path — content analysis, source context,
domain rules, highest signal wins — because humans talking to agents
share sensitive things conversationally, without a classification
reflex, and a security model that depends on people remembering to tag
things is a breach with a delay on it.

**The system determines what is sensitive. Humans determine what is
true.** Run it the other way — compliance committees deciding
sensitivity, classifiers deciding truth — and you get the worst of
both: leaks at machine speed and epistemology by regex.

This is the same division of labour I keep arriving at from other
directions: in [Memory is not RAG](/research/memory-is-not-rag) the
split is by *what kind of record* something is; here it is by *what
kind of judgment* it needs. Retrieval, trust and access are three
different questions, and every system I've seen fail merged at least
two of them.

Memory that agents write and other agents act on is not a database
feature. It is the organization's belief system, with an access policy.
Design both axes on purpose.
