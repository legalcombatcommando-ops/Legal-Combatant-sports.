import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { roles, topics } from "@/lib/content";
import { notifyOwner } from "@/lib/notifications";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    const raw = await request.text();
    if (raw.length > 15000) return Response.json({ error: "That message is too large." }, { status: 413 });
    payload = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Please submit a valid form." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return Response.json({ error: "Please submit a valid form." }, { status: 400 });
  }

  const input = payload as Record<string, unknown>;
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const role = typeof input.role === "string" ? input.role.trim() : "";
  const topic = typeof input.topic === "string" ? input.topic.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";

  if (typeof input.website === "string" && input.website.trim()) {
    return Response.json({ ok: true }, { status: 201 });
  }

  if (name.length < 2 || name.length > 120) return Response.json({ error: "Please enter your name." }, { status: 400 });
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!roles.includes(role as (typeof roles)[number])) return Response.json({ error: "Please select the option that describes you." }, { status: 400 });
  if (!topics.includes(topic as (typeof topics)[number])) return Response.json({ error: "Please select a topic." }, { status: 400 });
  if (message.length < 20 || message.length > 5000) return Response.json({ error: "Please tell us a little more (20 to 5,000 characters)." }, { status: 400 });
  if (input.consent !== true) return Response.json({ error: "Please accept the privacy notice." }, { status: 400 });

  const reference = `LC-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`;
  let inquiryId: number;

  try {
    const [inquiry] = await db.insert(inquiries).values({ reference, name, email, role, topic, message }).returning({ id: inquiries.id });
    inquiryId = inquiry.id;
  } catch (error) {
    console.error("Could not save inquiry", error);
    return Response.json({ error: "Your message could not be saved right now. Please try again." }, { status: 500 });
  }

  const delivery = await notifyOwner({
    kind: "general inquiry",
    reference,
    name,
    email,
    details: `Role: ${role}\nTopic: ${topic}\n\nMessage:\n${message}`,
  });

  try {
    await db.update(inquiries).set({ emailDelivery: delivery.email, whatsappDelivery: delivery.whatsapp }).where(eq(inquiries.id, inquiryId));
  } catch (error) {
    console.error("Could not update inquiry delivery status", error);
  }

  return Response.json({ ok: true, reference, delivery }, { status: 201 });
}
