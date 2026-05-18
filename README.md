# SozoRock Health

SozoRock Health is a non-clinical health access intelligence and activation program of The SozoRock Foundation, Inc.

It helps underserved communities turn hidden access barriers into visible action through trusted access points, Voice Access, Health Access Day, Health Equity Hubs, provider-led pathways, workforce capacity, and county operating intelligence.

## Locked promise

**Care for Every ZIP Code.**

## Locked operating logic

**Signal → Decision → Action → Assurance → Impact**

## Product layers

### Resident Access Layer

Simple, clear, private, human.

Resident-facing modules:

- Welcome
- Access Start
- Voice Access
- Health Access Day
- Health Equity Hubs
- Provider-Led Pathways

### County Operating Intelligence Layer

Geospatial, decision-driven, action-oriented, assurance-controlled.

Institutional modules:

- Geospatial Access Operating Picture
- AI Decision Support
- Action Queue
- Assurance Log
- Scenario Planning

## Trust boundary

**No PHI. Consent-based. Non-clinical.**

SozoRock Health does not provide diagnosis, treatment, clinical triage, prescriptions, medical advice, or provider-patient services.

## Provider pathway language

**Providers keep their platforms. We help you get ready.**

This describes the resident-facing meaning of the Bring Your Own Platform model. Licensed providers retain responsibility for their own clinical systems, records, compliance processes, medical judgment, and patient care.

## Source of truth

Before building, read:

- `AGENTS.md`
- `docs/sozorock-health/product-brief.md`
- `docs/sozorock-health/screen-build-spec.md`
- `docs/sozorock-health/architecture.md`
- `docs/sozorock-health/brand-system.md`
- `docs/sozorock-health/content-guardrails.md`
- `docs/sozorock-health/automation-operating-model.md`

## Automation stance

Automate everything safe to automate. Require human review where trust, compliance, clinical boundaries, cost exposure, external outreach, or partnership claims are involved.

## Current status

Issue 001 scaffold is underway as a standalone Next.js App Router prototype.

Routes:

- `/`
- `/resident`
- `/county`
- `/about-model`

Local commands:

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run guardrails
npm run verify
npm audit --audit-level=moderate
```

This first build uses mock or synthetic data only and does not require AWS, Google, or OpenAI keys.
