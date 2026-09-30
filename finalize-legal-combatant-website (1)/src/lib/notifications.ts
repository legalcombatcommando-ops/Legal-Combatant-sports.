import { ownerEmail, ownerWhatsAppNumber } from "@/lib/contact";

export type DeliveryStatus = "sent" | "not_configured" | "failed";

type OwnerAlert = {
  kind: "fighter onboarding" | "general inquiry";
  reference: string;
  name: string;
  email: string;
  details: string;
};

async function sendEmail(alert: OwnerAlert): Promise<DeliveryStatus> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return "not_configured";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `legal-combatant-${alert.reference}`,
      },
      body: JSON.stringify({
        from,
        to: [process.env.NOTIFICATION_EMAIL || ownerEmail],
        subject: `[Legal Combatants] New ${alert.kind} · ${alert.reference}`,
        text: [
          `NEW ${alert.kind.toUpperCase()}`,
          `Reference: ${alert.reference}`,
          `Name: ${alert.name}`,
          `Email: ${alert.email}`,
          "",
          alert.details,
          "",
          "This is an initial intake, not a professional engagement. Please obtain permission before sharing details with a third-party partner.",
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.warn("Owner email notification was not accepted", response.status);
      return "failed";
    }
    return "sent";
  } catch (error) {
    console.warn("Owner email notification failed", error instanceof Error ? error.name : "unknown error");
    return "failed";
  }
}

async function sendWhatsApp(alert: OwnerAlert): Promise<DeliveryStatus> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  if (!accessToken || !phoneNumberId || !templateName) return "not_configured";

  try {
    const version = process.env.WHATSAPP_API_VERSION || "v25.0";
    const response = await fetch(`https://graph.facebook.com/${version}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: process.env.NOTIFICATION_WHATSAPP || ownerWhatsAppNumber,
        type: "template",
        template: {
          name: templateName,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en_US" },
          components: [
            { type: "body", parameters: [{ type: "text", text: alert.reference }] },
          ],
        },
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.warn("Owner WhatsApp notification was not accepted", response.status);
      return "failed";
    }
    return "sent";
  } catch (error) {
    console.warn("Owner WhatsApp notification failed", error instanceof Error ? error.name : "unknown error");
    return "failed";
  }
}

export async function notifyOwner(alert: OwnerAlert) {
  const [email, whatsapp] = await Promise.all([sendEmail(alert), sendWhatsApp(alert)]);
  return { email, whatsapp };
}
