# SozoRock Health Custom Domain Readiness Plan

## Purpose

This plan prepares the live SozoRock Health Amplify preview for a future custom subdomain connection without changing DNS, Amplify settings, application code, infrastructure, credentials, environment variables, or runtime services.

Target domain:

`health.sozorockfoundation.org`

Current fallback URL:

`https://main.d1bmgq1fk26xqh.amplifyapp.com/`

Preview status:

Approved for internal review. Not yet approved for broad public launch.

## Domain Scope

The custom domain should provide a clearer internal review URL for the SozoRock Health preview while preserving the existing Amplify fallback URL as the rollback path.

Using a subdomain is safer than using the root domain because:

- it limits the preview connection to the SozoRock Health surface only
- it avoids disrupting the foundation root website
- it gives the deployment owner a narrower DNS change to review
- it preserves a simple rollback path to the Amplify default URL
- it keeps future production and program domains separable

## Ownership Placeholders

Domain owner:

`Olu Adeyemo / authorized domain owner`

DNS provider:

`TBD by deployment owner`

AWS Amplify app:

`TBD by deployment owner`

AWS region:

`us-east-1`

Branch mapping:

`main`

## Activation Prerequisites

Before any domain activation, the deployment owner should confirm:

- the live Amplify preview is serving the intended latest `main` commit
- the fallback URL remains available
- the target subdomain is available for use
- the DNS provider account is accessible to the authorized domain owner
- Amplify custom domain setup provides the required DNS records
- no environment variables, secrets, backend services, or runtime integrations are needed
- the preview remains non-clinical and uses no real resident data
- no app code changes are required for the custom domain

## SSL and Certificate Validation Checklist

Record the result before treating the custom domain as active:

- [ ] Amplify custom domain setup started by the authorized deployment owner.
- [ ] Amplify provided DNS validation records.
- [ ] DNS records were copied exactly from Amplify by the authorized domain owner.
- [ ] Certificate validation reached a valid state in Amplify.
- [ ] `https://health.sozorockfoundation.org/` loads over HTTPS.
- [ ] Browser certificate details show a valid certificate for the subdomain.
- [ ] No mixed-content warnings appear in the browser console.
- [ ] The Amplify fallback URL still loads.

Do not invent DNS record values. Use only records generated during the authorized Amplify custom domain setup.

## DNS Propagation Checklist

After records are added by the authorized domain owner:

- [ ] DNS provider shows the records as saved.
- [ ] Amplify shows domain validation in progress or complete.
- [ ] The target subdomain resolves in a browser.
- [ ] The target subdomain resolves at mobile, tablet, and desktop widths.
- [ ] The fallback URL remains available during propagation.
- [ ] Any temporary DNS warning is recorded in the DNS record document.
- [ ] Final propagation status is captured in `custom-domain-dns-record.md`.

## Rollback Plan

If the custom domain fails validation, shows stale content, breaks HTTPS, or creates any confusion during review:

1. Pause use of `https://health.sozorockfoundation.org/` for reviewers.
2. Direct reviewers back to `https://main.d1bmgq1fk26xqh.amplifyapp.com/`.
3. Preserve the DNS record notes for troubleshooting.
4. Remove or correct only the DNS records that were added for the custom subdomain.
5. Re-run the smoke test before sharing the custom domain again.

Rollback does not require app code changes.

## Post-Activation Smoke Test Requirements

After the custom domain resolves, run the manual smoke test against:

- `https://health.sozorockfoundation.org/`
- `https://health.sozorockfoundation.org/resident`
- `https://health.sozorockfoundation.org/county`
- `https://health.sozorockfoundation.org/about-model`

Check each route at:

- 390px
- 768px
- 1280px

Confirm:

- all routes render
- 0 console errors
- no page-level horizontal overflow
- no unexpected external API calls
- no Google runtime calls
- no OpenAI runtime calls
- no AWS runtime calls beyond Amplify Hosting behavior
- Voice Access remains static
- geospatial view remains mock/provider-neutral
- Human Review Workflow remains visible
- Review Queue remains visible
- assurance checklist remains complete
- review states remain visible
- Action Queue remains readable
- trust boundary remains visible
- `Care for Every ZIP Code.` remains visible
- `Signal → Decision → Action → Assurance → Impact` remains visible in the deployed UI as the locked arrow phrase
- `Providers keep their platforms. We help you get ready.` remains visible

## No-Index Preview Metadata Check

Confirm the preview still discourages indexing:

- [ ] Page metadata includes no-index preview protection.
- [ ] The custom domain does not change route metadata.
- [ ] No public launch language was added.
- [ ] The share packet continues to frame the preview as internal review.

## Guardrails

The custom domain must not change the product boundary:

- No PHI. Consent-based. Non-clinical.
- No resident data capture.
- No clinical workflow.
- No unsupported partnership claims.
- No backend.
- No database.
- No authentication.
- No forms.
- No storage.
- No notifications.
- No email/SMS.
- No Google runtime calls.
- No OpenAI runtime calls.
- No secrets.
- No environment variables.

## Stop Rules

Stop and record the blocker if activation requires:

- DNS configuration by Codex
- Amplify setting changes by Codex
- AWS console action by Codex
- new credentials or secrets
- environment variables
- app code changes
- backend, database, authentication, forms, storage, notifications, email/SMS, Google, OpenAI, resident data capture, PHI workflow, clinical workflow, or unsupported partnership claims
