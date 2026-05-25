import { spawnSync } from "node:child_process";

const WORKFLOW_FILE = "deploy-health-domain-cloudfront.yml";
const CONFIRMATION_VALUE = "health.sozorockfoundation.org";
const OPERATIONS = new Set(["validate", "deploy", "smoke-test"]);

const args = process.argv.slice(2);
const { operation, ref } = parseArgs(args);
const explicitDeploy = args.includes("--confirm-deploy");

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

function parseArgs(rawArgs) {
  const positionalArgs = [];
  let refValue;

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];

    if (arg === "--ref") {
      refValue = rawArgs[index + 1];

      if (!refValue || refValue.startsWith("-")) {
        console.error("Missing value for --ref.");
        process.exit(1);
      }

      index += 1;
      continue;
    }

    if (arg === "--confirm-deploy" || arg === "--help" || arg === "-h") {
      continue;
    }

    if (arg.startsWith("-")) {
      console.error(`Unknown option: ${arg}`);
      process.exit(1);
    }

    positionalArgs.push(arg);
  }

  if (positionalArgs.length > 1) {
    console.error(`Unexpected extra positional argument: ${positionalArgs[1]}`);
    process.exit(1);
  }

  const selectedOperation = positionalArgs[0] ?? "validate";

  if (!OPERATIONS.has(selectedOperation)) {
    console.error(`Unknown operation: ${selectedOperation}`);
    console.error("Expected one of: validate, deploy, smoke-test.");
    process.exit(1);
  }

  return {
    operation: selectedOperation,
    ref: refValue,
  };
}

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
