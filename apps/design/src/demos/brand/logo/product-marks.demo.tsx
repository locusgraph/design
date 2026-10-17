import {
  type BrandTheme,
  brandThemes,
  dotGridStyle,
  LocusGraphWordmark,
  ProductWordmark,
  productNames,
  SpendGraphWordmark,
} from "@locusgraph/brand";
import type { ReactNode } from "react";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const products = ["locusgraph", "spendgraph"] as const;
const themes = ["dark", "light"] as const;

function ThemePanel({ theme, children }: { theme: BrandTheme; children: ReactNode }) {
  return (
    <div
      className="flex min-h-36 flex-col items-start justify-center gap-5 p-8 ring-1 ring-border"
      style={dotGridStyle(theme)}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.05em] opacity-60">
        On {theme}
      </span>
      {children}
    </div>
  );
}

function BothProducts() {
  return (
    <div className="grid w-full gap-px sm:grid-cols-2">
      {themes.map((theme) => (
        <ThemePanel key={theme} theme={theme}>
          {products.map((product) => (
            <div key={product} className="flex flex-wrap items-center gap-6 text-2xl">
              <ProductWordmark product={product} />
              <ProductWordmark product={product} withMark />
            </div>
          ))}
        </ThemePanel>
      ))}
    </div>
  );
}

function Lockup() {
  return (
    <div className="grid w-full gap-px sm:grid-cols-2">
      {themes.map((theme) => (
        <ThemePanel key={theme} theme={theme}>
          <span className="flex flex-wrap items-center gap-3 text-2xl">
            <LocusGraphWordmark withMark />
            <span aria-hidden="true" style={{ color: brandThemes[theme].muted }}>
              ·
            </span>
            <SpendGraphWordmark />
          </span>
        </ThemePanel>
      ))}
    </div>
  );
}

function ProductNames() {
  return (
    <dl className="w-full divide-y divide-border ring-1 ring-border">
      {products.map((product) => (
        <div key={product} className="flex items-center justify-between gap-4 px-4 py-3">
          <dt className="locus-eyebrow">{product}</dt>
          <dd className="font-medium">{productNames[product]}</dd>
        </div>
      ))}
    </dl>
  );
}

export default defineDemo({
  title: "Product Marks",
  description:
    "Each product spells its name the same way: the first word bold, graph light, in the brand face. Both products share the LocusGraph mark.",
  controls: {
    product: select(products, "spendgraph"),
    mark: toggle(true),
    theme: select(themes, "dark"),
  },
  playground: ({ product, mark, theme }) => (
    <div className="w-full">
      <ThemePanel theme={theme}>
        <ProductWordmark product={product} withMark={mark} className="text-4xl" />
      </ThemePanel>
    </div>
  ),
  code: ({ product, mark }) =>
    `<ProductWordmark product="${product}"${mark ? " withMark" : ""} className="text-4xl" />`,
  props: [
    { name: "ProductWordmark.product", type: '"locusgraph" | "spendgraph"' },
    { name: "withMark", type: "boolean", defaultValue: "false" },
    { name: "SpendGraphWordmark", type: "same props as LocusGraphWordmark" },
    { name: "productNames", type: "Record<Product, string>" },
    { name: "...props", type: "span props" },
  ],
  examples: {
    BothProducts: {
      description:
        "Both products with and without the mark, on the dark and light dotted grid. The wordmark takes the text color.",
      component: BothProducts,
    },
    Lockup: {
      description:
        "When both products appear together, lead with the LocusGraph mark once and join the names with a muted middle dot.",
      component: Lockup,
    },
    ProductNames: {
      description:
        "In running text, write the name in title case as one word: LocusGraph, SpendGraph.",
      component: ProductNames,
    },
  },
  isNew: true,
});
