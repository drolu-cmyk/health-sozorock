# Resident Content Accessibility Audit

## Purpose

Issue 041 audits the resident app's static content, accessibility labels, navigation clarity, and resident-safe wording before any future preview or stakeholder review.

This is a static content and accessibility readiness pass only. It does not add product capability, activate live services, create backend runtime, or capture resident data.

Required boundary:

**No PHI. Consent-based. Non-clinical.**

Resident promise:

**Care for Every ZIP Code.**

Provider boundary:

**Providers keep their platforms. We help you get ready.**

Locked operating logic:

**Signal → Decision → Action → Assurance → Impact**

## Relation To Issue 040 And PR #56

Issue 040 improved fallback preview readability for the resident app.

PR #56 corrected the locked operating logic phrase so the Issue 040 documentation uses the exact arrow phrase without ASCII arrows or a trailing period.

Issue 041 builds on that work by auditing static resident copy and accessibility labels across the resident app without changing service behavior.

## Screens Audited

- Home
- Start
- Voice Access
- Health Access Day
- Hubs
- Provider-Led Pathway
- How SozoRock Health Works
- Privacy Boundary
- Accessibility
- About SozoRock Health
- menu drawer
- bottom navigation

## Resident Copy Rules

Resident copy should be:

- plain
- concise
- calm
- non-clinical
- clear about inactive services
- clear about what the resident can do next
- consistent with **No PHI. Consent-based. Non-clinical.**
- free of unsupported partnership, government, provider, or clinical claims

Preferred resident copy:

- Use guided text
- Voice Access is not active in this version
- Continue with guided text support
- Location is not active in this version
- Search by ZIP code, city, or county
- Static hub information may be shown when available

Avoid resident copy that implies:

- live speech capture
- live AI guidance
- live maps
- live location sharing
- data submission
- account creation
- appointment scheduling
- insurance processing
- provider-patient messaging
- clinical support
- emergency response beyond plain 911/988 guidance

## Accessibility Label Rules

Accessibility labels should describe the action accurately and should not imply inactive capabilities are live.

Required label posture:

- menu items name the destination and purpose
- Home actions include the destination and short purpose
- Start actions explain where Continue goes
- Voice Access actions describe guided text, not live speech capture
- Voice Access topic cards identify static guidance topics
- Hubs search remains labeled for ZIP code, city, or county
- fallback cards keep resident-facing guidance before internal preview details

Do not use labels that imply:

- microphone capture starts
- location permission is requested
- maps open
- AI guidance is live
- a form is submitted
- a resident account is created
- clinical support is provided

## Navigation Rules

Allowed resident navigation:

- Home
- Start
- Voice Access
- Health Access Day
- Hubs
- Provider-Led Pathway
- How SozoRock Health Works
- Privacy Boundary
- Accessibility
- About SozoRock Health

Resident navigation must not expose:

- County console
- County operating intelligence
- geospatial dashboard
- administrator console
- provider dashboard
- backend dashboard
- AI console
- analytics console
- PHI dashboard
- clinical workflow
- appointment workflow
- insurance workflow
- payments workflow

## No-PHI And Non-Clinical Language Rules

Resident-facing content must not imply collection or processing of:

- PHI
- symptoms
- diagnosis
- treatment
- medications
- prescriptions
- insurance
- claims
- payment
- EHR data
- resident identity records
- raw audio
- transcripts
- precise location history
- provider-patient messages
- appointment scheduling

Boundary lists may name restricted concepts only to state that they are not collected, not required, or not active.

## Inactive Services Confirmed

Voice Access:

- inactive in this version
- no microphone capture
- no raw audio storage
- no transcript storage
- guided text remains available

AI guidance:

- inactive in this version
- static access guidance remains available
- no live model call

Map discovery and location:

- inactive in this version
- ZIP code, city, and county search remain available
- no location permission prompt
- no geolocation call
- no map SDK

Hub directory:

- static/local-only in this version
- no backend request
- no unsupported partnership claim

Health Access Day:

- non-clinical event guidance only
- no appointment scheduling
- no clinical screening claim
- no emergency care claim
- no PHI collection claim

## Stop Rules

Stop future implementation if a task requires:

- backend runtime
- database
- auth
- storage
- submitted forms
- live AI
- live maps
- microphone capture
- location capture
- resident data capture
- PHI workflow
- clinical workflow
- provider-patient messaging
- appointment scheduling
- insurance data
- payment data
- EHR integration
- AWS resources
- Google Cloud resources
- Firebase resources
- Google Maps runtime
- Vertex AI runtime
- Gemini runtime
- OpenAI runtime
- secrets
- API keys
- SDK imports
- network calls
- runtime service adapters
- deployment changes

## Recommended Next Issue

Issue 042 - Static preview deployment readiness checklist
