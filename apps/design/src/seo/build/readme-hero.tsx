import { darkColors, lightColors, type Palette } from "@locusgraph/tokens";
import type * as React from "react";

export type HeroTheme = "dark" | "light";

export const readmeHeroSize = { width: 1280, height: 560 } as const;

const fonts = {
  heading: "Archivo",
  body: "IBM Plex Sans",
  mono: "IBM Plex Mono",
};

const palettes: Record<HeroTheme, Palette> = { dark: darkColors, light: lightColors };

function alpha(hex: string, amount: number) {
  const byte = Math.round(amount * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${byte}`;
}

function row(style: React.CSSProperties = {}): React.CSSProperties {
  return { display: "flex", alignItems: "center", ...style };
}

function Wordmark({ colors }: { colors: Palette }) {
  return (
    <div style={row({ gap: 14, fontFamily: fonts.heading, fontSize: 30 })}>
      <div style={row({ width: 30, height: 30, justifyContent: "center" })}>
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: colors.foreground,
            transform: "rotate(45deg)",
          }}
        />
      </div>
      <div style={{ display: "flex" }}>
        <span style={{ fontWeight: 700 }}>locus</span>
        <span style={{ fontWeight: 300 }}>design</span>
      </div>
    </div>
  );
}

function Field({ label, value, colors }: { label: string; value: string; colors: Palette }) {
  return (
    <div style={row({ fontSize: 17 })}>
      <span style={{ width: 120, color: colors.mutedForeground }}>{label}</span>
      <span style={{ color: colors.foreground, fontWeight: 700 }}>{value}</span>
    </div>
  );
}

function ApprovalCard({ colors, line }: { colors: Palette; line: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 470,
        backgroundColor: colors.surface,
        border: `1px solid ${line}`,
        fontFamily: fonts.body,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18, padding: 30 }}>
        <div style={row({ gap: 12, fontFamily: fonts.heading, fontSize: 21 })}>
          <div style={{ display: "flex", gap: 7 }}>
            <span style={{ color: colors.warn, fontWeight: 700 }}>Waiting</span>
            <span style={{ color: colors.mutedForeground, fontWeight: 300 }}>to run</span>
            <span style={{ fontWeight: 700 }}>send invoice</span>
          </div>
          <span
            style={{
              padding: "3px 10px",
              borderRadius: 999,
              fontSize: 13,
              color: colors.warn,
              backgroundColor: alpha(colors.warn, 0.14),
            }}
          >
            Writes data
          </span>
        </div>
        <span style={{ fontSize: 16, color: colors.mutedForeground }}>
          Makes a change. Check the inputs before you approve.
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Field label="To" value="ap@northwind.io" colors={colors} />
          <Field label="Invoice" value="INV-2041" colors={colors} />
          <Field label="Amount" value="$1,240.00" colors={colors} />
        </div>
        <div style={row({ gap: 22, fontFamily: fonts.heading, fontSize: 16, marginTop: 4 })}>
          <span
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              backgroundColor: colors.btn,
              color: colors.btnInk,
              fontWeight: 700,
            }}
          >
            Send INV-2041
          </span>
          <span style={{ fontWeight: 700 }}>Deny</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: "20px 30px",
          borderTop: `1px solid ${line}`,
          backgroundColor: alpha(colors.muted, 0.6),
        }}
      >
        <span style={{ fontFamily: fonts.heading, fontSize: 14, color: colors.mutedForeground }}>
          Decision log
        </span>
        <div style={row({ gap: 12, fontSize: 16 })}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
              d="M3.5 9.5 7.5 13.5 14.5 5"
              fill="none"
              stroke={colors.good}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontWeight: 700 }}>Approved send invoice</span>
          <span style={{ color: colors.faint }}>Maya · 12:04</span>
        </div>
      </div>
    </div>
  );
}

export function ReadmeHero({ theme }: { theme: HeroTheme }) {
  const colors = palettes[theme];
  const line = alpha(colors.foreground, theme === "dark" ? 0.12 : 0.1);
  return (
    <div
      style={{
        ...readmeHeroSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
        backgroundColor: colors.background,
        color: colors.foreground,
        fontFamily: fonts.body,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 40, width: 600 }}>
        <Wordmark colors={colors} />
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span
            style={{
              fontFamily: fonts.heading,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -1.5,
            }}
          >
            Design that keeps humans in the loop.
          </span>
          <span style={{ fontSize: 24, lineHeight: 1.4, color: colors.mutedForeground }}>
            Components, blocks and Loop, the agent UI.
          </span>
        </div>
        <span
          style={{
            display: "flex",
            paddingTop: 22,
            borderTop: `1px solid ${line}`,
            fontFamily: fonts.mono,
            fontSize: 15,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            color: colors.faint,
          }}
        >
          React 19 · Tailwind 4 · Light and dark
        </span>
      </div>
      <ApprovalCard colors={colors} line={line} />
    </div>
  );
}
