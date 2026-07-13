---
title: "OwnAuth"
description: "A Nostr-backed, FROSTR-enabled identity provider. OIDC, SAML and SCIM for organisations that would rather not rent their front door."
date: "2026-02-05"
tags: ["identity", "auth", "nostr", "frost"]
stack: ["Go", "SvelteKit", "PostgreSQL", "Redis"]
role: "Author"
status: "active"
---

## Overview

Identity providers are the deepest lock-in in the enterprise stack:
lose the IdP and you lose the keys to everything behind it. OwnAuth is
an Okta replacement built on the opposite premise — OIDC, SAML and
SCIM on the front, Nostr and threshold signatures underneath, so the
organisation owns its own root of trust.

## Architecture

The conventional surfaces are all present and boring on purpose:
OIDC discovery, JWKS, authorize/token/userinfo, SCIM users and groups,
SAML metadata and SSO, multi-tenant isolation, MFA, OS login agents.
Anything that speaks standard enterprise auth can plug in without
knowing what sits below.

Below is where it gets interesting:

- **Nostr-forward mode** — relays become the system of record. A
  publisher service writes NIP-78 application-data events (protected
  and NIP-44 encrypted where warranted); an indexer subscribes to the
  tenant's relay set and hydrates PostgreSQL as materialised views.
  The database becomes an index you can rebuild, not a hostage.
- **FROSTR signing** — threshold Schnorr signatures over secp256k1,
  so signing authority is split across devices. The gateway fans out
  sign requests, collects partials, and aggregates; no single machine
  holds the tenant key. A simulated mode makes demos easy, and
  `FROSTR_REAL=true` switches to real FROST with Lagrange
  interpolation.

## Lessons learned

The standards layer is the moat crossing, not the moat. OIDC and SCIM
are table stakes that let you *arrive*; the reason to build was to
make the system of record portable. "Your IdP, but the state is signed
events on relays you choose" turns disaster recovery and vendor exit
from a contract negotiation into a `resync`.

Threshold custody for the tenant root key is the same lesson Signet
taught at agent scale: the key that matters most should not exist in
one place.

## Future work

Hardening the Nostr-forward cutover path and expanding the OS login
agents.
