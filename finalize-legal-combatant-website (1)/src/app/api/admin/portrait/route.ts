import { createHash, timingSafeEqual } from "node:crypto";
import { db } from "@/db";
import { siteAssets } from "@/db/schema";
import { PORTRAIT_KEY, detectImageType } from "@/lib/portrait";

export const runtime = "nodejs";

const MAX_BYTES = 6 * 1024 * 1024;
const failures = new Map<string, { count: number; first: number }>();

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function tooManyFailures(ip: string) {
  const entry = failures.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.first > 15 * 60 * 1000) {
    failures.delete(ip);
    return false;
  }
  return entry.count >= 6;
}

function recordFailure(ip: string) {
  const entry = failures.get(ip);
  if (!entry || Date.now() - entry.first > 15 * 60 * 1000) failures.set(ip, { count: 1, first: Date.now() });
  else entry.count += 1;
}

export async function POST(request: Request) {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) {
    return Response.json({ error: "Portrait upload is switched off until an ADMIN_PASSCODE is configured on the server." }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooManyFailures(ip)) {
    return Response.json({ error: "Too many incorrect attempts. Please try again in 15 minutes." }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Please choose an image and try again." }, { status: 400 });
  }

  const passcode = form.get("passcode");
  if (typeof passcode !== "string" || !timingSafeEqual(digest(passcode), digest(expected))) {
    recordFailure(ip);
    await new Promise((resolve) => setTimeout(resolve, 700));
    return Response.json({ error: "That passcode is not correct." }, { status: 401 });
  }

  const file = form.get("portrait");
  if (!(file instanceof File) || file.size === 0) return Response.json({ error: "Please choose an image file." }, { status: 400 });
  if (file.size > MAX_BYTES) return Response.json({ error: "That image is larger than 6 MB. Please choose a smaller one." }, { status: 413 });

  const bytes = new Uint8Array(await file.arrayBuffer());
  const contentType = detectImageType(bytes);
  if (!contentType) return Response.json({ error: "Please upload a JPG, PNG, or WebP image." }, { status: 415 });

  try {
    const data = Buffer.from(bytes);
    await db
      .insert(siteAssets)
      .values({ key: PORTRAIT_KEY, contentType, data })
      .onConflictDoUpdate({ target: siteAssets.key, set: { contentType, data, updatedAt: new Date() } });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Could not save the founder portrait", error);
    return Response.json({ error: "The portrait could not be saved. Please try again." }, { status: 500 });
  }
}
