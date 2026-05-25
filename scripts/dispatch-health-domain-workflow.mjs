import { spawnSync } from "node:child_process";

const WORKFLOW_FILE = "deploy-health-domain-cloudfront.yml";
const CONFIRMATION_VALUE = "health.sozorockfoundation.org";
const OPERATIONS = new Set(["validate", "deploy", "smoke-test"]);

const args = process.argv.slice(2);
const operation = args.find((arg) => OPERATIONS.has(arg)) ?? "validate";
const explicitDeploy = args.includes("--confirm-deploy");
const refIndex = args.indexOf("--ref");
const ref = refIndex >= 0 ? args[refIndex + 1] : undefined;

if (args.includes("--help") || args.includes("-h")) {
  printHelp();
  process.exit(0);
}

if (operation === "deploy" && !explicitDeploy) {
  console.error("Refusing deploy without --confirm-deploy.");
  console.error("Run validate first, confirm DNS control, then rerun deploy with --confirm-deploy.");
  process.exit(1);
}

const ghCheck = spawnSync("gh", ["--version"], {
  encoding: "utf8",
  shell: process.platform === "win32",
});

if (ghCheck.status !== 0) {
  console.error("GitHub CLI is required to dispatch the workflow.");
  process.exit(1);
}

const workflowArgs = [
  "workflow",
  "run",
  WORKFLOW_FILE,
  "-f",
  `operation=${operation}`,
  "-f",
  `DEPLOY_HEALTH_SUBDOMAIN_ONLY=${CONFIRMATION_VALUE}`,
];

if (ref) {
  workflowArgs.push("--ref", ref);
}

console.log(`Dispatching ${WORKFLOW_FILE} with operation=${operation}.`);
console.log("Typed confirmation is set to health.sozorockfoundation.org.");

const result = spawnSync("gh", workflowArgs, {
  encoding: "utf8",
  shell: process.platform === "win32",
  stdio: "inherit",
});

process.exit(result.status ?? 1);

function printHelp() {
  console.log(`
Usage:
  node scripts/dispatch-health-domain-workflow.mjs validate [--ref branch-or-sha]
  node scripts/dispatch-health-domain-workflow.mjs smoke-test [--ref branch-or-sha]
  node scripts/dispatch-health-domain-workflow.mjs deploy --confirm-deploy [--ref branch-or-sha]

This script dispatches ${WORKFLOW_FILE} through GitHub CLI.
It never stores tokens and never prints secrets.
`);
}
