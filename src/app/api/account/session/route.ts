import { NextRequest, NextResponse } from "next/server";
import {
  createResidentSession,
  decodeResidentSession,
  encodeResidentSession,
  residentSessionCookie,
  residentSessionCookieOptions,
} from "@/lib/resident-session";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 4_000;

type AccountSessionRequest = {
  action?: "login" | "signup" | "signout";
  email?: string;
  name?: string;
  passcode?: string;
  zip?: string;
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

function normalizeEmail(value: unknown) {
  return safeText(value, 160).toLowerCase();
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function GET(request: NextRequest) {
  const session = decodeResidentSession(
    request.cookies.get(residentSessionCookie)?.value,
  );

  return json(200, {
    authenticated: Boolean(session),
    session,
  });
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json(413, { error: "Request is too large." });
  }

  const body = (await request.json().catch(() => null)) as
    | AccountSessionRequest
    | null;
  if (!body) {
    return json(400, { error: "Account request could not be read." });
  }

  if (body.action === "signout") {
    const response = json(200, {
      authenticated: false,
      message: "Signed out.",
    });
    response.cookies.set(residentSessionCookie, "", {
      ...residentSessionCookieOptions,
      maxAge: 0,
    });
    return response;
  }

  const action = body.action === "signup" ? "signup" : "login";
  const email = normalizeEmail(body.email);
  const passcode = safeText(body.passcode, 80);
  const name =
    action === "signup" ? safeText(body.name, 80) : safeText(body.name, 80) || "Resident";
  const zip = safeText(body.zip, 20);

  if (!validEmail(email)) {
    return json(400, { error: "Enter a valid email address." });
  }

  if (passcode.length < 6) {
    return json(400, { error: "Use at least 6 characters for your passcode." });
  }

  if (action === "signup" && name.length < 2) {
    return json(400, { error: "Enter your name or initials." });
  }

  const session = createResidentSession({ email, name, zip });
  const response = json(200, {
    authenticated: true,
    message: action === "signup" ? "Account ready." : "Welcome back.",
    session,
    state: "Enabled",
  });
  response.cookies.set(
    residentSessionCookie,
    encodeResidentSession(session),
    residentSessionCookieOptions,
  );
  return response;
}
