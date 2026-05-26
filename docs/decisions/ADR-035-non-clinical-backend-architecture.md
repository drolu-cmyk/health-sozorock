# ADR-035 — Non-Clinical Backend Architecture for SozoRock Health

Status: Proposed

Date: 2026-05-26

## Purpose

Define the backend architecture direction for SozoRock Health's non-clinical product services before any live service adapters are implemented.

This ADR supports:

- resident iOS app
- resident Android app
- responsive web
- future county workspace
- strict non-clinical boundaries
- no PHI by design
- no resident data capture unless separately approved
- no clinical workflow
- future consent-gated AI, voice, maps, and geospatial services
- clear AWS and Google resource boundaries
- stable existing web and domain deployment posture

This ADR is documentation only. It does not implement backend services, create cloud resources, add runtime service adapters, add secrets, add API keys, or activate AI, voice, maps, geospatial, auth, database, storage, forms, resident data capture, PHI workflow, or clinical workflow.

## 1. Context

PR #45 created the downloadable resident app foundation for SozoRock Health.

The current state is:

- Resident app foundation exists in `apps/mobile`.
- Shared resident definitions exist in `packages/shared`.
- The current app is frontend-only.
- Resident navigation is safe and must not expose county, model, operating intelligence, internal queues, backend, infrastructure, or administrative labels.
- Voice, AI, maps, location, hubs, and events are placeholder or static/local-only.
- No resident data is captured.
- No PHI workflow exists.
- No clinical workflow exists.
- Existing web deployment must remain stable.
- Existing CloudFront, Route 53, DNS, ACM, OIDC, and AWS infrastructure must not be changed by this ADR.
- AWS and Google resources must be evaluated together because the product may need AWS governance and backend controls plus Google AI, voice, maps, geospatial, and mobile quality services.

The product boundary remains:

**No PHI. Consent-based. Non-clinical.**

SozoRock Health may guide, prepare, explain, route, and support access. It must not diagnose, treat, prescribe, replace licensed care, create provider-patient messaging, or create a clinical relationship.

## 2. Decision Summary

Recommended architecture:

Use a hybrid architecture:

- AWS as the primary backend, governance, audit, infrastructure-as-code, and system-of-record layer.
- Google as the consent-gated AI, voice, maps, geospatial, mobile testing, and app-quality layer.
- Provider-neutral adapters between the app/backend and external services.

Decision rules:

- Store and govern non-clinical product records through the primary backend.
- Use Google services through server-side adapters only.
- Never expose sensitive API keys in client apps.
- Never send PHI, clinical data, raw audio, transcripts, precise location history, or resident identity data to AWS, Google, or any third party unless a later approved legal/product decision changes the boundary.
- Keep all AI, voice, maps, and geospatial features disabled until consent, safety, backend, audit, and service boundaries are implemented.
- Keep county workspace separate from resident navigation.
- Keep existing CloudFront, Route 53, ACM, and domain posture stable until a separate infrastructure issue approves any change.

This recommendation is proposed, not implemented.

## 3. Product Layers

### Resident Access Layer

The Resident Access Layer includes:

- iOS app
- Android app
- responsive web
- resident-safe navigation
- non-clinical next-step guidance
- Voice Access with consent boundary
- Hubs with location consent boundary
- Health Access Day guidance
- Provider-Led Pathway readiness guidance
- no county workspace exposure
- no internal operating intelligence exposure

The resident layer must remain simple, private, app-like, and non-clinical. It must not show county operating tools, action queues, assurance logs, synthetic signals, backend architecture, cloud infrastructure, staff workflows, or administrative labels.

### County Workspace

The County Workspace is:

- separate from resident journey
- internal/planning support
- no resident-facing exposure
- human review required before action
- planning support, not automated decision-making
- cannot expose identifiable resident information
- cannot be linked from resident navigation
- cannot imply government adoption without formal agreement

The county workspace may use synthetic, aggregate, or non-identifiable planning signals only unless separately approved.

### Shared Service Layer

The Shared Service Layer may later support:

- content configuration
- hub directory
- event directory
- consent records if later approved
- audit events
- service availability states
- static and dynamic content boundaries
- admin review workflow for content changes
- AI, voice, maps, and geospatial adapters only after consent and safety approval

The Shared Service Layer must not become a clinical service layer.

## 4. AWS Resources Evaluation

AWS should be evaluated as the primary backend, governance, audit, security, infrastructure-as-code, and system-of-record environment.

