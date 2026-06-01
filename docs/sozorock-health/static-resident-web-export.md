# Static Resident Web Export

## Purpose

Issue 044 enables a deployable static web export path for the resident Expo app.

Local preview with `npm run mobile:web` confirms the app can run in a local browser. Static export creates a file artifact that can be reviewed before any selected hosting target is used.

This issue does not deploy the app, create infrastructure, add backend runtime, activate live services, or add product capability.

Required boundary:

**No PHI. Consent-based. Non-clinical.**

Resident promise:

**Care for Every ZIP Code.**

Provider boundary:

**Providers keep their platforms. We help you get ready.**

Locked operating logic:

**Signal → Decision → Action → Assurance → Impact**

## Relation To Issue 043

Issue 043 documented the static resident preview deployment release boundary for the existing static hosting path.

Issue 044 adds the practical static export command needed before a selected hosting target can serve the resident Expo app preview.

## Static Export Command

Root command:

```bash
npm run mobile:export:web
```

Workspace command:

```bash
npm run export:web -w @sozorock-health/mobile
```

Mobile workspace script:

```bash
expo export --platform web
```

## Expected Output Directory

Expo static web export outputs the resident app artifact to:

```text
apps/mobile/dist
```

If Expo changes the output directory in a future version, update this document and `docs/sozorock-health/static-export-artifact-checklist.md` with the actual output directory observed during verification.

## What The Export Contains

The static resident web export contains:

- web `index.html`
- static JavaScript and CSS assets
- resident app shell
- static web assets needed by the resident Expo app shell
- resident navigation
- static guidance screens
- fallback preview cards
- Voice Access inactive state
- AI guidance static/inactive state
- map and location inactive states
- static/local-only hub information
- privacy and accessibility boundary screens

## What Remains Inactive

The static resident web export does not include:

- live AI
- live maps
- microphone capture
- location capture
- backend runtime
- resident account
- forms
- resident data capture
- PHI collection
- clinical workflow
- appointment scheduling
- insurance workflow
- provider messaging
- county console
- runtime service adapters

## Local Verification Commands

Run:

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
npm run mobile:web
```

Stop the local `mobile:web` server after the HTTP 200 check.

## Static Host Requirements

A future selected hosting target should serve the files in `apps/mobile/dist` as static files.

Static host expectations:

- serve `index.html`
- serve generated static assets
- preserve client-side navigation fallback to `index.html` if required by the selected host
- use the existing repository/static hosting boundary unless separately approved
- avoid new infrastructure setup in this issue
- avoid secrets and API keys
- avoid backend runtime
- avoid live services

## Post-Export Checklist

After running `npm run mobile:export:web`, confirm:

- export command completes
- `apps/mobile/dist` exists
- `apps/mobile/dist/index.html` exists
- static assets exist under `apps/mobile/dist`
- no secrets are present in output
- no API keys are present in output
- no backend endpoint config is present
- Voice Access remains inactive
- AI guidance remains static/inactive
- map discovery remains inactive
- location remains inactive
- no resident data capture exists
- no PHI workflow exists
- no clinical workflow exists

## Stop Rules

Stop if static export enablement requires:

- deployment execution from Codex
- new deployment provider setup
- infrastructure changes
- backend runtime
- database
- auth
- storage
- submitted forms
- live AI
- live maps
- microphone capture
- location capture
- resident data capture
- PHI workflow
- clinical workflow
- provider-patient messaging
- appointment scheduling
- insurance data
- payment data
- EHR integration
- cloud resources
- secrets
- API keys
- SDK imports
- network calls
- runtime service adapters

## Recommended Next Issue

Issue 045 - Deploy static resident app preview to selected hosting target
