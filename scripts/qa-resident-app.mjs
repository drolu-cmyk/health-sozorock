import { mkdir, writeFile } from "node:fs/promises";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3031";
const cdpPort = process.env.QA_CDP_PORT ?? "9223";
const outDir = new URL("../artifacts/qa/", import.meta.url);

const bannedPublicTerms = [
  "placeholder",
  "advisory",
  "demo",
  "preview",
  "scaffold",
  "mock",
  "prototype",
  "roadmap",
  "not implemented",
  "coming from backend",
  "static",
  "test mode",
  "future feature",
  "mvp",
  "fallback preview",
  "live services disabled",
  "inactive",
  "in this version",
  "credentials not configured",
  "server-side adapter required",
  "synthetic prototype",
];

async function requestJson(url, init) {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  return response.json();
}

async function getPageWebSocketUrl() {
  const targets = await requestJson(`http://127.0.0.1:${cdpPort}/json/list`);
  const page = targets.find((target) => target.type === "page");
  if (!page?.webSocketDebuggerUrl) {
    throw new Error("No Chrome page target found.");
  }
  return page.webSocketDebuggerUrl;
}

function createClient(url) {
  const socket = new WebSocket(url);
  let nextId = 1;
  const pending = new Map();

  socket.onmessage = (message) => {
    const payload = JSON.parse(message.data.toString());
    if (!payload.id) {
      return;
    }
    const callbacks = pending.get(payload.id);
    if (!callbacks) {
      return;
    }
    pending.delete(payload.id);
    if (payload.error) {
      callbacks.reject(new Error(payload.error.message));
      return;
    }
    callbacks.resolve(payload.result);
  };

  return new Promise((resolve, reject) => {
    socket.onopen = () => {
      resolve({
        close: () => socket.close(),
        send(method, params = {}) {
          const id = nextId++;
          socket.send(JSON.stringify({ id, method, params }));
          return new Promise((sendResolve, sendReject) => {
            pending.set(id, { reject: sendReject, resolve: sendResolve });
          });
        },
      });
    };
    socket.onerror = () => reject(new Error("Could not connect to Chrome."));
  });
}

async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    awaitPromise: true,
    expression,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text ?? "Runtime evaluation failed.");
  }
  return result.result.value;
}

function textLiteral(value) {
  return JSON.stringify(value);
}

async function clickText(client, text) {
  const clicked = await evaluate(
    client,
    `(() => {
      const wanted = ${textLiteral(text)}.toLowerCase();
      const items = Array.from(document.querySelectorAll("button,a"));
      const match = items.find((item) => (item.textContent || "").trim().toLowerCase().includes(wanted));
      if (!match) return false;
      match.click();
      return true;
    })()`,
  );
  if (!clicked) {
    throw new Error(`Could not click text: ${text}`);
  }
  await wait(450);
}

async function clickSelector(client, selector) {
  const clicked = await evaluate(
    client,
    `(() => {
      const match = document.querySelector(${textLiteral(selector)});
      if (!match) return false;
      match.click();
      return true;
    })()`,
  );
  if (!clicked) {
    throw new Error(`Could not click selector: ${selector}`);
  }
  await wait(450);
}

async function textOf(client, selector) {
  return evaluate(
    client,
    `document.querySelector(${textLiteral(selector)})?.textContent?.trim() ?? ""`,
  );
}

async function fill(client, selector, value) {
  const ok = await evaluate(
    client,
    `(() => {
      const field = document.querySelector(${textLiteral(selector)});
      if (!field) return false;
      const prototype = field instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
      field.focus();
      setter?.call(field, ${textLiteral(value)});
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    })()`,
  );
  if (!ok) {
    throw new Error(`Could not fill field: ${selector}`);
  }
}

async function screenshot(client, name) {
  const image = await client.send("Page.captureScreenshot", {
    captureBeyondViewport: true,
    format: "png",
    fromSurface: true,
  });
  await writeFile(new URL(`${name}.png`, outDir), Buffer.from(image.data, "base64"));
}

async function screenshotViewport(client, name, width, height) {
  await setViewport(client, width, height);
  await screenshot(client, name);
}

async function setViewport(client, width, height) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    deviceScaleFactor: 1,
    height,
    mobile: width < 700,
    width,
  });
  await wait(250);
}

async function assertContains(client, text) {
  let found = false;
  for (let attempt = 0; attempt < 12; attempt += 1) {
    found = await evaluate(
      client,
      `document.body.innerText.toLowerCase().includes(${textLiteral(text.toLowerCase())})`,
    );
    if (found) {
      break;
    }
    await wait(250);
  }
  if (!found) {
    throw new Error(`Expected visible text: ${text}`);
  }
}

async function waitForAppReady(client) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const ready = await evaluate(client, `window.__sozorockHealthReady === true`);
    if (ready) {
      return;
    }
    await wait(250);
  }
  throw new Error("Resident app did not become ready.");
}

