# Backend Data Boundary

## Purpose

This document defines the data boundary for any future SozoRock Health backend work.

Current status:

- backend not implemented
- no resident intake
- no resident data capture
- no PHI workflow
- no clinical workflow
- active internal preview domain: `https://health.sozorockfoundation.org/`
- fallback URL: `https://main.d1bmgq1fk26xqh.amplifyapp.com/`

## Boundary Statement

SozoRock Health remains:

`No PHI. Consent-based. Non-clinical.`

Future backend work may support non-clinical program operations only. It must not create a resident intake, clinical, payment, insurance, provider-patient, or EHR workflow.

## Current Runtime Boundary

The current preview uses static/mock content. It does not include:

- backend
- API routes
- database
- auth
- forms
- storage
- notifications
- email/SMS
- OpenAI runtime calls
- Google runtime calls
- resident data capture
- PHI workflow
- clinical workflow
- payment
- insurance data
- EHR integration

## Allowed Future Data

Allowed future backend data categories require separate implementation approval.

| Category | Allowed content | Not allowed |
| --- | --- | --- |
| Static content configuration | Approved UI copy and module labels | Resident data or clinical text |
| Scenario catalog | Scenario title, assumptions, review status | Real resident records |
| Reviewer feedback management | Reviewer role, comment, category, status | PHI or provider-patient content |
| Operational readiness checklist | Owner, status, evidence link, decision | Resident intake |
| Non-clinical program metadata | County, module, phase, review owner | Diagnosis, treatment, prescription |
| Audit/event logs | System action, actor role, timestamp | Clinical event logs |
| Synthetic/mock access signals | Mock index values and simulated conditions | Real resident access records |

## Prohibited Data

The following categories are prohibited until separately approved:

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

## Consent Boundary

The current preview has no resident consent workflow because it does not collect resident data.

Any future consent workflow must be separately approved and must define:

- what is being collected
- who can see it
- why it is needed
- how long it is retained
- how it is removed
- what action remains subject to human review

Consent must not be used to introduce PHI or clinical workflows in the current backend phase.

## Human Review Boundary

Human review remains required before action.

Backend data may support review visibility, but it must not:

- auto-approve actions
- trigger resident notifications
- schedule appointments
- recommend clinical care
- route provider-patient messages
- initiate county actions without human review

Required language remains:

- `Human review required before action.`
- `Planning support, not automated decision-making.`

## Audit/Event Boundary

Allowed audit/event logs may include:

- actor role
- system action
- module name
- review state
- timestamp
- outcome status
- synthetic or non-clinical reference ID

Audit/event logs must not include:

- resident identifiers
- PHI
- clinical facts
- provider-patient messages
- payment details
- insurance details
- EHR data

## Integration Boundary

Future backend work must not add runtime integrations without separate approval:

- OpenAI
- Google
- live maps
- EHR systems
- payment processors
- insurance systems
- email/SMS providers
- resident notification services

## Storage Boundary

No storage service is implemented now.

Future storage must be limited to approved non-clinical categories and must include:

- least-privilege access
- retention plan
- deletion plan
- audit logging
- cost owner
- rollback path

## Review Checklist

Before any backend issue moves from proposal to implementation, confirm:

- [ ] Data category is allowed.
- [ ] Data category is non-clinical.
- [ ] No resident intake is introduced.
- [ ] No PHI is introduced.
- [ ] No clinical workflow is introduced.
- [ ] No payment, insurance, or EHR workflow is introduced.
- [ ] Human review remains required.
- [ ] Cost gates are approved.
- [ ] Deployment gates are approved.
- [ ] Rollback path is documented.
- [ ] Guardrails pass.

## Stop Rules

Stop immediately if proposed backend work requires:

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
- EHR integration
- live AI decisioning
- automated county actions
