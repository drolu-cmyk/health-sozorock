import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8_000;

const clinicalRiskPattern =
  /\b(diagnos(?:e|is)|treat(?:ment)?|prescri(?:be|ption)|dosage|medication advice|symptom triage|emergency|chest pain|suicid|stroke|bleeding|overdose)\b/i;

const fallbackGuidance: Record<string, string> = {
  "digital-readiness":
    "Start with the provider-readiness checklist. Write down your question, confirm your device and connection, and bring anything the provider asks for. SozoRock Health helps you get ready; the provider makes clinical decisions.",
  "health-access-day":
    "Review the listed Health Access Day information, check the location and time, and use support if no event is listed near you right now.",
  "local-support":
    "Search by ZIP code, city, or county. If no access point appears, request support so an approved operator can review the gap.",
  "provider-readiness":
    "Providers keep their platforms. Use SozoRock Health to prepare questions, documents, and next steps before provider-led care.",
  "voice-access":
    "Voice Access remains gated by readiness and consent. You can continue with guided text without microphone access.",
};

type GuidanceRequest = {
  need?: string;
  prompt?: string;
  query?: string;
};

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "no-store",
    },
    status,
  });
}

function safeText(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function fallbackFor(need: string) {
  return (
    fallbackGuidance[need] ??
    "Choose what you need today, search by ZIP code, city, or county, and use support when the app cannot find a clear next step."
  );
}

async function callOpenAI({ need, prompt, query }: Required<GuidanceRequest>) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const model = process.env.OPENAI_GUIDANCE_MODEL || "gpt-5.5";
  const response = await fetch("https://api.openai.com/v1/responses", {
    body: JSON.stringify({
      input: [
        {
          content: [
            {
              text:
                "You are the non-clinical SozoRock Health access guidance layer. Help residents understand app options, prepare for provider-led care, find hubs or Health Access Day information, understand consent, and reach support. Stay access-only: no clinical determinations, medical interventions, medication orders, symptom sorting, medication guidance, or provider replacement. If risk or urgent language appears, direct the resident to local emergency services or a licensed provider.",
              type: "input_text",
            },
          ],
          role: "system",
        },
        {
          content: [
            {
              text: `Need: ${need}\nSearch context: ${query}\nResident request: ${prompt}`,
              type: "input_text",
            },
          ],
          role: "user",
        },
      ],
      max_output_tokens: 220,
      model,
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json().catch(() => null)) as
    | {
        output_text?: string;
        output?: Array<{
          content?: Array<{ text?: string }>;
        }>;
      }
    | null;

  return (
    data?.output_text ??
    data?.output
      ?.flatMap((item) => item.content ?? [])
      .map((item) => item.text)
      .filter(Boolean)
      .join("\n")
      .trim() ??
    null
  );
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json(413, { error: "Request is too large." });
  }

  const body = (await request.json().catch(() => null)) as GuidanceRequest | null;
  if (!body) {
    return json(400, { error: "Guidance request could not be read." });
  }

  const need = safeText(body.need, 80) || "local-support";
  const prompt = safeText(body.prompt, 1200);
  const query = safeText(body.query, 120);

  if (clinicalRiskPattern.test(`${prompt} ${query}`)) {
    return json(200, {
      answer:
        "SozoRock Health is access-only and cannot handle clinical or urgent needs. For urgent or clinical concerns, contact local emergency services or a licensed provider. You can still use this app to prepare questions and find non-clinical access support.",
      provider: "safety-boundary",
      state: "Enabled",
    });
  }

  const providerAnswer = await callOpenAI({ need, prompt, query });

  return json(200, {
    answer: providerAnswer ?? fallbackFor(need),
    provider: providerAnswer ? "openai-responses" : "local-guidance",
    state: "Enabled",
  });
}
