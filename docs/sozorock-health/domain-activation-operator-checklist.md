# Domain Activation Operator Checklist

Use this checklist only after an authorized AWS/GitHub/DNS owner is ready to activate:

`https://health.sozorockfoundation.org/`

Fallback origin:

`https://main.d1bmgq1fk26xqh.amplifyapp.com/`

## Before You Start

- [ ] You are the authorized AWS/GitHub/DNS owner or have explicit approval.
- [ ] You will not change `sozorockfoundation.org`.
- [ ] You will not change `www.sozorockfoundation.org`.
- [ ] You will not use Amplify custom-domain setup.
- [ ] You will not create backend, database, auth, storage, forms, notifications, email/SMS, OpenAI, or Google runtime services.
- [ ] You will not use static AWS access keys.

## Trust Bootstrap

- [ ] Confirm Route 53 controls `sozorockfoundation.org`, or confirm only `health.sozorockfoundation.org` is delegated to Route 53.
- [ ] Validate `infra/github-aws-oidc-role/template.yaml`.
- [ ] Deploy the OIDC role bootstrap stack from an authorized AWS session.
- [ ] Record the `AwsRoleArn` output.
- [ ] Create GitHub environment `health-domain-production`.
- [ ] Set GitHub environment variable `AWS_ROLE_ARN`.
- [ ] Set GitHub environment variable `ROUTE53_HOSTED_ZONE_ID`.

## Readiness Check

Run:

```bash
node scripts/check-health-domain-dns-readiness.mjs
```

Confirm:

- [ ] Fallback Amplify DNS resolves.
- [ ] Fallback Amplify HTTPS responds.
- [ ] Custom domain status is understood.
- [ ] `ROUTE53_HOSTED_ZONE_ID` is configured where expected.

## Validate

Run:

```bash
node scripts/dispatch-health-domain-workflow.mjs validate
```

Confirm:

- [ ] GitHub Actions workflow starts.
- [ ] OIDC role assumption succeeds.
- [ ] CloudFormation template validation passes.
- [ ] Stack outputs are visible if the stack already exists.

## Deploy

Run only after DNS control is confirmed:

```bash
node scripts/dispatch-health-domain-workflow.mjs deploy --confirm-deploy
```

Confirm:

- [ ] Typed confirmation is `health.sozorockfoundation.org`.
- [ ] CloudFormation stack reaches complete status.
- [ ] ACM certificate is issued in `us-east-1`.
- [ ] CloudFront distribution reaches deployed status.
- [ ] Route 53 `A` alias exists only for `health.sozorockfoundation.org`.
- [ ] Route 53 `AAAA` alias exists only for `health.sozorockfoundation.org`.
- [ ] No root-domain record changed.
- [ ] No `www` record changed.

## Smoke-Test

Run:

```bash
node scripts/dispatch-health-domain-workflow.mjs smoke-test
```

Confirm:

- [ ] `https://health.sozorockfoundation.org/` returns a successful response.
- [ ] `/resident` returns a successful response.
- [ ] `/county` returns a successful response.
- [ ] `/about-model` returns a successful response.
- [ ] Fallback Amplify URL still works.
- [ ] Required product language is visible.
- [ ] `No PHI. Consent-based. Non-clinical.` remains visible.
- [ ] No-index metadata remains present.

## Record Outputs

Update `docs/sozorock-health/custom-domain-dns-record.md` with:

- [ ] CloudFront distribution ID.
- [ ] CloudFront domain name.
- [ ] ACM certificate status.
- [ ] DNS provider.
- [ ] DNS record used for `health.sozorockfoundation.org`.
- [ ] HTTPS status.
- [ ] fallback URL status.
- [ ] final smoke-test decision.

## Stop Rules

Stop if activation requires:

- root-domain changes
- `www` changes
- Amplify custom-domain setup
- static AWS access keys
- app code changes
- backend, database, auth, forms, storage, notifications, email/SMS, OpenAI, Google, resident data capture, PHI workflow, clinical workflow, or unsupported partnership claims