### Core Backend And App Infrastructure

| Resource | Suitability | Boundary |
| --- | --- | --- |
| AWS Amplify Gen 2 | Candidate for TypeScript-first backend scaffolding and mobile/web integration. | Evaluation only. Do not add Amplify backend resources in Issue 035. |
| AWS CDK | Candidate for infrastructure-as-code when implementation is approved. | Documentation only. Do not add CDK files in Issue 035. |
| AWS AppSync | Candidate for typed API access if GraphQL is chosen later. | Do not create AppSync resources or client runtime calls. |
| Amazon API Gateway | Candidate for REST API boundary if REST is chosen later. | Do not create API Gateway resources. |
| AWS Lambda | Candidate for server-side adapters and non-clinical backend logic. | Do not create Lambda functions. |
| AWS Step Functions | Candidate only if workflow orchestration is later needed. | Do not implement workflow orchestration. |
| Amazon EventBridge | Candidate only if event-driven service coordination is later needed. | Do not implement event bus workflows. |

### Data And Content

| Resource | Suitability | Boundary |
| --- | --- | --- |
| Amazon DynamoDB | Candidate for non-clinical content, hub/event, audit, and planning records. | No tables, schemas, or SDK calls in Issue 035. |
| Amazon S3 | Candidate for approved non-PHI public/content assets only. | No buckets or object storage changes. |
| Amazon OpenSearch Service | Candidate only if search becomes necessary and approved. | Evaluation only. |
| AWS AppConfig | Candidate if feature flags/configuration are needed. | No runtime feature flag work. |
| AWS Systems Manager Parameter Store | Candidate for server-side non-secret configuration. | No parameters added. |
| AWS Secrets Manager | Candidate for server-side secrets only. | No secrets added. |

### Identity And Access

| Resource | Suitability | Boundary |
| --- | --- | --- |
| Amazon Cognito | Candidate only if auth is later approved. | Do not add auth in Issue 035. |
| AWS IAM | Required for future least-privilege backend operations. | No IAM changes. |
| AWS IAM Identity Center | Candidate only if internal/admin workforce access becomes necessary. | Evaluation only. |
| AWS STS | Candidate only for controlled temporary credentials in server-side/admin contexts. | No runtime credential path added. |

### Security, Privacy, Audit, And Monitoring

| Resource | Suitability | Boundary |
| --- | --- | --- |
| Amazon CloudWatch | Candidate for logs, metrics, and backend health monitoring. | No logging integration added. |
| AWS CloudTrail | Candidate for account-level audit history. | No changes. |
| AWS Config | Candidate for resource posture tracking if backend exists. | No changes. |
| AWS Security Hub | Candidate for security findings aggregation. | No changes. |
| Amazon GuardDuty | Candidate for threat detection if backend expands. | No changes. |
| AWS WAF | Candidate for public API/application protection. | No changes. |
| AWS Shield Standard | Baseline DDoS protection already relevant to AWS edge posture. | No changes. |
| AWS KMS | Candidate for encryption key management. | No keys added. |
| Amazon Macie | Candidate only if S3/object scanning becomes relevant. | No scanning setup. |
| AWS Audit Manager | Candidate only if formal control evidence management becomes necessary. | No changes. |

### Messaging And Communication

| Resource | Suitability | Boundary |
| --- | --- | --- |
| Amazon SNS | Candidate only if notifications are later approved. | Do not add notifications. |
| Amazon SES | Candidate only if email is later approved. | Do not add email. |
| Amazon Pinpoint | Candidate only if resident communication is later approved and legally reviewed. | Do not add resident communication. |

### AI And Voice, Evaluation Only

| Resource | Suitability | Boundary |
| --- | --- | --- |
| Amazon Bedrock | Candidate for server-side non-clinical guidance if selected later. | No live AI activation. |
| Amazon Transcribe | Candidate for consent-gated speech transcription if approved later. | No microphone capture or raw audio storage. |
| Amazon Polly | Candidate for accessibility-focused text-to-speech if approved later. | No runtime voice output integration. |
| Amazon Comprehend Medical | Explicitly excluded unless legal/product approval later allows clinical/PHI workflows. | Do not use in the current product boundary. |
| Amazon Location Service | Candidate alternative to Google Maps Platform for maps/geospatial needs. | No live maps runtime. |

### Mobile And Release Support

