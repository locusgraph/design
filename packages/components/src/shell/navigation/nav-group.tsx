import type { Icon as IconType } from "@phosphor-icons/react";
import type * as React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../layout/sidebar/sidebar-menu";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "../../layout/sidebar/sidebar-sections";
import type { LinkComponent } from "../link";

type AppNavItem = {
  title: string;
  href: string;
  icon: IconType;
  external?: boolean;
  count?: number;
};

type AppNavGroup = { label: string; items: AppNavItem[] };

type NavGroupProps = {
  group: AppNavGroup;
  activeHref: string;
  Link: LinkComponent | "a";
  className?: string;
};

function isActiveHref(itemHref: string, activeHref: string) {
  return activeHref === itemHref || activeHref.startsWith(`${itemHref}/`);
}

function hasCount(item: AppNavItem): item is AppNavItem & { count: number } {
  return item.count !== undefined && item.count > 0;
}

function tooltipFor(item: AppNavItem) {
  return hasCount(item) ? `${item.title} (${item.count})` : item.title;
}

function NavItemCount({ count }: { count: number }) {
  return (
    <span
      data-slot="app-nav-count"
      className="ml-auto text-xs text-muted-foreground tabular-nums group-data-[collapsible=icon]:sr-only"
    >
      <span className="sr-only">, </span>
      {count}
    </span>
  );
}

function NavItemLink({
  item,
  Link,
  ...props
}: React.ComponentProps<"a"> & { item: AppNavItem; Link: LinkComponent | "a" }) {
  const content = (
    <>
      <item.icon weight="bold" aria-hidden />
      <span className="truncate">{item.title}</span>
      {hasCount(item) && <NavItemCount count={item.count} />}
    </>
  );
  if (item.external) {
    return (
      <a {...props} href={item.href} target="_blank" rel="noreferrer">
        {content}
        <span className="sr-only">, opens in a new tab</span>
      </a>
    );
  }
  return (
    <Link {...props} href={item.href}>
      {content}
    </Link>
  );
}

function NavGroup({ group, activeHref, Link, className }: NavGroupProps) {
  return (
    <SidebarGroup className={className}>
      {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActiveHref(item.href, activeHref)}
                tooltip={tooltipFor(item)}
              >
                <NavItemLink item={item} Link={Link} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export { type AppNavGroup, type AppNavItem, isActiveHref, NavGroup };
