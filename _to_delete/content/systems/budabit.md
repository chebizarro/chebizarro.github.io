---
title: "Budabit"
description: "Bitcoin-native settlement rails for small teams paying each other."
date: "2026-04-02"
tags: ["bitcoin", "payments"]
stack: ["Rust", "LDK", "PostgreSQL"]
role: "Author"
status: "active"
---

## Overview

Budabit is a payments spine for small distributed teams — cooperatives,
open-source guilds, contractor networks — that want to pay each other
without inheriting the operational surface of a bank.

It speaks Lightning natively, keeps a ledger on top, and produces the
paperwork accountants actually want.

## Architecture

Three services, unglamorously named:

- `wallet` — custody and Lightning node management.
- `ledger` — double-entry accounting, versioned.
- `paper` — invoice, statement and export generation.

The wallet does not know about the ledger. The ledger does not know
about Lightning. The paper service reads only from the ledger. Each
service can be replaced independently.

## Lessons learned

Almost every problem in payments is a problem in *reconciliation*, not
in transfer. Treat the ledger as the product, and the network as an
implementation detail.

## Future work

Multi-party spending policies expressed as small, auditable programs.
