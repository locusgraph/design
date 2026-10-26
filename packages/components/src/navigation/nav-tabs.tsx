import type { Icon as IconType } from "@phosphor-icons/react";
import type * as React from "react";
import { cn } from "../cn";
import { Badge } from "../display/badge";
import type { LinkComponent } from "../shell/link";

type NavTabItem = {
  title: string;
  href: string;
  icon?: IconType;
  description?: string;
  count?: number;
  exact?: boolean;
};

type NavTabsProps = Omit<React.ComponentProps<"nav">, "children"> & {
  items: NavTabItem[];
  activeHref: string;
  label: string;
  linkComponent?: LinkComponent | "a";
};

const navTabClassName =
  "relative inline-flex h-control items-center gap-1.5 px-2 text-sm font-medium whitespace-nowrap text-foreground/60 transition-colors duration-150 ease-out hover:text-foreground locus-focus-ring aria-[current=page]:text-foreground dark:text-muted-foreground dark:hover:text-foreground dark:aria-[current=page]:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 after:absolute after:inset-x-0 after:bottom-[-4px] after:h-0.5 after:bg-foreground after:opacity-0 after:transition-opacity aria-[current=page]:after:opacity-100";

function isNavTabActive(item: NavTabItem, activeHref: string) {
  if (item.exact) return activeHref === item.href;
  return activeHref === item.href || activeHref.startsWith(`${item.href}/`);
}

function NavTabCount({ count }: { count: number }) {
  return (
    <Badge variant="secondary" className="px-1.5 py-0 tabular-nums">
      <span className="sr-only">, </span>
      {count}
    </Badge>
  );
}

function NavTabs({
  items,
  activeHref,
  label,
  linkComponent: Link = "a",
  className,
  ...props
}: NavTabsProps) {
  return (
    <nav
      data-slot="nav-tabs"
      aria-label={label}
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          title={item.description}
          data-slot="nav-tab"
          aria-current={isNavTabActive(item, activeHref) ? "page" : undefined}
          className={navTabClassName}
        >
          {item.icon && <item.icon weight="bold" aria-hidden />}
          <span>{item.title}</span>
          {item.count !== undefined && item.count > 0 && <NavTabCount count={item.count} />}
        </Link>
      ))}
    </nav>
  );
}

export { isNavTabActive, type NavTabItem, NavTabs, type NavTabsProps };
