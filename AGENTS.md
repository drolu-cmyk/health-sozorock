# SozoRock Health Agent Instructions

This repository builds the SozoRock Health prototype for The SozoRock Foundation, Inc.

## Required source-of-truth files

Before making code, content, design, deployment, or infrastructure changes, read:

- `docs/sozorock-health/product-brief.md`
- `docs/sozorock-health/screen-build-spec.md`
- `docs/sozorock-health/architecture.md`
- `docs/sozorock-health/brand-system.md`
- `docs/sozorock-health/content-guardrails.md`
- `docs/sozorock-health/automation-operating-model.md`

## Locked product logic

SozoRock Health has two connected layers:

1. Resident Access Layer — simple, clear, private, human.
2. County Operating Intelligence Layer — geospatial, decision-driven, action-oriented, assurance-controlled.

The operating logic is:

**Signal → Decision → Action → Assurance → Impact**

## Locked language

Use these exact phrases where appropriate:

- Care for Every ZIP Code.
- SozoRock Health turns hidden access barriers into visible action for underserved communities.
- Residents get access. Counties get intelligence. Providers keep their platforms.
- Providers keep their platforms. We help you get ready.
- No PHI. Consent-based. Non-clinical.

Use **Voice Access** for the AI-enabled resident support feature.

Do not use “Sozo” as an assistant name.

## Non-negotiable guardrails

Do not create features, copy, schemas, workflows, or mock data that imply:

- protected health information collection
- diagnosis
- treatment recommendations
- medical advice
- clinical triage
- prescription workflow
- provider-patient relationship
- insurer relationship
- unsupported county, library, provider, or partner endorsement

Use mock or synthetic data only unless explicitly approved.

All dates must be 2026 or later.

Do not use “privacy-minimal.” Use **No PHI. Consent-based. Non-clinical.**

Do not use “care navigator” as the main role. Use **Digital Access Guide**, **Community Access Team**, **Access Workforce**, or another approved non-clinical term.

## Build discipline

One issue equals one measurable outcome.

Do not make the goal do multiple jobs. Put supporting requirements under `Done when`.

For every issue, preserve this structure:

- Goal
- Context
- Constraints
- Priority
- Plan
- Done when
- Verify
- Output
- Stop rules

## Human review required

Human review is required before:

- any external outreach
- any provider-facing claims
- any county, library, or partner reference that could imply formal partnership
- any deployment using real resident data
- any feature that could be interpreted as clinical advice or triage
- any AWS, Google, or paid-resource configuration that can create cost exposure

## Automation stance

Automate everything safe to automate:

- scaffolding
- lint/type/build verification
- static content checks
- mock data generation
- design-token enforcement
- issue templates
- PR summaries
- CI workflows
- accessibility checks
- no-PHI keyword checks
- date checks
- deployment previews

Require human approval where trust, compliance, cost, partnership claims, or clinical boundaries are involved.
