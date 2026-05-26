# App Store Privacy Readiness

## Current Data Collection Posture

Current version posture:

- No account creation
- No submitted forms
- No resident identity collection
- No PHI
- No clinical data
- No insurance data
- No payment data
- No appointment data
- No provider-patient messaging
- No raw audio storage
- No transcript storage
- No precise location history
- No background tracking
- No live AI
- No live maps
- No analytics unless separately approved
- No crash reporting unless separately approved

The current app foundation is frontend-only and uses static/local resident guidance. Basic app use must not require private health information.

## Apple Privacy Planning

Apple privacy nutrition labels should reflect the actual approved runtime behavior at submission time. For the current frontend-only readiness phase, no data collection should be declared unless a future approved build changes behavior.

Before submission, confirm:

- whether any diagnostics or crash reporting SDK is active
- whether location permission is active
- whether microphone capture is active
- whether any data leaves the device
- whether any account, profile, saved preference, event interest, hub search, or follow-up workflow exists
- whether support and privacy policy URLs are live

Current planning statement:

SozoRock Health does not collect resident identity, PHI, clinical data, insurance data, payment data, appointment data, raw audio, transcripts, location history, or background tracking data in the current approved scope.

## Google Play Data Safety Planning

Google Play Data Safety responses must match the released binary and any active SDK behavior.

Before submission, confirm:

- no hidden analytics SDKs are active
- no crash reporting SDK is active unless reviewed
- no location SDK is active unless reviewed
- no maps SDK is active unless reviewed
- no AI or voice SDK is active unless reviewed
- no backend endpoint collects resident data
- no third-party service receives resident interaction data

Current planning statement:

The current version is designed for non-clinical access support and does not collect, share, or store resident data.

## Permission Planning

Permission language is planned for future capability review. This issue does not activate live capture.

### Microphone

Draft language:

SozoRock Health may use your microphone only when you choose Voice Access. Voice Access provides non-clinical support and does not give medical advice. No raw audio is stored in the current approved scope.

Future approval required before microphone capture:

- consent model
- no-storage boundary
- type fallback
- emergency and crisis boundary
- accessibility review
- app store privacy disclosure review

### Location

Draft language:

SozoRock Health may use your location only when you choose to find nearby access points. You can also search by ZIP code, city, or county. No background tracking or location history is allowed in the current approved scope.

Future approval required before location capture:

- consent model
- ZIP/city/county fallback
- no background tracking
- no location history
- map/geospatial data handling review
- app store privacy disclosure review

### Camera, Photos, Files, and Push

- Camera permission must not be requested in this issue.
- Photos and file access must not be requested in this issue.
- Push notifications must not be enabled in this issue.

## Future Approval Required Before

- microphone capture
- location capture
- AI-assisted guidance
- map/geospatial discovery
- crash reporting
- performance monitoring
- push notifications
- saved preferences
- follow-up communication
- account creation
- backend data storage

## Restricted Claims

Do not claim:

- medical care delivery
- clinical triage
- diagnosis
- treatment
- emergency response
- provider-patient messaging
- insurance processing
- appointment scheduling
- formal government adoption
- formal provider partnership
- HIPAA-covered service operation unless separately approved

Use the approved product boundary:

No PHI. Consent-based. Non-clinical.

## Required Future Reviews

Before any production store submission:

- legal/privacy review
- product boundary review
- app category review
- Apple privacy nutrition label review
- Google Play Data Safety review
- permission prompt review
- support process review
- emergency and crisis language review
- accessibility review
- release approval signoff

