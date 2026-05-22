# SozoRock Health Custom Domain DNS Record

Use this record only after an authorized domain owner begins the AWS Amplify custom domain setup. Do not invent DNS values. Copy record values only from Amplify during the approved setup.

## Domain Record Summary

DNS provider:

`TBD by deployment owner`

Domain owner:

`Olu Adeyemo / authorized domain owner`

Amplify app name:

`TBD by deployment owner`

AWS region:

`us-east-1`

Target subdomain:

`health.sozorockfoundation.org`

Amplify default URL:

`https://main.d1bmgq1fk26xqh.amplifyapp.com/`

Branch mapping:

`main`

## DNS Records Provided By Amplify

Leave these values blank until Amplify provides the exact records during the authorized custom domain setup.

| Record type | Host/name | Value/target | Status | Date added | Validation result | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `TBD from Amplify` | `TBD from Amplify` | `TBD from Amplify` | Not added | `YYYY-MM-DD, 2026 or later` | Not validated | Placeholder only. |
| `TBD from Amplify` | `TBD from Amplify` | `TBD from Amplify` | Not added | `YYYY-MM-DD, 2026 or later` | Not validated | Placeholder only. |
| `TBD from Amplify` | `TBD from Amplify` | `TBD from Amplify` | Not added | `YYYY-MM-DD, 2026 or later` | Not validated | Placeholder only. |

## Validation Log

Use this section after DNS records are added by the authorized domain owner.

| Check | Status | Notes |
| --- | --- | --- |
| DNS records saved in provider account | Not started | No DNS configuration has been performed in this issue. |
| Amplify domain validation | Not started | Waiting for authorized setup. |
| HTTPS loads at target subdomain | Not started | Waiting for authorized setup. |
| Amplify fallback URL still loads | Not started | Keep fallback available for rollback. |
| No-index preview metadata confirmed | Not started | Confirm after activation. |
| Manual smoke test completed | Not started | Follow `manual-preview-smoke-test.md`. |

## Final Smoke-Test Decision

Decision:

`Pending custom domain activation and smoke test`

Decision options:

- Approved for internal review on custom domain
- Hold pending DNS or smoke-test fixes
- Continue using Amplify fallback URL
- Do not share custom domain

## Notes

- No DNS records were configured as part of this documentation issue.
- No Amplify settings were changed.
- No AWS resources were created.
- No secrets or environment variables were added.
- No app routes or UI were changed.
- The trust boundary remains: No PHI. Consent-based. Non-clinical.
