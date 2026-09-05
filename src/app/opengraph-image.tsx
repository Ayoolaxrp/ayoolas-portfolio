import { ImageResponse } from "next/og";

import {
  DEFAULT_METADATA,
  ROLE,
  SITE_NAME_LONG,
  SITE_TAGLINE,
} from "@/config/site.config";

/**
 * Static OG image: the brand wordmark, role, and tagline on the brand gradient.
 * Generated at build time by Next.js. Served at /opengraph-image.png.
 *
 * Tokens mirror src/styles/tokens.css so the OG card and the live site read as
 * one piece. Inter is loaded as a system fallback here to keep the OG image
 * self-contained (no external font fetches at build time).
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background:
          "linear-gradient(135deg, #05070b 0%, #0b1017 55%, #05070b 100%)",
        color: "#f6f8fb",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top row: mark + role */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 18,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#10b981",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#10b981",
            }}
          />
          <div>{ROLE}</div>
        </div>
        <div style={{ color: "#667085" }}>portfolio · 2026</div>
      </div>

      {/* Center: tagline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 980,
        }}
      >
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontWeight: 600,
            color: "#f6f8fb",
          }}
        >
          {SITE_TAGLINE}
        </div>
        <div
          style={{
            fontSize: 22,
            lineHeight: 1.5,
            color: "#a6aebb",
            maxWidth: 760,
          }}
        >
          {DEFAULT_METADATA.description}
        </div>
      </div>

      {/* Bottom row: name + accent line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            height: 1,
            width: "100%",
            background: "linear-gradient(90deg, #10b981 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#f6f8fb",
          }}
        >
          <div style={{ fontWeight: 600 }}>{SITE_NAME_LONG}</div>
          <div style={{ color: "#667085", fontSize: 16 }}>ayoola.dev</div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
