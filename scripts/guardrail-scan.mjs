import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const targets = ["src"];
const blocked = [
  /\b2025\b/i,
  /privacy-minimal/i,
  /Sozo Assistant/i,
  /SozoBot/i,
  /care navigator/i,
  /treatment recommendation/i,
  /clinical triage/i,
  /prescription workflow/i,
  /provider-patient relationship/i,
  /unsupported partnership/i,
  /partner county/i,
  /partner library/i,
  /official provider partner/i,
  /endorsed by/i,
  /approved by/i,
  /in partnership with/i,
];

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
    const { stat } = await import("node:fs/promises");
    return await stat(filePath);
  } catch {
    return null;
  }
}

const files = (await Promise.all(targets.map((target) => collectFiles(target))))
  .flat()
  .filter((file) => /\.(md|ts|tsx|css|json|mjs)$/.test(file));

const findings = [];

for (const file of files) {
  const content = await readFile(file, "utf8");
  for (const pattern of blocked) {
    if (pattern.test(content)) {
      findings.push(`${path.relative(root, file)} :: ${pattern}`);
    }
  }
}

if (findings.length > 0) {
  console.error("Guardrail scan failed:");
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.log("Guardrail scan passed.");
