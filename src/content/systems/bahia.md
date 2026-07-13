---
title: "Bahia"
description: "A Nostr-native deployment and runtime control plane. It tracks your builds, deploys your containers, and tells you when something goes wrong."
date: "2026-06-20"
tags: ["deployment", "nostr", "control-plane", "agents"]
stack: ["Go", "PostgreSQL", "Nostr"]
role: "Author"
status: "active"
featured: true
repo: "https://github.com/chebizarro/bahia"
---

## Overview

Bahia is the operational heart of the fleet: a deployment and runtime
control plane that knows which builds exist, which versions should be
running where, executes deployments and rollbacks, and watches what is
*actually* running for drift against what was intended.

The unusual part is the transport. Bahia is Nostr-native — relays are
a primary control plane, not an audit log bolted on afterwards.
Operators sign actions with Nostr identities (NIP-07 in the browser,
NIP-46 for everything else), the web UI bootstraps its shared state
from relay subscriptions and replaceable read-model events, and
sensitive flows — secrets, payments history, run logs — travel as
encrypted request/result events. REST and MCP surfaces still exist,
but they are compatibility and query surfaces, not the product.

## How it works

You push code. CI builds it. Bahia registers the build and artifact
state, coordinates the deployment when you ask for one, observes the
runtime, and publishes status, results and read models back to relays.

The moving pieces:

- **Reactor/router core** — deployment intents, approvals, execution,
  rollback, and drift detection across Docker, Podman, Compose and
  Kubernetes targets.
- **Relay sidecar** — the realtime event boundary for browser and
  backend control-plane traffic, discovered via kind `31974` + NIP-51
  capability events.
- **OCI registry** — a Distribution-compatible registry backed by
  PostgreSQL and Blossom, so artifacts live on infrastructure I own.
- **Hive-CI bridge** — auto-ingests workflow events into build and
  artifact state.
- **Soul Factory** — experimental provisioning for the AI agents that
  operate alongside the humans.

PostgreSQL holds canonical persisted state. The relays carry the
conversation about it.

## Lessons learned

The web app taught me the most. It is not a REST polling client
wearing a websocket for decoration — it connects to relays, waits for
EOSE on the read models, and stays live on subscriptions. Once shared
state became signed replaceable events, a whole class of "who changed
what, and did everyone see it" problems simply stopped existing. The
event log *is* the answer.

The other lesson: narrowing the HTTP surface was addition by
subtraction. Every endpoint that became a signed event kind got
identity, audit and replication for free.

## Future work

Hardening the Soul Factory agent lifecycle, and pushing more of the
remaining REST compatibility surface onto canonical event kinds.
