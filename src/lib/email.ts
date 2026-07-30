import { Resend } from "resend";
import type { Enquiry } from "./db";
import { getOptionalEnv } from "./env";

export async function sendEnquiryNotification(enquiry: Enquiry): Promise<void> {
  const apiKey = getOptionalEnv("RESEND_API_KEY");
  const from = getOptionalEnv("RESEND_FROM_EMAIL");
  const to = getOptionalEnv("ENQUIRY_NOTIFICATION_EMAIL");

  if (!apiKey || !from || !to) {
    console.warn(
      "[email] RESEND_API_KEY, RESEND_FROM_EMAIL, or ENQUIRY_NOTIFICATION_EMAIL missing — skipping notification email. See .env.example."
    );
    return;
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to,
    subject: `New enquiry from ${enquiry.name}${enquiry.trip ? ` — ${enquiry.trip}` : ""}`,
    text: [
      `Name: ${enquiry.name}`,
      `Email: ${enquiry.email}`,
      enquiry.phone ? `Phone: ${enquiry.phone}` : null,
      enquiry.country ? `Country: ${enquiry.country}` : null,
      enquiry.travelers ? `Travelers: ${enquiry.travelers}` : null,
      enquiry.date ? `Preferred date: ${enquiry.date}` : null,
      enquiry.trip ? `Trip: ${enquiry.trip}` : null,
      enquiry.message ? `Message: ${enquiry.message}` : null,
      `Received: ${enquiry.receivedAt}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
