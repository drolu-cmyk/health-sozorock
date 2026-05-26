# SozoRock Health Native App Product Plan

## Product Strategy

SozoRock Health is becoming an app-first resident access companion. The resident app is the primary product experience; web should later mirror the app journey, not lead it.

Core promise:

**Care for Every ZIP Code.**

Core trust line:

**No PHI. Consent-based. Non-clinical.**

Plain-language definition:

SozoRock Health helps residents understand what kind of support they need, find trusted access points, discover Health Access Day events, use voice-guided support, prepare for provider-led care, and receive non-clinical next-step guidance.

The app can guide, prepare, explain, route, and support access. It must not diagnose, treat, prescribe, replace licensed care, or create a clinical relationship.

## App-First Architecture

Current implementation approach:

- Existing Next.js web app remains active and unchanged as the deployed web experience.
- New resident app foundation lives in `apps/mobile`.
- Shared resident definitions live in `packages/shared`.
- Expo / React Native is used for iOS, Android, and web app packaging.
- Live services are represented by safe provider boundaries and static fallback behavior.

Current structure:

- `apps/mobile` - Expo resident app shell.
- `packages/shared` - resident navigation, content, data models, safety copy, consent copy, hub data, event data, privacy tables, and pathway definitions.
- Existing `src/app` - current Next.js web app.

## Target Platforms

- iOS
- Android
- Web mobile
- Web tablet
- Web desktop

The resident app foundation is designed for installable mobile use first. Web support is present for previewing and future mirroring.

## Current Web Deployment State

Active domain:

https://health.sozorockfoundation.org/

Fallback domain:

https://main.d1bmgq1fk26xqh.amplifyapp.com/

This issue does not change CloudFront, Route 53, DNS, ACM, OIDC, GitHub Actions domain workflow, or AWS infrastructure.

## Resident Navigation Model

### Top App Bar

- SozoRock Health
- Menu

### Bottom Tab Bar

- Home
- Start
- Voice
- Day
- Hubs

### Menu Drawer

- Provider-Led Pathway
- How SozoRock Health Works
- Privacy Boundary
- Accessibility
- About SozoRock Health

Residents must never see:

- county operating tools
- internal action queues
- administrative controls
- system configuration
- technical setup language
- private staff workflows
- internal decision logic
- claims that SozoRock Health diagnoses, treats, prescribes, or replaces licensed care
- partnership claims that have not been approved

## Resident Journey Map

### Home to Start Resident Access

| Step | Resident action | Next screen | Decision point | Consent moment | Fallback | End state | Safety message |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Tap Start Resident Access | Start | Choose a need | None | Read guidance without choosing | Need selected | Nothing is submitted or stored unless you choose to continue. |

### Home to Voice Access

| Step | Resident action | Next screen | Decision point | Consent moment | Fallback | End state | Safety message |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Tap Use Voice Access | Voice | Speak, type, or choose topic | Microphone and AI-assisted guidance before live use | Type instead | Topic guidance shown | Voice Access provides non-clinical support and does not give medical advice. |

### Home to Health Access Day

| Step | Resident action | Next screen | Decision point | Consent moment | Fallback | End state | Safety message |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Tap Find Health Access Day | Day | Browse event cards | Location only if nearby search is used later | Browse example events | Event guidance read | A Health Access Day is not a clinical visit. |

### Home to Hubs

| Step | Resident action | Next screen | Decision point | Consent moment | Fallback | End state | Safety message |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Tap Find Hubs | Hubs | Search by ZIP, city, county, or location | Location before current-location discovery | ZIP code, city, or county search | Hub cards shown | Location is used only with your permission. |

### Menu to Provider-Led Pathway

| Step | Resident action | Next screen | Decision point | Consent moment | Fallback | End state | Safety message |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Menu | Tap Provider-Led Pathway | Provider-Led Pathway | Choose readiness option | None | Read checklist | Prepared questions | Providers keep their platforms. We help you get ready. |

### Menu to Privacy Boundary

| Step | Resident action | Next screen | Decision point | Consent moment | Fallback | End state | Safety message |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Menu | Tap Privacy Boundary | Privacy Boundary | Review what is and is not collected | None | Continue browsing | Trust boundary understood | No PHI. Consent-based. Non-clinical. |

### Menu to How SozoRock Health Works