| Resource | Suitability | Boundary |
| --- | --- | --- |
| AWS Device Farm | Candidate only if mobile device testing is needed. | Evaluation only. |
| AWS Amplify Hosting | Already relevant to current web posture. | No hosting changes. |
| Amazon CloudFront | Already part of current custom domain path. | No distribution changes. |
| Amazon Route 53 | Already current DNS authority. | No DNS changes. |
| AWS Certificate Manager | Already current certificate authority path. | No certificate changes. |

AWS evaluation requirements:

- Do not create any AWS resource in Issue 035.
- Do not add AWS SDK runtime calls.
- Do not add AWS credentials.
- Do not add Amplify backend resources.
- Do not add Cognito.
- Do not add AppSync/API Gateway/Lambda/DynamoDB.
- Only document suitability, risks, boundaries, and sequencing.

## 5. Google Resources Evaluation

Google should be evaluated for AI, voice, maps, geospatial, mobile quality, and possible alternative backend components. Any Google service must remain behind explicit consent, safety, and server-side adapter boundaries before activation.

### Core Backend And Mobile Platform

| Resource | Suitability | Boundary |
| --- | --- | --- |
| Firebase | Candidate for mobile-oriented backend services if Google-first or reverse-hybrid is selected. | Do not create Firebase resources. |
| Firebase App Check | Candidate to protect approved backend endpoints from abuse. | No runtime setup. |
| Firebase Authentication | Candidate only if auth is later approved. | Do not add auth. |
| Cloud Firestore | Candidate if Google-first data storage is selected. | No database added. |
| Realtime Database | Candidate only if a real-time use case is later justified. | Evaluation only. |
| Cloud Functions for Firebase | Candidate for server-side functions in Google-first architecture. | No functions added. |
| Cloud Run | Candidate for containerized backend APIs or server-side adapters. | No service created. |
| Cloud Storage for Firebase | Candidate for approved non-PHI public/content assets only. | No storage added. |
| Firebase Remote Config | Candidate for future configuration if approved. | No runtime flags. |
| Firebase Hosting | Candidate only as an alternative web hosting path. | Do not replace current deployment without approval. |

### Mobile Quality And Release

| Resource | Suitability | Boundary |
| --- | --- | --- |
| Firebase App Distribution | Candidate for tester distribution if approved. | No release setup. |
| Firebase Crashlytics | Candidate for crash reporting with disclosure. | No telemetry added. |
| Firebase Performance Monitoring | Candidate for performance telemetry with disclosure. | No monitoring added. |
| Firebase Test Lab | Candidate for Android/device testing. | Evaluation only. |
| Firebase Cloud Messaging | Candidate only if push notifications are later approved. | Do not add notifications. |
| Google Play Console | Candidate only for Android release readiness later. | No release action. |

### AI And Voice

| Resource | Suitability | Boundary |
| --- | --- | --- |
| Vertex AI | Candidate for server-side non-clinical guidance if approved. | No runtime usage. |
| Gemini Live API | Candidate only after voice/AI consent and safety boundaries are approved. | No activation. |
| Gemini models on Vertex AI | Candidate for non-clinical guidance only after approval. | No runtime calls. |
| Firebase AI Logic | Candidate only if it fits the approved architecture. | No runtime calls. |
| Cloud Speech-to-Text | Candidate only after microphone consent and no-storage boundaries are approved. | No microphone capture. |
| Cloud Text-to-Speech | Candidate only after accessibility and voice-output boundaries are approved. | No runtime integration. |
| Cloud Translation | Candidate only if multilingual access support is approved. | No runtime integration. |

### Maps And Geospatial

| Resource | Suitability | Boundary |
| --- | --- | --- |
| Google Maps Platform | Strong candidate for resident hub/event discovery and county geospatial analysis. | No API keys or runtime scripts. |
| Maps SDK for iOS | Candidate for native iOS map rendering. | No SDK integration. |
| Maps SDK for Android | Candidate for native Android map rendering. | No SDK integration. |
| Maps JavaScript API | Candidate for web map rendering. | No runtime script. |
| Places API | Candidate for public resource discovery. | No runtime call. |
| Geocoding API | Candidate for ZIP/address conversion. | No runtime call. |
| Routes API | Candidate for route/directions support. | No runtime call. |
| Distance Matrix API | Candidate only if needed and available for the selected use case. | Evaluation only. |
| Address Validation API | Candidate only if address quality becomes necessary and approved. | Evaluation only. |
| Geolocation API | Candidate only with explicit consent and no background tracking. | No hidden location collection. |
| Google Earth Engine | Candidate only if public/geospatial planning analysis is later approved. | Evaluation only. |
| BigQuery GIS | Candidate only if aggregate/county planning analysis is later approved. | Evaluation only. |

