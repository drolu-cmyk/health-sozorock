# Static Resident Preview Deployment Release

## Purpose

Issue 043 prepares the current static resident app preview for deployment through the existing static hosting path only.

This document is release readiness guidance. It does not execute deployment, create infrastructure, add backend runtime, activate live services, or add product capability.

Required boundary:

**No PHI. Consent-based. Non-clinical.**

Resident promise:

**Care for Every ZIP Code.**

Provider boundary:

**Providers keep their platforms. We help you get ready.**

Locked operating logic:

**Signal → Decision → Action → Assurance → Impact**

## Release Scope

The release scope is the static resident app preview produced by the current repository state.

The release is limited to:

- documentation for release readiness
- post-deployment verification expectations
- existing static hosting pipeline boundary notes
- rollback/checkpoint guidance
- guardrail confirmation

This issue does not deploy from Codex and does not add deployment provider setup.

## Current Main Commit

Current main at the start of Issue 043:

`d268d7d docs: add static preview deployment readiness checklist`

Before release, confirm the merge commit for this issue and use that commit as the preview checkpoint.

## Existing Static Hosting Posture

The project already has a static hosting path connected to the repository.

Merge to main may trigger the existing static hosting pipeline.

Do not create new infrastructure for this release.

Do not add or expose secrets.

Do not enable backend runtime.

Do not enable live services.

## Deployment Boundary

Use only the existing repository/static hosting pipeline already configured for the project.

Allowed release posture:

- merge reviewed documentation and static resident app changes through the normal repository flow
- allow the existing connected pipeline to process main if it is already configured to do so
- verify the resulting live static preview after the existing pipeline completes

Not allowed:

- running a deployment command from Codex
- creating a new Amplify setup
- creating a new CloudFront setup
- changing DNS
- changing Route 53
- changing ACM
- changing OIDC
- adding infrastructure-as-code
- adding cloud resource configuration
- adding backend runtime
- adding secrets or API keys
- adding SDK imports or runtime service adapters

## What Is Being Released

The static resident app preview includes:

- resident app shell
- resident navigation
- static guidance screens
- fallback preview cards
- Voice Access inactive state
- AI guidance static/inactive state
- map and location inactive states
- static/local-only hub information
- privacy and accessibility boundary screens

The static resident app preview does not include:

- live AI
- live maps
- microphone capture
- location capture
- backend runtime
- resident account
- forms
- PHI collection
- clinical workflow
- appointment scheduling
- insurance workflow
- provider messaging
- county console

## What Remains Inactive

The following remain inactive:

- Voice Access live capture
- live AI guidance
- live map discovery
- live location capture
- geospatial runtime
- backend runtime
- database
- auth
- storage
- submitted forms
- resident data capture
- PHI workflow
- clinical workflow
- provider-patient messaging
- appointment scheduling
- insurance processing
- payment processing
- EHR integration
- runtime service adapters

## Pre-Release Verification

Before merging or releasing the static preview checkpoint, run:

```bash
npm test
npm run mobile:typecheck
npm run lint
npm run typecheck
npm run build
npm run guardrails
npm run verify
npm audit --audit-level=moderate
node scripts/smoke-test-health-domain.mjs --fallback-only
npm run mobile:web
```

Stop the local mobile web server after verification.

Confirm:

- **No PHI. Consent-based. Non-clinical.** appears correctly.
- **Care for Every ZIP Code.** appears correctly.
- **Providers keep their platforms. We help you get ready.** appears correctly.
- **Signal → Decision → Action → Assurance → Impact** appears exactly if referenced.
- Voice Access is inactive.
- AI guidance is static/inactive.
- Map discovery is inactive.
- Location is inactive.
- Hub information is static/local-only.
- No county console appears in resident navigation.
- No backend runtime is active.
- No deployment or infrastructure change is required.
- No network calls are introduced.
- No SDK imports are introduced.
- No secrets or API keys are introduced.
- No resident data capture exists.
- No PHI or clinical workflow exists.

## Release Steps Using Existing Pipeline Only

1. Confirm the PR is approved and CI has passed.
2. Squash merge to main using the approved release message.
3. If the repository is already connected to a static hosting pipeline, allow the existing pipeline to run.
4. Do not create new infrastructure for this release.
5. Do not add or expose secrets.
6. Do not enable backend runtime.
7. Do not enable live services.
8. Record the resulting main commit as the static preview checkpoint.
9. Run the post-deployment verification checklist after the existing pipeline completes.

These steps do not authorize deployment execution from Codex. They document the boundary for the existing connected pipeline after merge.

## Post-Release Verification

After the existing static hosting pipeline completes, use:

- `docs/sozorock-health/post-deployment-verification-checklist.md`

Post-release verification must confirm:

- live URL loads
- all resident screens render
- no console errors appear
- no unexpected network calls appear
- no live AI behavior appears
- no live maps behavior appears
- no microphone capture appears
- no location capture appears
- no resident data capture appears
- no PHI workflow appears
- no clinical workflow appears
- no county console appears in resident navigation

## Rollback And Checkpoint Guidance

Before release:

- record the current main commit
- record the PR number
- record the release checkpoint commit
- keep the previous accepted static preview checkpoint available

If post-release verification fails:

- stop sharing the preview link
- report the failed check
- compare against the previous accepted checkpoint
- revert or supersede the release through the normal repository review process
- do not hot-fix live behavior outside the repository review process
- do not create infrastructure changes as a rollback shortcut

## Stop Rules

Stop release preparation if any step requires:

- deployment execution from Codex
- new deployment provider setup
- new Amplify setup
- CloudFront changes
- DNS changes
- Route 53 changes
- ACM changes
- OIDC changes
- infrastructure-as-code
- backend runtime
- database
- auth
- storage
- submitted forms
- live AI
- live maps
- microphone capture
- location capture
- resident data capture
- PHI workflow
- clinical workflow
- provider-patient messaging
- appointment scheduling
- insurance data
- payment data
- EHR integration
- AWS resources
- Google Cloud resources
- Firebase resources
- Google Maps runtime
- Vertex AI runtime
- Gemini runtime
- OpenAI runtime
- secrets
- API keys
- SDK imports
- network calls
- runtime service adapters

## Recommended Next Issue

Issue 044 - Live static preview verification and public-readiness cleanup
