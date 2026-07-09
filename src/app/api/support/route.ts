import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8_000;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 8;

type Bucket = {
  count: number;
  resetAt: number;
};

type SupportRequest = {
  consent?: boolean;
  message?: string;
  need?: string;
  query?: string;
};

const buckets = new Map<string, Bucket>();

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "no-store",
    },
    status,
  });
}

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function rateLimit(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (bucket.count >= MAX_REQUESTS) {
    return false;
  }

  bucket.count += 1;
  return true;
}

function safeText(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json(413, { error: "Support request is too large." });
  }

  if (!rateLimit(getClientKey(request))) {
    return json(429, {
      error: "Too many support requests. Please try again later.",
    });
  }

  const body = (await request.json().catch(() => null)) as SupportRequest | null;
  if (!body) {
    return json(400, { error: "Support request could not be read." });
  }

  if (body.consent !== true) {
    return json(400, {
      error: "This option needs your permission before it can be used.",
    });
  }

  const message = safeText(body.message, 1600);
  const need = safeText(body.need, 80) || "local-support";
  const query = safeText(body.query, 120);

  if (message.length < 8) {
    return json(400, {
      error: "Add a short note so support can understand the access need.",
    });
  }

  const caseId = `SRH-${Date.now().toString(36).toUpperCase()}`;

  return json(200, {
    auditPath: "support-case-audit",
    caseId,
    message:
      "Support request prepared. An approved support owner can route this through the production support pathway.",
    need,
    query,
    state: "Request access",
  });
}
