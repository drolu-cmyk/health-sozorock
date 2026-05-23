# SozoRock Health Custom Domain Readiness Plan

## Purpose

This plan prepares the live SozoRock Health Amplify preview for a future custom subdomain connection through CloudFront automation. It does not require app code changes, Amplify custom-domain setup, backend services, credentials in the repository, environment variables, or runtime integrations.

Target domain:

`health.sozorockfoundation.org`

Current fallback URL:

`https://main.d1bmgq1fk26xqh.amplifyapp.com/`

Preview status:

Approved for internal review. Not yet approved for broad public launch.

## Domain Scope

The custom domain should provide a clearer internal review URL for the SozoRock Health preview while preserving the existing Amplify fallback URL as the rollback path.

Chosen custom-domain path:

CloudFront distribution in front of the existing Amplify fallback origin.

Do not use Amplify custom-domain setup for this issue.

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

AWS Amplify origin:

`main.d1bmgq1fk26xqh.amplifyapp.com`

CloudFront stack:

`sozorock-health-cloudfront-domain`

AWS region:

`us-east-1`

Branch mapping:

`main`

## Activation Prerequisites

Before any domain activation, the deployment owner should confirm:

- the live Amplify preview is serving the intended latest `main` commit
- the fallback URL remains available
- the target subdomain is available for use
- Route 53 hosted zone access is available to the authorized AWS/domain owner
- GitHub environment `health-domain-production` exists
- GitHub environment variable `AWS_ROLE_ARN` is configured
- GitHub environment variable `ROUTE53_HOSTED_ZONE_ID` is configured
- no environment variables, secrets, backend services, or runtime integrations are needed
- the preview remains non-clinical and uses no real resident data
- no app code changes are required for the custom domain

## Route 53 Automation Prerequisite

Full automation works only when one of the following is true:

- `sozorockfoundation.org` is already managed in Route 53, and the workflow uses that hosted zone ID.
- `health.sozorockfoundation.org` has been delegated to a Route 53 hosted zone, and the workflow uses the hosted zone ID for the delegated health subdomain.

If the domain is managed by an external DNS provider and the `health` subdomain has not been delegated to Route 53, the CloudFormation stack cannot complete DNS automation. In that case, the authorized domain owner must first delegate only `health.sozorockfoundation.org` to Route 53 without changing `sozorockfoundation.org` or `www.sozorockfoundation.org`.

## SSL and Certificate Validation Checklist

Record the result before treating the custom domain as active:

- [ ] Manual GitHub Actions workflow started by the authorized deployment owner.
- [ ] Typed confirmation matched `health.sozorockfoundation.org`.
- [ ] CloudFormation stack created the ACM certificate in `us-east-1`.
- [ ] ACM DNS validation completed through Route 53.
- [ ] CloudFront distribution reached deployed status.
- [ ] `https://health.sozorockfoundation.org/` loads over HTTPS.
- [ ] Browser certificate details show a valid certificate for the subdomain.
- [ ] No mixed-content warnings appear in the browser console.
- [ ] The Amplify fallback URL still loads.

Do not invent DNS record values. Use only records created by the approved CloudFormation stack.

## DNS Propagation Checklist

After the CloudFormation stack runs:

- [ ] Route 53 shows the `A` alias for `health.sozorockfoundation.org`.
- [ ] Route 53 shows the `AAAA` alias for `health.sozorockfoundation.org`.
- [ ] ACM validation is issued for `health.sozorockfoundation.org`.
- [ ] CloudFront distribution is deployed.
- [ ] The target subdomain resolves in a browser.
- [ ] The target subdomain resolves at mobile, tablet, and desktop widths.
- [ ] The fallback URL remains available during propagation.
- [ ] Any temporary DNS warning is recorded in the DNS record document.
- [ ] Final propagation status is captured in `custom-domain-dns-record.md`.

The stack must not modify:

- `sozorockfoundation.org`
- `www.sozorockfoundation.org`

## Rollback Plan

If the custom domain fails validation, shows stale content, breaks HTTPS, or creates any confusion during review:

1. Pause use of `https://health.sozorockfoundation.org/` for reviewers.
2. Direct reviewers back to `https://main.d1bmgq1fk26xqh.amplifyapp.com/`.
3. Preserve the DNS record notes for troubleshooting.
4. Correct only the CloudFormation stack configuration for the `health` subdomain.
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
- no AWS runtime calls beyond CloudFront/Amplify static hosting behavior
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
- No root-domain changes.
- No `www` domain changes.

## Stop Rules

Stop and record the blocker if activation requires:

- root-domain DNS changes
- `www` DNS changes
- Amplify custom-domain setup
- new credentials or secrets
- static AWS access keys
- app code changes
- backend, database, authentication, forms, storage, notifications, email/SMS, Google, OpenAI, resident data capture, PHI workflow, clinical workflow, or unsupported partnership claims
