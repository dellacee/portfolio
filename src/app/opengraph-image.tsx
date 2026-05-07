import { ImageResponse } from "next/og";
import { RESUME } from "@/data/resume";

export const alt = `${RESUME.name} — ${RESUME.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f0f23 0%, #1a0b2e 40%, #2d1657 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            opacity: 0.7,
            letterSpacing: 4,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            marginTop: 16,
            lineHeight: 1.05,
            display: "flex",
          }}
        >
          {RESUME.name}
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            marginTop: 8,
            background: "linear-gradient(90deg,#a78bfa,#f0abfc)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          {RESUME.role}
        </div>
        <div
          style={{
            fontSize: 22,
            marginTop: 32,
            opacity: 0.6,
            display: "flex",
          }}
        >
          {RESUME.url.replace("https://", "")}
        </div>
      </div>
    ),
    size,
  );
}
