import fs from "node:fs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteAssets } from "@/db/schema";
import { PORTRAIT_KEY, findPortraitFile } from "@/lib/portrait";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const [asset] = await db.select().from(siteAssets).where(eq(siteAssets.key, PORTRAIT_KEY)).limit(1);
    if (asset) {
      return new Response(new Uint8Array(asset.data), {
        headers: {
          "Content-Type": asset.contentType,
          // The URL carries a version query, so a long cache is safe and a new upload busts it.
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }
  } catch (error) {
    console.warn("Could not read the founder portrait", error instanceof Error ? error.name : "unknown error");
  }

  const file = findPortraitFile();
  if (file) {
    return new Response(new Uint8Array(fs.readFileSync(file.filePath)), {
      headers: { "Content-Type": file.contentType, "Cache-Control": "public, max-age=300", "X-Content-Type-Options": "nosniff" },
    });
  }
  return new Response("Not found", { status: 404 });
}
