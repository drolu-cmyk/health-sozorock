# GitHub AWS OIDC Role Bootstrap

This folder contains the one-time AWS trust bootstrap for the SozoRock Health custom domain automation.

The repeatable deployment workflow uses:

- GitHub Actions OIDC
- CloudFormation
- CloudFront
- ACM in `us-east-1`
- Route 53 records limited to `health.sozorockfoundation.org`

It does not use static AWS access keys.

## What This Bootstrap Creates

The template creates or references:

- GitHub Actions OIDC provider for `token.actions.githubusercontent.com`
- IAM role named `sozorock-health-domain-automation`
- trust policy limited to `repo:drolu-cmyk/health-sozorock:environment:health-domain-production`
- least-privilege inline policy for the CloudFront health subdomain stack

The role is intended to be stored in GitHub as:

`AWS_ROLE_ARN`

on the GitHub environment:

`health-domain-production`

## Parameters

| Parameter | Default | Notes |
| --- | --- | --- |
| `GitHubRepository` | `drolu-cmyk/health-sozorock` | Locked to this repository. |
| `GitHubEnvironment` | `health-domain-production` | Locked to the domain deployment environment. |
| `ExistingGitHubOidcProviderArn` | empty | Leave empty to create the provider, or pass the existing provider ARN. |
| `Route53HostedZoneId` | none | Hosted zone for `sozorockfoundation.org` or delegated `health.sozorockfoundation.org`. |

## Required One-Time Owner Actions

An authorized AWS/GitHub/DNS owner must:

1. Confirm Route 53 controls `sozorockfoundation.org`, or delegate only `health.sozorockfoundation.org` to a Route 53 hosted zone.
2. Deploy this bootstrap stack in AWS.
3. Copy the `AwsRoleArn` output.
4. Create the GitHub environment `health-domain-production`.
5. Add `AWS_ROLE_ARN` as a GitHub environment variable.
6. Add `ROUTE53_HOSTED_ZONE_ID` as a GitHub environment variable.

After these one-time steps, the repeatable workflow can run validate, deploy, and smoke-test.

## Validation

Validate the template without creating resources:

```bash
aws cloudformation validate-template --template-body file://infra/github-aws-oidc-role/template.yaml --region us-east-1
```

## Guardrails

- No static AWS access keys.
- No app runtime permissions.
- No backend permissions.
- No database permissions.
- No storage permissions.
- No authentication service permissions.
- No OpenAI permissions.
- No Google permissions.
- No PHI workflow permissions.
- No clinical workflow permissions.
- No root-domain record changes.
- No `www` record changes.
