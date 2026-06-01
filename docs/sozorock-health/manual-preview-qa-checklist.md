# Manual Preview QA Checklist

## Purpose

This checklist supports manual QA for the static resident app preview before any internal or stakeholder review.

This checklist does not authorize deployment. It does not add backend runtime, live services, cloud resources, resident data capture, PHI workflow, or clinical workflow.

Required boundary:

**No PHI. Consent-based. Non-clinical.**

Resident promise:

**Care for Every ZIP Code.**

Provider boundary:

**Providers keep their platforms. We help you get ready.**

Locked operating logic:

**Signal → Decision → Action → Assurance → Impact**

## QA Setup

Use a local static preview only.

Confirm before reviewing:

- no deployment is executed
- no infrastructure is changed
- no environment variables are required
- no secrets or API keys are required
- no backend endpoint is configured
- no live service behavior is expected

## Home

Check:

- Home renders without errors.
- **Care for Every ZIP Code.** is visible.
- **No PHI. Consent-based. Non-clinical.** is visible where expected.
- Primary resident actions are understandable.
- Copy does not imply live AI, live maps, microphone capture, location capture, or resident data capture.

## Start

Check:

- Start renders without errors.
- Guided access options are static.
- No symptoms, diagnosis, treatment, medication, insurance, payment, appointment, or resident identity information is requested.
- Continue action is clear.
- Voice Access is named correctly.

## Voice Access

Check:

- Voice Access renders without errors.
- Voice Access is inactive.
- Guided text support is available.
- No microphone capture starts.
- No raw audio storage is implied.
- No transcript storage is implied.
- Copy does not imply live speech, clinical advice, or emergency response.

## Health Access Day

Check:

- Health Access Day renders without errors.
- Content remains non-clinical.
- No appointment scheduling is offered.
- No registration form is present.
- No PHI collection is requested.
- Emergency and crisis guidance remains plain and limited.

## Hubs

Check:

- Hubs renders without errors.
- Hub information is static/local-only.
- Map discovery is inactive.
- Location is inactive.
- ZIP code, city, or county fallback copy is visible.
- No geolocation prompt appears.
- No backend request is made for hub information.
- No unsupported partnership claim appears.

## Provider-Led Pathway

Check:

- Provider-Led Pathway renders without errors.
- **Providers keep their platforms. We help you get ready.** appears correctly.
- Copy does not imply SozoRock Health provides clinical care.
- Copy does not imply provider-patient messaging, appointment scheduling, insurance processing, or EHR integration.

## How SozoRock Health Works

Check:

- How SozoRock Health Works renders without errors.
- The explanation remains resident-safe and plain-language.
- If the operating logic is referenced, it appears exactly as **Signal → Decision → Action → Assurance → Impact**.
- Copy does not expose backend, infrastructure, or administrative labels.

## Privacy Boundary

Check:

- Privacy Boundary renders without errors.
- **No PHI. Consent-based. Non-clinical.** is visible.
- Copy states that inactive services do not collect audio, transcripts, precise location history, or resident identity information.
- Copy does not imply active consent storage.

## Accessibility

Check:

- Accessibility renders without errors.
- Accessibility support is described as static guidance.
- Voice Access alternatives do not imply live speech capture.
- Location alternatives do not imply live location sharing.
- Text remains readable on mobile and desktop.

## About SozoRock Health

Check:

- About SozoRock Health renders without errors.
- Copy remains non-clinical.
- Copy does not imply medical device operation, clinical service operation, government adoption, or formal provider partnership.
- Public-facing copy names The SozoRock Foundation, Inc. where legal identity is needed.

## Menu Drawer

Check:

- Menu opens and closes.
- Menu items are resident-safe.
- Menu items have understandable labels.
- Menu does not include county operating tools.
- Menu does not include backend, infrastructure, model, action queue, assurance log, synthetic signals, administrative labels, or county console behavior.

## Bottom Navigation

Check:

- Bottom navigation works on mobile and desktop preview.
- Tabs remain limited to Home, Start, Voice, Day, and Hubs.
- No county operating console appears.
- No internal operating intelligence appears.

## Fallback Preview Cards

Check:

- Fallback cards show the feature name.
- Fallback cards show unavailable or static status.
- Fallback cards show resident action before internal preview details.
- Fallback cards show **Live services disabled** where expected.
- Credential/readiness copy does not imply a live service is configured.
- Fallback cards remain readable on mobile.

## Mobile Viewport

Check:

- Use a narrow mobile viewport.
- No text overlaps.
- No page-level horizontal overflow appears.
- Touch targets are usable.
- Resident copy remains readable.
- Navigation remains clear.

## Desktop Browser Preview

Check:

- Use a desktop viewport.
- Screen layout remains readable.
- No page-level horizontal overflow appears.
- Fallback preview cards remain clear.
- Menu and bottom navigation remain understandable.

## Console And Network

Check:

- No console errors appear.
- No unexpected external requests appear.
- No request goes to AWS, Google, Firebase, Google Maps, Vertex AI, Gemini, OpenAI, database services, auth services, storage services, or backend endpoints.
- No SDK runtime behavior appears.

## Final Go/No-Go

Static preview can proceed only if:

- all resident screens render
- all required boundary phrases appear correctly
- **Signal → Decision → Action → Assurance → Impact** appears exactly if referenced
- no ASCII-arrow operating logic phrase appears
- no live service behavior appears
- no resident data capture appears
- no PHI or clinical workflow appears
- no county operating console appears in resident navigation
- no deployment, infrastructure, backend, or runtime adapter change is required
