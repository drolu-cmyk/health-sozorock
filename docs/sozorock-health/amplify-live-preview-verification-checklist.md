# Amplify Live Preview Verification Checklist

## Purpose

Use this checklist after AWS Amplify Hosting publishes the static resident app preview artifact from `apps/mobile/dist`.

This checklist verifies the live static preview only. It does not authorize backend runtime, Amplify backend categories, secrets, API keys, SDK imports, infrastructure changes, live services, or resident data capture.

Required boundary:

**No PHI. Consent-based. Non-clinical.**

Resident promise:

**Care for Every ZIP Code.**

Provider boundary:

**Providers keep their platforms. We help you get ready.**

Locked operating logic:

**Signal → Decision → Action → Assurance → Impact**

## Amplify Build Check

Confirm the Amplify Hosting build:

- uses the repository root
- runs `npm install`
- runs `npm run mobile:export:web`
- publishes `apps/mobile/dist`
- does not run backend phases
- does not configure Amplify backend categories
- does not require secrets
- does not require API keys
- does not require Google resources
- does not require runtime service adapters

## Live URL Checks

Confirm:

- Amplify live URL loads
- page returns a successful response
- preview reflects the expected release checkpoint
- no unexpected redirect appears
- no hosting or infrastructure details appear in resident-facing copy

## Resident Screen Checks

Confirm each resident screen renders:

- Home
- Start
- Voice Access
- Health Access Day
- Hubs
- Provider-Led Pathway
- How SozoRock Health Works
- Privacy Boundary
- Accessibility
- About SozoRock Health

## Navigation Checks

Confirm:

- menu drawer works
- bottom navigation works
- fallback preview cards render
- no broken navigation appears
- no county console is visible in resident navigation
- no backend, infrastructure, model, action queue, assurance log, synthetic signals, or administrative labels appear in resident navigation

## Required Language Checks

Confirm:

- **No PHI. Consent-based. Non-clinical.** appears correctly
- **Care for Every ZIP Code.** appears correctly
- **Providers keep their platforms. We help you get ready.** appears correctly
- **Signal → Decision → Action → Assurance → Impact** appears exactly if referenced
- no ASCII-arrow operating logic phrase appears
- **Voice Access** is used as the voice feature name
- "Sozo" is not used as an assistant or shorthand feature name

## Inactive Service Checks

Confirm:

- Voice Access remains inactive
- AI guidance remains static/inactive
- map discovery remains inactive
- location remains inactive
- hub information remains static/local-only
- no live AI behavior appears
- no live maps behavior appears
- no microphone capture appears
- no location capture appears
- no resident data capture appears
- no PHI workflow appears
- no clinical workflow appears
- no provider-patient messaging appears
- no appointment scheduling appears
- no insurance workflow appears
- no backend runtime behavior appears
- no county console exposure appears

## Browser And Network Checks

Confirm:

- no console errors
- no unexpected network calls
- no request to live AI providers
- no request to live maps providers
- no request to backend endpoints
- no request to database, auth, or storage services
- no SDK runtime behavior

## Viewport Checks

Confirm mobile and desktop viewports:

- render successfully
- remain readable
- have usable navigation
- show fallback preview cards clearly
- avoid page-level horizontal overflow
- keep privacy and accessibility screens readable

## Stop Rules

Stop verification and report if:

- Amplify build does not publish `apps/mobile/dist`
- live URL does not load
- required boundary language is missing
- Voice Access appears live
- AI guidance appears live
- map discovery appears live
- location capture appears live
- hub information appears to call a backend
- resident data capture appears
- PHI workflow appears
- clinical workflow appears
- county console appears in resident navigation
- console errors indicate runtime failure
- unexpected network calls appear
- any step requires secrets, API keys, SDK imports, backend runtime, Amplify backend categories, infrastructure changes, or runtime service adapters
