# Resident Fallback Preview Quality

## Purpose

Issue 040 reviews the resident app fallback experience after Issue 039 connected the app to consent-gated adapter shell fallback states.

This is an internal preview quality pass only. It improves copy hierarchy, readability, status organization, and resident-safe labels without activating live services.

Required boundary:

**No PHI. Consent-based. Non-clinical.**

Resident promise:

**Care for Every ZIP Code.**

Provider boundary:

**Providers keep their platforms. We help you get ready.**

Operating logic:

**Signal → Decision → Action → Assurance → Impact**

## Relation To Issue 039 And PR #54

Issue 039 made unavailable adapter shell states visible in the resident app.

PR #54 corrected two review-state issues:

- credential copy now follows `fallback.readiness.requiresCredentials`
- inactive location behavior now uses a neutral unavailable state instead of permission denial

Issue 040 keeps those fixes and improves the resident preview presentation around them.

## Screens Reviewed

- Start
- Voice Access
- Hubs

The resident menu and bottom tabs remain unchanged. County operating tools, backend labels, infrastructure labels, and administrative labels remain excluded from resident navigation.

## Copy Changes

Fallback cards now present information in this order:

- feature name
- short unavailable status
- what residents can do now
- privacy and non-clinical boundary
- preview details for internal readiness review

Resident-facing copy favors calm phrases:

- not active in this version
- guided text support
- static access guidance
- live services disabled
- No PHI. Consent-based. Non-clinical.

Voice Access uses guided text language instead of presenting a live speech action.

Location fallback copy remains neutral:

**Location is not active in this version. You can search by ZIP code, city, or county.**

## Layout And Readability Changes

The fallback cards separate resident-facing guidance from internal preview details.

Resident-facing guidance is shown first. Details such as readiness status, future consent, server-side adapters, credential readiness, and live runtime status are grouped under a small Preview details section.

This keeps the preview useful for internal review while avoiding a broken or overly technical resident experience.

## Fallback States Confirmed

Voice Access:

- not active in this version
- guided text support remains available
- no microphone capture
- no raw audio storage
- no transcript storage

AI guidance:

- not active in this version
- static access guidance remains available
- no live model call

Map discovery:

- not active in this version
- ZIP code, city, county, and listed hub information remain fallback paths
- no map SDK
- no geolocation call

Hub directory:

- live hub directory services are not active
- static hub information may be shown when available
- no backend request
- no inaccurate credential-required copy for documentation-only fallback states

Geospatial planning:

- not exposed as a county operating tool in resident navigation
- resident-facing copy remains non-operational and non-clinical

## What Remains Inactive

- live Gemini runtime
- live Vertex AI runtime
- live OpenAI runtime
- live Google Maps runtime
- microphone capture
- location capture
- backend runtime
- database
- auth
- storage
- submitted forms
- resident data capture
- PHI workflow
- clinical workflow
- provider-patient messaging
- appointment scheduling
- insurance data
- payment data
- EHR integration
- SDK imports
- network calls
- secrets
- API keys

## Consent And Readiness Posture

Consent and readiness information remains read-only.

Issue 040 does not add:

- active consent storage
- consent forms
- cookies
- local storage
- backend storage
- resident identity records
- permission prompts
- live microphone capture
- live location capture

## Resident-Safe Language Rules

Use:

- Voice Access
- guided text support
- static access guidance
- not active in this version
- live services disabled

Do not use:

- AI doctor
- clinical assistant
- medical advice
- diagnosis
- treatment recommendation
- emergency response
- provider-patient messaging
- appointment scheduling
- insurance processing
- Sozo as an assistant name

## Stop Rules

Stop future implementation if a task requires:

- live AI
- live maps
- microphone capture
- location capture
- raw audio handling
- transcript handling
- precise location history
- resident identity capture
- PHI fields
- clinical workflow
- provider-patient messaging
- appointment scheduling
- insurance data
- payment data
- EHR integration
- client-side secrets
- unrestricted API keys
- SDK imports
- network calls
- backend runtime activation
- cloud resources without approval

## Recommended Next Issue

Issue 041 - Static resident content readiness and accessibility audit