| Step | Resident action | Next screen | Decision point | Consent moment | Fallback | End state | Safety message |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Menu | Tap How SozoRock Health Works | How It Works | Pick next path | None | Return Home | Journey understood | Share only what is needed and only when you choose. |

### Menu to Accessibility

| Step | Resident action | Next screen | Decision point | Consent moment | Fallback | End state | Safety message |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Menu | Tap Accessibility | Accessibility | Choose voice, tap, typing, ZIP, city, or county | Microphone/location only if used later | Type or search manually | Access option understood | The app works without microphone or current location. |

### Menu to About SozoRock Health

| Step | Resident action | Next screen | Decision point | Consent moment | Fallback | End state | Safety message |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Menu | Tap About SozoRock Health | About | Review product purpose | None | Return Home | Product boundary understood | SozoRock Health does not replace licensed care. |

## Voice Access Design Logic

Voice Access is optional. Typing must always be available.

Build-now foundation:

- Voice Access screen
- Speak button
- Type instead option
- Choose topic option
- microphone consent prompt pattern
- static voice topic list
- non-clinical AI guidance placeholder
- session-only UI state
- service unavailable fallback
- permission denied fallback
- safety copy

Voice Access may help residents:

- understand app options
- prepare for provider access
- find Health Access Day information
- find nearby hubs
- understand privacy boundaries
- get non-clinical next-step guidance
- learn what to bring
- learn what questions to ask a provider
- understand when licensed care or emergency support is needed

Voice Access must not:

- diagnose
- treat
- prescribe
- interpret symptoms as medical advice
- replace a licensed provider
- request unnecessary private health information
- store raw audio by default
- present AI output as medical judgment

## AI Safety Rules

AI can:

- explain app options
- provide non-clinical next-step guidance
- help residents prepare for provider access
- suggest what to bring to an event
- suggest questions to ask a provider
- help find hubs or events after location or ZIP code input
- explain privacy boundaries
- explain accessibility options

AI must not:

- diagnose
- treat
- prescribe
- interpret symptoms as medical advice
- replace a licensed provider
- create a clinical plan
- collect unnecessary private health information
- present confidence as medical certainty
- pressure residents to share sensitive information

AI response style:

- short
- plain language
- calm
- clear
- non-clinical
- resident-friendly
- safety-aware

## Microphone Consent Model

Before microphone input, the app must explain:

- Voice Access is optional.
- The resident can type instead.
- Voice Access is non-clinical.
- The app does not provide medical advice.
- Raw audio should not be stored by default.
- The resident should not share private health information unless a future consent model clearly allows it.

The app must still work if microphone permission is refused.

Fallback:

- type instead of speaking
- choose a topic
- read static guidance

## Location Consent Model

Before current-location discovery, the app must explain:

- location is optional
- ZIP code search is available
- city or county search is available
- location is used to show nearby hubs or events
- no background tracking
- no location history
- no resident movement tracking

The app must still work if location permission is refused.

Fallback:

- search by ZIP code
- search by city
- search by county
- browse static cards

## Google Maps and Geospatial Discovery Logic

The app is designed for Google Maps and geospatial discovery, but V0 does not activate live map services.

Required future capabilities:

- search by ZIP code
- search by city
- search by county
- use current location only with permission
- show nearby hubs
- show Health Access Day event locations
- show distance estimates
- show directions
- show accessibility notes
- show hub cards linked to map results
- show event cards linked to map results

Required boundaries:

- no background location tracking
- no location history
- no resident movement tracking
- no automatic location capture
- no hidden location collection
- approximate location should be enough where possible
- location permission must be explained in plain language
- Google Maps attribution must remain visible when Google Maps is active
- map data must be handled according to platform rules

## Hub Card Data Model

Each hub card includes:

- hub name
- hub type
- address
- distance
- hours
- access support available
- accessibility notes
- phone or website if available
- directions
- verification status
- last updated date
- privacy note
- partner status wording
- map-ready coordinates

Partner status rule:

Do not imply partnership unless formally approved. Use neutral language such as "listed access point," "community location," or "resource listing" unless partnership is confirmed.

## Health Access Day Event Card Data Model

Each event card includes:

- event name
- date
- time
- venue
- address
- what to expect
- what to bring
- what is not collected
- who it is for
- accessibility notes
- registration status
- contact or next step
- event status
- last updated date
- map-ready coordinates

Health Access Day must not:

