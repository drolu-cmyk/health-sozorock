# SozoRock Health Automation Operating Model

## Automation principle

Automate everything safe to automate.

Require human review where trust, compliance, clinical boundaries, cost exposure, external outreach, or partnership claims are involved.

## Goal structure

For complex work, define one clear architectural outcome as the goal.

Do not make the goal do many things.

Put interdependent implementation requirements under `Done when`.

## Standard issue structure

Every issue should use:

- Goal
- Context
- Constraints
- Priority
- Plan
- Done when
- Verify
- Output
- Stop rules

## Safe automation areas

Automate:

- repo scaffolding
- documentation generation
- issue creation
- branch setup
- static UI build
- mock data generation
- lint/type/build verification
- dependency audit
- static content checks
- no-PHI scans
- no-2025 date scans
- no-clinical-language scans
- no unsupported partnership language scans
- accessibility checks
- responsive UI checks
- PR summaries
- preview deployments
- changelog drafts

## Human review required

Human review is required before:

- external outreach
- real resident data collection
- provider-facing claims
- county/library/partner claims
- any use of paid AWS or Google resources that can create cost exposure
- production deployment
- public launch
- clinical-adjacent feature expansion
- legal/privacy language changes
- grant/funder submission
- media/public claims

## Recommended toolchain

### GitHub

Use GitHub for:

- source control
- issue tracking
- pull requests
- CI checks
- branch protection when ready
- repository audit history

### Codex

Use Codex for:

- issue-by-issue implementation
- refactoring
- test fixes
- componentization
- CI issue resolution
- static analysis
- build verification

Codex should always start from the latest `main` and work on one issue at a time.

### ChatGPT 5.5

Use ChatGPT for:

- product strategy
- issue framing
- acceptance criteria
- architectural review
- prompt design
- compliance guardrail review
- narrative and stakeholder language

### Image generation

Use image generation for:

- concept mockups
- visual direction
- UI inspiration
- screen direction

Do not treat generated images as final production UI assets unless explicitly converted into code or design components.

### Google resources

Use Google resources where applicable for:

- geospatial mapping
- place/resource search
- geocoding
- routes and travel burden analysis
- map-supported access planning

Do not imply a Google partnership unless formal.

### AWS

Use AWS as the target cloud foundation where applicable.

Start cost-controlled. Use mock data until pilot scope is approved.

Potential resources by stage:

- S3
- CloudFront
- Amplify
- Cognito
- API Gateway
- Lambda
- DynamoDB
- CloudWatch
- CloudTrail
- Secrets Manager or Parameter Store
- WAF
- EventBridge
- Step Functions
- Bedrock if selected later

## Deployment stance

Urgent deployment path:

1. Static Next.js prototype.
2. Preview deployment.
3. CI checks.
4. No-PHI/content guardrail checks.
5. AWS target architecture documented.
6. Backend and paid cloud services added only after review.

If speed is the immediate priority, deploy the frontend preview first and harden cloud architecture in follow-on issues.

If AWS-only is required, use AWS Amplify or S3 plus CloudFront depending on the app shape.

## CI checks to add

Minimum CI:

- install dependencies
- lint
- typecheck
- build
- audit
- content guardrail scan

Guardrail scan should fail on:

- 2025
- privacy-minimal
- Sozo assistant
- care navigator
- diagnosis
- treatment recommendation
- medical advice
- clinical triage
- prescription
- protected health information collection
- partner claim language unless approved

## Stop rules

Stop implementation and report if:

- brand assets are missing and required for the issue
- the issue would require PHI
- the feature could be interpreted as clinical advice
- deployment needs paid AWS or Google resource activation without approval
- real resident data is requested
- a partnership claim is requested without documentation
- environment variables or secrets are missing
- build requirements are unclear enough to create unsafe drift

## First sprint recommendation

1. Bootstrap repo source of truth.
2. Scaffold Next.js app.
3. Build Resident Access Layer.
4. Build County Operating Intelligence Layer.
5. Add content guardrail scan.
6. Add deployment preview.
7. Add AWS architecture issue.
8. Add Google mapping integration issue.
9. Add Voice Access simulation issue.
10. Add human review workflow issue.
