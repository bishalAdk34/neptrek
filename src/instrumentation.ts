// Runs once when the Next.js server boots (Node.js runtime only).
// Surfaces env-var misconfiguration at startup instead of only on first
// request. Non-fatal — mirrors the dev-friendly "warn, don't crash" design
// of src/lib/email.ts (email notifications are optional).
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const emailVars = ["RESEND_API_KEY", "RESEND_FROM_EMAIL", "ENQUIRY_NOTIFICATION_EMAIL"] as const;
  const present = emailVars.filter((k) => process.env[k]);

  if (present.length === 0) {
    console.warn(
      "[startup] Email notifications disabled — RESEND_API_KEY, RESEND_FROM_EMAIL, ENQUIRY_NOTIFICATION_EMAIL not set. See .env.example."
    );
  } else if (present.length < emailVars.length) {
    const missing = emailVars.filter((k) => !process.env[k]);
    console.warn(
      `[startup] Partial email config — missing ${missing.join(", ")}. Email notifications will not send.`
    );
  } else {
    console.log("[startup] Email notifications configured (Resend).");
  }
}
