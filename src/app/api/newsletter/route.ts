import { NextResponse } from "next/server";
import { insertSubscriber } from "@/lib/db";
import { checkRateLimit } from "@/lib/rateLimit";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed, retryAfterSec } = checkRateLimit(`newsletter:${ip}`, 5, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  try {
    const { alreadySubscribed } = insertSubscriber({
      id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      email,
      subscribedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, alreadySubscribed });
  } catch (err) {
    console.error("Failed to persist subscriber:", err);
    return NextResponse.json({ error: "Could not subscribe. Please try again." }, { status: 500 });
  }
}
