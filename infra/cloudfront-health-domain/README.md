# CloudFront Health Subdomain Automation

This folder contains the CloudFormation template for placing CloudFront in front of the existing SozoRock Health Amplify preview origin.

Target custom subdomain:

`health.sozorockfoundation.org`

Amplify fallback origin:

`https://main.d1bmgq1fk26xqh.amplifyapp.com/`

## What It Creates

The stack creates only the resources needed for the `health` subdomain:

- ACM certificate for `health.sozorockfoundation.org` in `us-east-1`
- CloudFront distribution with `health.sozorockfoundation.org` as the alternate domain name
- Route 53 `A` alias record for `health.sozorockfoundation.org`
- Route 53 `AAAA` alias record for `health.sozorockfoundation.org`

The CloudFront behavior uses the AWS managed caching-disabled policy so the review subdomain stays aligned with the Amplify preview origin.

The template does not create, update, or delete records for:

- `sozorockfoundation.org`
- `www.sozorockfoundation.org`

## Parameters

| Parameter | Default | Required | Notes |
| --- | --- | --- | --- |
| `DomainName` | `health.sozorockfoundation.org` | Yes | Locked by pattern and rule to the health subdomain only. |
| `OriginDomainName` | `main.d1bmgq1fk26xqh.amplifyapp.com` | Yes | Locked by pattern and rule to the existing Amplify fallback origin. |
| `HostedZoneId` | none | Yes | Route 53 hosted zone ID for `sozorockfoundation.org` or a delegated `health.sozorockfoundation.org` hosted zone. |

## Route 53 Automation Prerequisite

Full automation works only when one of the following is true:

- `sozorockfoundation.org` is already managed in Route 53, and the workflow uses that hosted zone ID.
- `health.sozorockfoundation.org` has been delegated to a Route 53 hosted zone, and the workflow uses the hosted zone ID for the delegated health subdomain.

If the domain is managed by an external DNS provider and the `health` subdomain has not been delegated to Route 53, the CloudFormation stack cannot complete DNS automation. In that case, the authorized domain owner must first delegate only `health.sozorockfoundation.org` to Route 53 without changing `sozorockfoundation.org` or `www.sozorockfoundation.org`.

## Deployment

Use the manual GitHub Actions workflow:

`.github/workflows/deploy-health-domain-cloudfront.yml`

Required GitHub environment:

`health-domain-production`

Required GitHub environment variables:

- `AWS_ROLE_ARN`
- `ROUTE53_HOSTED_ZONE_ID`

The workflow uses GitHub Actions OIDC. It must not use long-lived AWS access key secrets.

## Safety Controls

- The workflow is manual-only through `workflow_dispatch`.
- The workflow requires the typed confirmation `health.sozorockfoundation.org`.
- The CloudFormation template rejects any domain other than `health.sozorockfoundation.org`.
- The CloudFormation template rejects any origin other than `main.d1bmgq1fk26xqh.amplifyapp.com`.
- No delete operation is included.
- No app code changes are required.

## Local Validation

If AWS credentials are available:

```bash
aws cloudformation validate-template --template-body file://infra/cloudfront-health-domain/template.yaml --region us-east-1
```

Fallback-only smoke test while the custom domain is not active:

```bash
node scripts/smoke-test-health-domain.mjs --fallback-only
```
