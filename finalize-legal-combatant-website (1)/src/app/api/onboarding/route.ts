import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { fighterApplications } from "@/db/schema";
import { notifyOwner } from "@/lib/notifications";
import { careerStages, contactPreferences, disciplines, fighterNeeds, needLabel, timelines } from "@/lib/onboarding";

export const runtime = "nodejs";

function badRequest(error: string) {
  return Response.json({ error }, { status: 400 });
}

export async function POST(request: Request) {
  let input: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 15000) return Response.json({ error: "That submission is too large." }, { status: 413 });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return badRequest("Please submit a valid form.");
    input = parsed as Record<string, unknown>;
  } catch {
    return badRequest("Please submit a valid form.");
  }

  // Quietly discard automated submissions caught by the hidden field.
  if (typeof input.website === "string" && input.website.trim()) {
    return Response.json({ ok: true, reference: "" }, { status: 201 });
  }

  const value = (key: string) => typeof input[key] === "string" ? (input[key] as string).trim() : "";
  const fullName = value("fullName");
  const email = value("email").toLowerCase();
  const phone = value("phone");
  const city = value("city");
  const country = value("country");
  const discipline = value("discipline");
  const careerStage = value("careerStage");
  const priority = value("priority");
  const timeline = value("timeline");
  const contactPreference = value("contactPreference");
  const whatsappConsent = input.whatsappConsent === true;
  const consent = input.consent === true;
  const needs = Array.isArray(input.needs) ? input.needs : [];
  const allowedNeeds = new Set<string>(fighterNeeds.map((need) => need.id));

  if (fullName.length < 2 || fullName.length > 120) return badRequest("Please enter your full name.");
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return badRequest("Please enter a valid email address.");
  if (phone.length > 30 || !/^\+?\d{8,16}$/.test(phone.replace(/[\s().-]/g, ""))) return badRequest("Please enter a WhatsApp or phone number with country code if outside Nigeria.");
  if (city.length < 2 || city.length > 100 || country.length < 2 || country.length > 100) return badRequest("Please enter your city and country.");
  if (!disciplines.includes(discipline as (typeof disciplines)[number])) return badRequest("Please choose your combat sport.");
  if (!careerStages.includes(careerStage as (typeof careerStages)[number])) return badRequest("Please choose where you are in your career.");
  if (needs.length < 1 || needs.length > fighterNeeds.length || needs.some((need) => typeof need !== "string" || !allowedNeeds.has(need))) return badRequest("Choose at least one kind of support you need.");
  if (priority.length > 1000) return badRequest("Please keep your note under 1,000 characters.");
  if (!timelines.includes(timeline as (typeof timelines)[number])) return badRequest("Please select a timeline.");
  if (!contactPreferences.includes(contactPreference as (typeof contactPreferences)[number])) return badRequest("Please choose how we can reach you.");
  if (contactPreference !== "Email" && !whatsappConsent) return badRequest("Please agree to WhatsApp contact, or choose email instead.");
  if (!consent) return badRequest("Please accept the privacy notice before continuing.");

  const selectedNeeds = [...new Set(needs as string[])];
  const reference = `LC-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`;
  let applicationId: number;

  try {
    const [application] = await db.insert(fighterApplications).values({
      reference,
      fullName,
      email,
      phone,
      city,
      country,
      discipline,
      careerStage,
      needs: selectedNeeds,
      priority,
      timeline,
      contactPreference,
      whatsappConsent,
    }).returning({ id: fighterApplications.id });
    applicationId = application.id;
  } catch (error) {
    console.error("Could not save fighter onboarding", error);
    return Response.json({ error: "We could not save your profile right now. Please try again." }, { status: 500 });
  }

  const delivery = await notifyOwner({
    kind: "fighter onboarding",
    reference,
    name: fullName,
    email,
    details: [
      `Phone / WhatsApp: ${phone}`,
      `Location: ${city}, ${country}`,
      `Sport: ${discipline}`,
      `Career stage: ${careerStage}`,
      `Support requested: ${selectedNeeds.map(needLabel).join(", ")}`,
      `Timeline: ${timeline}`,
      `Preferred contact: ${contactPreference}`,
      `WhatsApp contact permission: ${whatsappConsent ? "Yes" : "No"}`,
      `Their note: ${priority || "Not provided"}`,
    ].join("\n"),
  });

  try {
    await db.update(fighterApplications).set({
      emailDelivery: delivery.email,
      whatsappDelivery: delivery.whatsapp,
    }).where(eq(fighterApplications.id, applicationId));
  } catch (error) {
    console.error("Could not update onboarding delivery status", error);
  }

  return Response.json({ ok: true, reference, delivery }, { status: 201 });
}
