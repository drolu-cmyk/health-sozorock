# SozoRock Health AWS Target Architecture

## Purpose

This document defines the future AWS target architecture for SozoRock Health preview and pilot deployment planning.

It is documentation only. It does not create AWS resources, add credentials, add environment variables, deploy infrastructure, activate paid services, or change runtime behavior.

## Product Boundary

SozoRock Health remains a non-clinical health access intelligence and activation program of The SozoRock Foundation, Inc.

Locked trust boundary:

**No PHI. Consent-based. Non-clinical.**

The target architecture must preserve the two connected layers:

- Resident Access Layer: simple, clear, private, human.
- County Operating Intelligence Layer: geospatial, decision-driven, action-oriented, assurance-controlled.

The operating model remains:

**Signal -> Decision -> Action -> Assurance -> Impact**

## Current Prototype State

The current prototype is a static Next.js App Router experience using synthetic data only.

Current constraints:

- No AWS resources are active from this issue.
- No backend services are active from this issue.
- No database, authentication, storage, forms, notifications, email, or SMS are active from this issue.
- No Google, OpenAI, geospatial provider, or external API calls are active from this issue.
- No real resident data, PHI workflow, or clinical workflow is active from this issue.
- Preview deployment remains a manual approval step.

## Target Architecture Principles

- Keep the first preview lightweight and cost-controlled.
- Activate cloud resources only after human approval.
- Use synthetic or approved non-clinical data until pilot governance is complete.
- Keep all resident-facing flows non-clinical and consent-based.
- Require human review before external outreach, institutional action, or cost exposure.
- Separate prototype documentation from deployable infrastructure configuration.
- Prefer managed AWS services only when the product requirement justifies the added cost, access control, and operational responsibility.

## Target Service Map

| Capability | Future AWS service option | Activation status | Notes |
| --- | --- | --- | --- |
| Frontend preview hosting | AWS Amplify Hosting or S3 with CloudFront | Not active | Manual approval required before any preview deployment. |
| Content delivery | Amazon CloudFront | Not active | Consider only when AWS-native hosting is selected. |
| Public asset storage | Amazon S3 | Not active | Public assets only; no real resident data or PHI. |
| Role-based access | Amazon Cognito or IAM Identity Center | Not active | Use only if admin or county views require controlled access. |
| Controlled APIs | Amazon API Gateway | Not active | Only after backend requirements are approved. |
| Serverless workflows | AWS Lambda | Not active | For approved non-clinical action workflows only. |
| Non-clinical records | Amazon DynamoDB | Not active | Synthetic or approved non-clinical access signals only. |
| Logs and metrics | Amazon CloudWatch | Not active | Activate only with deployed workloads. |
| Account audit | AWS CloudTrail | Not active | Required before pilot workloads with account activity. |
| Secret storage | AWS Secrets Manager or Parameter Store | Not active | No secrets or environment variables are added in this issue. |
| Public app protection | AWS WAF | Not active | Consider before public pilot traffic. |
| Approval orchestration | AWS Step Functions or EventBridge | Not active | Later option for human-review workflows only. |

## Reference Architecture by Stage

### Stage 0: Documentation-Only Prototype

Purpose: preserve the static prototype and define the target AWS direction.

Allowed:

- Architecture documentation.
- Cost gate documentation.
- README links to planning documents.
- Existing local verification commands.

Not allowed:

- AWS resource creation.
- Infrastructure-as-code files.
- credentials, secrets, or environment variables.
- Deployments or paid-service activation.
- Real resident data or PHI workflows.

### Stage 1: Manual Preview Candidate

Purpose: make the static prototype available for internal or stakeholder review after explicit approval.

Possible AWS shape:

- Next.js frontend hosted through an approved AWS preview path.
- Static public assets served through the selected hosting layer.
- No database, auth, storage workflow, live AI, or external calls.

Required controls before activation:

- Human approval for preview deployment.
- Full local verification suite passed.
- Cost gate approval recorded.
- Preview deployment checklist completed.
- No real resident data introduced.

### Stage 2: Controlled Pilot Candidate

Purpose: support a limited pilot with governed non-clinical access operations.

Possible AWS shape:

- Role-based access for internal operators and approved reviewers.
- Controlled APIs for approved non-clinical access signals.
- Serverless workflow handlers for reviewed action queues.
- Non-clinical records store for approved access signals and assurance logs.
- Account-level logging and audit enabled.

Required controls before activation:

- Data classification approved.
- Consent model approved.
- Human review workflow approved.
- Security and access model approved.
- Cost ceiling approved.
- Clear stop rules for clinical boundary concerns.

### Stage 3: Later Operating Platform

Purpose: expand only after the pilot proves the operating model and governance path.

Possible AWS shape:

- Workflow orchestration for approval-heavy processes.
- Stakeholder reporting and dashboard services.
- More advanced monitoring and security controls.
- Optional AWS-native AI services only after separate approval.

Required controls before activation:

- Pilot evidence reviewed.
- Cost trend reviewed.
- Security posture reviewed.
- Operational ownership assigned.
- Legal, privacy, and clinical-boundary review completed.

## Data Boundary

Allowed future data categories, subject to approval:

- ZIP-code access signals.
- Hub interest.
- Event interest.
- Digital readiness category.
- General support category.
- Follow-up permission.
- Action queue status.
- Assurance check status.
- Scenario planning assumptions.

Disallowed:

- Diagnosis.
- Symptoms.
- Medication.
- Treatment history.
- Insurance information.
- Medical record numbers.
- Clinical notes.
- Provider-patient records.
- PHI collection, storage, or processing.

## Human Review Gates

Human review is required before:

- Preview deployment.
- Paid AWS resource activation.
- Real resident data use.
- Any external outreach.
- Provider-facing claims.
- County, library, or partner references that could imply a formal relationship.
- Any feature that could be interpreted as clinical advice or triage.
- Any workflow that changes from mock planning support into real operations.

## Explicit Non-Activation Statement

This issue does not add:

- AWS SDKs.
- CDK.
- Terraform.
- CloudFormation.
- Amplify configuration.
- IAM policy files.
- credentials.
- secrets.
- environment variables.
- deployments.
- external calls.
- backend services.
- database services.
- authentication.
- storage workflows.
- forms.
- notifications.
- email.
- SMS.
- live AI services.
- live geospatial services.

## Done When

This architecture document is complete when it:

- Describes the AWS target state without activating it.
- Preserves **No PHI. Consent-based. Non-clinical.**
- Separates preview, pilot, and later-stage maturity.
- Makes human approval and cost gates explicit.
- Avoids unsupported partnership or provider claims.
- Keeps Issue 008 limited to documentation.
