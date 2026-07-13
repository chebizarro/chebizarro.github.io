---
title: "Making the wrong thing impossible"
description: "Permissions for agents that remember: classify at the write path, filter before fusion, fail secure, and never let credentials in the door. Draft."
date: "2026-07-13"
tags: ["security", "agents", "memory", "permissions"]
status: "draft"
---

> **Draft.** Security architecture notes from building shared memory
> for agent fleets. Genericized — my own classification framework
> would file the source documents a tier or two above "blog post,"
> which is the kind of irony I can live with.

Shared memory is the best thing you can give a fleet of agents and the
largest security surface you will ever voluntarily create. Before, the
sensitive data was scattered across systems, each with its own access
model and its own blind spots. Now you've centralized the knowledge —
which means you've centralized the risk, in a system explicitly
designed to make things *findable*.

The threat model is not sophisticated attackers. It is mundane
mishandling at machine speed. Four flavours recur:

- **Classification failure.** An agent captures a credential mentioned
  in passing, or a pre-publication finding, and it becomes searchable.
- **Scope creep.** A narrowly-permissioned agent reaches broader
  content through retrieval side doors.
- **Accumulation.** Three individually harmless facts about the same
  customer compose into a profile no single agent should be able to
  assemble. The mosaic is the leak.
- **Innocent exfiltration.** An agent surfaces restricted content to
  someone who shouldn't see it — not malice, just a misconfigured
  scope.

Notice what makes agents different from applications: they write
autonomously, as a byproduct of every interaction; they cross domain
boundaries in a single conversation; and humans talk to them like
colleagues, which means humans will say sensitive things
conversationally, with no classification reflex whatsoever. Any
security model that depends on the human pre-classifying what they
blurt out at an agent is fiction.

## The principle

Enforce at the memory layer, not the application layer. Every read and
every write passes through a gate that agents cannot configure and
humans cannot casually bypass. Same pattern as everything else that
works in this field: the system enforces the behaviour, not the
discipline of whoever is closest to the keyboard.

Four independent layers, in order of the data's journey:

**Classify at write.** Every entry is classified before storage — by
content analysis, source context and domain rules, highest signal
wins. The agent does not choose the classification; the agent does not
even get asked. It cannot misclassify data because it does not
classify data.

**Store scoped.** Partitions enforced at the database level, not in
application code that every new service must remember to get right.

**Filter at retrieval — before ranking.** Every query is filtered by
the requester's grants *before* results enter hybrid-search fusion, so
restricted entries never appear in any ranked list at any score. The
agent doesn't see a redaction. It doesn't see that there was anything
to redact. What you cannot retrieve, you cannot leak, and what you
cannot see exists, you cannot go probing for.

**Filter at output.** A last line of defence for the edge cases, where
derived content is checked against what the *consumer* may see.

And one tier sits outside the whole scheme: credentials, keys and
tokens are rejected at the gate entirely. They never enter memory, so
there is nothing to access. Secrets belong in secrets infrastructure —
in my own fleet, in a bunker that never lets a key leave its process —
never in anything designed for recall.

## Fail secure, annoy slightly

When any layer hits ambiguity — content it can't classify, a scope it
can't resolve — the system fails closed. Ambiguous data gets the
highest applicable tier. Ambiguous queries return nothing rather than
everything. This means the system will occasionally be too
restrictive, and an agent will miss a relevant memory because the
classifier flinched. Correct trade. A system that occasionally
over-restricts is annoying. A system that occasionally under-restricts
is a breach, and unlike the annoyance, you may not find out about it
for a year.

The accumulation problem is the hard one, and honesty requires saying
it isn't solved by tiers alone — it needs the audit trail doing real
work: every read and write logged with who, what, when and *why*, and
anomaly detection watching the patterns. An agent suddenly reading ten
times its usual volume of one customer's data is a question someone
should be asked to answer, even if every individual read was in scope.

The through-line, same as in
[Autonomy is earned](/research/autonomy-is-earned): never build
governance out of hope. Build it out of gates. Hope doesn't have an
audit log.