### Security, Monitoring, And Operations

| Resource | Suitability | Boundary |
| --- | --- | --- |
| Google Cloud IAM | Required if Google Cloud becomes part of backend control plane. | No permissions changed. |
| Secret Manager | Candidate for server-side secrets. | No secrets added. |
| Cloud Logging | Candidate for server-side logs. | No logging integration. |
| Cloud Monitoring | Candidate for service monitoring. | No monitoring integration. |
| Cloud Audit Logs | Candidate for Google control-plane auditability. | No changes. |
| Cloud Armor | Candidate if public APIs are hosted on Google. | No changes. |
| Security Command Center | Candidate if Google Cloud becomes a major control plane. | Evaluation only. |
| Cloud KMS | Candidate for encryption key management. | No keys added. |
| VPC Service Controls | Candidate if sensitive internal workloads later require perimeters. | Evaluation only. |

Google evaluation requirements:

- Do not create any Google Cloud resource in Issue 035.
- Do not create Firebase resources.
- Do not add Google runtime calls.
- Do not add API keys.
- Do not add Google Maps scripts or SDK runtime usage.
- Do not add Vertex AI or Gemini runtime usage.
- Only document suitability, risks, boundaries, and sequencing.

## 6. Non-Clinical Backend Scope

Allowed future backend services:

- content configuration
- hub directory management
- Health Access Day event management
- non-clinical guidance content
- consent state records if explicitly approved
- service availability records
- audit/event logs
- county workspace planning data
- synthetic or aggregate access signals
- admin review workflow for content changes
- feature flags/configuration if needed
- app release quality telemetry only if non-identifying and approved

Not allowed without separate legal/product approval:

- PHI
- symptoms
- diagnosis
- treatment
- medications
- insurance records
- provider-patient messaging
- appointment scheduling
- prescriptions
- payments
- EHR integration
- clinical decision support
- automated care recommendations
- raw audio storage
- transcript storage
- precise location history
- background tracking

## 7. Data Classification

| Data class | Examples | Required? | Storage posture | Consent posture | Risk level | Resident-facing explanation |
| --- | --- | --- | --- | --- | --- | --- |
| Public content | guidance copy, hub information, event information, accessibility notes, privacy boundary text, emergency/crisis guidance text, provider pathway readiness copy | Required for app utility | May be stored as public/non-sensitive content after approval | No resident consent required to read | Low | "This is general access information." |
| Operational content | admin-managed hub records, event status, service availability, county planning records, audit logs, content review states, release quality states, feature flags | Required for operations later | Backend storage only after approval | Staff/admin governance required | Medium | Not resident-facing unless approved as public content. |
| Resident interaction state | selected app path, local need choice, permission state, session-only guidance state | Not required for basic reading | Local-only by default; no storage in MVP unless separately approved | Capability-specific consent if persisted later | Medium | "Your choices stay on this device/session unless a future approved consent flow says otherwise." |
| Restricted data | PHI, clinical data, insurance data, payment data, provider records, live resident submissions, raw audio, transcripts, precise location history, background tracking data, resident identity records unless separately approved | Not required | Prohibited in current scope | Separate legal/product approval required before any use | High | "SozoRock Health does not need this information for basic use." |

Data principles:

- Use the least amount of information needed.
- Default to no storage for resident interaction state.
- Do not collect identity in current scope.
- Do not create submission workflows by default.
- Do not synchronize resident interaction state across devices unless separately approved.

## 8. Consent Model

Consent is required before:

- microphone
- location
- AI-assisted guidance
- maps/geospatial discovery
- future account creation
- future follow-up communication
- future resident-saved preferences
- future telemetry or crash reporting disclosure

Rules:

- The app must remain usable when consent is denied.
- No hidden collection.
- No background tracking.
- No raw audio storage.
- No transcript storage unless separately approved.
- No location history.
- No automatic data sharing with counties, providers, funders, partners, public agencies, AWS services, Google services, or third-party services.
- No implied partnership through hub or event listings.
- Consent must be understandable in plain resident language.
- Consent must be separated by capability, not bundled into one broad acceptance.

Required fallback options:

