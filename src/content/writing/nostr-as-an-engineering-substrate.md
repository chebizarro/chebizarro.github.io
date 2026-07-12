---
title: "Nostr as an engineering substrate"
description: "Not a social network — a portable, signed event log the whole industry can build on."
date: "2026-02-14"
tags: ["nostr", "protocols"]
---

The interesting thing about Nostr is not the timeline. It is that the
event is the primitive: a small, signed JSON blob with a kind, some
tags, and a content field. Everything else — clients, relays, indexers —
is negotiable.

Once you see it that way, most of the software I care about looks like a
kind. Git commits. Package releases. Deployment records. Agent
transcripts. All of it: signed events, replicated across relays a user
can walk away from.

## What it replaces

Not Twitter. It replaces the assumption that your identity lives inside
someone else's database. That is a much larger claim, and a much more
interesting one.
