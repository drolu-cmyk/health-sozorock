# SozoRock Health Manual Preview Smoke-Test Checklist

## Purpose

This checklist is for a human reviewer to use after an explicitly approved manual preview deployment.

It does not authorize deployment. It does not configure deployment. It does not add credentials, secrets, environment variables, infrastructure, backend services, storage, forms, notifications, email, SMS, live maps, live AI, or external calls.

The prototype boundary remains:

**No PHI. Consent-based. Non-clinical.**

## Before Preview Deployment

Confirm all items before a human reviewer deploys or shares a preview:

- Manual preview approval is recorded.
- The deployment path does not require new credentials from Codex.
- No environment variables or secrets are added.
- No backend, database, authentication, storage, forms, notifications, email, SMS, or external calls are activated.
- No AWS, Google, OpenAI, or paid runtime service is activated from this checklist.
- The app is built from a branch that passed local verification and CI.
- The preview remains internal or stakeholder-review only until public release is separately approved.
- The trust boundary remains visible: **No PHI. Consent-based. Non-clinical.**

## Local Verification Before Manual Preview

Run these commands before any manual preview action:

```bash
npm run lint
npm run typecheck
npm run build
npm run guardrails
npm run verify
npm audit --audit-level=moderate
```

Stop if any command fails.

## Required Routes

Open each route in the approved preview environment:

- `/`
- `/resident`
- `/county`
- `/about-model`

For every route, confirm:

- The route renders successfully.
- No console errors appear.
- No page-level horizontal overflow appears at the checked viewport widths.
- The trust boundary remains visible where expected.
- Links stay inside the static prototype routes.
- No resident data capture is active.
- No PHI workflow is introduced.
- No clinical workflow is introduced.
- No unsupported partnership claim is present.

## Required Viewports

Check each route at:

- Mobile: 390px width.
- Tablet: 768px width.
- Desktop: 1280px width.

At each width, confirm:

- Text does not overlap.
- Cards and tables remain readable.
- Navigation remains usable.
- Labels wrap cleanly.
- Buttons, links, and badges remain inside their containers.
- Any table scrolling is contained inside the table region, not the whole page.

## Route Checklist

### `/`

Confirm:

- `Care for Every ZIP Code.` is visible.
- `Signal → Decision → Action → Assurance → Impact` is visible.
- `No PHI. Consent-based. Non-clinical.` is visible.
- The synthetic access signal display remains static.
- No external API calls are made.

### `/resident`

Confirm:

- The Resident Access Layer remains simple and readable.
- Voice Access remains a static simulation.
- `Voice Access provides non-clinical support and does not give medical advice.` is visible.
- No listening, recording, storage, or external calls are active.
- No resident data capture is active.
- `Providers keep their platforms. We help you get ready.` is visible.

### `/county`

Confirm:

- Geospatial Access Operating Picture renders as a mock/provider-neutral view.
- No live map, geospatial provider, or external request is active.
- AI Decision Support remains operational planning support only.
- `Human review required before action.` is visible.
- `Planning support, not automated decision-making.` is visible.
- `Review state` is visible.
- `Evidence source` is visible.
- `Action gate` is visible.
- Human Review Workflow remains visible.
- Review Queue remains visible.
- Assurance checklist remains complete:
  - Consent captured.
  - No protected health information collected.
  - Non-clinical boundary reviewed.
  - Data source verified.
  - Human review completed.
  - Provider responsibility confirmed.
  - Report generated with controls.
  - Action evidence recorded.
  - County-facing output marked as planning support.
- Review states remain visible:
  - Draft.
  - Needs Review.
  - Approved.
  - Deferred.
  - Completed.
- Action Queue remains readable on mobile, tablet, and desktop.

### `/about-model`

Confirm:

- The model boundary remains non-clinical.
- `Signal → Decision → Action → Assurance → Impact` is visible.
- `No PHI. Consent-based. Non-clinical.` is visible.
- `Providers keep their platforms. We help you get ready.` is visible.
- No live AWS, Google, OpenAI, backend, database, authentication, storage, forms, notifications, email, SMS, or external call is required.

## Console and Network Checks

For each route and viewport, confirm:

- Browser console shows 0 errors.
- No external API calls are made.
- No Google runtime calls are made.
- No OpenAI runtime calls are made.
- No AWS runtime calls are made.
- No backend, database, authentication, storage, forms, notifications, email, or SMS call is made.

Stop if any unexpected network request appears.

## Metadata Checks

Confirm preview metadata still discourages indexing:

- `robots.index` remains false.
- `robots.follow` remains false.
- Cache discouragement remains present.
- The page title uses SozoRock Health and Care for Every ZIP Code.
- The description includes the non-clinical trust boundary.
- Publisher and creator remain The SozoRock Foundation, Inc.

## Post-Preview Human Review

After the manual preview is live, a human reviewer must confirm:

- Who reviewed the preview.
- Which branch or commit was reviewed.
- Which preview URL was reviewed.
- Which viewport widths were checked.
- Whether all route checks passed.
- Whether console errors were absent.
- Whether external API calls were absent.
- Whether the no-index metadata remained present.
- Whether the trust boundary remained visible.
- Whether any follow-up issue is needed before stakeholder review.

## Stop Rules

Stop and report before sharing the preview if any step requires or reveals:

- Deployment credentials in Codex.
- New secrets.
- Environment variables.
- AWS, Google, OpenAI, or paid-service activation.
- Backend, database, authentication, storage, forms, notifications, email, or SMS.
- External API calls.
- Real resident data.
- PHI workflow.
- Clinical workflow.
- Unsupported partnership claims.
- Public launch language.
- A broken route.
- Console errors.
- Page-level horizontal overflow.
- Missing trust boundary language.

## Completion Standard

The manual preview smoke test is complete only when:

- All required routes render.
- All required viewports pass.
- Console errors are 0.
- External API calls are absent.
- Voice Access remains static.
- Geospatial view remains mock/provider-neutral.
- Human Review Workflow remains visible.
- Review Queue remains visible.
- Assurance checklist remains complete.
- Review states remain visible.
- Trust boundary remains visible.
- No PHI, resident data capture, clinical workflow, or unsupported partnership claim appears.