- type instead of speaking
- ZIP code search instead of current location
- city or county search instead of current location
- static hubs when live discovery is unavailable
- static events when live event search is unavailable
- static guidance when AI is unavailable

## 9. Service Adapter Boundaries

### Voice

Boundary:

- consent required before microphone capture
- no raw audio storage by default
- type fallback required
- emergency/crisis fallback must be visible
- no diagnosis
- no treatment advice
- no triage claim
- no replacement for emergency care
- no provider-patient messaging
- evaluate Amazon Transcribe versus Google Cloud Speech-to-Text versus device-native speech only as future options

Implementation rule:

Voice must remain disabled as a live capture service until microphone consent, raw-audio handling, transcript handling, safety language, and audit boundaries are approved.

### AI

Boundary:

- non-clinical only
- no diagnosis
- no treatment advice
- no medication advice
- no triage claim
- no provider replacement
- no autonomous action
- safe refusal and escalation language required
- must show uncertainty when needed
- must route emergency/crisis scenarios to 911/988 language
- must not store resident conversations unless separately approved
- evaluate Amazon Bedrock versus Vertex AI/Gemini versus a provider-agnostic adapter model

Implementation rule:

AI must remain disabled as a live service until prompt safety, response constraints, consent, logging, audit, and provider-adapter boundaries are approved.

### Maps/Geospatial

Boundary:

- permission required for precise location
- ZIP/city/county fallback required
- no background tracking
- no location history
- hub discovery must not imply formal partnership unless verified
- maps must be assistive, not determinative
- map data must not be used to infer medical condition or resident identity
- evaluate Google Maps Platform versus Amazon Location Service versus a provider-agnostic geospatial adapter model

Implementation rule:

Maps/geospatial services must remain disabled as live services until API key restrictions, consent, location retention, attribution, provider terms, and audit boundaries are approved.

### Hub/Event Services

Boundary:

- content must include verification status
- last updated date
- partner status wording
- accessibility notes
- service unavailable state
- offline/empty state
- no registration form unless separately approved
- no attendance tracking unless separately approved
- no resident identity capture

Implementation rule:

Hub and event services may move from static content to backend-managed content only after content governance, review workflow, audit logging, and partner-status rules are approved.

## 10. Architecture Options

### Option A — AWS-First Backend Architecture

Candidate resources:

- AWS Amplify Gen 2
- AWS CDK
- AWS AppSync or Amazon API Gateway
- AWS Lambda
- Amazon DynamoDB
- Amazon S3 for approved non-PHI content assets only
- Amazon CloudWatch
- AWS CloudTrail
- AWS IAM
- AWS WAF
- AWS KMS
- AWS Secrets Manager or SSM Parameter Store

Potential strengths:

- strong governance and audit posture
- fits existing AWS/domain posture
- TypeScript-first Amplify Gen 2 path
- CDK extensibility
- strong future county workspace support
- clear server-side control plane

Risks:

- more AWS architecture discipline required
- mobile integration must be carefully structured
- Cognito/auth must not be introduced before approval
- DynamoDB schemas must enforce no-PHI-by-design
- Google Maps/Gemini integrations would still need cross-cloud adapters if selected later

No-PHI impact:

- Strong if schemas, APIs, and audit controls are designed around non-clinical data only.

Consent impact:

- Consent records could be modeled later, but only after explicit approval.

Mobile impact:

- Good with Amplify Gen 2 or custom APIs, but native app integration should remain adapter-based.

County workspace impact:

- Strong because AWS can support governance, audit, and role-separated county services later.

Operational complexity:

- Medium to high, depending on CDK/Amplify scope.

Sequencing implications:

- Requires backend foundation and IAM/audit boundaries before live adapters.

### Option B — Google-First Backend And Service Architecture

Candidate resources:

- Firebase
- Firebase App Check
- Firebase Authentication only if auth is later approved
- Cloud Firestore
- Cloud Functions for Firebase or Cloud Run
- Cloud Storage for Firebase for approved non-PHI content assets only
- Firebase Remote Config
- Firebase App Distribution
- Firebase Crashlytics
- Firebase Performance Monitoring
- Firebase Test Lab
- Google Maps Platform
- Vertex AI / Gemini Live API only after approval

Potential strengths:

- strong mobile ecosystem
- strong iOS/Android testing and release support
- natural fit for maps, places, routes, and geospatial discovery
- natural fit for Gemini/Vertex AI
- faster mobile developer workflow in some areas

