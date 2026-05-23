# SozoRock Health Custom Domain DNS Record

Use this record for the CloudFront custom subdomain automation. Do not use Amplify custom-domain setup. Do not invent DNS values. Record only values produced by the approved CloudFormation stack.

## Domain Record Summary

DNS provider:

`TBD by deployment owner`

Domain owner:

`Olu Adeyemo / authorized domain owner`

CloudFront distribution ID:

`TBD from CloudFormation output`

CloudFront domain name:

`TBD from CloudFormation output`

ACM certificate status:

`TBD from AWS after deployment`

AWS region:

`us-east-1`

Target subdomain:

`health.sozorockfoundation.org`

Amplify origin/fallback URL:

`https://main.d1bmgq1fk26xqh.amplifyapp.com/`

Branch mapping:

`main`

Chosen custom-domain path:

CloudFront distribution in front of the existing Amplify origin. Amplify custom-domain setup is not used.

## DNS Records Managed By CloudFormation

Leave deployment values blank until the CloudFormation stack creates or reports the exact records.

| Record type | Host/name | Value/target | Status | Date added | Validation result | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| A alias | `health.sozorockfoundation.org` | `TBD CloudFront domain name` | Not deployed | `YYYY-MM-DD, 2026 or later` | Not validated | Must point only to the CloudFront distribution. |
| AAAA alias | `health.sozorockfoundation.org` | `TBD CloudFront domain name` | Not deployed | `YYYY-MM-DD, 2026 or later` | Not validated | Created because IPv6 is enabled. |
| ACM DNS validation | `TBD health-subdomain validation record` | `TBD ACM validation target` | Not deployed | `YYYY-MM-DD, 2026 or later` | Not validated | Created only for certificate validation of `health.sozorockfoundation.org`. |

## Validation Log

Use this section after DNS records are added by the authorized domain owner.

| Check | Status | Notes |
| --- | --- | --- |
| CloudFormation stack deployed | Not started | Stack name: `sozorock-health-cloudfront-domain`. |
| CloudFront distribution deployed | Not started | Waiting for authorized workflow run. |
| ACM certificate issued | Not started | Certificate must be in `us-east-1`. |
| Route 53 health subdomain records created | Not started | Only `health.sozorockfoundation.org` is in scope. |
| HTTPS loads at target subdomain | Not started | Waiting for authorized setup. |
| Amplify fallback URL still loads | Not started | Keep fallback available for rollback. |
| No-index preview metadata confirmed | Not started | Confirm after activation. |
| Automated smoke test completed | Not started | Run `scripts/smoke-test-health-domain.mjs`. |

## Final Smoke-Test Decision

Decision:

`Pending CloudFront deployment and smoke test`

Decision options:

- Approved for internal review on custom domain
- Hold pending CloudFront, DNS, or smoke-test fixes
- Continue using Amplify fallback URL
- Do not share custom domain

## Notes

- No DNS records were configured as part of this documentation issue.
- No Amplify settings were changed.
- The planned AWS resources are CloudFront, ACM, and Route 53 records for the `health` subdomain only.
- No secrets or environment variables were added.
- No app routes or UI were changed.
- Root and `www` domain records are excluded.
- The trust boundary remains: No PHI. Consent-based. Non-clinical.
