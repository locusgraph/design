import { LocusGraphWordmark } from "@locusgraph/brand";
import { Footer } from "@locusgraph/marketing";
import { defineDemo, toggle } from "../../registry/define-demo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
      { label: "Status", href: "#status" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Docs", href: "#docs" },
      { label: "API", href: "#api" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
    ],
  },
];

const legal = [
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
];

function LegalOnly() {
  return (
    <div className="w-full">
      <Footer copyright="© 2026 LocusGraph" legal={legal} />
    </div>
  );
}

export default defineDemo({
  title: "Footer",
  description:
    "The bottom of a landing page: logo and tagline, link columns, then a row with the copyright, legal links and a slot for the theme toggle.",
  controls: { brand: toggle(true) },
  playground: ({ brand }) => (
    <div className="w-full">
      <Footer
        logo={brand ? <LocusGraphWordmark withMark /> : undefined}
        tagline={brand ? "Design that keeps humans in the loop." : undefined}
        columns={columns}
        legal={legal}
        copyright="© 2026 LocusGraph"
      />
    </div>
  ),
  code: () => `<Footer
  logo={<Logo />}
  tagline="Design that keeps humans in the loop."
  columns={[{ title: "Product", links: [{ label: "Pricing", href: "/pricing" }] }]}
  legal={[{ label: "Privacy", href: "/privacy" }]}
  copyright="© 2026 Acme"
  end={<ThemeToggle theme={theme} onThemeChange={setTheme} />}
/>`,
  props: [
    { name: "logo", type: "ReactNode" },
    { name: "tagline", type: "ReactNode" },
    { name: "columns", type: "{ title, links: { label, href }[] }[]", defaultValue: "[]" },
    { name: "legal", type: "{ label, href }[]", defaultValue: "[]" },
    { name: "copyright", type: "ReactNode" },
    { name: "end", type: "ReactNode", defaultValue: "right of the bottom row" },
    { name: "linkComponent", type: 'LinkComponent | "a"', defaultValue: '"a"' },
  ],
  examples: {
    LegalOnly: {
      description: "Only the bottom row: copyright and legal links.",
      component: LegalOnly,
    },
  },
  isNew: true,
});
