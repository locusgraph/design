import { GitHubMark, GoogleMark, LocusGraphWordmark, SpendGraphWordmark } from "@locusgraph/brand";
import { LogoCloud } from "@locusgraph/marketing";
import { defineDemo, toggle } from "../../../registry/define-demo";

const logos = [
  { name: "LocusGraph", logo: <LocusGraphWordmark className="text-xl" /> },
  { name: "SpendGraph", logo: <SpendGraphWordmark className="text-xl" /> },
  { name: "GitHub", logo: <GitHubMark className="size-7" />, href: "https://github.com" },
  { name: "Google", logo: <GoogleMark className="size-7" /> },
];

export default defineDemo({
  title: "Logo Cloud",
  description:
    "A row of customer or partner logos. Each logo is named for screen readers, and links when it has an `href`. Logos take the muted text color unless they carry their own.",
  controls: { heading: toggle(true) },
  playground: ({ heading }) => (
    <LogoCloud eyebrow={heading ? "Trusted by teams at" : undefined} logos={logos} />
  ),
  code: () => `<LogoCloud
  eyebrow="Trusted by teams at"
  logos={[
    { name: "Acme", logo: <AcmeLogo /> },
    { name: "Globex", logo: <GlobexLogo />, href: "https://globex.example" },
  ]}
/>`,
  props: [
    { name: "logos", type: "{ name, logo, href? }[]" },
    { name: "eyebrow, title, description", type: "ReactNode", defaultValue: "centered heading" },
    { name: "id", type: "string" },
  ],
  examples: {},
  isNew: true,
});
