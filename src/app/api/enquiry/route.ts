import { NextResponse } from "next/server";
import { insertEnquiry, type Enquiry } from "@/lib/db";
import { sendEnquiryNotification } from "@/lib/email";
import { checkRateLimit } from "@/lib/rateLimit";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed, retryAfterSec } = checkRateLimit(`enquiry:${ip}`, 5, 60_000);
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

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!name || name.length > 200) {
    return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const str = (v: unknown, max = 2000) =>
    typeof v === "string" ? v.trim().slice(0, max) : undefined;

  const enquiry: Enquiry = {
    id: `enq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    receivedAt: new Date().toISOString(),
    name,
    email,
    phone: str(body.phone, 50),
    country: str(body.country, 100),
    travelers: str(body.travelers, 10),
    date: str(body.date, 20),
    trip: str(body.trip, 100),
    message: str(body.message),
  };

  try {
    insertEnquiry(enquiry);
  } catch (err) {
    console.error("Failed to persist enquiry:", err);
    return NextResponse.json(
      { error: "Could not save your enquiry. Please email us directly." },
      { status: 500 }
    );
  }

  try {
    await sendEnquiryNotification(enquiry);
  } catch (err) {
    console.error("Failed to send enquiry notification email:", err);
  }

  return NextResponse.json({ ok: true, id: enquiry.id });
}
