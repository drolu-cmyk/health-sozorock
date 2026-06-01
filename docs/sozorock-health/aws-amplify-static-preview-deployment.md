# AWS Amplify Static Preview Deployment

## Purpose

Issue 045 configures AWS Amplify Hosting to build the existing static preview routes, publish the static Next.js export, and verify the resident Expo web export artifact.

This issue prepares deployment configuration only. It does not execute deployment from Codex, create cloud resources, activate backend runtime, enable live services, add secrets, add API keys, or add runtime service adapters.

Required boundary:

**No PHI. Consent-based. Non-clinical.**

Resident promise:

**Care for Every ZIP Code.**

Provider boundary:

**Providers keep their platforms. We help you get ready.**

Locked operating logic:

**Signal → Decision → Action → Assurance → Impact**

## Relation To Issue 044

Issue 044 added the Expo static web export command:

```bash
npm run mobile:export:web
```

Issue 045 adds the Amplify Hosting build specification that runs that command after the existing Next.js preview build.

The resident Expo export is generated at:

```text
apps/mobile/dist
```

The static Next.js deployment artifact is generated at:

```text
out
```

## Deployment Target

Deployment target:

```text
AWS Amplify Hosting
```

Build command:

```bash
npm run mobile:export:web
```

Resident export output directory:

```text
apps/mobile/dist
```

Static deployment output directory:

```text
out
```

## Build Specification

The repository root now includes:

```text
amplify.yml
```

The build specification:

- runs from the repository root
- installs npm dependencies
- runs `npm run build` for the existing preview routes
- runs `npm run mobile:export:web`
- publishes `out` so the existing preview routes stay available as static files
- keeps `apps/mobile/dist` as a generated resident export artifact for verification
- caches npm workspace dependency folders
- does not publish `.next`
- does not publish `apps/mobile/dist` as the existing site root artifact
- does not configure backend phases
- does not configure Amplify backend categories
- does not add secrets
- does not add API keys
- does not add Google resources
- does not add runtime adapters

## Static Hosting Boundary

This configuration is for static hosting only.

Allowed:

- AWS Amplify Hosting frontend build configuration
- static preview artifact publication from `out`
- resident Expo export generation at `apps/mobile/dist`
- dependency cache paths
- post-deploy static preview verification

Not allowed:

- Amplify backend categories
- Amplify Auth
- Amplify Data
- Amplify Storage
- Amplify Functions
- GraphQL API
- REST API
- Lambda
- DynamoDB
- Cognito
- S3 uploads beyond Amplify Hosting artifact handling
- CloudFront configuration changes
- DNS changes
- Route 53 changes
- ACM changes
- OIDC changes
- infrastructure-as-code
- Google Cloud resources
- Firebase resources
- Google Maps runtime
- Vertex AI runtime
- Gemini runtime
- OpenAI runtime
- secrets
- API keys
- SDK imports
- network calls
- runtime service adapters

## Route Preservation

The existing Amplify preview still advertises and verifies the following routes:

- `/`
- `/resident`
- `/county`
- `/about-model`

Publishing only `apps/mobile/dist` at the site root would replace those routes. Publishing `.next` would violate the static-only boundary because `.next` is not this repository's static deploy artifact. The Amplify build spec therefore publishes `out` while still generating the resident Expo export during the build.

## What The Build Produces

The resident Expo export artifact includes:

- `index.html`
- `metadata.json`
- `_expo/static/js/web/...` assets
- resident app shell
- resident navigation
- static guidance screens
- fallback preview cards
- Voice Access inactive state
- AI guidance static/inactive state
- map and location inactive states
- static/local-only hub information
- privacy and accessibility boundary screens

The published preview and generated resident export do not include:

- live AI
- live maps
- microphone capture
- location capture
- backend runtime
- resident account
- forms
- PHI collection
- clinical workflow
- appointment scheduling
- insurance workflow
- provider messaging
- county console

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
node scripts/smoke-test-health-domain.mjs --fallback-only
npm run mobile:export:web
```

Confirm:

- export command completes
- existing preview build completes
- `out` exists for the published static preview artifact
- `apps/mobile/dist` exists
- `apps/mobile/dist/index.html` exists
- static assets exist
- no secrets are present in output
- no API keys are present in output
- no backend endpoint config is present

## Post-Deploy Verification

After the existing Amplify Hosting pipeline publishes the static artifact, use:

- `docs/sozorock-health/amplify-live-preview-verification-checklist.md`
- `docs/sozorock-health/post-deployment-verification-checklist.md`

Confirm:

- live URL loads
- `/resident` loads
- `/county` loads
- `/about-model` loads
- resident screens render
- fallback preview cards render
- required boundary language appears correctly
- no console errors appear
- no unexpected network calls appear
- no live AI behavior appears
- no live maps behavior appears
- no microphone capture appears
- no location capture appears
- no resident data capture appears
- no PHI workflow appears
- no clinical workflow appears
- no county console appears in resident navigation

## Stop Rules

Stop deployment configuration work if any step requires:

- deployment execution from Codex
- replacing the existing preview routes with only `apps/mobile/dist`
- publishing `.next` instead of `out`
- new Amplify backend setup
- Amplify Auth
- Amplify Data
- Amplify Storage
- Amplify Functions
- GraphQL API
- REST API
- Lambda
- DynamoDB
- Cognito
- CloudFront configuration changes
- DNS changes
- Route 53 changes
- ACM changes
- OIDC changes
- infrastructure-as-code
- Google Cloud resources
- Firebase resources
- Google Maps runtime
- Vertex AI runtime
- Gemini runtime
- OpenAI runtime
- secrets
- API keys
- SDK imports
- network calls
- runtime service adapters
- live AI
- live maps
- microphone capture
- location capture
- resident data capture
- submitted forms
- PHI workflow
- clinical workflow

## Recommended Next Issue

Issue 046 - Verify Amplify live static preview and public-readiness cleanup
