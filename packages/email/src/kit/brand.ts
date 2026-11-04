export const emailProducts = ["locusgraph", "spendgraph"] as const;

export type EmailProduct = (typeof emailProducts)[number];

export type EmailBrand = {
  name: string;
  wordmark: [bold: string, light: string];
  markUrl: string;
  markWidth: number;
  markHeight: number;
};

export type WithProduct = { product?: EmailProduct; brand?: Partial<EmailBrand> };

export const emailAssetsOrigin = "https://design.locusgraph.com";

const productBrands: Record<EmailProduct, EmailBrand> = {
  locusgraph: {
    name: "LocusGraph",
    wordmark: ["locus", "graph"],
    markUrl: `${emailAssetsOrigin}/email/locusgraph-mark.png`,
    markWidth: 27,
    markHeight: 24,
  },
  spendgraph: {
    name: "SpendGraph",
    wordmark: ["spend", "graph"],
    markUrl: `${emailAssetsOrigin}/email/spendgraph-mark.png`,
    markWidth: 27,
    markHeight: 24,
  },
};

export function brandOf(
  product: EmailProduct = "locusgraph",
  override: Partial<EmailBrand> = {}
): EmailBrand {
  return { ...productBrands[product], ...override };
}