Risks:

- must avoid analytics/tracking drift
- must avoid hidden resident data capture
- Firestore rules and App Check must be treated as critical controls
- AI and maps must not activate before consent and safety approval
- current AWS-centered domain/deployment posture may become split

No-PHI impact:

- Depends heavily on Firestore rules, service adapter discipline, and telemetry choices.

Consent impact:

- Strong mobile UX options, but consent must not be collapsed into broad acceptance.

Mobile impact:

- Very strong for mobile quality and release tooling.

County workspace impact:

- Possible, but may require stronger governance design to match AWS audit posture.

Operational complexity:

- Medium for mobile teams, higher if current AWS deployment remains separate.

Sequencing implications:

- Requires a clear decision on whether Google becomes system of record or service-provider layer.

### Option C — Hybrid AWS Backend With Google Service Adapters

AWS provides:

- backend API boundary
- content/configuration service
- hub/event service
- audit/event logs
- county workspace planning records
- IAM/governance
- CloudWatch/CloudTrail logging
- infrastructure as code

Google provides:

- Google Maps Platform for maps, places, routes, geocoding, and geospatial discovery
- Vertex AI or Gemini Live API for future consent-gated non-clinical guidance
- Firebase App Distribution, Crashlytics, Performance Monitoring, and Test Lab for mobile app release quality if adopted
- Cloud Speech-to-Text or Text-to-Speech only if future voice boundaries approve them

Potential strengths:

- keeps backend governance and auditability on AWS
- uses Google where it is strongest for maps, geospatial, mobile testing, and Gemini
- avoids forcing all services into one cloud
- supports future county geospatial intelligence without making Google the system of record

Risks:

- cross-cloud complexity
- secrets and API keys must never be exposed in client apps
- logging and audit model must not fragment
- data-sharing between AWS and Google must be tightly limited and documented
- requires strong server-side adapter pattern

No-PHI impact:

- Strong if AWS remains the governed system of record and Google receives only approved, minimal, non-clinical request data through server-side adapters.

Consent impact:

- Strong if each Google capability is consent-gated separately.

Mobile impact:

- Strong because Google mobile quality tools can be adopted without making Google the backend system of record.

County workspace impact:

- Strong because AWS can preserve backend governance while Google supports maps/geospatial only where appropriate.

Operational complexity:

- High, but manageable if provider-neutral adapters are established early.

Sequencing implications:

- Best sequenced as backend ADR, backend foundation, consent model, then live adapters.

### Option D — Google Backend With AWS Deployment Retained

Google provides:

- Firebase/Firestore backend
- Cloud Functions or Cloud Run
- Maps Platform
- Vertex AI/Gemini
- mobile distribution and testing services

AWS retains:

- existing web deployment posture
- CloudFront/custom domain path
- current Route 53/DNS authority
- ACM and domain certificate posture

Potential strengths:

- mobile-first development speed
- strong Google service alignment
- faster path for maps and Gemini

Risks:

- may weaken current AWS-centered deployment discipline
- creates duplicated operational control planes
- may complicate CloudFront/Amplify/Expo/Firebase routing
- must be strongly justified before adoption

No-PHI impact:

- Feasible but requires strict Firebase rules, logging controls, and service design.

Consent impact:

- Strong potential, but only if Firebase/Google data flows are explicit and user-understandable.

Mobile impact:

- Very strong.

County workspace impact:

- Possible, but may be weaker for AWS-centered governance and audit expectations.

Operational complexity:

- Medium for Google-native implementation, high for mixed deployment posture.

Sequencing implications:

- Should not be selected unless mobile-first speed outweighs AWS governance alignment.

### Option E — Provider-Agnostic Adapter Architecture

Use provider-neutral interfaces:

- `VoiceProvider`
- `GuidanceProvider`
- `MapProvider`
- `HubDirectoryProvider`
- `EventDirectoryProvider`
- `ConsentProvider`
- `AuditProvider`
- `ConfigProvider`

AWS or Google services can be plugged in later behind server-side adapters.

Potential strengths:

- reduces vendor lock-in
- makes service boundaries explicit
- supports staged activation
- helps keep no-PHI and consent boundaries enforceable
- allows AWS and Google to be evaluated by capability

Risks:

- additional abstraction work
- can slow early implementation
- must avoid over-engineering
- still requires a primary system-of-record decision

No-PHI impact:

- Strong if each adapter has explicit data allowlists and deny rules.

