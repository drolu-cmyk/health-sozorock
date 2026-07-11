# SozoRockÂ® Health

## TL;DR

SozoRockÂ® Health is a non-clinical health access app. It helps residents find a clear next step, prepare for provider-led care, search for nearby support, use guided text, request help, and see Health Access Day and Health Equity Hub information.

It is not a clinic or medical provider. It stays non-clinical. Provider keys and privileged credentials stay server-side.

Quick start:

```bash
npm install
npm run dev
npm run verify
```

Open `http://localhost:3000` to use the resident app journey.

Production-style local QA:

```bash
npm run build
npx next start -p 3031
node scripts/qa-resident-app.mjs
```

The QA harness signs up as `Olu`, logs in, searches by ZIP/city/county, checks
Voice Access consent gates, prepares the support flow, signs out, checks mobile
width, scans public copy, and verifies client bundles do not expose provider
keys.

SozoRockÂ® Health is a non-clinical health access program of The SozoRock Foundation, Inc.

It helps underserved communities turn access barriers into reviewed next steps through trusted access points, Voice Access, Health Access Day, Health Equity Hubs, provider-led pathways, and county access review.

## Locked promise

**Care for Every ZIP Code.**

## Locked operating logic

**Signal → Decision → Action → Assurance → Impact**

## Product layers

### Resident Access Layer

Simple, clear, private, human.

Resident-facing modules:

- Welcome
- Access Start
- Voice Access
- Health Access Day
- Health Equity Hubs
- Provider-Led Pathways

### County Access Review Layer

Clear, reviewed, accountable, privacy-aware.

Partner modules:

- Access gap review
- Decision support
- Action review
- Assurance checks
- Planning examples

## Trust boundary

**No PHI. Consent-based. Non-clinical.**

SozoRockÂ® Health does not give medical advice or replace licensed care.

## Provider pathway language

**Providers keep their platforms. We help you get ready.**

This describes the resident-facing meaning of the Bring Your Own Platform model. Licensed providers retain responsibility for their own clinical systems, records, compliance processes, medical judgment, and patient care.

## Source of truth

Before building, read:

- `AGENTS.md`
- `docs/sozorock-health/product-brief.md`
- `docs/sozorock-health/screen-build-spec.md`
- `docs/sozorock-health/architecture.md`
- `docs/sozorock-health/aws-target-architecture.md`
- `docs/sozorock-health/aws-cost-gates.md`
- `docs/sozorock-health/brand-system.md`
- `docs/sozorock-health/content-guardrails.md`
- `docs/sozorock-health/automation-operating-model.md`

AWS planning docs:

- [AWS target architecture](docs/sozorock-health/aws-target-architecture.md)
- [AWS cost gates](docs/sozorock-health/aws-cost-gates.md)

## Automation stance

Automate everything safe to automate. Require human review where trust, compliance, clinical boundaries, cost exposure, external outreach, or partnership claims are involved.

## Current status

SozoRockÂ® Health is moving through the controlled public web launch track as a dynamic Next.js App Router application.

Routes:

- `/`
- `/resident`
- `/county` direct operator route
- `/about-model` redirects to `/resident` so old links do not expose a public explainer screen

