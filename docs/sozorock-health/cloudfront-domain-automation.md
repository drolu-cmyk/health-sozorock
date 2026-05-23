# CloudFront Custom Subdomain Automation

## Summary

Issue 031 creates the automated path for connecting the SozoRock Health preview to:

`https://health.sozorockfoundation.org/`

The chosen path is CloudFront in front of the existing Amplify origin:

`https://main.d1bmgq1fk26xqh.amplifyapp.com/`

This replaces the earlier Amplify custom-domain plan. The Amplify fallback URL remains available.

## Why CloudFront Instead Of Amplify Custom Domains

CloudFront gives the `health` subdomain its own controlled distribution while keeping the existing Amplify preview unchanged. This keeps the custom domain layer separate from the app hosting layer and creates a clearer rollback path.

CloudFront is also the safer fit for this issue because:

- only `health.sozorockfoundation.org` is in scope
- the existing Amplify preview remains the origin and fallback
- root and `www` records are excluded
- DNS changes are captured through CloudFormation, not ad hoc console edits
- the workflow uses GitHub Actions OIDC instead of long-lived AWS access keys

## Scope Boundary

In scope:

- CloudFront distribution for `health.sozorockfoundation.org`
- ACM certificate for `health.sozorockfoundation.org` in `us-east-1`
- Route 53 `A` and `AAAA` alias records for `health.sozorockfoundation.org`
- Manual GitHub Actions workflow for validate, deploy, and smoke-test
- Smoke-test script for the custom domain and fallback URL

Out of scope:

- `sozorockfoundation.org`
- `www.sozorockfoundation.org`
- Amplify custom-domain setup
- app code changes
- backend services
- database
- authentication
- forms
- storage
- notifications
- email/SMS
- Google runtime calls
- OpenAI runtime calls
- resident data capture
- PHI workflow
- clinical workflow

## Required GitHub Configuration

Required environment:

`health-domain-production`

Required GitHub environment variables:

| Variable | Purpose |
| --- | --- |
| `AWS_ROLE_ARN` | IAM role assumed by GitHub Actions through OIDC. |
| `ROUTE53_HOSTED_ZONE_ID` | Route 53 hosted zone ID that contains `sozorockfoundation.org`. |

Do not store long-lived AWS access keys as GitHub secrets for this workflow.

## Required AWS Permissions

The OIDC role should be scoped to the minimum permissions needed to:

- validate and deploy the CloudFormation stack
- create and read the ACM certificate for `health.sozorockfoundation.org`
- create and read the CloudFront distribution
- create and read Route 53 records for `health.sozorockfoundation.org`
- describe stack outputs

The role should not allow changes to:

- root domain records for `sozorockfoundation.org`
- `www.sozorockfoundation.org`
- unrelated hosted zones
- backend services
- databases
- storage buckets
- identity providers

## Manual Workflow

Workflow file:

`.github/workflows/deploy-health-domain-cloudfront.yml`

Operations:

- `validate`
- `deploy`
- `smoke-test`

The workflow requires a typed confirmation input:

`DEPLOY_HEALTH_SUBDOMAIN_ONLY`

The workflow fails unless the value exactly matches:

`health.sozorockfoundation.org`

## Stack Resources

Stack name:

`sozorock-health-cloudfront-domain`

The stack creates:

- `AWS::CertificateManager::Certificate`
- `AWS::CloudFront::Distribution`
- `AWS::Route53::RecordSet` for the `A` alias
- `AWS::Route53::RecordSet` for the `AAAA` alias

The distribution uses a caching-disabled policy so the custom subdomain stays aligned with the Amplify preview origin during review.

The stack outputs:

- CloudFront distribution ID
- CloudFront domain name
- custom domain URL
- certificate ARN
- origin domain

## Smoke-Test Procedure

After deployment completes, run:

```bash
node scripts/smoke-test-health-domain.mjs
```

The script checks:

- `https://health.sozorockfoundation.org/`
- `https://health.sozorockfoundation.org/resident`
- `https://health.sozorockfoundation.org/county`
- `https://health.sozorockfoundation.org/about-model`
- `https://main.d1bmgq1fk26xqh.amplifyapp.com/`

It confirms:

- HTTPS works
- each route returns a successful response
- no redirect loop is detected
- the required product and trust phrases are visible
- no-index preview metadata remains present
- the fallback URL still works

While the custom domain is not active, run:

```bash
node scripts/smoke-test-health-domain.mjs --fallback-only
```

## Rollback Plan

If the custom domain fails or the smoke test does not pass:

1. Keep using `https://main.d1bmgq1fk26xqh.amplifyapp.com/`.
2. Pause sharing `https://health.sozorockfoundation.org/`.
3. Review CloudFormation stack events and outputs.
4. Review ACM validation and Route 53 records.
5. Correct only the `health.sozorockfoundation.org` stack configuration.
6. Re-run the smoke test before sharing the custom domain.

Do not modify root or `www` records as part of rollback.

## Guardrails

- No app code changes.
- No backend.
- No database.
- No auth.
- No forms.
- No storage.
- No notifications.
- No email/SMS.
- No OpenAI runtime calls.
- No Google runtime calls.
- No resident data capture.
- No PHI workflow.
- No clinical workflow.
- No unsupported partnership claims.
- No root-domain changes.
- No `www` domain changes.
- Existing Amplify fallback URL remains available.
