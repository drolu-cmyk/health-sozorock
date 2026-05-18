# SozoRock Health Screen-by-Screen Build Spec

## Product build principle

Build two connected experiences:

- Resident Access Layer — simple, clear, private, human.
- County Operating Intelligence Layer — geospatial, decision-driven, action-oriented, assurance-controlled.

The product must remain:

**No PHI. Consent-based. Non-clinical.**

## Resident Access Layer

### Screen 1 — Welcome

Purpose: introduce SozoRock Health with immediate clarity.

Primary message: **Care for Every ZIP Code.**

Supporting copy: Health access made easier for underserved communities.

Primary action: Get Started.

Data collected: none.

Guardrail: do not mention AI, care navigation, diagnosis, treatment, or clinical services.

### Screen 2 — Access Start

Purpose: give residents a simple starting point.

Primary question: What do you need today?

Actions:

- Find Local Support
- Health Access Day
- Digital Help
- Voice Access

Data collected: none until the resident chooses a support path.

AI support: can suggest the right path based on plain-language user input.

Guardrail: do not imply emergency, clinical, or diagnostic triage.

### Screen 3 — Voice Access

Purpose: help residents speak or tap to find local support.

Primary message: Speak or tap to find local support.

Example prompts:

- Find support near me.
- Show Health Access Day.
- Find a Health Equity Hub.
- Help me prepare for a virtual visit.

AI support: natural-language intake, resource matching, event lookup, hub lookup, and digital readiness help.

Human review: required before institutional action or follow-up workflow.

Guardrail: Voice Access must state: **Voice Access provides non-clinical support and does not give medical advice.**

### Screen 4 — Health Access Day

Purpose: show the field activation model.

Primary message: A community event for health education, digital readiness, and trusted access support.

Actions:

- Register / RSVP
- Find Events Near Me
- Request Reminder
- See What to Expect

Data collected:

- first name
- ZIP code
- optional phone or email
- consent for reminder or follow-up

No PHI rule: do not collect diagnosis, medication, symptoms, treatment history, insurance details, or medical records.

### Screen 5 — Health Equity Hubs

Purpose: show ongoing access points.

Hub types:

- Library-based
- Community-based
- Home-based

Actions:

- View Map
- See Hub Details
- Get Directions
- Use Voice Access

Data shown:

- hub name
- access type
- distance
- available non-clinical support
- hours, if available

Guardrail: do not imply a hub provides medical care unless a licensed provider independently operates there under its own authority.

### Screen 6 — Provider-Led Pathways

Purpose: explain Bring Your Own Platform without jargon.

Resident-facing headline: **Providers keep their platforms. We help you get ready.**

Supporting copy: Licensed providers use their own approved platforms, records, and clinical systems. SozoRock Health supports access readiness.

Actions:

- Learn More
- Prepare for a Visit
- Find Available Support

Guardrail: do not claim SozoRock Health provides care, diagnosis, treatment, prescriptions, or medical advice.

## County Operating Intelligence Layer

### Screen 7 — Geospatial Access Operating Picture

Purpose: show where access barriers are concentrated and where action is needed.

Core modules:

- Access Gap Map
- Hub Coverage
- Travel Time
- Digital Readiness
- Provider-Led Pathways
- Priority ZIP Codes

Primary output: recommended next action based on location-based access signals.

Data used:

- ZIP-code access signals
- hub activity
- event activity
- digital readiness patterns
- travel burden
- community input
- public or approved resource data

Guardrail: use synthetic or non-clinical aggregated data in prototype.

### Screen 8 — AI Decision Support

Purpose: explain why the system recommends an action.

Primary module: Recommended Action.

Example: Schedule Health Access Day in ZIP 12345.

Why:

- high access gap
- low hub coverage
- longer travel burden
- digital readiness barriers
- recent engagement signals

Required control: Human review required before action.

Guardrail: AI recommends operational actions only. It does not make clinical decisions.

### Screen 9 — Action Queue

Purpose: turn insight into assigned work.

Fields:

- Action
- Priority
- Owner
- Due date
- Status
- Evidence source

Example actions:

- Schedule Health Access Day.
- Add digital access support.
- Review readiness barriers.
- Update community resource information.
- Run privacy and boundary check.
- Prepare county access report.

Guardrail: no automated outreach without review and consent.

### Screen 10 — Assurance Log

Purpose: show governance, trust, and compliance controls.

Required checks:

- Consent captured.
- No protected health information collected.
- Non-clinical boundary reviewed.
- Provider responsibility confirmed.
- Report generated with controls.
- Data source verified.
- Human review completed.

Primary badge: **No PHI. Consent-based. Non-clinical.**

Guardrail: this screen is mandatory for county, funder, and legal credibility.

### Screen 11 — Scenario Planning

Purpose: help decide where to invest next.

Core question: Where should we focus next?

Scenario types:

- next Health Access Day
- new Health Equity Hub
- digital guide coverage
- workforce need
- grant evidence
- county report

Projected impact:

- residents reached
- access gap reduction
- digital readiness improvement
- new connections
- workforce required

Guardrail: scenario results must be framed as planning support, not guaranteed outcomes.

## Build order

### Phase 1 — Static prototype

Build:

- Welcome
- Access Start
- Voice Access
- Health Access Day
- Health Equity Hubs
- Provider-Led Pathways
- Geospatial Access Operating Picture
- Action Queue
- Assurance Log
- Scenario Planning

Use mock data only.

### Phase 2 — Controlled demo logic

Add:

- ZIP-code filtering
- mock event registration
- hub locator
- Voice Access simulation
- AI Decision Support mock reasoning
- Action Queue status updates
- Assurance Log checks
- Scenario Planning calculations

### Phase 3 — Pilot-ready version

Add:

- consent capture
- admin review workflow
- CSV export
- county report generation
- synthetic data controls
- role-based views
- audit trail
- human approval gates

## Locked product logic

**Residents get access. Counties get intelligence. Providers keep their platforms.**

**Signal → Decision → Action → Assurance → Impact.**
