const restrictedFieldTerms = [
  "phi",
  "diagnosis",
  "symptom",
  "symptoms",
  "treatment",
  "medication",
  "medications",
  "prescription",
  "prescriptions",
  "insurance",
  "payment",
  "claim",
  "claims",
  "memberId",
  "subscriberId",
  "policyNumber",
  "ssn",
  "dateOfBirth",
  "dob",
  "medicalRecord",
  "mrn",
  "lab",
  "labs",
  "providerMessage",
  "appointment",
  "rawAudio",
  "transcript",
  "preciseLocation",
  "locationHistory",
  "backgroundTracking",
] as const;

const normalizedRestrictedFieldTerms = restrictedFieldTerms.map(normalizeFieldName);

export type RestrictedFieldTerm = (typeof restrictedFieldTerms)[number];

export const noPhiBoundary = "No PHI. Consent-based. Non-clinical.";

export function isRestrictedFieldName(name: string): boolean {
  const normalizedName = normalizeFieldName(name);

  return normalizedRestrictedFieldTerms.some((term) => normalizedName.includes(term));
}

export function listRestrictedFieldMatches(record: unknown): string[] {
  const matches = new Set<string>();
  collectRestrictedFieldMatches(record, [], matches);

  return Array.from(matches).sort();
}

export function assertNoRestrictedFields(record: unknown): void {
  const matches = listRestrictedFieldMatches(record);

  if (matches.length > 0) {
    throw new Error(`Restricted backend field names are not allowed: ${matches.join(", ")}`);
  }
}

export function getRestrictedFieldTerms(): readonly RestrictedFieldTerm[] {
  return restrictedFieldTerms;
}

function collectRestrictedFieldMatches(value: unknown, path: string[], matches: Set<string>): void {
  if (!value || typeof value !== "object") {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => collectRestrictedFieldMatches(item, [...path, String(index)], matches));
    return;
  }

  for (const [key, nestedValue] of Object.entries(value)) {
    const fieldPath = [...path, key].join(".");

    if (isRestrictedFieldName(key)) {
      matches.add(fieldPath);
    }

    collectRestrictedFieldMatches(nestedValue, [...path, key], matches);
  }
}

function normalizeFieldName(name: string): string {
  return name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

