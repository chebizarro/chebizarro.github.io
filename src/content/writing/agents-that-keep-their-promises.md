---
title: "Agents that keep their promises"
description: "Give an agent a memory and it gets smarter. Give it commitments and it gets character."
date: "2026-07-13"
tags: ["agents", "memory", "identity"]
heroImage: "/images/agents-that-keep-their-promises.png"
ogImage: "/og-images/agents-that-keep-their-promises-og.png"
---

Most agent memory work chases the same prize: recall. Feed the agent
what the organization knows, watch it stop repeating mistakes. Worthy.
But the feature that changed how I think about agents is smaller and
stranger: a table of promises.

Alongside the shared organizational memory, each agent in a fleet I've
been designing gets an identity — a profile, learned preferences, and a
list of *commitments*: things it has agreed to track, follow up on, or
keep an eye on, persisted across sessions with a status and a due date.
"Monitor this metric's decline." "Check whether last week's fix
actually held." "The operator complained about false positives —
threshold adjusted, watch for over-correction."

At session start the agent doesn't just wake up with knowledge. It
wakes up with obligations. Bootstrap loads the profile, the open
commitments, and the recent private memories, and the agent begins the
day the way a decent colleague does: *here's what I said I'd do, here's
what happened last time, here's what I changed and why.* When a
commitment is resolved, the agent marks it fulfilled — with the
outcome, so the promise and its result become part of the record.

It is a small schema. Two tables, honestly. But watch what it does to
the character of the thing. An agent with recall answers well. An
agent with commitments *follows up* — and following up, not raw
capability, is most of what we mean when we call a colleague reliable.
Continuity of obligation is different from continuity of knowledge,
and it turns out to be the half we were missing. We spent so long
trying to give agents memory that we forgot the reason memory matters
in a colleague: it is the substrate of accountability. You can't hold
something to its word if it can't remember giving it.

There is a governance angle too, of course — a commitment log is an
audit trail of intentions, which pairs nicely with the audit trail of
actions, and the difference between the two lists is one of the more
honest performance reviews an agent can get. Asked for, promised,
delivered. Most humans would flinch at that report.

Needless to say, the agents don't flinch. They just show up Monday
knowing what they owe you. I know people I can't say that about.
