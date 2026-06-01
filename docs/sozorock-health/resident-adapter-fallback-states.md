# Resident Adapter Fallback States

## Purpose

Issue 039 connects the resident app to the consent-gated adapter shell fallback states created in Issue 038.

This is a resident-facing display layer only. It does not activate live services, create backend runtime, add SDK imports, call networks, add secrets, or capture resident data.

Required boundary:

**No PHI. Consent-based. Non-clinical.**

Resident promise:

**Care for Every ZIP Code.**

Provider boundary:

**Providers keep their platforms. We help you get ready.**

Operating logic:

**Signal → Decision → Action → Assurance → Impact**

## Relation To Issue 038

Issue 038 added:

- consent gate models
- adapter readiness states
- provider-neutral adapter shell interfaces
- unavailable/fallback adapter implementations
- tests proving no live services

Issue 039 imports those local fallback objects into the resident app and shows calm resident-safe unavailable states.

## Screens Updated

- Start screen
- Voice Access screen
- Hubs screen

The resident menu remains unchanged and does not expose county operating tools.

## Fallback States Shown

Voice Access:

- Voice Access is not active in this version.
- Residents can continue with guided text support.
- The app shows no microphone capture, no raw audio storage, and no transcript storage.

AI guidance:

- AI guidance is not active in this version.
- Residents can continue with static access guidance.
- No live AI model is called.

Map discovery:

- Map discovery is not active in this version.
- Residents can search by ZIP code, city, county, or listed hub information.
- No map SDK, geolocation call, or location permission request is activated.

Hub directory:

- Live hub directory services are not active.
- Static hub information may be shown when available.
- No backend request is made.

Geospatial planning:

- Planning tools are not active in the resident app.
- Resident support remains limited to non-clinical access guidance.
- County operating tools are not exposed in resident navigation.

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

The app may display readiness labels such as:

- unavailable
- consent required before future use
- server-side adapter required before future use
- credentials not configured
- live runtime disabled

These labels are read-only. Issue 039 does not create active consent storage, consent forms, cookies, local storage, backend storage, or resident identity records.

## Resident-Safe Language

Use concise, calm copy:

- not active in this version
- continue with guided text support
- static access guidance
- No PHI. Consent-based. Non-clinical.

Do not use:

- medical advice
- AI doctor
- clinical assistant
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

Issue 040 - Internal preview quality pass for resident app fallback experience
