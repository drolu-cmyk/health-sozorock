# Static Export Artifact Checklist

## Purpose

Use this checklist after running the resident Expo app static web export command.

This checklist verifies the local static export artifact only. It does not authorize deployment, new hosting setup, infrastructure changes, backend runtime, live services, secrets, API keys, SDK imports, network calls, or runtime service adapters.

Required boundary:

**No PHI. Consent-based. Non-clinical.**

Resident promise:

**Care for Every ZIP Code.**

Provider boundary:

**Providers keep their platforms. We help you get ready.**

Locked operating logic:

**Signal → Decision → Action → Assurance → Impact**

## Export Command

Run:

```bash
npm run mobile:export:web
```

Expected output directory:

```text
apps/mobile/dist
```

## Artifact Checks

Confirm:

- export command completes
- output directory exists
- `apps/mobile/dist/index.html` exists
- static assets exist
- generated files are local static files
- no secrets are present in output
- no API keys are present in output
- no backend endpoint config is present
- no live service configuration is present

## Resident Boundary Checks

Confirm the exported artifact preserves:

- **No PHI. Consent-based. Non-clinical.**
- **Care for Every ZIP Code.**
- **Providers keep their platforms. We help you get ready.**
- **Signal → Decision → Action → Assurance → Impact** if referenced
- **Voice Access** as the voice feature name

## Inactive Service Checks

Confirm:

- live services remain disabled
- Voice Access remains inactive
- AI guidance remains static/inactive
- map discovery remains inactive
- location remains inactive
- hub information remains static/local-only
- no resident data capture exists
- no PHI workflow exists
- no clinical workflow exists
- no county console appears in resident navigation

## Static Output Safety Checks

Inspect the output for:

- no secret-like values
- no API key-like values
- no backend endpoint configuration
- no live AI provider configuration
- no live map provider configuration
- no microphone capture configuration
- no location capture configuration
- no account, form, auth, database, or storage configuration

## Stop Rules

Stop artifact approval if the export output includes:

- secrets
- API keys
- backend endpoint config
- live AI configuration
- live map configuration
- microphone capture configuration
- location capture configuration
- resident data capture
- PHI workflow
- clinical workflow
- provider-patient messaging
- appointment scheduling
- insurance workflow
- payment workflow
- county console exposure in resident navigation
