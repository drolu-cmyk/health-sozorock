# Backend Data Boundaries

## Boundary Standard

SozoRock Health backend foundation work must preserve:

**No PHI. Consent-based. Non-clinical.**

Issue 037 creates local types, service contracts, no-PHI validation utilities, mock services, and tests only. It does not create a live backend.

## Data Classes

| Data class | Purpose | Storage posture in Issue 037 |
| --- | --- | --- |
| Public content | General resident-facing and product guidance | Static local content only |
| Operational content | Non-clinical planning and review records | Static local examples and types only |
| Local resident interaction state | App path, local need choice, permission state, session guidance state | Local/session-only by design; no persistence added |
| Restricted data | PHI, clinical, identity, payment, insurance, and sensitive service data | Explicitly blocked |

## Allowed Fields

Public content may include:

- guidance copy
- hub information
- event information
- accessibility notes
- privacy boundary text
- emergency/crisis guidance text
- provider pathway readiness copy

Operational content may include:

- admin-managed hub records
- event status
- service availability
- county planning records
- audit logs
- content review states
- release quality states
- feature flags

Local resident interaction state may include:

- selected app path
- local need choice
- permission state
- session-only guidance state

## Restricted Fields

Restricted field names include:

- phi
- diagnosis
- symptom
- symptoms
- treatment
- medication
- medications
- prescription
- prescriptions
- insurance
- payment
- claim
- claims
- memberId
- subscriberId
- policyNumber
- ssn
- dateOfBirth
- dob
- medicalRecord
- mrn
- lab
- labs
- providerMessage
- appointment
- rawAudio
- transcript
- preciseLocation
- locationHistory
- backgroundTracking

Restricted data must not appear in content models, hub models, event models, audit events, consent state, service contracts, mock services, or future adapters unless a separate approved legal/product decision changes the boundary.

## No-PHI Rules

The shared backend foundation includes local validation utilities:

- `isRestrictedFieldName(name: string): boolean`
- `listRestrictedFieldMatches(record: unknown): string[]`
- `assertNoRestrictedFields(record: unknown): void`

These utilities check field names only. They are local validation helpers, not resident data collection tools and not a runtime backend.

## Resident Data Exclusion Rules

Issue 037 must not introduce:

- resident identity capture
- submitted forms
- saved profiles
- account creation
- follow-up communication
- raw audio storage
- transcript storage
- precise location history
- background tracking
- private health information

The resident app must remain usable with static guidance when every backend or live service is unavailable.

## County Workspace Separation Rules

County workspace models must remain separate from resident navigation and resident-facing screens.

Rules:

- County operating tools must not appear in resident navigation.
- County planning data must be synthetic, aggregate, or non-identifiable unless separately approved.
- County workspace features must remain planning support, not automated decision-making.
- Human review is required before action.
- County workspace must not imply clinical authority or government adoption without formal agreement.

## Consent Planning Rules

Consent state in Issue 037 is planning-only. No active consent storage is implemented.

Future consent is required before:

- microphone capture
- location capture
- AI-assisted guidance
- map/geospatial discovery
- saved preferences
- follow-up communication
- account creation
- telemetry or crash reporting

Consent must be capability-specific, plain-language, and optional. The app must remain usable when consent is denied.

## Stop Rules

Stop implementation if a future task requires:

- creating AWS resources
- creating Google Cloud resources
- creating Firebase resources
- live AWS SDK calls
- live Google SDK calls
- database creation
- auth implementation
- storage implementation
- submitted forms
- live AI
- live maps
- microphone capture
- location capture
- raw audio storage
- transcript storage
- resident identity capture
- PHI fields
- clinical workflow
- provider-patient messaging
- appointment scheduling
- insurance data
- payment data
- EHR integration
- secrets
- API keys
- runtime service adapters
- DNS, CloudFront, Route 53, ACM, OIDC, or infrastructure changes

