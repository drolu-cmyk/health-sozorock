import { NextRequest, NextResponse } from "next/server";
import { searchAccessDirectory } from "@/lib/access-directory";

export const runtime = "nodejs";

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "no-store",
    },
    status,
  });
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";

  if (query.length > 120) {
    return json(400, {
      error: "Search is too long. Try a ZIP code, city, or county.",
    });
  }

  const results = searchAccessDirectory(query);

  return json(200, {
    count: results.length,
    query,
    results,
    state:
      results.length > 0
        ? "Enabled"
        : "We could not find a nearby access point yet",
    supportPath: "Request support",
  });
}
