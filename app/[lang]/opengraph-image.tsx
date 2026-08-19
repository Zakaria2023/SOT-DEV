import { LOCALES, getDictionary, isLocale } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/landing";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_URL } from "@/lib/seo";
import { ImageResponse } from "next/og";

export const size = {
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
};

export const contentType = "image/png";

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

/** The six capability colours, as the band across the top of the card. */
const SWATCHES = [
  "#b99253",
  "#12857f",
  "#1f6fd0",
  "#4f46b8",
  "#7d4bc4",
  "#c9451f",
];

export const alt = `${SITE_NAME} share card`;

/**
 * The share card, one per language.
 *
 * Type and flat colour only — no logo. The mark is a WebP, and the renderer
 * behind `ImageResponse` does not read WebP, so embedding it would mean keeping
 * a second PNG copy of the logo in step with the first. A card that states the
 * name in the brand's own colours says the same thing without that.
 *
 * The ARABIC card stays in Latin type. `ImageResponse` renders with the fonts
 * it is handed and falls back to a built-in Latin face; handing it Arabic text
 * without also shipping an Arabic font file produces a row of empty boxes,
 * which is a worse share card than an English one. The tagline is dropped for
 * Arabic rather than mojibaked, and the name — which is Latin in both languages
 * anyway — carries it.
 *
 * Every element carries an explicit `display: flex`: the renderer implements a
 * subset of CSS in which `div` has no default layout, and a container left
 * unset throws rather than falling back.
 */
const Image = async ({ params }: PageProps<"/[lang]">) => {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "en";
  const tagline = isLocale(lang) ? getDictionary("en").meta.tagline : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#2e2414",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {SWATCHES.map((colour) => (
            <div
              key={colour}
              style={{
                width: 64,
                height: 10,
                backgroundColor: colour,
                borderRadius: 3,
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, color: "#ffffff" }}>
            {SITE_NAME}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 40,
              color: "#b99253",
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #3d3425",
            paddingTop: 28,
            fontSize: 26,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <div style={{ display: "flex" }}>Web · Mobile · ERP · Cloud · AI</div>
          <div style={{ display: "flex" }}>
            {SITE_URL.replace("https://", "")}/{locale}
          </div>
        </div>
      </div>
    ),
    size,
  );
};

export default Image;
