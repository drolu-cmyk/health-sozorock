# Non-Clinical Backend Foundation

## Purpose

Issue 037 creates the minimum backend foundation needed before live service adapters are implemented.

This is a boundary and contract layer only. It prepares shared TypeScript definitions, no-PHI validation utilities, provider-neutral service contracts, safe mock/no-op services, and documentation. It does not create a live backend runtime.

Required product boundary:

**No PHI. Consent-based. Non-clinical.**

## Architecture Basis From ADR-035

ADR-035 recommends a hybrid future architecture:

- AWS as the future primary backend, governance, audit, infrastructure-as-code, and system-of-record layer.
- Google as the future consent-gated AI, voice, maps, geospatial, mobile testing, and app-quality layer.
- Provider-neutral adapters between the app/backend and external services.

Issue 037 does not implement AWS or Google services. It only prepares local contracts and boundaries so later work can use server-side adapters safely.

## What Issue 037 Adds

- Shared backend TypeScript model definitions.
- Data classification categories for public content, operational content, local resident interaction state, and restricted data.
- No-PHI field-name validation utilities.
- Provider-neutral service interfaces.
- Local static mock services for content, hubs, Health Access Day events, service availability, audit event planning, and consent state planning.
- Unavailable/no-op providers for voice, guidance, and map capabilities.
- Tests proving no SDK imports, no API keys, no live calls, and no restricted fields are introduced.

## What Issue 037 Does Not Add

- No backend runtime.
- No API routes.
- No server actions that call services.
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
- No secrets.
- No API keys.
- No deployment or infrastructure changes.

## Service Boundary Diagram

Text form:

```text
Resident app and web surfaces
  -> shared product models
  -> backend contracts in packages/shared/src/backend
  -> local mock/no-op services for Issue 037
  -> future server-side adapter boundary
  -> future AWS system-of-record services after approval
  -> future Google AI, voice, maps, and geospatial services only after consent and safety approval
```

The resident app must remain usable without backend services. Static guidance, local resident UI state, and safe fallback states must continue to work if every future service is unavailable.

## Provider-Neutral Service Contracts

Issue 037 defines interfaces for:

- `ContentConfigService`
- `HubDirectoryService`
- `HealthAccessDayService`
- `AuditEventService`
- `ConsentStateService`
- `VoiceProvider`
- `GuidanceProvider`
- `MapProvider`
- `ConfigProvider`

These contracts do not import AWS SDKs, Google SDKs, Firebase SDKs, Google Maps SDKs, database clients, auth clients, storage clients, analytics clients, or crash-reporting clients.

Future AWS or Google integrations must sit behind server-side adapters. Client apps must not receive privileged secrets or unrestricted third-party keys.

## Mock And No-Op Service Posture

The mock services use local static data only.

They do not:

- call `fetch`
- open network connections
- import SDKs
- write to storage
- use localStorage or sessionStorage
- persist resident state
- create cloud resources
- collect resident information

Voice, guidance, and map providers intentionally return unavailable states. They document the future fallback behavior without activating live AI, microphone capture, or map/geospatial runtime.

## Future AWS Backend Direction

Future backend work may evaluate AWS for:

- backend API boundary
- content configuration
- hub directory
- event directory
- audit/event logging
- least-privilege access control
- infrastructure-as-code
- system-of-record storage for approved non-clinical records

Issue 037 does not create AWS resources, configure AWS SDKs, or introduce runtime AWS calls.

## Future Google Service Adapter Direction

Future Google work may evaluate consent-gated services for:

- AI guidance
- voice support
- maps
- geospatial discovery
- mobile testing
- app-quality tooling

Google services must remain disabled until backend, consent, safety, audit, privacy, and server-side adapter boundaries are approved. No Google API keys, SDKs, cloud resources, Firebase resources, Google Maps runtime, Vertex AI runtime, or Gemini runtime are introduced in Issue 037.

## Next Issue Sequence

Recommended next issue:

**Issue 038 — Consent-gated service adapters for voice, AI, maps, and hubs**

Issue 038 should not begin until Issue 037 is merged and the adapter plan confirms:

- server-side adapters only
- no client-side secrets
- explicit consent gates
- fallback behavior when consent is denied
- no resident data capture without separate approval
- no PHI or clinical workflow

