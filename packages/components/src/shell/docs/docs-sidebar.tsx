"use client";

import { type RefObject, useEffect, useRef } from "react";
import { cn } from "../../cn";
import type { LinkComponent } from "../link";

type DocsNavItem = { title: string; href: string };
type DocsNavGroup = { label: string; items: DocsNavItem[] };

type DocsNavListProps = {
  groups: DocsNavGroup[];
  activeHref: string;
  linkComponent?: LinkComponent | "a";
};

function DocsNavList({ groups, activeHref, linkComponent: Link = "a" }: DocsNavListProps) {
  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col">
          <p className="flex h-8 items-center px-2 font-heading text-xs font-semibold text-foreground">
            {group.label}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = item.href === activeHref;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex h-control-sm w-fit items-center border border-transparent px-2 text-sm text-muted-foreground transition-colors locus-focus-ring hover:bg-accent hover:text-foreground",
                      active && "border-accent bg-accent font-medium text-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

const fadeAllowance = 48;

function useActiveLinkInView(nav: RefObject<HTMLElement | null>, activeHref: string) {
  useEffect(() => {
    const container = nav.current;
    const link = container?.querySelector<HTMLElement>(`[aria-current="page"]`);
    if (!container || !link || !activeHref) return;
    const top = link.offsetTop - container.scrollTop;
    const hidden =
      top < fadeAllowance || top + link.offsetHeight > container.clientHeight - fadeAllowance;
    if (hidden) container.scrollTo({ top: link.offsetTop - container.clientHeight / 2 });
  }, [nav, activeHref]);
}

function DocsSidebar(props: DocsNavListProps) {
  const navRef = useRef<HTMLElement>(null);
  useActiveLinkInView(navRef, props.activeHref);
  return (
    <div className="relative h-full">
      <div className="absolute top-12 right-2 bottom-0 w-px bg-[linear-gradient(to_bottom,transparent_0%,var(--locus-border)_10%,var(--locus-border)_90%,transparent_100%)]" />
      <nav
        ref={navRef}
        aria-label="Documentation"
        className="locus-no-scrollbar h-full w-56 overflow-y-auto pt-10 pb-12 pl-2.5 [mask-image:linear-gradient(to_bottom,transparent,black_2rem,black_calc(100%-3rem),transparent)]"
      >
        <DocsNavList {...props} />
      </nav>
    </div>
  );
}

export { type DocsNavGroup, type DocsNavItem, DocsNavList, DocsSidebar };
