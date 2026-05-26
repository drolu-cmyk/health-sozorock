# Service Adapter Readiness

## Purpose

This document defines readiness states and approval gates for future service adapters. It supports Issue 038 while keeping all live services disabled.

## Readiness States

| State | Meaning |
| --- | --- |
| unavailable | No live runtime is available. Resident-safe fallback required. |
| documentationOnly | Documentation exists, but no runtime is active. |
| mockOnly | Local mock behavior is allowed for tests or static previews. |
| consentRequired | Future runtime requires explicit capability consent. |
| credentialsRequired | Future runtime requires approved credentials outside the repository. |
| legalReviewRequired | Future runtime requires legal, privacy, or clinical-boundary review. |
| readyForInternalTesting | Future state after approval; not active in Issue 038. |
| disabled | Capability is intentionally off. |

Every Issue 038 readiness object must have:

- `liveRuntimeEnabled: false`
- `requiresServerSideAdapter: true`
- resident-safe fallback language
- no client-side secrets
- no PHI

## Capability Readiness Table

| Capability | Current status | Consent required | Server-side adapter required | Fallback |
| --- | --- | --- | --- | --- |
| Voice Access | unavailable | Yes | Yes | Guided text support |
| AI guidance | unavailable | Yes | Yes | Static access guidance |
| Map discovery | unavailable | Yes | Yes | ZIP, city, county, or listed hub information |
| Hub directory | documentationOnly | Future review | Yes | Static hub information |
| Geospatial planning | unavailable | Yes | Yes | Static planning panels |

## Required Approvals Before Live Services

Before any live service is enabled:

- product approval
- privacy review
- legal review if needed
- safety review
- consent copy approval
- backend boundary approval
- audit/logging plan
- server-side adapter approval
- credentials handling approval
- no-PHI review
- resident/county surface separation review

## Server-Side-Only Adapter Rule

External services must be called through server-side adapters only. Client apps must not call future Google, AWS, AI, voice, maps, geospatial, database, auth, storage, analytics, or crash-reporting services directly unless a separate approved architecture decision allows it.

## No Client-Side Secrets Rule

Do not place credentials, secrets, API keys, service account files, unrestricted map keys, tokens, or provider configuration in client code or documentation examples.

## No-PHI Rule

Adapters must never request, infer, collect, store, transmit, or log:

- PHI
- clinical data
- diagnosis
- treatment
- medications
- insurance
- payment
- provider-patient messaging
- appointment scheduling
- raw audio
- transcripts
- precise location history
- background tracking
- resident identity records unless separately approved

## Consent Requirements

Consent must be:

- capability-specific
- plain-language
- optional
- revocable in a future approved model
- separated from unrelated capabilities
- unavailable by default until approved

The app must remain usable when consent is denied or unavailable.

## Resident-Safe Fallback Requirements

Each adapter shell must provide:

- clear unavailable state
- plain resident-safe explanation
- fallback path
- no-PHI boundary
- no clinical claim
- no provider replacement claim
- no emergency service claim

## Testing Requirements Before Live Activation

Before live activation in a future issue, tests must prove:

- no client-side secrets
- no PHI fields
- consent denied path works
- unavailable fallback path works
- server-side adapter boundary is enforced
- audit behavior is approved
- resident app remains usable without service availability
- county workspace remains separate from resident navigation

Issue 038 tests only the shell and unavailable states. It does not activate runtime integrations.

