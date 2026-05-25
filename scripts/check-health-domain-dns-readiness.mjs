import dns from "node:dns/promises";

const CUSTOM_DOMAIN = "health.sozorockfoundation.org";
const CUSTOM_URL = `https://${CUSTOM_DOMAIN}/`;
const FALLBACK_DOMAIN = "main.d1bmgq1fk26xqh.amplifyapp.com";
const FALLBACK_URL = `https://${FALLBACK_DOMAIN}/`;

async function main() {
  const customDns = await resolveDomain(CUSTOM_DOMAIN);
  const fallbackDns = await resolveDomain(FALLBACK_DOMAIN);
  const customHttps = await checkHttps(CUSTOM_URL);
  const fallbackHttps = await checkHttps(FALLBACK_URL);
  const route53Configured = Boolean(process.env.ROUTE53_HOSTED_ZONE_ID);

  console.log("SozoRock Health domain readiness");
  console.log("");
  printCheck("Custom domain DNS resolves", customDns.ok, customDns.detail);
  printCheck("Fallback Amplify DNS resolves", fallbackDns.ok, fallbackDns.detail);
  printCheck("Custom domain HTTPS responds", customHttps.ok, customHttps.detail);
  printCheck("Fallback Amplify HTTPS responds", fallbackHttps.ok, fallbackHttps.detail);
  printCheck(
    "ROUTE53_HOSTED_ZONE_ID configured",
    route53Configured,
    route53Configured ? "Configured in this shell; value not printed." : "Not configured in this shell.",
  );
  console.log("");

  if (!fallbackDns.ok || !fallbackHttps.ok) {
    console.log("Readiness: blocked. The fallback Amplify origin must resolve and respond before deployment.");
    process.exitCode = 1;
    return;
  }

  if (!customDns.ok || !customHttps.ok) {
    console.log(
      "Readiness: custom domain is not active yet. Complete Route 53 control/delegation and run the deployment workflow.",
    );
    return;
  }

  console.log("Readiness: custom domain resolves and responds over HTTPS.");
}

async function resolveDomain(domain) {
  try {
    const addresses = await dns.resolve(domain);
    return {
      detail: addresses.length > 0 ? `${addresses.length} address record(s) found.` : "No address records found.",
      ok: addresses.length > 0,
    };
  } catch (error) {
    try {
      const addresses = await dns.lookup(domain, { all: true });
      return {
        detail:
          addresses.length > 0
            ? `${addresses.length} address record(s) found through OS lookup.`
            : "No address records found through OS lookup.",
        ok: addresses.length > 0,
      };
    } catch (lookupError) {
      const details = [
        error.code ? `${error.code}: ${error.message}` : error.message,
        lookupError.code ? `${lookupError.code}: ${lookupError.message}` : lookupError.message,
      ];

      return {
        detail: details.join(" | "),
        ok: false,
      };
    }
  }
}

async function checkHttps(url) {
  try {
    const response = await fetch(url, {
      redirect: "manual",
      headers: {
        "user-agent": "sozorock-health-dns-readiness",
      },
    });

    return {
      detail: `HTTP ${response.status}`,
      ok: response.status >= 200 && response.status < 400,
    };
  } catch (error) {
    return {
      detail: error.cause?.code ? `${error.cause.code}: ${error.message}` : error.message,
      ok: false,
    };
  }
}

function printCheck(label, ok, detail) {
  console.log(`${ok ? "PASS" : "INFO"} ${label}: ${detail}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