- present itself as a clinical appointment
- collect private health information by default
- require registration for basic browsing
- imply provider services unless formally confirmed

## Provider-Led Pathway Model

Required visible text:

**Providers keep their platforms. We help you get ready.**

Pathway options:

- I already have a provider
- I need help preparing for provider access
- I need community support before I can connect

Provider-Led Pathway includes:

- preparation checklist
- questions to ask a provider
- what to bring
- what SozoRock Health does not do
- safety reminder
- option to use Voice Access
- option to find nearby hubs
- option to review Health Access Day information

The app must not create provider-patient messaging, provide diagnosis, prescribe, or schedule clinical care unless a future compliant model is explicitly designed.

## Resident Guidance Model

Guidance should be short and action-oriented.

Guidance types:

- next-step cards
- preparation checklists
- privacy reminders
- provider preparation questions
- what to bring
- where to go next
- emergency redirect language
- digital help instructions
- accessibility help
- Voice Access prompts
- map search help
- hub discovery help
- event discovery help

## Privacy and Data Classification

Privacy default:

Use the least amount of information needed. Do not request private health information unless a future compliant consent model is created. No PHI should be required for basic app use.

| Category | Purpose | Required | Stored | Retention assumption | Consent requirement | Deletion expectation | Risk | Resident-facing explanation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| No data collected | Basic browsing | No | No | None | Not required | Nothing to delete | Low | You can browse without sharing private information. |
| Session-only app state | Remember choices while app is open | No | No persistent storage in V0 | Current session only | Implied by use | Clears when session ends | Low | The app may remember your choice while you are using it. |
| Optional contact data | Future follow-up or reminders | No | Not in V0 | Future policy required | Explicit consent required | Future deletion path required | Medium | Contact sharing is not active in this foundation. |
| Location data | Show nearby hubs or events | No | No in V0 | Session only if enabled later | Explicit location permission | No location history in V0 | Medium | Location is optional. |
| ZIP code search | Find nearby hubs or events | No | No persistent storage in V0 | Current session only | Resident enters voluntarily | Clears when session ends | Low | You can use a ZIP code instead of location. |
| Voice input | Future microphone-based Voice Access | No | No raw audio storage by default | Temporary processing only in a future approved model | Explicit microphone consent | Future policy required | Medium | Voice is optional. You can type instead. |
| AI transcript | Future AI guidance | No | Not in V0 | Future policy required | Explicit AI guidance consent | Future deletion path required | Medium | AI guidance is not medical advice. |
| Event interest | Future event readiness | No | Not in V0 | Future policy required | Explicit reminder consent | Future deletion path required | Low | Browsing event cards does not sign you up. |
| Hub search | Find access points | No | No persistent storage in V0 | Current session only | Resident enters voluntarily | Clears when session ends | Low | You can browse example hubs without private information. |
| Future account data | Saved preferences only after review | No | Not in V0 | Future policy required | Explicit account consent | Future deletion path required | Medium | Accounts are not part of this foundation. |

## Accessibility Requirements

Design for older adults, digitally excluded residents, low-bandwidth users, and residents who may be uncomfortable with technology.

Include:

- large tap targets
- clear labels
- high contrast
- plain language
- screen reader labels
- voice and tap alternatives
- keyboard navigation for web
- low-literacy-friendly copy
- permission-denied recovery messages
- Spanish-ready content structure, even if English launches first
- offline or low-connectivity fallback states

## Emergency and Crisis Stop Rules

Show clear escalation language where relevant:

- If this is an emergency, call 911.
- If you may harm yourself or someone else, call or text 988 in the U.S.
- If symptoms are severe, sudden, or worsening, contact emergency services or a licensed medical professional.
- SozoRock Health does not provide medical advice, diagnosis, treatment, or prescriptions.

Do not create emergency triage workflows.

## Non-Clinical Analytics Plan

Allowed future metrics:

- app opens
- journey started
- ZIP search used
- city or county search used
- location permission accepted or denied
- hub card viewed
- event card viewed
- Voice Access opened
- type instead selected
- Provider-Led Pathway opened
- Privacy Boundary opened
- Accessibility screen opened

Do not collect or analyze:

- diagnosis
- symptoms
- treatment decisions
- prescription information
- insurance information
- medical record information
- provider-patient messages
- private health information

## App Store Readiness Checklist

