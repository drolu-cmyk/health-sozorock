# Backend Architecture Decision Record

## Context

SozoRock Health is currently a static preview prototype with an active internal preview domain:

`https://health.sozorockfoundation.org/`

Fallback preview URL:

`https://main.d1bmgq1fk26xqh.amplifyapp.com/`

The CloudFront custom domain activation is complete, and Issue #42 records the deployment outputs and smoke-test result. The current product surface remains static, non-clinical, and preview-oriented.

## Decision Status

Proposed, not implemented.

This record describes a future backend direction for pilot readiness. It does not create backend services, API routes, databases, authentication, forms, storage, notifications, email/SMS, OpenAI runtime calls, Google runtime calls, resident data capture, PHI workflow, clinical workflow, payment, insurance data, or EHR integration.

## Current Domain State

- Active internal preview domain: `https://health.sozorockfoundation.org/`
- Fallback preview URL: `https://main.d1bmgq1fk26xqh.amplifyapp.com/`
- Current runtime: static preview UI
- Current data model: static/mock content only
- Current resident data posture: no resident intake and no resident data capture
- Current clinical posture: non-clinical planning support only

## Backend Purpose

A future backend may support controlled pilot operations by storing non-clinical configuration, reviewer records, scenario metadata, readiness status, and audit events.

The backend should make operational governance easier without changing the product boundary:

`No PHI. Consent-based. Non-clinical.`

The backend should support:

- clearer preview-to-pilot readiness
- controlled updates to non-clinical program metadata
- reviewer feedback management
- auditability of system actions
- repeatable county operating intelligence reviews
- human review before any operational action

## What Backend May Support Later

Allowed future backend categories:

- static content configuration
- scenario catalog
- reviewer feedback management
- operational readiness checklist
- non-clinical program metadata
- audit/event logs for system actions
- synthetic/mock access signal records

These categories remain future-only until separately approved and implemented through a dedicated issue.

## What Backend Must Not Support Now

The backend must not support the following in the current phase:

- resident intake
- PHI
- clinical triage
- diagnosis
- treatment
- prescription
- provider-patient messaging
- appointment scheduling
- notifications to residents
- payment
- insurance data
- EHR integration
- live AI decisioning
- automated county actions

## Non-Clinical Data Boundary

The future backend must stay inside the non-clinical operating boundary. It may store program operations data, review metadata, mock/synthetic access signals, and system audit events.

It must not store or process clinical, treatment, insurance, payment, or provider-patient data.

If a future feature requires resident-level data, clinical context, PHI, or external integrations, that feature requires a separate architecture review, privacy review, security review, and explicit approval before implementation.

## Allowed Future Data Categories

Future backend work may include:

| Category | Example | Boundary |
| --- | --- | --- |
| Static content configuration | Approved preview copy, labels, module text | Non-clinical only |
| Scenario catalog | Mock scenario names and assumptions | Planning support only |
| Reviewer feedback management | Reviewer comments and disposition status | No resident data |
| Operational readiness checklist | Launch readiness status and owner | Internal operations only |
| Non-clinical program metadata | County name, program phase, review owner | No PHI |
| Audit/event logs | System action, timestamp, actor role | No clinical event logging |
| Synthetic/mock access signals | Mock access-gap indicators | Not real resident data |

## Prohibited Data Categories

Do not store, process, transmit, or infer:

- resident intake
- PHI
- clinical triage
- diagnosis
- treatment
- prescription
- provider-patient messaging
- appointment scheduling
- resident notifications
- payment
- insurance data
- EHR data
- live AI decisioning output
- automated county action records

## Consent Posture

The current preview does not collect resident data and therefore does not create a resident consent workflow.

If future pilot work introduces any consent-dependent workflow, consent must be:

- explicit
- scoped
- recorded only after separate approval
- non-clinical unless a future approved architecture changes that boundary
- never treated as permission to collect PHI in this phase

## Human Review Requirement

Human review remains mandatory before action.

Required operating language remains:

