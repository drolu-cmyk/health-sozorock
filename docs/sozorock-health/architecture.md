# SozoRock Health Architecture

## Architectural outcome

Build a non-clinical access operating layer for underserved communities.

The architecture must express two connected experiences:

1. Resident Access Layer
2. County Operating Intelligence Layer

## System logic

**Signal → Decision → Action → Assurance → Impact**

## Resident Access Layer

The resident layer is public-facing and should remain simple.

Core modules:

- Welcome
- Access Start
- Voice Access
- Health Access Day
- Health Equity Hubs
- Provider-Led Pathways

Primary objective: help residents understand where to start, use digital tools with confidence, find trusted access points, and prepare for provider-led services.

The resident layer does not provide clinical care, medical advice, clinical triage, diagnosis, treatment, or prescriptions.

## County Operating Intelligence Layer

The county layer is institutional and operational.

Core modules:

- Geospatial Access Operating Picture
- AI Decision Support
- Action Queue
- Assurance Log
- Scenario Planning

Primary objective: turn local access signals into decision-ready, action-ready, assurance-controlled intelligence.

## Geospatial and mapping architecture

Google Maps Platform should be treated as the geospatial and mapping layer where applicable.

Potential Google resources:

- Maps JavaScript API for interactive maps
- Places API for public resource discovery and location context
- Geocoding API for address and ZIP code conversion
- Routes API for travel time and travel burden analysis
- Distance Matrix where applicable for access distance estimates

Do not imply a Google partnership unless a formal relationship exists.

Use language such as:

- geospatial access intelligence
- map-supported access planning
- travel burden analysis
- hub coverage visibility
- priority ZIP-code detection

## AI-native architecture

AI should support operational decisions, not clinical decisions.

AI may support:

- Voice Access
- resident intent classification for non-clinical support paths
- hub/event lookup
- digital readiness support
- operational recommendation summaries
- action queue drafting
- assurance checklist review
- scenario planning summaries
- county report drafting

AI must not support:

- diagnosis
- medical advice
- symptom triage
- treatment recommendations
- prescription workflow
- clinical decision-making

All AI-generated operational actions require human review before execution.

## Service readiness

Changes to live services require human review, appropriate security and cost controls, and verification before activation.

## Data model boundaries

Use synthetic data only in prototype.

Allowed mock data:

- ZIP code
- access gap score
- hub coverage score
- travel burden label
- digital readiness category
- event attendance interest
- hub type
- action queue item
- assurance check status
- scenario projection

Disallowed data:

- diagnosis
- symptoms
- medication
- treatment history
- insurance information
- medical record numbers
- clinical notes
- provider-patient records
- protected health information

## Core entities

- Access Signal
- ZIP Code
- Barrier Type
- Health Equity Hub
- Health Access Day
- Digital Readiness Need
- Provider-Led Pathway
- Workforce Assignment
- Assurance Check
- Action Queue Item
- Scenario
- County Report

## Automation model

Automate safe workflows:

- CI checks
- no-PHI keyword scanning
- no-2025 date scanning
- no-clinical-language scanning
- lint/type/build
- dependency audit
- preview deployments
- mock data validation
- accessibility checks
- PR summaries

Require human review for:

- external outreach
- real resident data
- paid cloud resources
- provider claims
- county/library/partner references
- clinical boundary concerns
- publication or funder-facing material

## Security posture

Minimum prototype posture:

- no real resident data
- no PHI
- no backend clinical workflow
- no public secrets
- no client-exposed API keys except restricted browser keys where required for maps
- environment variables documented
- access to paid resources reviewed before activation

## Final architecture standard

Residents get access.

Counties get intelligence.

Providers keep their platforms.

SozoRock Health activates the non-clinical operating layer.
