# Domain Automation Bootstrap

## Purpose

Issue 031B separates the SozoRock Health custom domain work into two tracks:

1. one-time trust bootstrap requiring authorized AWS, GitHub, and DNS owner action
2. repeatable automated deployment using GitHub Actions OIDC and CloudFormation

Target custom domain:

`https://health.sozorockfoundation.org/`

Fallback origin:

`https://main.d1bmgq1fk26xqh.amplifyapp.com/`

Before deploy, choose Option A, B, or C in `docs/sozorock-health/domain-activation-options.md`.

## What Is Now Automated

After trust bootstrap is complete, an authorized operator can automate:

- CloudFormation template validation
- CloudFront distribution deployment for `health.sozorockfoundation.org`
- ACM certificate creation and DNS validation in `us-east-1`
- Route 53 `A` and `AAAA` alias records for `health.sozorockfoundation.org`
- custom-domain smoke testing
- fallback-origin smoke testing

Automation is driven through:

- `.github/workflows/deploy-health-domain-cloudfront.yml`
- `infra/cloudfront-health-domain/template.yaml`
- `scripts/dispatch-health-domain-workflow.mjs`
- `scripts/smoke-test-health-domain.mjs`

## What Cannot Be Automated Until Bootstrap Exists

The repo cannot fully automate deployment until these one-time conditions exist:

- GitHub Actions OIDC trust exists in AWS.
- GitHub environment `health-domain-production` exists.
- GitHub environment variable `AWS_ROLE_ARN` is configured.
- GitHub environment variable `ROUTE53_HOSTED_ZONE_ID` is configured.
- Route 53 controls `sozorockfoundation.org`, or only `health.sozorockfoundation.org` has been delegated to Route 53.

No static AWS access keys should be used.

## One-Time Bootstrap Steps

An authorized AWS/GitHub/DNS owner should:

1. Confirm DNS control for `health.sozorockfoundation.org`.
2. Validate `infra/github-aws-oidc-role/template.yaml`.
3. Deploy the OIDC role bootstrap stack.
4. Copy the `AwsRoleArn` output.
5. Create GitHub environment `health-domain-production`.
6. Add GitHub environment variable `AWS_ROLE_ARN`.
7. Add GitHub environment variable `ROUTE53_HOSTED_ZONE_ID`.
8. Run the domain workflow in `validate` mode.
9. Run the domain workflow in `deploy` mode.
10. Run the domain workflow in `smoke-test` mode.

## Create The AWS OIDC Role

Validate the bootstrap template:

```bash
aws cloudformation validate-template --template-body file://infra/github-aws-oidc-role/template.yaml --region us-east-1
```

Deploy it only from an authorized AWS session:

```bash
aws cloudformation deploy \
  --stack-name sozorock-health-github-oidc-role \
  --template-file infra/github-aws-oidc-role/template.yaml \
  --region us-east-1 \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides Route53HostedZoneId=<route53-hosted-zone-id>
```

If the AWS account already has a GitHub OIDC provider, pass:

```bash
ExistingGitHubOidcProviderArn=<existing-provider-arn>
```

Do not put AWS access keys in GitHub.

## Set GitHub Environment Variables

Create the GitHub environment:

`health-domain-production`

Set environment variables:

- `AWS_ROLE_ARN`
- `ROUTE53_HOSTED_ZONE_ID`

Do not store long-lived AWS access keys as GitHub secrets.

## Confirm Route 53 Or Delegated Health Subdomain Control

Full automation works only when one of the following is true:

- `sozorockfoundation.org` is already managed in Route 53, and the workflow uses that hosted zone ID.
- `health.sozorockfoundation.org` has been delegated to a Route 53 hosted zone, and the workflow uses the hosted zone ID for the delegated health subdomain.

If an external DNS provider manages the domain and `health` has not been delegated, the authorized domain owner must delegate only `health.sozorockfoundation.org` to Route 53 without changing:

- `sozorockfoundation.org`
- `www.sozorockfoundation.org`

## Run The Workflow

Validate:

```bash
node scripts/dispatch-health-domain-workflow.mjs validate
```

Deploy:

```bash
node scripts/dispatch-health-domain-workflow.mjs deploy --confirm-deploy
```

Smoke-test:

```bash
node scripts/dispatch-health-domain-workflow.mjs smoke-test
```

The deploy command refuses to run unless `--confirm-deploy` is present.

## Record Outputs After Deployment

After deployment, record these values in `custom-domain-dns-record.md`:

- CloudFront distribution ID
- CloudFront domain name
- ACM certificate status
- DNS provider
- DNS record used for `health.sozorockfoundation.org`
- HTTPS status
- fallback URL status
- final smoke-test decision

## Why Root And WWW Are Excluded

The custom domain path is limited to `health.sozorockfoundation.org` so it does not affect:

- the foundation root website
- `sozorockfoundation.org`
- `www.sozorockfoundation.org`

This keeps the health preview isolated and reversible.

## Why Amplify Custom Domains Are Not Used

The chosen path keeps Amplify as the existing preview origin and places CloudFront in front of it. This separates domain control from app hosting, supports a clearer rollback path, and keeps the fallback Amplify URL available.

## Guardrails

- No app code changes.
- No deployment from Codex.
- No DNS changes from Codex.
- No static AWS access keys.
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
