import type * as React from "react";
import { brandOf, type EmailBrand, type EmailProduct } from "./brand";
import { contentWidth, emailColors, emailFonts } from "./theme";

type EmailLayoutProps = {
  preview: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  product?: EmailProduct;
  brand?: Partial<EmailBrand>;
};

export function EmailLayout({
  preview,
  children,
  footer,
  product,
  brand: override,
}: EmailLayoutProps) {
  const brand = brandOf(product, override);
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
                      <td style={{ paddingBottom: 16 }}>
                        <BrandHeader brand={brand} />
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
                            color: emailColors.mutedForeground,
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

function BrandHeader({ brand }: { brand: EmailBrand }) {
  const [bold, light] = brand.wordmark;
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td style={{ paddingRight: 8, verticalAlign: "middle" }}>
            <img
              src={brand.markUrl}
              width={brand.markWidth}
              height={brand.markHeight}
              alt=""
              style={{ display: "block", border: 0 }}
            />
          </td>
          <td style={{ verticalAlign: "middle", fontSize: 16, color: emailColors.foreground }}>
            <strong>{bold}</strong>
            <span style={{ fontWeight: 300 }}>{light}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
