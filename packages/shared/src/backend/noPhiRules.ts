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

const normalizedRestrictedFieldTerms = new Set(restrictedFieldTerms.map(normalizeFieldName));

const restrictedSingleTokens = new Set([
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
  "ssn",
  "dob",
  "mrn",
  "lab",
  "labs",
  "appointment",
  "transcript",
]);

const restrictedCompoundConcepts = [
  ["member", "id"],
  ["member", "identifier"],
  ["subscriber", "id"],
  ["subscriber", "identifier"],
  ["policy", "number"],
  ["date", "of", "birth"],
  ["medical", "record"],
  ["provider", "message"],
  ["raw", "audio"],
  ["precise", "location"],
  ["location", "history"],
  ["background", "tracking"],
];

export type RestrictedFieldTerm = (typeof restrictedFieldTerms)[number];

export const noPhiBoundary = "No PHI. Consent-based. Non-clinical.";

export function isRestrictedFieldName(name: string): boolean {
  const normalizedName = normalizeFieldName(name);

  if (normalizedRestrictedFieldTerms.has(normalizedName)) {
    return true;
  }

  const tokens = tokenizeFieldName(name);

  return hasRestrictedToken(tokens) || hasRestrictedCompoundConcept(tokens);
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

function tokenizeFieldName(name: string): string[] {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .map((token) => token.toLowerCase())
    .filter(Boolean);
}

function hasRestrictedToken(tokens: string[]): boolean {
  return tokens.some((token) => restrictedSingleTokens.has(token));
}

function hasRestrictedCompoundConcept(tokens: string[]): boolean {
  return restrictedCompoundConcepts.some((concept) => containsOrderedTokens(tokens, concept));
}

function containsOrderedTokens(tokens: string[], concept: string[]): boolean {
  if (concept.length > tokens.length) {
    return false;
  }

  for (let index = 0; index <= tokens.length - concept.length; index += 1) {
    if (concept.every((token, offset) => tokens[index + offset] === token)) {
      return true;
    }
  }

  return false;
}