Local commands:

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run guardrails
npm run verify
npm audit --audit-level=moderate
```

The resident route is an app experience, not a document. It uses server routes for access search, access guidance, Voice Access readiness, and support/contact handling while preserving the non-clinical boundary.

## Dynamic app posture

Controlled public web launch uses the Next.js dynamic runtime.

Active runtime paths:

- `src/app/api/access/search/route.ts`
- `src/app/api/account/session/route.ts`
- `src/app/api/ai/guidance/route.ts`
- `src/app/api/support/route.ts`
- `src/app/api/voice/session/route.ts`

Resident app surface:

- `src/app/resident/resident-access-app.tsx`

Deployment posture:

- Amplify builds with `npm run build`.
- Amplify publishes `.next`.
- `npm run mobile:export:web` still produces `apps/mobile/dist` for mobile-web QA.
- `out` is not the public web launch artifact.
- Provider keys and privileged credentials stay server-side.
- Voice Access is visible but gated by permission, readiness, support, rate-limit, cost, logging, and provider controls.
- ZIP, city, and county search remains available without microphone or location access.

## QA media

Production QA screenshots are written to `artifacts/qa/` by:

```bash
node scripts/qa-resident-app.mjs
```

Create a short X-ready MP4 from those screenshots:

```bash
FFMPEG_PATH=/path/to/ffmpeg node scripts/create-x-video.mjs
```

Output: `artifacts/video/sozorock-health-x-demo.mp4`.

Recommended X posting format: MP4/H.264, HD landscape, around 15-30 seconds,
with visible on-screen text because timeline autoplay is often muted.

Controlled public launch remains valid only when these boundaries stay true:

- **No PHI. Consent-based. Non-clinical.**
- SozoRockÂ® Health is access-only: no clinical determinations, medical interventions, medication orders, symptom sorting, provider replacement, insurance processing, or emergency response.
- Providers keep their platforms. We help residents get ready.
- Voice Access uses a server-side provider-agnostic adapter and never exposes provider credentials to the browser.
- The app works without microphone access.
- The app works without location access.
- Typing and ZIP/city/county search remain available.
- Human review required before action.
- Public routes use resident-facing service states instead of internal build language.
- No unsupported county, library, provider, or partner claim is present.

Before controlled public deployment, run the local commands above and complete:

- `docs/sozorock-health/preview-deployment-checklist.md`
- `docs/sozorock-health/manual-preview-smoke-test.md`
- `docs/sozorock-health/manual-preview-review-record.md`
- [Live preview share packet](docs/sozorock-health/live-preview-share-packet.md)
- [Stakeholder feedback log](docs/sozorock-health/stakeholder-feedback-log.md)
- [Custom domain readiness plan](docs/sozorock-health/custom-domain-readiness-plan.md)
- [Custom domain DNS record](docs/sozorock-health/custom-domain-dns-record.md)
- [CloudFront domain automation](docs/sozorock-health/cloudfront-domain-automation.md)
- [Domain automation bootstrap](docs/sozorock-health/domain-automation-bootstrap.md)
- [Domain activation operator checklist](docs/sozorock-health/domain-activation-operator-checklist.md)
- [Domain activation options and go/no-go path](docs/sozorock-health/domain-activation-options.md)
- [Native app product plan](docs/sozorock-health/native-app-product-plan.md)
- [Native build readiness](docs/sozorock-health/native-build-readiness.md)
- [App store privacy readiness](docs/sozorock-health/app-store-privacy-readiness.md)
- [Mobile release checklist](docs/sozorock-health/mobile-release-checklist.md)
- [Non-clinical backend foundation](docs/sozorock-health/non-clinical-backend-foundation.md)
- [Backend data boundaries](docs/sozorock-health/backend-data-boundaries.md)
- [Consent-gated adapter shells](docs/sozorock-health/consent-gated-adapter-shells.md)
- [Service adapter readiness](docs/sozorock-health/service-adapter-readiness.md)
- [Resident adapter fallback states](docs/sozorock-health/resident-adapter-fallback-states.md)
- [Resident fallback preview quality](docs/sozorock-health/resident-fallback-preview-quality.md)
- [Resident content accessibility audit](docs/sozorock-health/resident-content-accessibility-audit.md)
- [Static preview deployment readiness](docs/sozorock-health/static-preview-deployment-readiness.md)
- [Manual preview QA checklist](docs/sozorock-health/manual-preview-qa-checklist.md)
- [Static resident preview deployment release](docs/sozorock-health/static-preview-deployment-release.md)
- [Post-deployment verification checklist](docs/sozorock-health/post-deployment-verification-checklist.md)
- [Static resident web export](docs/sozorock-health/static-resident-web-export.md)
- [Static export artifact checklist](docs/sozorock-health/static-export-artifact-checklist.md)
- [AWS Amplify dynamic app deployment](docs/sozorock-health/aws-amplify-static-preview-deployment.md)
- [Amplify dynamic web verification checklist](docs/sozorock-health/amplify-live-preview-verification-checklist.md)

## Native resident app foundation

The resident app foundation lives in `apps/mobile` and shared resident product definitions live in `packages/shared`.

Mobile commands:

```bash
npm run mobile:start
npm run mobile:web
npm run mobile:export:web
npm run mobile:ios
npm run mobile:android
npm run mobile:typecheck
```

The mobile app foundation remains gated separately from the controlled public web launch. It does not add protected-health-data workflows, clinical workflows, DNS changes, CloudFront changes, Route 53 changes, ACM changes, OIDC changes, or AWS infrastructure changes.

Native build readiness is documented for future EAS-based iOS and Android builds. No EAS build, EAS submit, App Store submission, Google Play submission, credentials, secrets, live services, or cloud resources are introduced by the readiness docs.

The non-clinical backend foundation is limited to shared types, provider-neutral contracts, local mock/no-op services, no-PHI validation utilities, and documentation. It does not activate backend runtime services, cloud resources, live AI, live maps, resident data capture, PHI workflows, or clinical workflows.

Consent-gated adapter shells prepare unavailable/fallback states for future voice, AI, maps, hubs, and geospatial services. They do not add SDK imports, network calls, secrets, API keys, backend runtime, live services, resident data capture, PHI workflows, or clinical workflows.

Resident adapter fallback states connect those unavailable/fallback states to the resident app UI without activating live services, SDKs, network calls, backend runtime, resident data capture, PHI workflows, or clinical workflows.

Static resident web export adds a local Expo web export command that produces `apps/mobile/dist` without deploying, changing infrastructure, enabling live services, adding backend runtime, or collecting resident data.

AWS Amplify dynamic app deployment configures Amplify Hosting to build the public web app, publish `.next`, generate `apps/mobile/dist` for mobile-web QA, preserve the resident app routes, keep `/county` as a direct operator route, and redirect `/about-model` back to `/resident` without exposing secrets, API keys, or privileged provider credentials in browser bundles.

## Brand Assets

Place locked, approved brand files in:

- `public/brand/sozorock-health-logo.svg`
- `public/brand/sozorock-foundation-logo.svg`
- `public/brand/app-icon.svg`
- `public/brand/brand-mark.svg`

Do not add substitute logos or approximations. If official assets are missing, the app uses text branding from `src/lib/brand.ts`.
