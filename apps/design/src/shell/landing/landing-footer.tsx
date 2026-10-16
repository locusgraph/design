import { LocusGraphWordmark } from "@locusgraph/brand";

const footerLinks = [
  { title: "GitHub", href: "https://github.com/locusgraph/design" },
  { title: "npm", href: "https://www.npmjs.com/org/locusgraph" },
  { title: "DESIGN.md", href: "/DESIGN.md" },
];

export function LandingFooter() {
  return (
    <footer className="mx-6 flex flex-col gap-4 border-t py-8 text-sm text-muted-foreground sm:mx-10 sm:flex-row sm:items-center sm:justify-between">
      <span className="flex items-center gap-3">
        <LocusGraphWordmark withMark className="text-base text-foreground" />
        <span className="eyebrow">MIT</span>
      </span>
      <nav aria-label="Project links" className="flex gap-5">
        {footerLinks.map((link) => (
          <a
            key={link.title}
            href={link.href}
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            {link.title}
          </a>
        ))}
      </nav>
    </footer>
  );
}
