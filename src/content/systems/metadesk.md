---
title: "metadesk"
description: "Remote desktop over an encrypted mesh — accessibility trees for AI agents, H.264 for humans, Nostr keypairs as identity."
date: "2026-03-10"
tags: ["remote-desktop", "agents", "a11y", "nostr"]
stack: ["C17", "FFmpeg", "FIPS", "MCP"]
role: "Author"
status: "pre-release"
featured: true
repo: "https://github.com/chebizarro/metadesk"
---

## Overview

metadesk lets AI agents and humans control remote desktops over the
FIPS encrypted mesh network, with Nostr keypairs as the only identity.
No accounts, no passwords, no central servers.

The part I care about most: agents don't parse pixels. metadesk hands
them the platform's native accessibility tree — the same semantic
structure screen readers use — so an agent reads UI elements and acts
on them by ID. A human can watch the same session over an H.264 stream
in an SDL2 client. Two client modes, one host, simultaneously.

## Architecture

A C17 core library with platform HALs selected at compile time:
PipeWire, ScreenCaptureKit or DXGI for capture; AT-SPI2, AXUIElement
or UIA for accessibility; uinput, CGEvent or SendInput for input.
Transport is plain TCP over the FIPS TUN — the mesh daemon owns peer
discovery, traversal and routing, and metadesk deliberately does not
reimplement any of it.

Sessions are negotiated over NIP-44 encrypted DMs: the client requests,
the host checks its NIP-51 allowlist, capabilities are granted
explicitly. The agent interface is an MCP server — nine tools and two
resources, including a subscribable UI tree that returns deltas after
every action, so the agent sees what its click actually changed.

Secrets never touch config files: key material comes from 1Password
Connect at startup and lives in locked memory.

## Lessons learned

The accessibility tree is the best agent interface that already ships
with every operating system. Screenshot-driven agents burn tokens
rediscovering what the OS would have told them for free, in structured
form, with stable IDs. Semantic beats visual, every time the semantics
exist.

The other lesson was about restraint: earlier versions carried their
own NAT traversal daemon. Deleting it and trusting the mesh made the
system smaller, more reliable, and easier to reason about. The
deprecated code is still in-tree as a monument.

## Future work

Windows backends (capture, UIA, input) and richer capability
negotiation for partially-trusted agents.
