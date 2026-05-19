# SozoRock Health Preview Deployment Checklist

## Purpose

Prepare the SozoRock Health prototype for manual preview deployment while preserving the locked trust boundary:

**No PHI. Consent-based. Non-clinical.**

This checklist does not authorize deployment. Deployment must be performed manually after human review and explicit approval.

## Preview Scope

The preview build is limited to the static Next.js prototype routes:

- `/`
- `/resident`
- `/county`
- `/about-model`

Preview content is suitable for internal or stakeholder review only when the checks below pass.

## Required Readiness Language

Confirm these statements remain visible or documented before preview:

- No PHI. Consent-based. Non-clinical.
- Prototype uses synthetic data only.
- Voice Access is static and non-clinical.
- Geospatial view is mock/provider-neutral.
- Human review required before action.
- Planning support, not automated decision-making.

## Deployment Constraints

Do not add, configure, or activate any of the following for this preview:

- backend services
- databases
- authentication
- storage
- forms
- notifications
- email or SMS
- secrets
- environment variables
- AWS resources
- Google SDKs, APIs, API keys, or live maps
- OpenAI SDKs, APIs, API keys, realtime services, or live AI calls
- paid services
- external API calls

## Data Boundary

The preview must use mock or synthetic data only.

Do not add:

- real resident data
- PHI workflows
- protected-data intake
- live follow-up workflows
- clinical support paths
- provider-facing claims beyond the approved provider-led pathway language
- unsupported county, library, provider, or partner claims

## Route Checks

### `/`

- Confirms the locked promise: Care for Every ZIP Code.
- Shows the trust boundary.
- Uses synthetic access signals.
- Links only to internal prototype routes.

### `/resident`

- Confirms Voice Access is static and non-clinical.
- Confirms no listening, recording, storage, or external calls.
- Confirms no resident data capture is active.
- Preserves the Voice Access human-review boundary.

### `/county`

- Confirms the Geospatial Access Operating Picture is mock/provider-neutral.
- Confirms AI Decision Support is operational planning support only.
- Confirms Human Review Workflow and Review Queue are visible.
- Confirms Human review required before action.
- Confirms Planning support, not automated decision-making.

### `/about-model`

- Confirms the prototype boundaries.
- Confirms no live AWS, Google, or OpenAI keys are required.
- Confirms the operating logic remains visible.

## Metadata Checks

- Page title uses SozoRock Health and Care for Every ZIP Code.
- Description includes the non-clinical trust boundary.
- Publisher/creator is The SozoRock Foundation, Inc.
- Preview metadata discourages indexing until public release is approved.
- No hosting provider or infrastructure vendor is named in public-facing copy.

## Verification Commands

Run all commands before any manual preview deployment:

```bash
npm run lint
npm run typecheck
npm run build
npm run guardrails
npm run verify
npm audit --audit-level=moderate
```

## Browser Checks

Open each route:

- `/`
- `/resident`
- `/county`
- `/about-model`

Confirm:

- all routes render
- no console errors appear
- no network calls are made to Google, OpenAI, AWS, or external APIs
- Voice Access remains static
- geospatial view remains mock
- human review workflow remains visible
- trust boundary remains visible

## Stop Rules

Stop preview preparation and report if any step requires:

- deployment credentials
- secrets
- environment variables
- AWS, Google, OpenAI, or paid-service setup
- backend, database, authentication, storage, forms, notifications, email, or SMS
- external API calls
- real resident data
- PHI workflow
- clinical workflow
- unsupported partnership claims

