# SozoRock Health AWS Cost Gates

## Purpose

This document defines cost controls for any future AWS preview or pilot deployment of SozoRock Health.

It is documentation only. It does not create AWS resources, add credentials, add environment variables, deploy infrastructure, activate paid services, or change runtime behavior.

## Cost Control Principle

No AWS cost exposure should be introduced without explicit human approval.

SozoRock Health must remain:

**No PHI. Consent-based. Non-clinical.**

Cost decisions must protect the prototype boundary, resident trust, and the Foundation's operational responsibility.

## Gate Summary

| Gate | Name | Decision required | Status for this issue |
| --- | --- | --- | --- |
| Gate 0 | Documentation only | Confirm no resources, credentials, config, or deployments are added. | Passed by scope. |
| Gate 1 | Preview readiness | Approve a manual preview path and spending ceiling. | Not active. |
| Gate 2 | Public traffic readiness | Approve monitoring, access controls, and public-review risk. | Not active. |
| Gate 3 | Pilot data readiness | Approve non-clinical data handling, retention, and access ownership. | Not active. |
| Gate 4 | Workflow activation | Approve any backend, queue, storage, reporting, or notification workflow. | Not active. |
| Gate 5 | Scale review | Approve budget expansion based on evidence and operating value. | Not active. |

## Gate 0: Documentation Only

Purpose: keep Issue 008 limited to planning.

Allowed:

- AWS target architecture documentation.
- AWS cost gate documentation.
- README links.
- Local verification commands.

Blocked:

- AWS resources.
- AWS SDKs.
- CDK, Terraform, CloudFormation, or Amplify configuration.
- IAM policy files.
- credentials, secrets, or environment variables.
- Deployment commands.
- Paid-service activation.
- External API calls.

Exit criteria:

- Documentation explains the future target state.
- Repository diff remains documentation-only.
- Verification commands pass.

## Gate 1: Preview Readiness

Purpose: decide whether a manual AWS preview should be created later.

Approval questions:

- What is the preview audience?
- Is the preview internal, stakeholder-only, or public-review limited?
- What spending ceiling is approved?
- Who owns AWS account monitoring during the preview?
- Who has authority to pause or delete resources?
- Has the preview deployment checklist passed?

Required controls:

- Manual approval recorded before deployment.
- Billing alerts reviewed.
- No real resident data.
- No PHI workflow.
- No clinical workflow.
- No unsupported partnership claims.
- No external outreach.

Stop if:

- Deployment requires secrets that have not been reviewed.
- Preview requires backend, database, auth, storage, forms, notifications, email, SMS, live geospatial, or live AI services.
- Cost ownership is unclear.

## Gate 2: Public Traffic Readiness

Purpose: protect the Foundation before broader preview traffic.

Approval questions:

- What routes are public?
- What content is intended for review only?
- Is indexing restricted where needed?
- Are logs and operational monitoring sufficient?
- Is there a named owner for incident response?

Required controls:

- Spending ceiling approved.
- Monitoring path approved.
- Content guardrails verified.
- Trust boundary visible.
- Human review required before action.

Stop if:

- Public traffic would imply a launch.
- Resident data capture is introduced.
- Any public-facing copy mentions unsupported partnerships or provider claims.
- Cost alerts or pause authority are not defined.

## Gate 3: Pilot Data Readiness

Purpose: prevent cost and trust drift when moving from static prototype to pilot operations.

Approval questions:

- What non-clinical data is collected?
- Why is each field needed?
- How is consent captured?
- Who can access records?
- How long are records retained?
- What is the expected monthly cost ceiling?

Required controls:

- Data classification complete.
- Consent model reviewed.
- Access model approved.
- Retention rule approved.
- Audit owner named.
- No PHI fields.

Stop if:

- The pilot requires diagnosis, symptoms, medication, treatment history, insurance information, medical records, clinical notes, or provider-patient records.
- The workflow could be interpreted as diagnosis, treatment, clinical triage, prescriptions, or medical advice.
- Cost estimates are missing.

## Gate 4: Workflow Activation

Purpose: require deliberate review before operational workflows create cost, compliance, or trust exposure.

Workflows requiring approval:

- Backend APIs.
- Database writes.
- File or report storage.
- Authentication and role-based access.
- Notifications.
- Email or SMS.
- Queue processing.
- Scheduled jobs.
- AI-generated summaries.
- Live geospatial requests.

Required controls:

- Human review step defined.
- Operational owner assigned.
- Cost estimate approved.
- Logging and audit approach approved.
- Rollback or shutdown path documented.

Stop if:

- A workflow can contact residents without consent and human review.
- A workflow stores real resident data before data governance is approved.
- A workflow depends on unreviewed paid services.

## Gate 5: Scale Review

Purpose: approve expansion only when evidence supports it.

Approval questions:

- What measurable access improvement has the pilot shown?
- Which AWS services are driving cost?
- Which services can be simplified or removed?
- What is the monthly budget ceiling for the next stage?
- What operational capacity is required?

Required controls:

- Cost trend reviewed.
- Usage reviewed.
- Security posture reviewed.
- Human review model reviewed.
- Product outcomes reviewed.

Stop if:

- Cost growth is not tied to measurable operating value.
- Governance ownership is unclear.
- The product boundary is drifting toward clinical or unsupported partner claims.

## Minimum Cost Practices

- Start with the smallest approved preview surface.
- Prefer static or serverless paths until real pilot needs justify more.
- Use synthetic data for demos and preview review.
- Set a spending ceiling before activation.
- Review billing alerts before activation.
- Delete unused preview resources after review.
- Avoid always-on services until pilot requirements are stable.
- Keep logs useful but proportionate.
- Require a named owner for each paid service.

## Required Approval Record

Before any future AWS activation, record:

- Approved gate.
- Approver.
- Date in 2026 or later.
- Intended audience.
- Services approved.
- Monthly spending ceiling.
- Data boundary.
- Human review owner.
- Shutdown owner.
- Review date.

## Explicit Non-Activation Statement

This issue does not add:

- AWS resources.
- credentials.
- secrets.
- environment variables.
- infrastructure configuration.
- backend services.
- database services.
- authentication.
- storage workflows.
- forms.
- notifications.
- email.
- SMS.
- external calls.
- real resident data.
- PHI workflow.
- clinical workflow.

## Done When

This cost gate document is complete when it:

- Makes cost exposure a human approval point.
- Separates preview, pilot, workflow, and scale decisions.
- Preserves **No PHI. Consent-based. Non-clinical.**
- Blocks paid activation from documentation-only work.
- Keeps Issue 008 limited to planning.
