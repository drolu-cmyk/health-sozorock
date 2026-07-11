# Post-Deployment Verification Checklist

## Purpose

Use this checklist after the existing static hosting pipeline completes for the static resident app preview.

This checklist verifies the live static preview only. It does not authorize new infrastructure, backend runtime, live services, secrets, API keys, SDK imports, or deployment provider setup.

Required boundary:

**No PHI. Consent-based. Non-clinical.**

Resident promise:

**Care for Every ZIP Code.**

Provider boundary:

**Providers keep their platforms. We help you get ready.**

Locked operating logic:

**Signal → Decision → Action → Assurance → Impact**

## Live URL

Check:

- live URL loads
- page returns a successful response
- preview reflects the expected release checkpoint
- no unexpected redirect appears
- no hosting or infrastructure details are added to resident-facing copy

## Resident Screens

Check each screen:

- Home renders
- Start renders
- Voice Access renders
- Health Access Day renders
- Hubs renders
- Provider-Led Pathway renders
- How it works renders
- Privacy Boundary renders
- Accessibility renders
- What we do renders

## Navigation

Check:

- menu drawer works
- bottom navigation works
- fallback preview cards render
- no broken navigation appears
- no county console is visible in resident navigation
- no backend, infrastructure, model, Action review, Assurance checks, synthetic signals, or administrative labels appear in resident navigation

## Required Language

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

- no live AI behavior
- no live maps behavior
- no microphone capture
- no location capture
- no resident data capture
- no PHI workflow
- no clinical workflow
- no provider-patient messaging
- no appointment scheduling
- no insurance workflow
- no backend runtime behavior
- no county console exposure

## Browser Checks

Check:

- no console errors
- no unexpected network calls
- no request to live AI providers
- no request to live maps providers
- no request to backend endpoints
- no request to database, auth, or storage services
- no SDK runtime behavior

## Mobile Viewport Checks

Check:

- mobile viewport renders
- no page-level horizontal overflow appears
- menu drawer remains usable
- bottom navigation remains usable
- fallback preview cards remain readable
- privacy and accessibility screens remain readable

## Desktop Viewport Checks

Check:

- desktop browser preview renders
- content remains readable
- fallback preview cards remain readable
- navigation remains understandable
- no county operating console is exposed

## Release Checkpoint Record

Record:

- release date
- release checkpoint commit
- PR number
- live URL checked
- reviewer
- verification result
- follow-up needed

Do not record PHI, resident identity, clinical information, insurance information, payment information, appointment information, raw audio, transcripts, or precise location history.

## Stop Rules

Stop verification and report if:

- live URL does not load
- required resident boundary language is missing
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
- any step requires new infrastructure, secrets, API keys, SDK imports, backend runtime, or runtime service adapters
