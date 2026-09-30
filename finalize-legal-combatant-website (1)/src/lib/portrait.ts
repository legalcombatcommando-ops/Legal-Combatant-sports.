import fs from "node:fs";
import path from "node:path";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteAssets } from "@/db/schema";

export const PORTRAIT_KEY = "founder-portrait";
const fileExtensions = ["jpg", "jpeg", "png", "webp"] as const;

/** Returns the URL to use for the Founder's portrait, or null if none has been added yet. */
export async function getPortraitSrc(): Promise<string | null> {
  try {
    const [asset] = await db
      .select({ updatedAt: siteAssets.updatedAt })
      .from(siteAssets)
      .where(eq(siteAssets.key, PORTRAIT_KEY))
      .limit(1);
    if (asset) return `/founder-portrait?v=${asset.updatedAt.getTime()}`;
  } catch (error) {
    console.warn("Could not look up the founder portrait", error instanceof Error ? error.name : "unknown error");
  }
  return findPortraitFile() ? "/founder-portrait" : null;
}

const mimeByExtension: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

/** Fallback: a file placed at public/images/founder-portrait.(jpg|jpeg|png|webp). */
export function findPortraitFile() {
  for (const extension of fileExtensions) {
    const filePath = path.join(process.cwd(), "public", "images", `founder-portrait.${extension}`);
    if (fs.existsSync(filePath)) return { filePath, contentType: mimeByExtension[extension] };
  }
  return null;
}

/** Identify an image from its first bytes instead of trusting the file name or declared type. */
export function detectImageType(bytes: Uint8Array): "image/jpeg" | "image/png" | "image/webp" | null {
  if (bytes.length > 12 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "image/png";
  if (
    bytes.length > 12 &&
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) return "image/webp";
  return null;
}
