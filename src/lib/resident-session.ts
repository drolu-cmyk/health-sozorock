import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const residentSessionCookie = "srh_resident_session";

export type ResidentSession = {
  createdAt: string;
  email: string;
  name: string;
  sessionId: string;
  zip: string;
};

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 14;

function sessionSecret() {
  return (
    process.env.SOZOROCK_SESSION_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    "sozorock-health-controlled-launch-session"
  );
}

function base64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function createResidentSession(input: {
  email: string;
  name: string;
  zip?: string;
}): ResidentSession {
  return {
    createdAt: new Date().toISOString(),
    email: input.email,
    name: input.name,
    sessionId: randomUUID(),
    zip: input.zip ?? "",
  };
}

export function encodeResidentSession(session: ResidentSession) {
  const payload = base64Url(JSON.stringify(session));
  return `${payload}.${sign(payload)}`;
}

export function decodeResidentSession(value: string | undefined) {
  if (!value) {
    return null;
  }

  const [payload, signature] = value.split(".");
  if (!payload || !signature) {
    return null;
  }

  const expected = sign(payload);
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);
  if (
    expectedBuffer.length !== signatureBuffer.length ||
    !timingSafeEqual(expectedBuffer, signatureBuffer)
  ) {
    return null;
  }

  try {
    const session = JSON.parse(fromBase64Url(payload)) as ResidentSession;
    if (!session.email || !session.name || !session.sessionId) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export const residentSessionCookieOptions = {
  httpOnly: true,
  maxAge: SESSION_TTL_SECONDS,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};
