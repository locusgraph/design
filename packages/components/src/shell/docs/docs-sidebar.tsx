import { cn } from "cn";
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
    <div className="flex flex-col gap-4">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col">
          <p className="eyebrow flex h-8 items-center px-2">{group.label}</p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = item.href === activeHref;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex h-[30px] w-fit items-center rounded-md border border-transparent px-2 text-sm font-medium transition-colors hover:bg-accent",
                      active && "border-accent bg-accent"
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

function DocsSidebar(props: DocsNavListProps) {
  return (
    <div className="relative h-full">
      <div className="absolute top-12 right-2 bottom-0 w-px bg-[linear-gradient(to_bottom,transparent_0%,var(--border)_10%,var(--border)_90%,transparent_100%)]" />
      <nav
        aria-label="Documentation"
        className="no-scrollbar h-full w-56 overflow-y-auto pt-10 pb-12 pl-2.5 [mask-image:linear-gradient(to_bottom,transparent,black_2rem,black_calc(100%-3rem),transparent)]"
      >
        <DocsNavList {...props} />
      </nav>
    </div>
  );
}

export { type DocsNavGroup, type DocsNavItem, DocsNavList, DocsSidebar };
