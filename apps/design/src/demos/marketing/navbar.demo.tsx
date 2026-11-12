import { LocusGraphWordmark } from "@locusgraph/brand";
import { Navbar } from "@locusgraph/marketing";
import { defineDemo, toggle } from "../../registry/define-demo";

const links = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Blog", href: "#blog" },
];

const actions = [
  { label: "Start free", href: "#start" },
  { label: "Sign in", href: "#sign-in", variant: "ghost" as const },
];

function LinksOnly() {
  return (
    <div className="w-full">
      <Navbar logo={<LocusGraphWordmark withMark />} links={links} sticky={false} />
    </div>
  );
}

export default defineDemo({
  title: "Navbar",
  description:
    "The top bar of a landing page: logo, links and actions. Links collapse into a sheet below the md breakpoint. A server component; only the menu is client side.",
  controls: { links: toggle(true), actions: toggle(true) },
  playground: ({ links: withLinks, actions: withActions }) => (
    <div className="w-full">
      <Navbar
        logo={<LocusGraphWordmark withMark />}
        links={withLinks ? links : []}
        actions={withActions ? actions : []}
        sticky={false}
      />
    </div>
  ),
  code: () => `<Navbar
  logo={<Logo />}
  links={[
    { label: "Product", href: "/product" },
    { label: "Pricing", href: "/pricing" },
  ]}
  actions={[
    { label: "Start free", href: "/signup" },
    { label: "Sign in", href: "/login", variant: "ghost" },
  ]}
  linkComponent={Link}
/>`,
  props: [
    { name: "logo", type: "ReactNode" },
    { name: "logoHref", type: "string", defaultValue: '"/"' },
    { name: "logoLabel", type: "string", defaultValue: '"Home"' },
    { name: "links", type: "{ label, href }[]", defaultValue: "[]" },
    {
      name: "actions",
      type: "{ label, href, variant? }[]",
      defaultValue: "first is primary, the rest outline",
    },
    { name: "end", type: "ReactNode", defaultValue: "before the actions, such as a theme toggle" },
    { name: "menuLabel", type: "string", defaultValue: '"Menu"' },
    { name: "sticky", type: "boolean", defaultValue: "true" },
    { name: "linkComponent", type: 'LinkComponent | "a"', defaultValue: '"a"' },
  ],
  examples: {
    LinksOnly: {
      description: "Without actions, the bar holds only the logo and the links.",
      component: LinksOnly,
    },
  },
  isNew: true,
});
