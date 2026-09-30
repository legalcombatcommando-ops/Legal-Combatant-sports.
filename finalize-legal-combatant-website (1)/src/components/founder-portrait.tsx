import { getPortraitSrc } from "@/lib/portrait";
import { founder } from "@/lib/founder";

/** Fills its positioned parent. Shows the Founder's portrait, or a neutral placeholder until one is uploaded. */
export async function FounderPortrait({ priority = false }: { priority?: boolean }) {
  const source = await getPortraitSrc();

  if (!source) {
    return (
      <div className="founder-portrait-fallback" role="img" aria-label="The Founder's portrait will appear here">
        <span>LC</span>
        <p>PORTRAIT COMING SOON</p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="founder-portrait-image"
      src={source}
      alt={founder.portraitAlt}
      width={900}
      height={1125}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
