import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type VoiceSessionRequest = {
  consent?: boolean;
  language?: string;
};

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "no-store",
    },
    status,
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | VoiceSessionRequest
    | null;

  if (!body?.consent) {
    return json(400, {
      error: "This option needs your permission before it can be used.",
      fallbackPath: "Type instead",
      state: "Requires your permission",
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const enabled = process.env.VOICE_ACCESS_ENABLED === "true";

  if (!apiKey || !enabled) {
    return json(423, {
      error:
        "Voice Access is limited access. You can continue with guided text.",
      fallbackPath: "Type instead",
      readiness: {
        costControls: "required",
        loggingRules: "required",
        nonClinicalBoundary: "enabled",
        providerAdapter: "server-side",
        rateLimits: "required",
      },
      state: "Limited access",
    });
  }

  const model = process.env.OPENAI_REALTIME_MODEL || "gpt-realtime-2";
  const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
    body: JSON.stringify({
      session: {
        instructions:
          "You are SozoRock Health Voice Access. Provide non-clinical access guidance only. Stay access-only: no clinical determinations, medical interventions, medication orders, symptom sorting, medication guidance, or provider replacement. Escalate urgent needs to local emergency services and support requests to the support pathway.",
        modalities: ["audio", "text"],
        model,
        voice: process.env.OPENAI_REALTIME_VOICE || "alloy",
      },
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    return json(502, {
      error:
        "Voice Access is temporarily unavailable. You can continue with guided text.",
      fallbackPath: "Type instead",
      state: "Temporarily unavailable",
    });
  }

  const session = (await response.json().catch(() => null)) as
    | Record<string, unknown>
    | null;

  return json(200, {
    provider: "openai-realtime",
    session,
    state: "Enabled",
  });
}
