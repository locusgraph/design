import type * as React from "react";
import { contentWidth, emailColors, emailFonts } from "./theme";

type EmailLayoutProps = {
  preview: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function EmailLayout({ preview, children, footer }: EmailLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: emailColors.page,
          fontFamily: emailFonts.sans,
        }}
      >
        <div style={{ display: "none", maxHeight: 0, overflow: "hidden" }}>{preview}</div>
        <table
          role="presentation"
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ backgroundColor: emailColors.page }}
        >
          <tbody>
            <tr>
              <td align="center" style={{ padding: "40px 16px" }}>
                <table
                  role="presentation"
                  width={contentWidth}
                  cellPadding={0}
                  cellSpacing={0}
                  style={{ maxWidth: contentWidth, width: "100%" }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{ paddingBottom: 16, fontSize: 16, color: emailColors.foreground }}
                      >
                        <strong>locus</strong>
                        <span style={{ fontWeight: 300 }}>graph</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          backgroundColor: emailColors.surface,
                          border: `1px solid ${emailColors.line}`,
                          padding: 32,
                          color: emailColors.foreground,
                        }}
                      >
                        {children}
                      </td>
                    </tr>
                    {footer && (
                      <tr>
                        <td
                          style={{
                            paddingTop: 16,
                            fontSize: 12,
                            lineHeight: "18px",
                            color: emailColors.muted,
                          }}
                        >
                          {footer}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