- App name: SozoRock Health
- Short description: Non-clinical health access guidance for residents.
- Full description: Explain resident access, Voice Access, Health Access Day, Hubs, Provider-Led Pathways, and non-clinical boundaries.
- Privacy policy requirement: required before public store submission.
- Terms requirement: required before public store submission.
- Data safety disclosure planning: required before live services.
- App privacy disclosure planning: required before live services.
- Microphone purpose text: Voice Access is optional and supports non-clinical access guidance. You can type instead.
- Location purpose text: Location is optional and helps show nearby hubs and events. ZIP code, city, and county search are available instead.
- Age rating considerations: no clinical care, no user-generated medical content, no emergency workflow.
- Screenshot plan: Home, Start, Voice, Day, Hubs, Provider-Led Pathway, Privacy Boundary.
- Demo mode plan: static fallback cards and service-unavailable states.
- Support contact: required before store submission.
- Accessibility statement: required before store submission.
- Non-clinical disclaimer: required across app and store copy.

## V0, V1, and V2 Delivery Roadmap

### V0 - App Foundation

- mobile-first navigation
- Home screen
- Start screen
- Voice screen
- Health Access Day screen
- Hubs screen
- Provider-Led Pathway screen
- Privacy Boundary screen
- How It Works screen
- Accessibility screen
- About screen
- static resident guidance
- static hub card model
- static Health Access Day event card model
- consent screen patterns
- safety and emergency language
- privacy boundary language
- empty states
- loading states
- error states
- offline states
- permission-denied states
- service-unavailable states

### V1 - Live Resident Services

- live AI guidance
- microphone-based Voice Access
- type instead option
- ZIP code search
- city and county search
- current-location search with permission
- Google Maps integration
- geospatial hub discovery
- event discovery
- directions
- distance estimates
- AI fallback when live services are unavailable

### V2 - Operational Readiness

- content management for hubs and events
- verification status for hub and event listings
- admin review workflow
- last updated dates
- consent logging
- safety review
- non-clinical analytics
- app store privacy disclosures
- public privacy policy readiness
- public terms readiness
- support contact readiness

## Required Screen States

Each major screen should include:

- default state
- empty state
- loading state
- error state
- offline state
- permission-denied state where relevant
- service-unavailable state where relevant
- safety boundary state where relevant

## What Must Be Handled Carefully Before Live Launch

- privacy policy and terms
- public support contact
- app store privacy disclosure
- data safety disclosure
- microphone processing provider
- AI provider selection and safety review
- Google Maps key restrictions and attribution
- location permission wording
- consent logging
- any contact-sharing feature
- any reminder feature
- event and hub verification workflow
- formal partnership wording review

## Web Mirroring Strategy

The web experience should mirror the resident app journey:

Home -> Start -> Voice -> Day -> Hubs -> Provider-Led Pathway -> Privacy Boundary -> How It Works -> Accessibility -> About

The web version should not lead product decisions that make the mobile app feel like a repackaged website.

## Future Backend Boundary

Future backend services may support:

- non-clinical content configuration
- hub directory management
- Health Access Day event directory management
- non-clinical guidance content
- review status for hub and event listings
- consent logging after legal/privacy review
- non-clinical analytics
- role-based admin review later

Future backend services must not support without separate approval:

- PHI collection
- clinical triage
- diagnosis
- treatment
- prescription workflow
- provider-patient messaging
- appointment scheduling
- payment
- insurance data
- EHR integration
- hidden location tracking
- raw audio storage by default

## Stop Rules

Stop if implementation requires:

- backend
- database
- authentication
- storage
- forms that submit data
- notifications
- email or SMS
- live AI
- live maps
- production API keys
- Apple Developer credentials
- Google Play credentials
- resident data capture
- PHI workflow
- clinical workflow
- unsupported partnership claims
- DNS changes
- CloudFront changes
- Route 53 changes
- ACM changes
- OIDC changes
- AWS infrastructure changes

## Developer Commands

Install dependencies:

```bash
npm install
```

Start the resident app:

```bash
npm run mobile:start
```

Run iOS locally where Xcode and Simulator are available:

```bash
npm run mobile:ios
```

Run Android locally where Android tooling is available:

```bash
npm run mobile:android
```

Run web preview:

```bash
npm run mobile:web
```

Typecheck the mobile workspace:

```bash
npm run mobile:typecheck
```
