import { cn } from "@locusgraph/components";
import type { ReactNode } from "react";
import type { LinkComponent, MarketingLink } from "../types";

export type FooterColumn = { title: string; links: MarketingLink[] };

type FooterProps = {
  logo?: ReactNode;
  tagline?: ReactNode;
  columns?: FooterColumn[];
  legal?: MarketingLink[];
  copyright?: ReactNode;
  end?: ReactNode;
  linkComponent?: LinkComponent | "a";
  className?: string;
};

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground locus-focus-ring";

export function Footer({
  logo,
  tagline,
  columns = [],
  legal = [],
  copyright,
  end,
  linkComponent: Link = "a",
  className,
}: FooterProps) {
  return (
    <footer data-slot="marketing-footer" className={cn("w-full border-t", className)}>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {(logo || tagline) && (
          <div className="flex flex-col gap-3">
            {logo}
            {tagline && <p className="max-w-xs text-sm text-muted-foreground">{tagline}</p>}
          </div>
        )}
        {columns.length > 0 && (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-start-2">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title} className="flex flex-col gap-3">
                <p className="locus-eyebrow">{column.title}</p>
                {column.links.map((link) => (
                  <Link key={link.href} href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        )}
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-6 sm:px-6">
          {copyright && <p className="text-xs text-faint">{copyright}</p>}
          {legal.length > 0 && (
            <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
              {legal.map((link) => (
                <Link key={link.href} href={link.href} className={cn(linkClass, "text-xs")}>
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
          {end && <div className="ml-auto">{end}</div>}
        </div>
      </div>
    </footer>
  );
}
