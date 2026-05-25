# Multi-Platform Product Architecture

## Status

Proposed product foundation for Issue 033. The current implementation is a responsive Next.js app shell for web mobile, web tablet, and web desktop. iOS and Android packaging are not implemented in this issue.

## Target Platforms

- iOS
- Android
- Web mobile
- Web tablet
- Web desktop

## Current Web Deployment State

- Active internal preview domain: `https://health.sozorockfoundation.org/`
- Fallback preview: `https://main.d1bmgq1fk26xqh.amplifyapp.com/`
- Current deployment boundary: static/responsive frontend only
- Current trust boundary: No PHI. Consent-based. Non-clinical.

The CloudFront custom domain, Amplify fallback, DNS, Route 53, ACM, OIDC, and domain workflows remain unchanged by this issue.

## Product Domains

### Resident Access

Resident Access is the mobile-first resident product flow. It supports:

- welcome and product entry
- selecting a non-clinical support need
- local/session-only next-step guidance
- Voice Access static interface
- Health Access Day guidance
- Health Equity Hub-style support locations
- Provider-Led Pathways

Until a backend is separately approved, all resident interaction state stays local to the current session and is not submitted or stored.

### County Operations

County Operations is the operating intelligence console. It supports:

- Geospatial Access Operating Picture
- AI Decision Support
- Action Queue
- Assurance Log
- Scenario Planning
- Human Review Workflow
- Review Queue

The console uses static fixture data only. It is planning support, not automated decision-making.

### Shared Trust Boundary

Required visible trust language:

- No PHI. Consent-based. Non-clinical.
- Human review required before action.
- Planning support, not automated decision-making.
- Voice Access provides non-clinical support and does not give medical advice.

### Shared Data Boundary

Allowed in the current product shell:

- static content configuration
- synthetic access signals
- mock hub listings
- scenario catalog
- static action queue records
- assurance checklist records
- local/session-only UI selection state

Not implemented in this issue:

- backend services
- database
- authentication
- submitted forms
- storage
- notifications
- email or SMS
- live maps
- live AI
- resident data capture
- clinical workflow
- payment, insurance, or EHR integrations

## Expo / React Native Recommendation

Expo / React Native is the preferred path for iOS and Android once the product domains stabilize. A full Expo migration should be a follow-up issue because this repository currently hosts a working Next.js web deployment and active custom domain.

Recommended incremental path:

1. Keep `src/data`, `src/lib/productBoundaries.ts`, `src/lib/routes.ts`, and `src/lib/platformReadiness.ts` framework-neutral.
2. Extract resident and county UI primitives into platform-neutral design decisions before adding native packages.
3. Add an Expo app workspace only after package structure, routing ownership, and build outputs are approved.
4. Reuse the resident access flow first for native packaging because it is mobile-first.
5. Keep county operations web-first while evaluating a tablet-native console later.

## Shared Backend Direction

Backend services are not implemented in this issue. A future backend may support:

- non-clinical content configuration
- hub directory management
- county action queue records
- assurance and audit events
- synthetic access signals
- role-based county access
- resident consent layer, only after separate approval

The backend must not support PHI, clinical care, live AI decisioning, automated county action, payment, insurance, or EHR integrations unless a later approved issue changes the boundary.

## App Store Readiness Considerations

Before iOS or Android submission:

- confirm the app description uses non-clinical language
- confirm Voice Access has static or approved runtime behavior
- confirm no resident data capture is active without legal review
- confirm accessibility labels and tap targets are reviewed on devices
- confirm privacy disclosures match actual behavior
- confirm no unsupported partnership claims appear

## Accessibility Expectations

- semantic headings
- keyboard-accessible links and controls
- readable contrast
- large tap targets on mobile
- no critical information conveyed by color alone
- route-level content that remains usable at 390px, 768px, and 1280px

## Offline and Low-Connectivity Considerations

Resident Access should remain understandable in low-connectivity contexts. Future native packaging should consider:

- cached static guidance
- offline-readable trust boundary
- offline-readable hub categories
- clear unavailable-state messages for any future live services

## Risks and Stop Rules

Stop if implementation requires:

- backend or database
- authentication
- submitted forms
- storage
- notifications
- email or SMS
- live maps
- live AI
- resident data capture
- PHI workflow
- clinical workflow
- DNS or CloudFront changes
- AWS infrastructure changes
- Google or OpenAI runtime calls
