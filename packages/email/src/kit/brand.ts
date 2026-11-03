export const emailProducts = ["locusgraph", "spendgraph"] as const;

export type EmailProduct = (typeof emailProducts)[number];

export type WithProduct = { product?: EmailProduct };

export const emailAssetsOrigin = "https://design.locusgraph.com";

type ProductBrand = {
  name: string;
  wordmark: [bold: string, light: string];
  markUrl: string;
};

const productBrands: Record<EmailProduct, ProductBrand> = {
  locusgraph: {
    name: "LocusGraph",
    wordmark: ["locus", "graph"],
    markUrl: `${emailAssetsOrigin}/email/locusgraph-mark.png`,
  },
  spendgraph: {
    name: "SpendGraph",
    wordmark: ["spend", "graph"],
    markUrl: `${emailAssetsOrigin}/email/spendgraph-mark.png`,
  },
};

export const brandOf = (product: EmailProduct = "locusgraph") => productBrands[product];
