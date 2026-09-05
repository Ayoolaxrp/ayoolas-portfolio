import { ImageResponse } from "next/og";

/**
 * Site favicon: the wordmark initial on the brand canvas with an accent dot.
 * Generated at build time by Next.js as /icon.png (32x32) and a SVG variant.
 *
 * No external assets: the entire mark is drawn from tokens, so the favicon
 * and the OG card share one visual language.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#05070b",
        borderRadius: 6,
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontWeight: 700,
        fontSize: 22,
        color: "#f6f8fb",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          width: 5,
          height: 5,
          borderRadius: 999,
          background: "#10b981",
        }}
      />
      A
    </div>,
    { ...size },
  );
}
