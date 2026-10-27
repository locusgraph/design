import { PlaygroundLink } from "../nav/playground-nav";

type FooterLink = { title: string; href: string; external?: boolean };

const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Libraries",
    links: [
      { title: "Components", href: "/components" },
      { title: "Blocks", href: "/blocks" },
      { title: "Loop", href: "/loop" },
      { title: "Patterns", href: "/patterns" },
      { title: "Shells", href: "/shells" },
      { title: "Brand", href: "/brand" },
    ],
  },
  {
    title: "Guides",
    links: [
      { title: "Installation", href: "/installation" },
      { title: "Principles", href: "/principles" },
      { title: "Human in the loop", href: "/human-in-the-loop" },
      { title: "Theming", href: "/theming" },
      { title: "Generative UI", href: "/generative-ui" },
      { title: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Project",
    links: [
      { title: "GitHub", href: "https://github.com/locusgraph/design", external: true },
      { title: "npm", href: "https://www.npmjs.com/org/locusgraph", external: true },
      { title: "DESIGN.md", href: "/DESIGN.md", external: true },
      { title: "Registry", href: "/r/registry.json", external: true },
    ],
  },
];

const linkClass =
  "w-fit text-sm text-muted-foreground underline-offset-4 locus-focus-ring hover:text-foreground hover:underline";

function FooterLinkItem({ link }: { link: FooterLink }) {
  return link.external ? (
    <a href={link.href} className={linkClass}>
      {link.title}
    </a>
  ) : (
    <PlaygroundLink href={link.href} className={linkClass}>
      {link.title}
    </PlaygroundLink>
  );
}

function LocusDesignWordmark() {
  return (
    <PlaygroundLink
      href="/"
      className="flex w-fit items-center gap-2 font-brand text-base tracking-tight text-foreground locus-focus-ring"
    >
      <span aria-hidden="true" className="size-2.5 rotate-45 bg-foreground" />
      <span>
        <span className="font-bold">locus</span>
        <span className="font-light">design</span>
      </span>
    </PlaygroundLink>
  );
}

export function LandingFooter() {
  return (
    <footer className="landing-full-rule -mb-16">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 px-6 py-12 sm:px-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="col-span-2 flex flex-col gap-3 lg:col-span-1">
          <LocusDesignWordmark />
          <p className="max-w-72 text-sm text-pretty text-muted-foreground">
            Components, blocks and Loop for products where agents ask before they act.
          </p>
        </div>
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="flex flex-col gap-3">
            <h2 className="font-heading text-sm font-semibold text-foreground">{column.title}</h2>
            {column.links.map((link) => (
              <FooterLinkItem key={link.title} link={link} />
            ))}
          </nav>
        ))}
      </div>
      <div className="landing-full-rule flex flex-col gap-2 px-6 py-5 text-xs text-faint sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <span>© 2026 Locus Design</span>
        <span>React 19 · Tailwind 4 · Light and dark</span>
      </div>
    </footer>
  );
}
