const CUSTOM_BASE_URL = "https://health.sozorockfoundation.org";
const FALLBACK_BASE_URL = "https://main.d1bmgq1fk26xqh.amplifyapp.com";
const ROUTES = ["/", "/resident", "/county", "/about-model"];
const REQUIRED_PHRASES = [
  "Care for Every ZIP Code.",
  "No PHI. Consent-based. Non-clinical.",
  "Signal → Decision → Action → Assurance → Impact",
  "noindex",
];
const CUSTOM_DOMAIN_RETRIES = 6;
const RETRY_DELAY_MS = 10_000;

const fallbackOnly = process.argv.includes("--fallback-only");

async function main() {
  if (fallbackOnly) {
    console.log("Running fallback-only smoke test.");
    const fallback = await fetchWithRedirects(`${FALLBACK_BASE_URL}/`);
    assertSuccessfulResponse(fallback, `${FALLBACK_BASE_URL}/`);
    assertRequiredPhrases([fallback.body], REQUIRED_PHRASES);
    console.log("Fallback URL smoke test passed.");
    return;
  }

  const routeResults = [];

  for (const route of ROUTES) {
    const url = `${CUSTOM_BASE_URL}${route === "/" ? "/" : route}`;
    const result = await fetchRouteWithRetries(url);
    assertSuccessfulResponse(result, url);
    routeResults.push(result);
  }

  assertRequiredPhrases(
    routeResults.map((result) => result.body),
    REQUIRED_PHRASES,
  );

  const fallback = await fetchWithRedirects(`${FALLBACK_BASE_URL}/`);
  assertSuccessfulResponse(fallback, `${FALLBACK_BASE_URL}/`);

  console.log("Health custom domain smoke test passed.");
}

async function fetchRouteWithRetries(url) {
  let lastError;

  for (let attempt = 1; attempt <= CUSTOM_DOMAIN_RETRIES; attempt += 1) {
    try {
      return await fetchWithRedirects(url);
    } catch (error) {
      lastError = error;

      if (attempt === CUSTOM_DOMAIN_RETRIES) {
        break;
      }

      console.log(
        `Attempt ${attempt} failed for ${url}: ${error.message}. Retrying in ${RETRY_DELAY_MS / 1000}s.`,
      );
      await delay(RETRY_DELAY_MS);
    }
  }

  throw lastError;
}

async function fetchWithRedirects(initialUrl) {
  let currentUrl = initialUrl;
  const seenUrls = new Set();
  const redirects = [];

  for (let attempt = 0; attempt <= 5; attempt += 1) {
    if (seenUrls.has(currentUrl)) {
      throw new Error(`Redirect loop detected at ${currentUrl}`);
    }

    seenUrls.add(currentUrl);

    const response = await fetch(currentUrl, {
      redirect: "manual",
      headers: {
        "user-agent": "sozorock-health-domain-smoke-test",
      },
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");

      if (!location) {
        throw new Error(`Redirect from ${currentUrl} did not include a location header.`);
      }

      const nextUrl = new URL(location, currentUrl).toString();
      redirects.push(`${response.status} ${currentUrl} -> ${nextUrl}`);
      currentUrl = nextUrl;
      continue;
    }

    const body = await response.text();

    return {
      body,
      finalUrl: currentUrl,
      redirects,
      status: response.status,
    };
  }

  throw new Error(`Too many redirects for ${initialUrl}`);
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function assertSuccessfulResponse(result, expectedUrl) {
  if (!result.finalUrl.startsWith("https://")) {
    throw new Error(`Final URL is not HTTPS for ${expectedUrl}: ${result.finalUrl}`);
  }

  if (result.status < 200 || result.status >= 300) {
    throw new Error(`Expected successful response for ${expectedUrl}, received ${result.status}`);
  }

  console.log(`${expectedUrl} -> ${result.status}`);
}

function assertRequiredPhrases(bodies, phrases) {
  const combinedBody = bodies.join("\n");

  for (const phrase of phrases) {
    if (!combinedBody.includes(phrase)) {
      throw new Error(`Missing required smoke-test phrase: ${phrase}`);
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
