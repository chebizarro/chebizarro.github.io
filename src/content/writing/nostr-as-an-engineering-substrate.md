---
title: "Nostr as an engineering substrate"
description: "Not a social network — a signed, portable event log I run my whole stack on."
date: "2026-05-25"
tags: ["nostr", "protocols"]
featured: true
---

The interesting thing about Nostr is not the timeline. It is that the
event is the primitive: a small signed blob with a kind, some tags,
and a content field. Everything else — clients, relays, indexers — is
negotiable.

This stopped being a thesis for me and became an operating reality.
An inventory of what currently runs on signed events in my stack:
git repositories, patches and pull requests (NIP-34); code review
comments (kind `1111`); RPC between services and agents (ContextVM,
kind `25910`); agent provisioning and key revocation (Signet's entire
management plane); deployment intents, statuses and read models
(Bahia); long-form documentation with provenance (NIP-23 via
Cartographer); artifacts and their lineage (NIP-94 + Blossom in
Arcana); agent tasks as data-vending-machine jobs (NIP-90); corpus
lifecycle state (Chartroom); and the ops dashboard that watches all of
it (Harbormaster Watch), which renders nothing it cannot attribute to
a relay.

Needless to say, none of that is social media.

The pattern underneath: every event is signed, so identity and audit
come free. Events replicate across relays I choose, so availability is
a decision rather than a dependency. Replaceable events give you
shared state; plain events give you history; encrypted events give you
the private lanes. That is a substrate — the same job Unix pipes and
text files did for a previous generation of tooling, with signatures.

What it replaces is not Twitter. It replaces the assumption that your
identity, your history, and your coordination live inside someone
else's database. That is a much larger claim, and a much more
interesting one.
