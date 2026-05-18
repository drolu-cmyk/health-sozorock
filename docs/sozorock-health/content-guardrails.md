# SozoRock Health Content Guardrails

## Primary rule

SozoRock Health is non-clinical.

Every screen, prompt, data object, workflow, and deployment must preserve this boundary:

**No PHI. Consent-based. Non-clinical.**

## Required language

Use:

- Care for Every ZIP Code.
- Voice Access
- Health Access Day
- Health Equity Hubs
- Provider-Led Pathways
- County-Based Community Access Platform
- Digital Access Guides
- Community Access Team
- Access Workforce
- Geospatial Access Operating Picture
- AI Decision Support
- Action Queue
- Assurance Log
- Scenario Planning
- Providers keep their platforms. We help you get ready.
- Signal → Decision → Action → Assurance → Impact

## Forbidden or restricted language

Do not use:

- Sozo as the assistant name
- privacy-minimal
- non-critical
- care navigator as the primary role
- patient management
- clinical triage
- diagnosis
- treatment recommendation
- prescribe
- therapy plan
- medical advice
- patient record
- medical record
- clinical notes
- health record collection
- provider-patient relationship
- emergency triage
- insurer workflow
- guaranteed outcome

## Partnership and endorsement guardrails

Do not imply formal relationships unless documented.

Avoid:

- partner county
- partner library
- official provider partner
- endorsed by
- approved by
- in partnership with

Use safer language where appropriate:

- potential access site
- community access point
- public resource
- provider-led pathway
- participating provider only if formal participation is documented
- local resource signal
- community input
- access site intake

## Health Access Day guardrails

Health Access Day may include:

- health education
- digital readiness support
- access support
- trusted engagement
- non-clinical resource awareness
- event registration
- access barrier discovery

Health Access Day must not imply:

- clinical care by SozoRock Health
- diagnosis
- treatment
- screening unless delivered independently by licensed organizations under their own authority
- prescription services
- medical advice

## Voice Access guardrails

Voice Access may:

- answer non-clinical questions
- explain SozoRock Health
- help residents find Health Access Day events
- help residents find Health Equity Hubs
- explain provider-led pathways
- support digital readiness
- summarize next steps

Voice Access must not:

- diagnose
- triage symptoms
- recommend treatment
- recommend medication
- provide emergency advice beyond generic emergency redirection
- collect PHI

Suggested boundary line:

**Voice Access provides non-clinical support and does not give medical advice.**

## Data collection guardrails

Allowed prototype data:

- first name
- ZIP code
- optional phone or email
- consent checkbox
- event interest
- hub interest
- digital readiness category
- support category
- follow-up permission

Disallowed data:

- diagnosis
- symptoms
- medication
- treatment history
- insurance information
- medical record number
- clinical notes
- provider-patient records
- protected health information

## Date guardrail

All mock dates must be 2026 or later.

Do not use 2025.

## AI guardrail

AI recommendations must be operational only.

Allowed:

- Schedule Health Access Day in a priority ZIP code.
- Add digital access support to a hub.
- Review readiness barrier trend.
- Prepare county access report.
- Run assurance review.

Not allowed:

- patient should seek treatment X
- person likely has condition X
- recommend medication X
- triage clinical urgency
- interpret symptoms

## Assurance language

Use the assurance badge:

**No PHI. Consent-based. Non-clinical.**

Required assurance checks:

- Consent captured.
- No protected health information collected.
- Non-clinical boundary reviewed.
- Provider responsibility confirmed.
- Human review completed.
- Data source verified.
- Report generated with controls.

## Emergency boundary

If emergency language appears in resident-facing UI, keep it generic:

**If this is an emergency, call 911 or your local emergency number. SozoRock Health does not provide emergency, clinical, or medical advice services.**

Do not create emergency triage workflows.

## Output review checklist

Before any PR is submitted, verify:

- No PHI language appears.
- No clinical workflow appears.
- No medical advice appears.
- No “Sozo” assistant appears.
- No 2025 dates appear.
- No “privacy-minimal” label appears.
- No unsupported partnership claims appear.
- Provider-led pathways use approved language.
- Voice Access remains non-clinical.
- The assurance badge is visible in the county layer.
