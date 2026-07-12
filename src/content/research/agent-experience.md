---
title: "Agent Experience"
description: "A discipline for designing the environments in which agents — human and artificial — do their best work."
date: "2026-06-01"
tags: ["ax", "agents", "design"]
featured: true
---

We spent forty years learning how to design software for humans and
called it *user experience*. We are now shipping software that is
increasingly used by other software — retrieval agents, code agents,
research agents, orchestrators — and we have no equivalent discipline.

This essay is an attempt to name one.

## The claim

**Agent Experience** — AX — is the design of the environments,
interfaces, tools and feedback loops that determine how well an agent
performs a task. It is UX for a class of user that reads documentation
literally, does not skim, has no intuition, and remembers only what you
put in front of it.

The premise is simple: if we build systems assuming agents will figure
it out, we are guaranteed to get the median behaviour of the median
agent. If we build systems that make good behaviour the path of least
resistance, we get something much better than the model alone.

## Five surfaces that matter

### 1. Documentation as interface

An agent's documentation is not a courtesy — it is the API. Prose that
a human skims becomes, for a model, a load-bearing structural element.
Sections labelled *Common mistakes* prevent common mistakes. Examples
show up in traces. Ambiguity multiplies.

### 2. Tool schemas

The name, description and parameter list of every tool is a small essay
the model reads before every call. Terse schemas produce terse
behaviour. Descriptive schemas — with worked examples, failure modes,
and the *why* of the design — produce competent behaviour.

### 3. State and memory

Agents do not remember. They read. The question is not *what does the
agent know* but *what does the agent see, right now, in this call*. The
answer is almost always: not enough, or too much of the wrong thing.

### 4. Feedback loops

An agent that never sees the effect of an action cannot improve. The
fastest wins in this field come from closing loops — showing the agent
the diff, the test failure, the compiler error, the screenshot — and
letting it react.

### 5. Failure modes

Every environment has a distinctive way of going wrong. A well-designed
AX surface fails loudly, in a shape the agent can name. The
alternative — silent, ambiguous, contextless failure — is where most
production agents die.

## Why now

The models are no longer the bottleneck for most tasks. The bottleneck
is the shape of the world we hand them. AX is the name for the work of
shaping that world well.

I suspect the next decade of software engineering will look a lot like
industrial design in the 1950s — a lot of people, in a lot of places,
independently figuring out that the object *and* the workflow around it
are what determine whether the thing gets used.

We may as well name the discipline early.
