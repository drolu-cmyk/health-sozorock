# Native Build Readiness

## Purpose

This document prepares the SozoRock Health resident app foundation for future iOS and Android builds through Expo Application Services (EAS).

This issue does not submit the app to the App Store or Google Play. It does not create Apple Developer credentials, Google Play credentials, cloud resources, backend services, live AI, live maps, geospatial runtime, resident data capture, PHI workflow, or clinical workflow.

## Current App Foundation

- App workspace: `apps/mobile`
- Shared resident definitions: `packages/shared`
- App display name: SozoRock Health
- Product promise: Care for Every ZIP Code.
- Trust boundary: No PHI. Consent-based. Non-clinical.
- App purpose: non-clinical health access support
- Current runtime posture: frontend-only, local/static content, no backend endpoint, no API keys, no secrets, no live service adapters

## Build Readiness Status

| Area | Current status | Next required approval |
| --- | --- | --- |
| Expo app shell | Present in `apps/mobile` | Device QA before external build |
| EAS build profiles | Scaffolded in `apps/mobile/eas.json` | EAS account and credential setup |
| iOS bundle identifier | `org.sozorockfoundation.health` | Apple Developer review |
| Android package name | `org.sozorockfoundation.health` | Google Play Console review |
| App icon | Not configured | Approved production icon asset |
| Splash screen | Not configured | Approved production splash asset |
| Store submission | Not configured for execution | Legal, privacy, product, and release approval |
| Live services | Disabled | Backend, consent, safety, and audit approval |

## Expo Managed Workflow Recommendation

Use the Expo managed workflow until a native capability requires a carefully reviewed prebuild. Managed Expo keeps this phase safe because it avoids committed `ios/` and `android/` native directories, avoids credential creation, and preserves a clean path for web, iOS, and Android from the existing app foundation.

Do not run `expo prebuild`, `eas build`, or `eas submit` in this issue.

## EAS Profiles Overview

`apps/mobile/eas.json` defines three future build profiles:

| Profile | Purpose | Distribution | Current use |
| --- | --- | --- | --- |
| development | Internal development client builds later | internal | Not run in this issue |
| preview | Controlled stakeholder review builds later | internal | Not run in this issue |
| production | Store-ready build only after approval | store | Not run in this issue |

No Apple team ID, Google service account, EAS project ID, credentials, secrets, API keys, or submit automation is committed.

## Native App Identity

- App name: SozoRock Health
- Slug: `sozorock-health`
- URL scheme: `sozorockhealth`
- Version: `0.1.0`
- Orientation: portrait
- iOS bundle identifier: `org.sozorockfoundation.health`
- Android package name: `org.sozorockfoundation.health`
- Preferred category for review: Health & Fitness

Medical category classification should wait for legal and product review. The current product purpose is non-clinical health access support, not medical care delivery.

## App Description Draft

SozoRock Health helps residents find non-clinical access support, prepare for Health Access Day, locate trusted access points, and get ready for provider-led care. The app does not diagnose, treat, prescribe, replace licensed care, or collect Protected Health Information in this version.

## What This Issue Does Not Do

- No App Store submission
- No Google Play submission
- No EAS build execution
- No EAS submit execution
- No Apple Developer credential creation
- No Google Play credential creation
- No backend implementation
- No database, auth, storage, or submitted forms
- No live AI, voice, maps, geospatial, or analytics runtime
- No microphone capture or location capture
- No resident data capture
- No PHI workflow or clinical workflow
- No AWS, Google Cloud, Firebase, Google Maps, Vertex AI, Gemini, or infrastructure changes

## Required Future Credentials

Future native builds will require human-approved credential setup outside the repository:

- Expo account and project ownership decision
- Apple Developer account access
- iOS signing credentials and provisioning profile
- Google Play Console access
- Android upload key or Play App Signing setup
- Store support contact
- Privacy policy URL
- Release approval owner

None of these credentials belong in the repository.

## Local Commands

Install dependencies:

```bash
npm install
```

Typecheck the mobile app:

```bash
npm run mobile:typecheck
```

Start the resident app for web preview:

```bash
npm run mobile:web
```

Start the resident app for iOS simulator later:

```bash
npm run mobile:ios
```

Start the resident app for Android emulator later:

```bash
npm run mobile:android
```

These commands do not submit to stores. `mobile:ios` and `mobile:android` require local simulator or emulator readiness.

## Future EAS Commands

Documented for later approval only:

```bash
npx eas build --platform ios --profile development
npx eas build --platform android --profile development
npx eas build --platform all --profile preview
npx eas build --platform all --profile production
```

Do not run these commands until credentials, privacy review, release approval, and build ownership are confirmed.

## Next Steps

1. Approve production app icon and splash assets.
2. Confirm support URL and privacy policy URL.
3. Complete privacy/data safety review.
4. Complete legal/product review for category and claims.
5. Decide Expo/EAS project ownership.
6. Prepare internal test build only after approval.

