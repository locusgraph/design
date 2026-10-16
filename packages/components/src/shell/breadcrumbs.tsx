import { ChevronRight as ChevronRightIcon } from "@carbon/icons-react";
import type * as React from "react";
import type { LinkComponent } from "./link";

type Crumb = { label: React.ReactNode; href?: string };

type BreadcrumbsProps = { items: Crumb[]; linkComponent?: LinkComponent | "a" };

function CrumbLabel({
  crumb,
  last,
  Link,
}: {
  crumb: Crumb;
  last: boolean;
  Link: LinkComponent | "a";
}) {
  if (last) {
    return (
      <span aria-current="page" className="truncate font-medium">
        {crumb.label}
      </span>
    );
  }
  if (crumb.href === undefined) {
    return <span className="truncate text-soft">{crumb.label}</span>;
  }
  return (
    <Link href={crumb.href} className="truncate text-soft transition-colors hover:text-foreground">
      {crumb.label}
    </Link>
  );
}

function Breadcrumbs({ items, linkComponent = "a" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
      {items.map((crumb, index) => {
        const last = index === items.length - 1;
        return (
          <span
            key={crumb.href ?? index}
            className={
              last ? "flex min-w-0 items-center gap-1.5" : "hidden items-center gap-1.5 sm:flex"
            }
          >
            <CrumbLabel crumb={crumb} last={last} Link={linkComponent} />
            {last ? null : (
              <ChevronRightIcon className="size-3.5 shrink-0 text-faint" aria-hidden />
            )}
          </span>
        );
      })}
    </nav>
  );
}

export { Breadcrumbs, type Crumb };
