# Static Preview Deployment Readiness Checklist

## Purpose

Issue 042 creates the final static preview deployment readiness checklist for the resident app before any internal or stakeholder preview.

This is a documentation and verification checklist only. It does not deploy the app, activate live services, create backend runtime, change infrastructure, or capture resident data.

Required boundary:

**No PHI. Consent-based. Non-clinical.**

Resident promise:

**Care for Every ZIP Code.**

Provider boundary:

**Providers keep their platforms. We help you get ready.**

Locked operating logic:

**Signal → Decision → Action → Assurance → Impact**

## Relation To Issue 041

Issue 041 audited static resident content, accessibility labels, resident navigation clarity, inactive-service wording, and non-clinical guardrails.

Issue 042 converts that readiness work into a static preview checklist so a reviewer can decide whether the resident app is ready for a controlled preview without approving deployment, live services, backend runtime, or infrastructure changes.

## Current Preview Posture

The resident app preview is static and frontend-only.

Current posture:

- resident screens are available for review
- resident navigation is resident-safe
- fallback preview states are visible
- Voice Access is inactive
- AI guidance is static/inactive
- map discovery is inactive
- location is inactive
- hub information is static/local-only
- no county operating console is visible in resident navigation
- no backend runtime is active
- no resident data capture exists
- no PHI workflow exists
- no clinical workflow exists

## Ready For Static Preview

Static preview may proceed only when all of the following are true:

- **No PHI. Consent-based. Non-clinical.** appears correctly.
- **Care for Every ZIP Code.** appears correctly.
- **Providers keep their platforms. We help you get ready.** appears correctly.
- **Signal → Decision → Action → Assurance → Impact** appears exactly if referenced.
- Voice Access is inactive.
- AI guidance is static/inactive.
- Map discovery is inactive.
- Location is inactive.
- Hub information is static/local-only.
- No county operating console is visible in resident navigation.
- No backend runtime is active.
- No network calls are introduced.
- No SDK imports are introduced.
- No secrets or API keys are introduced.
- No resident data capture exists.
- No PHI or clinical workflow exists.

## Not Active

The static preview does not activate:

- backend runtime
- database
- auth
- storage
- submitted forms
- live AI
- live maps
- microphone capture
- location capture
- geospatial runtime
- resident data capture
- PHI workflow
- clinical workflow
- provider-patient messaging
- appointment scheduling
- insurance processing
- payment processing
- EHR integration
- cloud resources
- SDK runtime adapters

## Required Pre-Preview Checks

Before a preview is shared, confirm:

- the branch or build being reviewed is the intended checkpoint
- local verification passed
- manual browser QA passed
- resident navigation was reviewed
- resident copy was reviewed for plain language
- accessibility labels were reviewed
- emergency and crisis guidance remains plain and limited
- no preview reviewer is told the app is live
- no stakeholder is told live services are enabled
- no unsupported partnership, county, provider, or government claim is present

## Resident App Checklist

Confirm the resident app:

- opens to the resident-safe experience
- keeps **Care for Every ZIP Code.** visible
- keeps **No PHI. Consent-based. Non-clinical.** visible where expected
- uses **Voice Access** as the feature name
- avoids using "Sozo" as an assistant or shorthand feature name
- keeps the top app bar and resident menu clear
- keeps bottom navigation limited to resident screens
- does not expose county operating tools
- does not expose backend, infrastructure, model, queue, assurance log, or synthetic signal tools

## Content Checklist

Confirm resident content:

- uses plain language
- describes inactive features honestly
- avoids live launch language
- avoids clinical claims
- avoids emergency response claims beyond plain 911/988 guidance
- avoids appointment scheduling claims
- avoids insurance processing claims
- avoids provider-patient messaging claims
- avoids unsupported provider, county, government, or partnership claims
- keeps provider boundary language accurate
- keeps fallback behavior understandable

## Accessibility Checklist

Confirm:

- menu controls have meaningful labels
- action controls explain the destination or resident action
- Voice Access controls do not imply microphone capture
- location controls do not imply an OS permission prompt
- fallback preview cards are readable on mobile
- key text remains visible on desktop preview
- disabled or inactive services are described without sounding broken
- internal preview details do not obscure resident-facing guidance

## No-PHI Checklist

Confirm the preview does not collect or request:

- PHI
- symptoms
- diagnosis
- treatment
- medications
- prescriptions
- insurance information
- payment information
- claims information
- EHR information
- resident identity records
- raw audio
- transcripts
- precise location history
- provider-patient messages
- appointment requests

## Non-Clinical Checklist

Confirm the preview does not claim to provide:

- diagnosis
- treatment
- triage
- medication advice
- clinical decision support
- emergency response
- medical device functionality
- provider-patient messaging
- appointment scheduling
- insurance processing
- care coordination on behalf of a provider

## Inactive Service Checklist

Confirm:

- Voice Access is inactive and guided text remains available.
- No microphone capture is active.
- No raw audio is stored.
- No transcripts are stored.
- AI guidance is static/inactive.
- No live model is called.
- Map discovery is inactive.
- No maps SDK is imported.
- Location is inactive.
- No geolocation call is made.
- Hub information is static/local-only.
- No backend request is made for hub information.
- Geospatial planning is not exposed as a resident operating tool.

## Browser QA Checklist

Review the resident app in a local browser preview before any static preview share.

Check:

- Home renders.
- Start renders.
- Voice Access renders.
- Health Access Day renders.
- Hubs renders.
- Provider-Led Pathway renders.
- How SozoRock Health Works renders.
- Privacy Boundary renders.
- Accessibility renders.
- About SozoRock Health renders.
- menu drawer opens and closes.
- bottom navigation works.
- fallback preview cards are visible.
- mobile viewport remains readable.
- desktop browser preview remains readable.
- no page-level horizontal overflow appears.
- no console errors appear.
- no broken navigation appears.
- no county console is exposed.
- no live service behavior appears.

## Rollback And Checkpoint Notes

Before sharing a static preview:

- record the commit SHA being reviewed
- record the PR or branch name if applicable
- keep a link to the previous accepted preview checkpoint
- stop preview sharing if the reviewed build does not match the approved checkpoint
- rollback by returning reviewers to the last approved checkpoint, not by hot-fixing live behavior

Rollback does not require infrastructure changes because this issue does not deploy or configure infrastructure.

## Stakeholder Preview Notes

Use this language when presenting the preview:

- "This is a static resident app preview."
- "Live services are disabled."
- "No PHI is collected."
- "The app demonstrates resident-facing access guidance and fallback behavior only."
- "The preview is not a clinical tool, emergency tool, insurance tool, appointment tool, or provider messaging tool."

Avoid:

- live launch language
- clinical claims
- partnership claims
- county implementation claims
- provider network claims
- AI capability claims
- maps/location capability claims
- appointment or insurance claims

## Stop Rules

Stop preview preparation if any step requires:

- deployment execution
- deployment credentials
- cloud configuration
- infrastructure changes
- backend runtime
- database
- auth
- storage
- forms
- live AI
- live maps
- microphone capture
- location capture
- resident data capture
- PHI workflow
- clinical workflow
- provider-patient messaging
- appointment scheduling
- insurance processing
- payment processing
- EHR integration
- secrets
- API keys
- SDK imports
- network calls
- runtime service adapters

## Recommended Next Issue

Issue 043 - Static preview stakeholder review packet
