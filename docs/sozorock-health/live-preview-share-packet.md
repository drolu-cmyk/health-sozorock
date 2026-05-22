# SozoRock Health Live Preview Share Packet

## Preview Status

**Approved for internal review.**

This packet is for controlled internal review of the live SozoRock Health preview. It is not a public launch packet, media packet, funder submission, production readiness approval, or deployment authorization.

Decision:

- Approved for internal review.
- Not yet approved for broad public launch.

Trust boundary:

**No PHI. Consent-based. Non-clinical.**

## Live Preview URL

Main preview:

https://main.d1bmgq1fk26xqh.amplifyapp.com/

## Page-By-Page Links

| Page | Link | What reviewers should look at |
| --- | --- | --- |
| Main preview | https://main.d1bmgq1fk26xqh.amplifyapp.com/ | Whether the promise, operating logic, trust boundary, and two-layer model are clear quickly. |
| Resident preview | https://main.d1bmgq1fk26xqh.amplifyapp.com/resident | Whether the resident experience feels simple, private, mobile-first, and non-clinical. |
| County operating intelligence preview | https://main.d1bmgq1fk26xqh.amplifyapp.com/county | Whether the county layer feels like an operating intelligence dashboard with review controls. |
| Model explanation | https://main.d1bmgq1fk26xqh.amplifyapp.com/about-model | Whether the model boundary, source-of-truth logic, and non-clinical limits are understandable. |

## What SozoRock Health Is

SozoRock Health is a non-clinical health access intelligence and activation program of The SozoRock Foundation, Inc.

It helps underserved communities turn hidden access barriers into visible action through trusted access points, Voice Access, Health Access Day, Health Equity Hubs, provider-led pathways, workforce capacity, and county operating intelligence.

Locked promise:

**Care for Every ZIP Code.**

Operating logic:

**Signal → Decision → Action → Assurance → Impact**

Provider pathway:

**Providers keep their platforms. We help you get ready.**

## What SozoRock Health Is Not

SozoRock Health is not:

- a clinic
- a hospital
- a medical practice
- an insurer
- a telehealth provider
- a clinical decision system
- a replacement for licensed providers
- a replacement for county health departments
- a public launch-ready production system
- a resident data collection workflow

The preview does not diagnose, treat, triage, prescribe, store resident information, or provide provider-patient services.

## Resident-Facing Preview Explanation

The Resident Access Layer shows how a resident could understand SozoRock Health in plain language.

Review focus:

- Is the page simple enough for a resident to understand quickly?
- Does Voice Access clearly stay static, non-clinical, and safe?
- Does the resident page avoid sounding like a county dashboard?
- Is **Providers keep their platforms. We help you get ready.** clear?
- Is it obvious that no resident data is being collected in this preview?

Known inactive resident items:

- no forms
- no sign-up
- no reminders
- no notifications
- no messaging workflow
- no resident data capture
- no backend
- no live AI
- no clinical workflow

## County Operating Intelligence Preview Explanation

The County Operating Intelligence Layer shows how counties, funders, internal reviewers, and public-benefit stakeholders could review access signals, action queues, assurance controls, and scenario planning.

Review focus:

- Does the county page feel like an operating dashboard, not a brochure?
- Are the Geospatial Access Operating Picture, AI Decision Support, Action Queue, Assurance Log, Scenario Planning, Human Review Workflow, and Review Queue clear?
- Are review states, evidence sources, owners, and action gates understandable?
- Does the dashboard feel decision-ready without implying automated action?
- Is **Human review required before action.** visible?
- Is **Planning support, not automated decision-making.** visible?

Known inactive county items:

- no backend
- no database
- no live maps
- no live AI
- no automated outreach
- no operational assignments
- no resident data capture
- no PHI workflow
- no clinical workflow

## About-Model Explanation

The model page explains the boundaries behind the preview.

Review focus:

- Is the two-layer structure clear?
- Is the trust boundary visible and understandable?
- Does the page explain that the prototype uses mock or synthetic data?
- Does the page avoid implying clinical services, public launch readiness, or unsupported partnerships?
- Is the source-of-truth operating logic clear?

## What Is Active

The live preview includes:

- static public preview pages
- resident-facing explanation screens
- static Voice Access simulation copy
- mock Health Access Day and Health Equity Hub examples
- provider-led pathway explanation
- county operating dashboard UI
- mock/provider-neutral geospatial view
- AI Decision Support as static operational planning support
- Action Queue mock items
- Assurance Log controls
- Human Review Workflow and Review Queue examples
- Scenario Planning examples
- no-index preview metadata

## What Is Not Active

The live preview does not include:

- forms
- sign-up
- reminders
- notifications
- email
- SMS
- resident data capture
- backend
- database
- authentication
- storage
- live maps
- live AI
- Google runtime calls
- OpenAI runtime calls
- clinical workflow
- PHI workflow
- public launch approval

## Review Instructions

1. Open each preview link.
2. Review on mobile, tablet, and desktop if possible.
3. Start with the main preview, then review the resident page, county page, and model page.
4. Record feedback in `docs/sozorock-health/stakeholder-feedback-log.md`.
5. Use the feedback categories exactly as listed in the feedback log.
6. Mark anything that could affect trust, safety, legal clarity, or public claims as high priority.
7. Do not request live data, resident intake, backend services, custom domain configuration, or public launch changes in this issue.

## Useful Feedback

Useful feedback includes:

- what was clear in under 60 seconds
- what was confusing
- which audience the page seems ready for
- whether the resident page feels simple and safe
- whether the county page communicates operating intelligence
- whether the non-clinical boundary is visible enough
- whether any wording feels too broad, too technical, or too claim-heavy
- whether any section feels visually crowded
- whether any trust or legal concern should block broader sharing

## Out-Of-Scope Feedback For This Issue

The following feedback is useful for later issues, but out of scope for Issue 029:

- custom domain setup
- DNS changes
- backend implementation
- authentication
- database design
- forms or data intake
- resident follow-up workflows
- notifications
- email or SMS
- live map integration
- live AI integration
- public launch planning
- production security architecture

## Feedback Log

Use:

`docs/sozorock-health/stakeholder-feedback-log.md`

Feedback categories:

- Strategic clarity
- Resident clarity
- County value
- Design and usability
- Trust and safety
- Legal/compliance concern
- Technical issue
- Partnership or claims concern
- Future feature idea
- Out of scope

## Next After This

### Issue 030 — Custom Domain Readiness And DNS Plan

Goal:

Define the custom domain readiness plan for the preview without configuring DNS, changing hosting settings, adding infrastructure, or performing cutover.

Expected output:

- domain readiness checklist
- DNS ownership questions
- proposed subdomain options
- routing and rollback notes
- human approval gates
- cost and operational owner notes

Not included:

- no DNS configuration
- no domain connection
- no certificate setup
- no hosting changes
- no deployment changes

### Issue 032 — Backend Architecture Decision Record

Goal:

Create a backend architecture decision record for future pilot readiness without building backend services.

Expected output:

- backend decision record
- options considered
- data boundary
- non-clinical data categories
- human review requirements
- AWS service candidates
- cost and security gates
- stop rules before implementation

Not included:

- no backend implementation
- no database
- no authentication
- no forms
- no storage
- no notifications
- no email/SMS
- no environment variables
- no secrets
- no live resident data
- no PHI workflow
- no clinical workflow
