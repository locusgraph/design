import type * as React from "react";
import { emailColors, emailFonts } from "./theme";

export function EmailLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        margin: "0 0 8px",
        fontFamily: emailFonts.mono,
        fontSize: 12,
        color: emailColors.muted,
      }}
    >
      {children}
    </p>
  );
}

export function EmailHeading({ children }: { children: React.ReactNode }) {
  return (
    <h1
      style={{
        margin: "0 0 12px",
        fontSize: 22,
        lineHeight: "28px",
        fontWeight: 600,
        letterSpacing: "-0.02em",
      }}
    >
      {children}
    </h1>
  );
}

export function EmailText({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <p
      style={{
        margin: "0 0 16px",
        fontSize: 15,
        lineHeight: "24px",
        color: muted ? emailColors.muted : emailColors.foreground,
      }}
    >
      {children}
    </p>
  );
}

export function EmailButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: "8px 0 16px" }}>
      <tbody>
        <tr>
          <td style={{ backgroundColor: emailColors.btn, borderRadius: 9999 }}>
            <a
              href={href}
              style={{
                display: "inline-block",
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 600,
                color: emailColors.btnInk,
                textDecoration: "none",
              }}
            >
              {children}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function EmailRows({ rows }: { rows: [label: string, value: string][] }) {
  return (
    <table
      role="presentation"
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      style={{ margin: "8px 0 16px", borderTop: `1px solid ${emailColors.line}` }}
    >
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <td
              style={{
                padding: "10px 0",
                fontSize: 14,
                color: emailColors.muted,
                borderBottom: `1px solid ${emailColors.line}`,
              }}
            >
              {label}
            </td>
            <td
              align="right"
              style={{
                padding: "10px 0",
                fontSize: 14,
                borderBottom: `1px solid ${emailColors.line}`,
              }}
            >
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