async function run() {
  await mkdir(outDir, { recursive: true });
  const client = await createClient(await getPageWebSocketUrl());

  try {
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Network.enable");
    await client.send("Network.clearBrowserCookies");
    await setViewport(client, 1280, 900);
    const qaEmail = `olu-${Date.now()}@example.com`;
    await client.send("Page.navigate", { url: baseUrl });
    await wait(900);

    await evaluate(client, `localStorage.clear()`);
    await client.send("Page.navigate", { url: baseUrl });
    await wait(900);
    await waitForAppReady(client);
    await assertContains(client, "SozoRock® Health");
    await assertContains(client, "Sign up");
    await clickSelector(client, '[data-testid="auth-signup-tab"]');
    const submitLabel = await textOf(client, '[data-testid="auth-submit"]');
    if (submitLabel !== "Sign up") {
      throw new Error(`Expected signup submit label, saw: ${submitLabel}`);
    }
    await screenshot(client, "01-auth");

    await fill(client, '[data-testid="auth-name"]', "Olu");
    await fill(client, '[data-testid="auth-email"]', qaEmail);
    await fill(client, '[data-testid="auth-passcode"]', "launch123");
    await fill(client, '[data-testid="auth-zip"]', "Durham");
    await clickSelector(client, '[data-testid="auth-submit"]');
    await assertContains(client, "Welcome, Olu");
    await assertContains(client, "Save my next step");
    await screenshot(client, "02-start");

    await clickSelector(client, 'button[aria-label="Open Find access"]');
    await assertContains(client, "Northside Community Access Point");
    await screenshot(client, "03-find-access");

    await clickSelector(client, 'button[aria-label="Open Voice Access"]');
    await assertContains(client, "Start talking");
    await clickText(client, "Start talking");
    await assertContains(client, "This option needs your permission");
    await clickText(client, "Check availability");
    await assertContains(client, "Type instead");
    await screenshot(client, "04-voice-access");

    await clickSelector(client, 'button[aria-label="Open Prepare"]');
    await assertContains(client, "Prepare for your visit");
    await clickText(client, "Save my next step");
    await screenshot(client, "05-prepare");

    await clickSelector(client, 'button[aria-label="Open Hubs"]');
    await assertContains(client, "Health Access Day");
    await assertContains(client, "Health Equity Hubs");
    await screenshot(client, "06-hubs");

    await clickSelector(client, 'button[aria-label="Open Support"]');
    await fill(client, "textarea", "I need help finding access in Durham.");
    await clickText(client, "Prepare support request");
    await assertContains(client, "This option needs your permission");
    await evaluate(client, `document.querySelector('input[type="checkbox"]')?.click()`);
    await fill(client, "textarea", "I need help finding access in Durham.");
    await clickText(client, "Prepare support request");
    await assertContains(client, "Support request prepared");
    await screenshot(client, "07-support");

    await clickSelector(client, 'button[aria-label="Open Saved"]');
    await assertContains(client, "Saved step");
    await assertContains(client, "Current saved step");
    await screenshot(client, "08-saved");

    await clickSelector(client, 'button[aria-label="Open Settings"]');
    await assertContains(client, "Settings and privacy");
    await assertContains(client, "The app works without microphone access.");
    await screenshot(client, "09-settings");

    await clickText(client, "Sign out");
    await assertContains(client, "Log in");
    await clickSelector(client, '[data-testid="auth-login-tab"]');
    await fill(client, '[data-testid="auth-email"]', qaEmail);
    await fill(client, '[data-testid="auth-passcode"]', "launch123");
    await fill(client, '[data-testid="auth-zip"]', "Durham");
    await clickSelector(client, '[data-testid="auth-submit"]');
    await assertContains(client, "Welcome, Olu");
    await clickSelector(client, 'button[aria-label="Open Start"]');

    const bodyText = await evaluate(client, `document.body.innerText.toLowerCase()`);
    const bannedHits = bannedPublicTerms.filter((term) =>
      new RegExp(`\\\\b${term.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}\\\\b`, "i").test(bodyText),
    );
    if (bannedHits.length > 0) {
      throw new Error(`Banned public terms visible: ${bannedHits.join(", ")}`);
    }

    await setViewport(client, 390, 900);
    const overflow = await evaluate(
      client,
      `Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth`,
    );
    if (overflow > 2) {
      throw new Error(`Mobile overflow at 390px: ${overflow}px`);
    }
    await screenshot(client, "10-mobile-390");
    await screenshotViewport(client, "11-ios-mobile", 393, 852);
    await screenshotViewport(client, "12-android-mobile", 412, 915);

    const scripts = await evaluate(
      client,
      `Array.from(document.scripts).map((script) => script.src).filter(Boolean)`,
    );
    const sameOriginScripts = scripts.filter((src) => src.startsWith(baseUrl));
    const scriptTexts = await Promise.all(
      sameOriginScripts.map(async (src) => {
        const response = await fetch(src);
        return response.text();
      }),
    );
    const browserBundle = `${bodyText}\n${scriptTexts.join("\n")}`;
    if (
      /sk-(?:proj|live|svcacct)-[A-Za-z0-9_-]{20,}|OPENAI_API_KEY|Authorization:\s*Bearer/i.test(
        browserBundle,
      )
    ) {
      throw new Error("Client-side secret-like token or provider key reference found.");
    }

    await writeFile(
      new URL("qa-summary.json", outDir),
      JSON.stringify(
        {
          baseUrl,
          checkedAt: new Date().toISOString(),
          screenshots: [
            "01-auth.png",
            "02-start.png",
            "03-find-access.png",
            "04-voice-access.png",
            "05-prepare.png",
            "06-hubs.png",
            "07-support.png",
            "08-saved.png",
            "09-settings.png",
            "10-mobile-390.png",
            "11-ios-mobile.png",
            "12-android-mobile.png",
          ],
          status: "pass",
        },
        null,
        2,
      ),
    );
    console.log("Resident app QA passed.");
  } finally {
    client.close();
  }
}

run().catch((error) => {
  console.error(error.message);
  getPageWebSocketUrl()
    .then(createClient)
    .then(async (client) => {
      try {
        await mkdir(outDir, { recursive: true });
        await client.send("Page.enable");
        await screenshot(client, "failure-state");
        const body = await evaluate(client, `document.body.innerText`);
        await writeFile(new URL("failure-state.txt", outDir), body);
      } finally {
        client.close();
      }
    })
    .catch(() => null)
    .finally(() => process.exit(1));
});