Consent impact:

- Strong because each capability can map to a separate consent boundary.

Mobile impact:

- Strong if adapters produce simple mobile-safe contracts.

County workspace impact:

- Strong if resident and county adapters are separated by design.

Operational complexity:

- Medium. Complexity moves into interface design and governance.

Sequencing implications:

- Should be paired with either AWS-first or hybrid AWS/Google as the actual implementation direction.

## 11. Required Comparison Matrix

Ratings: High, Medium, Low, or Mixed.

| Criterion | AWS-first | Google-first | AWS backend + Google adapters | Google backend + AWS deployment | Provider-agnostic adapters |
| --- | --- | --- | --- | --- | --- |
| Mobile app compatibility | Medium | High | High | High | High |
| Responsive web compatibility | High | Medium | High | Medium | High |
| iOS/Android packaging readiness | Medium | High | High | High | High |
| Backend implementation speed | Medium | High | Medium | Medium | Medium |
| Security posture | High | Medium | High | Medium | High |
| Privacy-by-design strength | High | Medium | High | Medium | High |
| No-PHI enforcement | High | Medium | High | Medium | High |
| Consent boundary support | Medium | High | High | High | High |
| Auditability | High | Medium | High | Medium | High |
| Logging and monitoring | High | High | High | High | Medium |
| Least-privilege access control | High | Medium | High | Medium | High |
| Secrets management | High | High | High | High | High |
| Maps/geospatial support | Medium | High | High | High | High |
| AI/voice support | Medium | High | High | High | High |
| County workspace support | High | Medium | High | Medium | High |
| Cost control | Medium | Medium | Medium | Medium | Medium |
| Operational complexity | Medium | Medium | High | High | Medium |
| Vendor lock-in | Medium | Medium | Medium | Medium | High |
| Developer experience | Medium | High | Medium | High | Medium |
| Deployment risk | Low | Medium | Medium | Medium | Low |
| Future grant/funder credibility | High | Medium | High | Medium | High |
| Current repo/deployment fit | High | Medium | High | Medium | High |
| App store readiness | Medium | High | High | High | High |

Interpretation:

- AWS-first is strongest for governance, audit, current deployment fit, and future county workspace support.
- Google-first is strongest for mobile quality, maps, Gemini/Vertex AI, and mobile developer velocity.
- Hybrid AWS backend with Google service adapters best matches the current posture and future product needs.
- Google backend with AWS deployment retained may be attractive for speed, but it increases control-plane fragmentation.
- Provider-agnostic adapters should be used as a design discipline regardless of the primary backend choice.

## 12. Security And Privacy Baseline

Minimum baseline for any future implementation:

- least privilege
- environment isolation
- no secrets in client apps
- secure API boundary
- audit logging
- consent logging only if approved
- rate limiting
- error handling
- service unavailable fallbacks
- dependency review
- no PHI by design
- input validation
- output safety controls
- separate resident and county access surfaces
- clear public/private route separation
- no hidden background processes
- no silent data sharing
- server-side adapters for Google and AWS service calls
- API key restrictions for Google Maps if approved later
- KMS/Secret Manager comparison for secret protection
- CloudWatch/CloudTrail versus Cloud Logging/Cloud Audit Logs comparison

Client applications must not hold privileged secrets or unrestricted third-party keys. Any Google Maps key, if later approved, must use platform restrictions and quota controls. Any server-side AI, voice, map, or geospatial service must pass through audited backend adapters.

## 13. App Store Implications

Future iOS and Android releases must document:

- iOS privacy disclosures
- Android data safety disclosures
- microphone permission language
- location permission language
- AI guidance disclaimers
- maps/location disclosure
- crash reporting disclosure if Firebase Crashlytics is later adopted
- performance monitoring disclosure if later adopted
- emergency/crisis limitations
- no medical advice disclaimer
- no data collection unless future approved version changes behavior
- no health data collection claim in the current version
- no medical device claim
- no clinical service claim
- no unsupported partnership claim

Permission language must be plain and capability-specific. The app must work if residents decline microphone or location permission.

## 14. County Workspace Separation

County workspace requirements:

- county workspace must remain separate from resident app
- county route must not appear in resident nav
- resident app must not show action queue, assurance log, synthetic access signals, or operating intelligence
- county workspace must show planning-only and human-review language
- county workspace cannot expose identifiable resident information
- county workspace cannot make automated decisions
- county workspace cannot imply clinical authority
- county workspace cannot imply government adoption without formal agreement
- county planning data must be synthetic, aggregate, or non-identifiable unless separately approved

