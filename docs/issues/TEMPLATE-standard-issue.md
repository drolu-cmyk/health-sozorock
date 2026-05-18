# Issue Template

## Goal

Define one clear architectural or system outcome. Do not list multiple goals.

## Context

Explain why this issue matters and name the source-of-truth files that must be read first.

Required reading:

- `AGENTS.md`
- `docs/sozorock-health/product-brief.md`
- `docs/sozorock-health/screen-build-spec.md`
- `docs/sozorock-health/architecture.md`
- `docs/sozorock-health/brand-system.md`
- `docs/sozorock-health/content-guardrails.md`
- `docs/sozorock-health/automation-operating-model.md`

## Constraints

List the non-negotiables that apply to the issue.

Base constraints:

- No PHI.
- Consent-based.
- Non-clinical.
- No diagnosis.
- No treatment recommendations.
- No medical advice.
- No clinical triage.
- No prescription workflow.
- No unsupported partnership claims.
- No 2025 dates.
- Use Voice Access, not Sozo.
- Use `No PHI. Consent-based. Non-clinical.`
- Use `Providers keep their platforms. We help you get ready.` where provider-led pathways are referenced.

## Priority

Define the order of tradeoffs.

Default priority:

1. Preserve non-clinical and no-PHI boundaries.
2. Preserve locked product architecture.
3. Preserve locked brand language.
4. Keep the implementation readable, modular, and deployable.
5. Use mock or synthetic data only.

## Plan

Describe the expected implementation sequence.

## Done when

List the concrete acceptance criteria that prove the single goal is complete.

## Verify

List commands and manual checks.

Minimum commands when code exists:

```bash
npm run lint
npm run typecheck
npm run build
npm audit --audit-level=moderate
```

Minimum manual checks:

- No PHI language appears.
- No clinical workflow appears.
- No `Sozo` assistant appears.
- No `privacy-minimal` label appears.
- No 2025 dates appear.
- No unsupported partnership claims appear.
- Required locked phrases remain intact.

## Output

Return:

- Summary of changes
- Files changed
- Verification results
- Screens/routes created or modified
- Assumptions
- Blockers
- Recommended next issue

## Stop rules

Stop and report if:

- Required source-of-truth docs are missing.
- Required brand assets are missing for the issue.
- The requested work requires PHI.
- The requested work implies clinical advice, triage, diagnosis, or treatment.
- The requested work requires paid AWS or Google resource activation without approval.
- The requested work implies unsupported partnerships.
- Secrets or environment variables are required but unavailable.
