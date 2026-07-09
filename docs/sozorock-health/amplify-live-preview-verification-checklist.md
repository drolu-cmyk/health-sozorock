# Amplify Dynamic Web Verification Checklist

## Purpose

Use this checklist after AWS Amplify Hosting publishes the dynamic Next.js app from `.next` while generating the resident Expo web export artifact at `apps/mobile/dist`.

This checklist verifies the controlled public web app posture. It does not approve new clinical workflows, provider replacement, insurance processing, emergency response, or client-side provider credentials.

Required boundary:

**No PHI. Consent-based. Non-clinical.**

Resident promise:

**Care for Every ZIP Code.**

Provider boundary:

**Providers keep their platforms. We help you get ready.**

Locked operating logic:

**Signal -> Decision -> Action -> Assurance -> Impact**

## Amplify Build Check

Confirm the Amplify Hosting build:

- uses the repository root
- runs `npm install`
- runs `npm run build`
- runs `npm run mobile:export:web`
- publishes `.next`
- does not publish `out`
- does not publish `apps/mobile/dist` as the site root artifact
- generates `apps/mobile/dist` for resident mobile-web QA
- does not expose secrets or provider keys in browser bundles

## Live URL Checks

Confirm:

- Amplify live URL loads
- `/resident` loads
- `/county` loads
- `/about-model` loads
- page returns a successful response
- deployed commit matches the expected release checkpoint
- no unexpected redirect appears
- no hosting or infrastructure details appear in resident-facing copy

## Resident App Checks

Confirm the resident route behaves as an app:

- need selection updates guidance
- search by ZIP code, city, or county returns reviewed results or a useful empty state
- Voice Access is visible
- Voice Access requires permission and readiness before use
- guided text remains available without microphone access
- Health Access Day information is visible
- Health Equity Hubs are visible
- provider-readiness checklist is interactive
- support/contact path is visible
- save-next-step action works locally

## Required Language Checks

Confirm:

- **No PHI. Consent-based. Non-clinical.** appears correctly
- **Care for Every ZIP Code.** appears correctly
- **Providers keep their platforms. We help you get ready.** appears correctly
- **Signal -> Decision -> Action -> Assurance -> Impact** appears exactly if referenced
- **Voice Access** is used as the voice feature name
- public UI does not use GPT-Live, provider names, or implementation labels as feature names

## Dynamic Service Checks

Confirm:

- `/api/access/search` returns customer-facing results or empty states
- `/api/ai/guidance` keeps non-clinical boundaries
- `/api/support` requires consent before submission
- `/api/voice/session` requires consent and readiness before returning any provider session
- no browser bundle contains `OPENAI_API_KEY`, `sk-`, provider bearer tokens, or privileged credentials
- no resident route sends microphone audio unless Voice Access is enabled, consented, and server-authorized
- no resident route requires location access to continue

## Browser And Network Checks

Confirm:

- no console errors
- no failed route loads
- no request exposes provider credentials
- no request to maps, notifications, or voice providers occurs from the browser before permission and readiness gates
- no PHI workflow appears
- no clinical workflow appears
- no county console is exposed in resident navigation

## Viewport Checks

Confirm mobile and desktop viewports:

- render successfully
- remain readable
- have usable navigation
- avoid page-level horizontal overflow at 390px width
- keep tap targets usable
- keep visible focus states
- keep privacy, consent, and support screens readable

## Stop Rules

Stop verification and report if:

- Amplify build publishes `out` instead of `.next`
- live URL does not load
- `/resident`, `/county`, or `/about-model` no longer loads
- required boundary language is missing
- Voice Access returns a provider session without consent and readiness
- AI guidance provides diagnosis, treatment, prescribing, triage, medication advice, clinical planning, or emergency response
- support/contact path is missing
- ZIP, city, or county search is missing
- public UI exposes internal build language
- console errors indicate runtime failure
- browser assets include secrets, provider keys, bearer tokens, or privileged endpoint configuration
