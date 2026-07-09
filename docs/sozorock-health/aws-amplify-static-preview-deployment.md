# AWS Amplify Dynamic App Deployment

## Purpose

This document now records the controlled public web deployment posture for SozoRock Health as a dynamic Next.js app.

The earlier static preview path is superseded for public launch. The active web artifact is the Next.js runtime build in `.next`, while the Expo resident export at `apps/mobile/dist` remains a generated mobile-web QA artifact.

Required boundary:

**No PHI. Consent-based. Non-clinical.**

Resident promise:

**Care for Every ZIP Code.**

Provider boundary:

**Providers keep their platforms. We help you get ready.**

Locked operating logic:

**Signal -> Decision -> Action -> Assurance -> Impact**

## Deployment Target

Deployment target:

```text
AWS Amplify Hosting
```

Build commands:

```bash
npm run build
npm run mobile:export:web
```

Public web deployment artifact:

```text
.next
```

Resident mobile-web QA artifact:

```text
apps/mobile/dist
```

The active site root must not publish `out` or `apps/mobile/dist`.

## Build Specification

The repository root includes:

```text
amplify.yml
```

The build specification:

- runs from the repository root
- installs npm dependencies
- runs `npm run build` for the dynamic Next.js app
- runs `npm run mobile:export:web` for parallel resident mobile-web QA
- publishes `.next` for the public web app
- does not publish `out`
- does not publish `apps/mobile/dist` as the site root artifact
- does not configure Amplify backend categories
- does not expose secrets or provider keys to browser bundles

## Dynamic Runtime Boundary

Allowed for controlled public launch:

- Next.js dynamic server routes under `src/app/api`
- server-side AI guidance boundary through the Responses API when `OPENAI_API_KEY` is configured
- server-side Voice Access session preparation through the approved realtime provider adapter when all readiness gates pass
- consent-gated support submissions
- reviewed access-directory search
- no-store responses for runtime guidance, voice, support, and directory calls
- generated `apps/mobile/dist` artifact for mobile-web QA only

Not allowed:

- client-side provider API keys
- privileged provider SDKs in browser bundles
- diagnosis, treatment, prescribing, symptom triage, medication advice, clinical planning, or emergency response
- microphone-only flows
- location-only flows
- formal partnership claims without approved source records
- enabling Voice Access without consent, rate limits, logging rules, support ownership, cost controls, and provider readiness

## Route Preservation

The public web deployment verifies:

- `/`
- `/resident`
- `/county` as a direct operator route
- `/about-model` redirects to `/resident`

Publishing only `apps/mobile/dist` would replace those routes. Publishing `out` would revert the app to a static export and remove the dynamic resident journey APIs. The public web app therefore publishes `.next`.

## What The Dynamic App Provides

The controlled public web app includes:

- a functional resident access journey
- server-backed search by ZIP code, city, or county
- AI-native access guidance with non-clinical boundaries
- Voice Access visible with readiness, consent, and server-side gates
- guided text alternative when voice is unavailable
- Health Access Day and Health Equity Hub discovery surfaces
- provider-readiness checklist
- privacy and consent language
- support/contact pathway
- customer-facing service states for unavailable options

## Pre-Deploy Verification

Before relying on the Amplify Hosting build config, run locally:

```bash
npm test
npm run mobile:typecheck
npm run lint
npm run typecheck
npm run build
npm run guardrails
npm run verify
npm audit --audit-level=moderate
npm run mobile:export:web
git diff --check
```

Confirm:

- `npm run build` completes
- `.next` exists for the public web artifact
- `apps/mobile/dist` exists for mobile-web QA
- dynamic API routes compile
- no secrets are present in emitted browser assets
- no provider keys are present in emitted browser assets
- no public route shows customer-facing internal build language

## Post-Deploy Verification

After Amplify Hosting publishes the dynamic app, use:

- `docs/sozorock-health/amplify-live-preview-verification-checklist.md`
- `docs/sozorock-health/post-deployment-verification-checklist.md`

Confirm:

- live URL loads
- `/resident` loads as an app experience
- `/county` loads by direct URL
- `/about-model` redirects to `/resident`
- access search returns reviewed records or a useful empty state
- AI guidance keeps non-clinical boundaries
- Voice Access stays gated unless readiness and consent are satisfied
- support/contact path is visible
- no client-side secrets or provider keys appear
- no page-level horizontal overflow appears at 390px width

## Stop Rules

Stop deployment work if any step requires or reveals:

- client-side provider keys
- direct browser access to privileged OpenAI, map, notification, or voice provider credentials
- enabled Voice Access without consent, readiness, logging, rate-limit, support, and cost-control gates
- enabled AI guidance without non-clinical boundary testing
- public copy that claims diagnosis, treatment, prescribing, symptom triage, emergency response, insurance processing, or provider replacement
- public routes that expose internal build language
- missing support ownership
- missing rollback or feature-disable path

## Recommended Next Issue

Controlled public dynamic web deployment verification and app-store readiness continuation.
