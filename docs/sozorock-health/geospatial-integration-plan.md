# SozoRock Health Geospatial Integration Plan

## Purpose

This plan defines the inactive geospatial adapter path for the County Operating Intelligence Layer.

The current prototype uses a mock geospatial provider only. It does not activate live maps, billing, API keys, external network calls, cloud configuration, backend services, or production geospatial workflows.

## Current Prototype Behavior

- Geospatial data is synthetic and provider-neutral.
- The County Operating Intelligence Layer renders a static map-style operating picture.
- ZIP-level access signals, hub coverage, travel burden, and recommended focus areas come from the mock provider.
- Human review remains required before action.
- The trust boundary remains: **No PHI. Consent-based. Non-clinical.**

## Adapter Structure

The provider-neutral adapter lives in:

- `src/lib/geospatial/types.ts`
- `src/lib/geospatial/mock-provider.ts`
- `src/lib/geospatial/index.ts`

The adapter defines:

- access signals
- map markers
- service areas
- travel burden estimates
- hub coverage
- recommended access focus areas

The mock provider is the default and has external requests disabled.

## Future Google Maps Platform Option

Google Maps Platform may be used where applicable in a later approved issue.

Potential future use:

- Maps JavaScript API: render an interactive operating map for approved county views.
- Places API: support public resource discovery and location context where policy permits.
- Geocoding API: convert approved location inputs or ZIP-level records into map-ready coordinates.
- Routes API: estimate travel burden for planning support.

This plan does not add SDK imports, runtime calls, environment variables, API keys, billing setup, deployment configuration, or cloud resources.

## Activation Requirements

Before any live geospatial integration is activated:

- human approval is required for cost exposure
- API keys must be restricted and reviewed
- no PHI or real resident data may be introduced
- any provider switch must preserve the adapter interface
- external requests must be documented and tested
- county-facing outputs must remain planning support
- unsupported partnership, sponsorship, approval, or endorsement claims must not be made

## Guardrails

- Use synthetic/mock geospatial data until explicitly approved.
- Do not imply a formal relationship with any mapping provider.
- Do not add real resident data.
- Do not add clinical logic.
- Do not add diagnosis, treatment, triage, prescription, or provider-patient workflows.
- Do not add AWS, OpenAI, auth, backend, database, forms, deployment, secrets, or paid services as part of this issue.