Any future shared backend must enforce resident/county separation at the data model, API, authorization, UI, logging, and audit levels.

## 15. Stop Rules

Stop implementation if any future backend task requires:

- PHI
- clinical workflow
- diagnosis
- treatment
- medication advice
- provider-patient messaging
- appointment booking
- insurance data
- payment data
- EHR integration
- background tracking
- raw audio storage
- transcript storage
- hidden location collection
- unsupported partnership claims
- live AI without safety boundary
- live maps without consent boundary
- resident identity collection without approval
- emergency routing beyond plain 911/988 guidance
- autonomous county action
- automated care recommendation
- client-side secret exposure
- Google Maps key exposure without restrictions
- AWS or Google resource creation without approval
- analytics/tracking drift

## 16. Consequences

### What This Decision Enables

- A backend roadmap that supports resident iOS, Android, and web without redesigning the app foundation.
- A county workspace path that remains separated from resident navigation.
- A governed path for future hub/event content management.
- A consent-first path for future AI, voice, maps, and geospatial services.
- A balanced AWS/Google evaluation instead of a premature single-cloud commitment.
- A provider-neutral adapter model that keeps future service choices replaceable.

### What This Decision Intentionally Delays

- Backend implementation.
- Database creation.
- Auth.
- Live AI.
- Live voice capture.
- Live maps/geospatial discovery.
- Resident data capture.
- Cloud resource creation.
- Runtime service adapters.
- Telemetry or crash reporting activation.

### Risks That Remain

- Hybrid architecture can create cross-cloud complexity.
- Future Google services can create analytics/tracking drift if not bounded.
- Future AWS services can create cost and governance overhead if overbuilt.
- Consent logging may become necessary, but it needs legal/product approval.
- County workspace expansion may require role-based access and stronger audit controls.
- App store disclosures must be reviewed before live mobile release.

### Decisions Required Before Implementation

- Confirm primary system-of-record layer.
- Confirm whether AWS-first or hybrid AWS/Google is approved.
- Define non-clinical data schemas.
- Define consent record requirements.
- Define audit/event model.
- Define provider-neutral adapter interfaces.
- Define county workspace access model.
- Define app store privacy disclosure posture.
- Define service-specific stop rules for AI, voice, maps, and geospatial features.

Live adapters should wait until backend, consent, safety, and audit boundaries are approved because each adapter can create data flow, cost, privacy, safety, and compliance implications.

## 17. Recommended Issue Sequence After Issue 035

After Issue 035 is completed, recommend:

- Issue 036 — Native app build and EAS packaging readiness
- Issue 037 — Non-clinical backend foundation
- Issue 038 — Consent-gated service adapters for voice, AI, maps, and hubs
- Issue 039 — Mobile release quality setup
- Issue 040 — County workspace separation and access model

Clarifications:

- Issue 036 prepares native build packaging only.
- Issue 037 implements minimal backend foundation only after ADR approval.
- Issue 038 implements service adapters only after consent, backend, and safety boundaries are approved.
- Issue 039 evaluates app quality tooling such as Firebase App Distribution, Crashlytics, Performance Monitoring, Test Lab, or AWS Device Farm.
- Issue 040 ensures county workspace separation and access control before county functionality expands.

## 18. Guardrails

No backend, database, auth, storage, submitted forms, live AI, live maps, microphone capture, location capture, resident data capture, PHI, clinical workflow, DNS, CloudFront, Route 53, ACM, OIDC, AWS infrastructure changes, Google Cloud resources, Firebase resources, Google Maps runtime, Vertex AI runtime, secrets, API keys, or runtime service adapters.

## 19. Acceptance Criteria

- ADR file exists at `docs/decisions/ADR-035-non-clinical-backend-architecture.md`.
- AWS resources are evaluated.
- Google resources are evaluated.
- Backend architecture options are defined.
- Recommended backend direction is documented.
- Consent and data boundaries are documented.
- Resident/county separation is documented.
- Service adapter boundaries are documented.
- App store implications are documented.
- Stop rules are documented.
- Next issue sequence is documented.
- No implementation work is performed.
- No cloud resources are created.
- No secrets or API keys are added.
- No backend, AI, maps, voice, auth, database, storage, forms, PHI, clinical workflow, or runtime adapters are introduced.

