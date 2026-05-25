# Domain Activation Options

This document defines the final go/no-go path for activating:

`https://health.sozorockfoundation.org/`

Fallback URL:

`https://main.d1bmgq1fk26xqh.amplifyapp.com/`

Use this before running the CloudFront custom subdomain workflow. Do not run deployment until Option A or Option B is confirmed by the authorized AWS/GitHub/DNS owner.

## Decision Summary

| Option | DNS authority | Decision |
| --- | --- | --- |
| Option A | Root domain is already managed in Route 53 | Proceed after hosted zone and safety checks pass. |
| Option B | Only `health.sozorockfoundation.org` can be delegated to Route 53 | Proceed after delegated hosted zone and NS delegation resolve. |
| Option C | No Route 53 control for root or delegated health subdomain | Stop. Do not run current automation. |

## Option A: Root Domain Already Managed In Route 53

Use this if:

- `sozorockfoundation.org` is already hosted in Route 53.
- The Route 53 hosted zone contains the root domain.
- The existing live site will not be disrupted by adding only `health.sozorockfoundation.org`.

Action:

1. Use the hosted zone ID for `sozorockfoundation.org`.
2. Set GitHub environment variable `ROUTE53_HOSTED_ZONE_ID` to that hosted zone ID.
3. Confirm GitHub environment variable `AWS_ROLE_ARN` is set.
4. Run validate.
5. Run deploy only after the owner confirms the allowed record scope.
6. Run smoke-test.

Allowed record changes:

- `health.sozorockfoundation.org` only

Forbidden record changes:

- `sozorockfoundation.org`
- `www.sozorockfoundation.org`
- MX records
- TXT records
- CAA records
- NS records
- SPF records
- DKIM records
- DMARC records
- unrelated records

## Option B: Health Subdomain Delegated To Route 53

Use this if:

- The existing Foundation site is managed outside Route 53.
- The root domain should not move.
- AWS should control only the `health` subdomain.

Action:

1. Create or use a Route 53 public hosted zone for `health.sozorockfoundation.org`.
2. Record the Route 53 NS records for the delegated hosted zone.
3. At the existing DNS provider, add only the NS delegation for `health.sozorockfoundation.org`.
4. Do not modify root or `www`.
5. Set GitHub environment variable `ROUTE53_HOSTED_ZONE_ID` to the delegated `health.sozorockfoundation.org` hosted zone ID.
6. Confirm GitHub environment variable `AWS_ROLE_ARN` is set.
7. Wait until delegation resolves.
8. Run validate.
9. Run deploy only after delegated authority is confirmed.
10. Run smoke-test.

Allowed external DNS change:

- NS delegation for `health.sozorockfoundation.org` only

Forbidden external DNS changes:

- root A, AAAA, or CNAME records
- `www` A, AAAA, or CNAME records
- MX records
- TXT records
- CAA records
- SPF records
- DKIM records
- DMARC records
- unrelated records

## Option C: No Route 53 Control

Use this if:

- DNS is controlled by an external provider.
- No Route 53 hosted zone controls either the root domain or delegated `health.sozorockfoundation.org`.
- `health.sozorockfoundation.org` cannot be delegated to Route 53.

Decision:

- Do not run the current automated CloudFront deployment.
- The current automation cannot complete DNS validation and DNS alias creation.
- Pause activation, or create a separate external-DNS automation path only if the DNS provider API is available and explicitly approved.

Do not invent DNS provider API automation.

## What Must Be Confirmed Before Deployment

- The authorized AWS/GitHub/DNS owner has selected Option A or Option B.
- GitHub environment `health-domain-production` exists.
- GitHub environment variable `AWS_ROLE_ARN` is set.
- GitHub environment variable `ROUTE53_HOSTED_ZONE_ID` is set.
- The selected Route 53 hosted zone controls either the root domain or delegated health subdomain.
- The existing Foundation website remains outside the deployment blast radius.
- The fallback URL still works.
- The deployment workflow requires typed confirmation for `health.sozorockfoundation.org`.

## What Must Never Be Changed

- `sozorockfoundation.org`
- `www.sozorockfoundation.org`
- root A, AAAA, or CNAME records
- `www` A, AAAA, or CNAME records
- MX records
- TXT records
- CAA records
- SPF records
- DKIM records
- DMARC records
- unrelated DNS records
- app code
- backend, database, auth, forms, storage, notifications, or email/SMS services
- OpenAI or Google runtime integrations
- resident data capture
- PHI workflow
- clinical workflow
- unsupported partnership claims

## Exact GitHub Environment Variables Needed

GitHub environment:

`health-domain-production`

Environment variables:

- `AWS_ROLE_ARN`
- `ROUTE53_HOSTED_ZONE_ID`

Do not add static AWS access keys.

## Exact Workflow Sequence

Readiness check:

```bash
node scripts/check-health-domain-dns-readiness.mjs
```

Validate:

```bash
node scripts/dispatch-health-domain-workflow.mjs validate
```

Deploy, only after Option A or Option B is confirmed:

```bash
node scripts/dispatch-health-domain-workflow.mjs deploy --confirm-deploy
```

Smoke-test:

```bash
node scripts/dispatch-health-domain-workflow.mjs smoke-test
```

Do not run deploy for Option C.

## Smoke-Test Expectations

The smoke test must confirm:

- `https://health.sozorockfoundation.org/` returns a successful response.
- `https://health.sozorockfoundation.org/resident` returns a successful response.
- `https://health.sozorockfoundation.org/county` returns a successful response.
- `https://health.sozorockfoundation.org/about-model` returns a successful response.
- HTTPS works without a redirect loop.
- Fallback URL still works.
- Required language remains visible:
  - `Care for Every ZIP Code.`
  - `No PHI. Consent-based. Non-clinical.`
  - `Signal → Decision → Action → Assurance → Impact`
- No resident data capture exists.
- No PHI workflow exists.
- No clinical workflow exists.
- No unsupported partnership claim appears.
- No-index preview metadata remains present.

## Rollback Path

If activation fails after Option A or Option B:

1. Stop the workflow.
2. Keep the Amplify fallback URL active.
3. Remove only the CloudFront alias records for `health.sozorockfoundation.org` if they were created.
4. Do not touch root or `www`.
5. Record the failure in `docs/sozorock-health/custom-domain-dns-record.md`.
6. Open a follow-up issue before attempting another activation.

If Option C applies:

1. Do not run deploy.
2. Keep the fallback URL as the active preview path.
3. Decide whether to delegate `health.sozorockfoundation.org` to Route 53 or create a separately approved external-DNS path.

## Final Go/No-Go Checklist

- [ ] Option A, B, or C is selected.
- [ ] If Option A, root hosted zone is in Route 53 and only `health.sozorockfoundation.org` will change.
- [ ] If Option B, `health.sozorockfoundation.org` is delegated to Route 53 and delegation resolves.
- [ ] If Option C, deployment is stopped.
- [ ] `AWS_ROLE_ARN` is configured in GitHub environment `health-domain-production`.
- [ ] `ROUTE53_HOSTED_ZONE_ID` is configured in GitHub environment `health-domain-production`.
- [ ] No static AWS access keys are used.
- [ ] Root domain records will not change.
- [ ] `www` records will not change.
- [ ] Fallback URL is healthy.
- [ ] Validate is run before deploy.
- [ ] Deploy is run only with `--confirm-deploy`.
- [ ] Smoke-test is run after deploy.
- [ ] Results are recorded before stakeholder sharing.
