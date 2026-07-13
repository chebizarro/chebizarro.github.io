---
title: "Autonomy is earned"
description: "An authority model for agent fleets: promotion by boring reliability, demotion at the speed of doubt, and a break-glass lever for 2am. Draft."
date: "2026-07-13"
tags: ["agents", "governance", "ax"]
status: "draft"
featured: true
---

> **Draft.** Distilled from governance frameworks I've been building for
> AI-native engineering organizations. Principles only; the specifics
> stay where they belong.

Every organization that deploys autonomous agents eventually rediscovers
a very old question: who is allowed to act, and how is power
constrained? The industry's current answer — grant the agent whatever
permissions the demo needed, then hope — is not an answer. It is a
deferral, and the bill arrives in production.

Here is the model I've landed on after building it for real. It borrows
from the least glamorous institution imaginable: the probation period.

## The ladder

Authority comes in levels, and the levels are earned.

- **Level 0 — Observe.** Search, read, summarize. Touch nothing. Every
  new agent starts here, no matter how impressive the demo was.
- **Level 1 — Recommend.** Propose, prioritize, diagnose. A human
  reviews everything before anything happens.
- **Level 2 — Assist.** Create artifacts: tickets, drafts, pull
  requests, notifications. Nothing hard to reverse — no merging, no
  deploying, no commitments.
- **Level 3 — Execute.** Merge, deploy, trigger workflows — inside an
  explicitly documented envelope, with a named human owner and a
  complete audit trail.
- **Level 4 — Autonomous.** Recurring operations without per-action
  approval, and only where three things are known: the problem, the
  solution, and the risk. Rare, and reviewed weekly regardless.
- **Level 5 — Reserved.** Deliberately undefined. Not prohibited —
  undefined, so that nobody grants "set your own goals" autonomy by
  accident or enthusiasm. Future leadership can define it. We won't do
  it prematurely.

Promotion between levels takes time served: weeks of reliable output at
each rung before the next one is even discussable, and the top rungs
need sign-off from more than the agent's owner. The criterion is
observable performance, never apparent capability. An agent that gives
impressive demos does not advance. An agent that is boring and reliable
advances. Evidence, not enthusiasm.

Demotion is deliberately asymmetric: authority is revoked faster than
it is earned. One significant error triggers review; when in doubt, the
agent runs at the lower level until confidence is restored; the
promotion clock resets. Anyone who finds this harsh has not been paged
by an agent's mistake.

## The 2am problem

Rigid ladders fail at 2am, when the incident is live and the agent that
could fix it is one level short. So the model needs a pressure valve:
break-glass escalation. Any human with incident authority can bump an
agent one level — never to full autonomy — for a few hours, logged at
the moment it happens, with a mandatory review after. And if the same
agent gets break-glassed three times in a quarter, that is not an
emergency pattern; that is evidence its baseline is wrong, and the
formal review happens anyway.

The protocol is designed to be easy in an emergency and slightly
uncomfortable as routine. That discomfort is load-bearing.

## The governing sentence

Underneath the mechanics sits one rule that decides every edge case:

**When uncertainty rises, authority decreases. Always.**

Known incident, known fix — the agent acts, within its level. Known
incident, unknown fix — the agent diagnoses and recommends, but does
not act. Unknown incident — the agent alerts, hands over what it can
see, and makes no recommendation at all, because its confidence is
precisely the thing you should not trust right now. Escalation is not
failure. An agent that escalates well is worth more than one that acts
confidently and wrongly, every single time.

And the whole structure rests on the one principle that never moves:
accountability terminates at a named human. Agents execute;
humans own outcomes. Not because agents are bad at deciding, but
because a system where nobody owns the consequence is a system that
will eventually produce a consequence nobody owns.

## Why this is an engineering document

None of the above is HR policy dressed up in YAML. Authority levels are
enforced in infrastructure — the Level 2 agent *cannot* merge, the way
a process without a capability cannot open the file. I run my own
fleet this way: every agent gets its identity from a bunker that never
releases keys, every action lands in an audit trail, and the governance
framework itself is versioned like software, because a governance
document that cannot be amended by evidence is just a poster.

Trust your agents the way you trust new colleagues: genuinely,
incrementally, and with the paperwork done.
