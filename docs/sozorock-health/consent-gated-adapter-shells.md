# Consent-Gated Adapter Shells

## Purpose

Issue 038 adds consent-gated adapter shells for future Voice Access, AI guidance, map discovery, hub directory, and geospatial planning services.

This issue prepares boundaries only. It does not activate live services, create cloud resources, add SDKs, configure credentials, capture resident data, or create a backend runtime.

Required product boundary:

**No PHI. Consent-based. Non-clinical.**

Resident promise:

**Care for Every ZIP Code.**

Provider boundary:

**Providers keep their platforms. We help you get ready.**

Operating logic:

**Signal → Decision → Action → Assurance → Impact**

## Relation To ADR-035

ADR-035 recommends:

- AWS as the future primary backend, governance, audit, infrastructure-as-code, and system-of-record layer.
- Google as the future consent-gated AI, voice, maps, geospatial, mobile testing, and app-quality layer.
- Provider-neutral adapters between the app/backend and external services.

Issue 038 follows that direction by defining provider-neutral shells without selecting or activating a live provider.

## Relation To Issue 037

Issue 037 added:

- shared backend models
- no-PHI validation utilities
- provider-neutral service contracts
- local mock/no-op services
- data boundary documentation

Issue 038 builds on that foundation by adding consent gates, readiness states, adapter shell interfaces, and unavailable/fallback implementations.

## What Issue 038 Adds

- Consent gate types and utility functions.
- Capability-specific consent state modeling.
- Adapter readiness types and utility functions.
- Provider-neutral adapter shell interfaces.
- Unavailable/fallback implementations for Voice Access, AI guidance, map discovery, hub directory, and geospatial planning.
- Tests proving no live SDK imports, network calls, secrets, API keys, resident data capture, PHI fields, or live runtime behavior are introduced.

## What Issue 038 Does Not Add

- No backend runtime.
- No database.
- No auth.
- No storage.
- No submitted forms.
- No live AI.
- No live maps.
- No microphone capture.
- No location capture.
- No resident data capture.
- No PHI workflow.
- No clinical workflow.
- No AWS resources.
- No Google Cloud resources.
- No Firebase resources.
- No Google Maps runtime.
- No Vertex AI runtime.
- No Gemini runtime.
- No OpenAI runtime.
- No secrets.
- No API keys.
- No SDK imports.
- No network calls.
- No deployment or infrastructure changes.

## Consent Gate Model

Consent gates are capability-specific and include:

- capability
- status
- required
- resident-facing explanation
- fallback
- storage mode
- last updated label

Consent states are:

- not requested
- granted
- denied
- unavailable
- review required

Consent storage remains `none` by default. Issue 038 does not persist consent, collect resident identity, collect audio, collect location, or collect PHI.

## Adapter Shell Model

Adapter shells are provider-neutral interfaces for:

- `VoiceAccessAdapterShell`
- `AiGuidanceAdapterShell`
- `MapDiscoveryAdapterShell`
- `HubDirectoryAdapterShell`
- `GeospatialPlanningAdapterShell`

Each shell returns unavailable or fallback states by default. Shells require consent gate inputs where appropriate and preserve resident-safe fallback paths.

## Unavailable And Fallback Behavior

Default fallback language:

- Voice Access: Voice Access is not active in this version. You can continue with guided text support.
- AI guidance: AI guidance is not active in this version. You can continue with static access guidance.
- Map discovery: Map discovery is not active in this version. You can search by ZIP code, city, county, or use listed hub information when available.
- Hub directory: Live hub directory services are not active. Static hub information may be shown when available.
- Geospatial planning: Geospatial planning is not active in this version. Planning remains static and review-only.

All unavailable responses include:

- `available: false`
- `ok: false`
- `liveRuntimeEnabled: false`
- No PHI boundary copy
- resident-safe explanation
- fallback path

## Future Google Service Path

Future Google-backed AI, voice, maps, and geospatial services must be:

- consent-gated
- server-side only
- reviewed for privacy and safety
- unavailable by default
- isolated behind provider-neutral adapters
- free of client-side secrets

Issue 038 does not add Google SDKs, Google Maps runtime, Vertex AI runtime, Gemini runtime, Firebase resources, or Google Cloud resources.

## Future AWS Backend Path

Future AWS backend work must:

- use least privilege
- preserve auditability
- keep adapters server-side
- avoid PHI by design
- keep resident and county surfaces separate
- require human approval before paid-resource or cloud-resource activation

Issue 038 does not create AWS resources, add AWS SDK imports, configure cloud credentials, or activate backend runtime services.

## Stop Rules

Stop if future work requires:

- live AI
- live maps
- microphone capture
- location capture
- resident identity capture
- raw audio handling
- transcript handling
- precise location history
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
- cloud resources without approval

## Next Issue Recommendation

Recommended next issue:

**Issue 039 - Resident app connection to adapter shell fallback states**

Issue 039 should connect the resident app to fallback states only. It should not activate live services.
