---
title: "Nostr-Git"
description: "Sovereign Git hosting over Nostr. Push to a relay; anyone can clone."
date: "2026-01-15"
tags: ["nostr", "git", "sovereignty"]
stack: ["Rust", "Nostr", "libgit2"]
role: "Author"
status: "active"
featured: true
repo: "https://github.com/example/nostr-git"
---

## Overview

Git is already distributed; hosting Git is not. Nostr-Git is a small
set of Nostr event kinds and a matching CLI that lets you publish a
Git repository as signed events on relays you choose.

No central forge. No account to lose. `git clone nostr://<npub>/<repo>`
and it works.

## Architecture

- Repository metadata as a replaceable event.
- Refs as a replaceable event per branch.
- Pack contents chunked, content-addressed, and referenced by hash.
- Issues and patches as first-class Nostr events, threaded like any
  other conversation.

## Lessons learned

The interesting question was not the protocol. It was the porcelain:
how do you make `git push` and `git clone` feel exactly like they
always have, while quietly speaking a different transport?

## Future work

- CI as signed event kind.
- Portable identity across forges.