- `Human review required before action.`
- `Planning support, not automated decision-making.`
- `Signal → Decision → Action → Assurance → Impact`

The backend must not automate county actions or replace human review.

## Audit And Event Logging Expectations

Future audit/event logging may record:

- system action type
- timestamp
- actor role
- affected module
- review state
- outcome status
- non-clinical metadata reference

Audit/event logging must not record PHI, clinical facts, resident intake, provider-patient messages, payment data, insurance data, or EHR data.

## Security Assumptions

Future backend work should assume:

- least-privilege IAM
- GitHub Actions OIDC instead of static AWS access keys
- environment-scoped configuration
- no secrets committed to the repository
- encryption at rest where data is stored
- TLS in transit
- structured audit logging
- separate preview, pilot, and production gates
- no public write surfaces without explicit approval
- no resident data capture without separate approval

## AWS Service Candidates

Candidate services for future evaluation:

- Amazon API Gateway for controlled API entry points
- AWS Lambda for small serverless handlers
- Amazon DynamoDB for non-clinical operational metadata
- Amazon CloudWatch for operational logs and metrics
- AWS CloudTrail for account-level audit visibility
- AWS WAF for public endpoint protection if APIs are added
- AWS Secrets Manager for approved runtime secrets if future services require them
- Amazon S3 for approved static configuration artifacts if needed

These are candidates only. No service is implemented by this ADR.

## Options Considered

### Option 1: Keep Static Preview Only

Benefits:

- lowest risk
- no backend cost
- no data collection
- strongest guardrail posture

Tradeoff:

- reviewer feedback, scenario catalog, and readiness tracking remain manual.

### Option 2: Minimal Serverless Backend For Non-Clinical Pilot Metadata

Benefits:

- supports controlled pilot readiness
- allows reviewer feedback and readiness state
- can keep data categories narrow
- aligns with the existing AWS preview path

Tradeoff:

- requires new security, cost, deployment, and governance gates.

### Option 3: Full Operational Backend

Benefits:

- could support broader long-term workflows.

Tradeoff:

- too much scope for the current phase
- higher cost and risk
- likely to pressure prohibited categories such as resident intake, notifications, clinical workflow, or live decisioning

## Recommended Phased Direction

Recommended direction: Option 2, phased carefully.

Phase 0: static preview remains current state.

Phase 1: define backend contracts only for non-clinical pilot metadata, reviewer feedback, scenario catalog, readiness checklist, and audit/event logs.

Phase 2: implement a minimal serverless backend only after separate approval, cost gates, deployment gates, and data-boundary review.

Phase 3: evaluate any expansion only after pilot governance confirms that prohibited categories remain out of scope or receive separate approval.

## Cost Gates

Do not implement backend services until these cost gates are approved:

- monthly preview/pilot budget owner identified
- expected API usage estimate documented
- expected storage volume documented
- logging retention period documented
- cost alarm plan documented
- teardown/rollback plan documented
- paid-service activation approved

## Deployment Gates

Do not deploy backend services until:

- data boundary is approved
- IAM design is reviewed
- environment variables and secrets plan is reviewed
- no static AWS keys are used
- preview/staging deployment path is approved
- rollback path is documented
- smoke-test plan is documented
- guardrail scan passes
- human review workflow remains visible

## Stop Rules

Stop backend work immediately if implementation requires:

- resident intake
- PHI
- clinical triage
- diagnosis
- treatment
- prescription
- provider-patient messaging
- appointment scheduling
- notifications to residents
- payment
- insurance data
- EHR integration
- live AI decisioning
- automated county actions
- backend services without cost approval
- secrets committed to the repository
- static AWS access keys

## Open Questions

- Who owns pilot backend budget approval?
- Which reviewer roles need feedback management first?
- What audit/event retention period is appropriate for pilot readiness?
- Should scenario catalog updates be file-based, admin-reviewed, or API-driven in a later phase?
- What minimum access model is needed for internal reviewers?
- What evidence should be required before moving from mock signals to any real operational signals?
- What approval body decides whether any resident-facing data workflow can be considered later?
