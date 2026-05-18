import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const scanTargets = [
  "src",
  "scripts",
  "public",
  "README.md",
  "package.json",
  ".github/workflows",
  "app/content",
  "app/data",
  "content",
  "data",
];

const excludedFiles = new Set(
  [
    "docs/sozorock-health/content-guardrails.md",
    "docs/sozorock-health/product-brief.md",
    "docs/sozorock-health/screen-build-spec.md",
    "docs/sozorock-health/architecture.md",
    "docs/sozorock-health/brand-system.md",
    "docs/sozorock-health/automation-operating-model.md",
    "docs/issues/TEMPLATE-standard-issue.md",
    "package-lock.json",
    "next-env.d.ts",
  ].map(normalizePath),
);

const fileExtensions = new Set([
  ".css",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".yml",
  ".yaml",
]);

// guardrail-policy-definition-start
const pre2026VisibleDate = {
  label: "pre-2026 visible date",
  pattern: /(?<!\d)(?:19\d{2}|20[01]\d|202[0-5])(?!\d)/i,
};

const blockedPhrases = [
  pre2026VisibleDate,
  { label: "unapproved privacy label", pattern: /\bprivacy-minimal\b/i },
  { label: "unapproved status label", pattern: /\bnon-critical\b/i },
  {
    label: "unapproved assistant naming",
    pattern: /\bSozo\s+(Assistant|Bot|AI|Navigator|agent)\b/i,
  },
  {
    label: "unapproved assistant naming",
    pattern: /\b(assistant|bot|navigator|agent)\s+named\s+Sozo\b/i,
  },
  { label: "clinical workflow language", pattern: /\bcare navigator\b/i },
  { label: "clinical workflow language", pattern: /\bpatient management\b/i },
  { label: "clinical workflow language", pattern: /\bclinical triage\b/i },
  { label: "clinical workflow language", pattern: /\bemergency triage\b/i },
  { label: "clinical workflow language", pattern: /\bdiagnosis\b/i },
  { label: "clinical workflow language", pattern: /\btreatment recommendations?\b/i },
  { label: "clinical workflow language", pattern: /\bprescription workflow\b/i },
  { label: "clinical workflow language", pattern: /\bprescribe\b/i },
  { label: "clinical workflow language", pattern: /\btherapy plan\b/i },
  { label: "clinical workflow language", pattern: /\bpatient record\b/i },
  { label: "clinical workflow language", pattern: /\bmedical record\b/i },
  { label: "clinical workflow language", pattern: /\bclinical notes\b/i },
  { label: "PHI workflow language", pattern: /\bhealth record collection\b/i },
  {
    label: "PHI workflow language",
    pattern: /\bprotected health information collection\b/i,
  },
  {
    label: "PHI workflow language",
    pattern: /\bPHI\s+(collection|intake|workflow|capture|storage)\b/i,
  },
  { label: "PHI workflow language", pattern: /\bcollect(?:ing)?\s+PHI\b/i },
  { label: "PHI workflow language", pattern: /\bprovider-patient relationship\b/i },
  { label: "unsupported partnership claim", pattern: /\bpartner county\b/i },
  { label: "unsupported partnership claim", pattern: /\bpartner library\b/i },
  { label: "unsupported partnership claim", pattern: /\bofficial provider partner\b/i },
  { label: "unsupported partnership claim", pattern: /\bendorsed by\b/i },
  { label: "unsupported partnership claim", pattern: /\bapproved by\b/i },
  { label: "unsupported partnership claim", pattern: /\bin partnership with\b/i },
];
// guardrail-policy-definition-end

async function collectFiles(entry) {
  const absolute = path.join(root, entry);
  const stats = await readSafeStats(absolute);

  if (!stats) {
    return [];
  }

  if (stats.isFile()) {
    return [absolute];
  }

  const children = await readdir(absolute, { withFileTypes: true });
  const files = await Promise.all(
    children.map((child) => collectFiles(path.join(entry, child.name))),
  );

  return files.flat();
}

async function readSafeStats(filePath) {
  try {
    return await stat(filePath);
  } catch {
    return null;
  }
}

function normalizePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function shouldScanFile(file) {
  const relativeFile = normalizePath(path.relative(root, file));

  if (excludedFiles.has(relativeFile)) {
    return false;
  }

  if (relativeFile.includes("/node_modules/") || relativeFile.startsWith("node_modules/")) {
    return false;
  }

  if (relativeFile.includes("/.next/") || relativeFile.startsWith(".next/")) {
    return false;
  }

  return fileExtensions.has(path.extname(file));
}

function isAllowedPolicySection(relativeFile, line, state) {
  if (relativeFile === "README.md") {
    if (/^## Trust boundary\s*$/.test(line)) {
      state.inReadmeTrustBoundary = true;
      return true;
    }

    if (state.inReadmeTrustBoundary && /^##\s+/.test(line)) {
      state.inReadmeTrustBoundary = false;
    }

    if (state.inReadmeTrustBoundary) {
      return true;
    }
  }

  if (relativeFile === "scripts/guardrail-scan.mjs") {
    if (line.includes("guardrail-policy-definition-start")) {
      state.inScannerPolicyDefinition = true;
      return true;
    }

    if (line.includes("guardrail-policy-definition-end")) {
      state.inScannerPolicyDefinition = false;
      return true;
    }

    if (state.inScannerPolicyDefinition) {
      return true;
    }
  }

  return false;
}

function findMatches(line, pattern) {
  const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
  const globalPattern = new RegExp(pattern.source, flags);

  return Array.from(line.matchAll(globalPattern));
}

function isLikelyVersionString(relativeFile, line, phrase, index) {
  const before = line[index - 1] ?? "";
  const twoBefore = line[index - 2] ?? "";
  const after = line[index + phrase.length] ?? "";
  const twoAfter = line[index + phrase.length + 1] ?? "";

  const dotVersionRight = after === "." && /\d/.test(twoAfter);
  const dotVersionLeft = before === "." && /\d/.test(twoBefore);
  const prefixedVersion = before.toLowerCase() === "v" && dotVersionRight;

  if (dotVersionRight || dotVersionLeft || prefixedVersion) {
    return true;
  }

  if (relativeFile !== "package.json") {
    return false;
  }

  const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const dependencyVersion = new RegExp(
    `"[^"]+"\\s*:\\s*"[~^]?${escapedPhrase}(?:\\.\\d+)+(?:[-+][^"]*)?"`,
  );
  const packageVersion = new RegExp(
    `"version"\\s*:\\s*"${escapedPhrase}(?:\\.\\d+)+(?:[-+][^"]*)?"`,
  );

  return dependencyVersion.test(line) || packageVersion.test(line);
}

const files = (await Promise.all(scanTargets.map((target) => collectFiles(target))))
  .flat()
  .filter(shouldScanFile);

const findings = [];

for (const file of files) {
  const relativeFile = normalizePath(path.relative(root, file));
  const content = await readFile(file, "utf8");
  const lines = content.split(/\r?\n/);
  const state = {
    inReadmeTrustBoundary: false,
    inScannerPolicyDefinition: false,
  };

  for (const [lineIndex, line] of lines.entries()) {
    if (isAllowedPolicySection(relativeFile, line, state)) {
      continue;
    }

    for (const phrase of blockedPhrases) {
      for (const match of findMatches(line, phrase.pattern)) {
        if (
          phrase.label === pre2026VisibleDate.label &&
          isLikelyVersionString(relativeFile, line, match[0], match.index ?? 0)
        ) {
          continue;
        }

        findings.push({
          file: relativeFile,
          line: lineIndex + 1,
          phrase: match[0],
          label: phrase.label,
        });
      }
    }
  }
}

if (findings.length > 0) {
  console.error("Guardrail scan failed:");
  for (const finding of findings) {
    console.error(
      `- ${finding.file}:${finding.line} :: ${finding.label} :: "${finding.phrase}"`,
    );
  }
  process.exit(1);
}

console.log(`Guardrail scan passed. Checked ${files.length} policy-sensitive files.`);
