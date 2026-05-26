# Mobile Release Checklist

## Internal Test Readiness

Complete before any internal native test build:

- [ ] Expo config reviewed.
- [ ] iOS bundle identifier reviewed: `org.sozorockfoundation.health`.
- [ ] Android package name reviewed: `org.sozorockfoundation.health`.
- [ ] App display name reviewed: SozoRock Health.
- [ ] App icon reviewed.
- [ ] Splash screen reviewed.
- [ ] Resident navigation reviewed.
- [ ] Resident privacy language reviewed.
- [ ] No county/model links appear in resident navigation.
- [ ] No backend endpoint is configured.
- [ ] No API keys are configured.
- [ ] No secrets are committed.
- [ ] No live AI is active.
- [ ] No live maps are active.
- [ ] No data capture is active.
- [ ] No PHI is active.
- [ ] No clinical workflow is active.
- [ ] EAS account/project ownership is confirmed.
- [ ] Apple/Google credentials are handled outside the repository.

## External Stakeholder Preview Readiness

Complete before any external stakeholder build:

- [ ] Legal/privacy review completed.
- [ ] App store metadata reviewed.
- [ ] App category reviewed.
- [ ] Crisis and emergency language reviewed.
- [ ] Permission prompts reviewed.
- [ ] Accessibility review completed.
- [ ] Device QA completed on representative iOS and Android devices.
- [ ] Support URL is live.
- [ ] Privacy policy URL is live.
- [ ] Screenshot set is approved.
- [ ] Test audience and distribution scope are approved.
- [ ] Stakeholder feedback process is ready.

## Production Submission Readiness

Complete before production store submission:

- [ ] Apple Developer account ready.
- [ ] Google Play Console ready.
- [ ] iOS signing credentials ready.
- [ ] Android signing path ready.
- [ ] Privacy disclosures complete.
- [ ] Google Play Data Safety form complete.
- [ ] Apple privacy nutrition labels complete.
- [ ] Age rating reviewed.
- [ ] Support process ready.
- [ ] Incident response process ready.
- [ ] Privacy policy and terms are live.
- [ ] Release approval signed off.
- [ ] App Store submission owner confirmed.
- [ ] Google Play submission owner confirmed.

## Stop Rules

Stop release work if any path requires:

- backend implementation without approval
- database, auth, storage, or submitted forms
- live AI, live maps, or geospatial runtime
- microphone capture without consent approval
- location capture without consent approval
- resident data capture
- PHI workflow
- clinical workflow
- provider-patient messaging
- appointment scheduling
- insurance data
- payment data
- EHR integration
- AWS resource creation
- Google Cloud resource creation
- Firebase resource creation
- Google Maps runtime activation
- Vertex AI runtime activation
- Gemini runtime activation
- secrets or API keys in the repository
- EAS build execution without release approval
- EAS submit execution without release approval
- App Store submission without release approval
- Google Play submission without release approval

## Release Boundary

This checklist prepares future readiness only. It does not authorize store submission, live services, credential creation, or production release.

