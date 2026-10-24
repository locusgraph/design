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

function NavItemLink({
  item,
  Link,
  ...props
}: React.ComponentProps<"a"> & { item: AppNavItem; Link: LinkComponent | "a" }) {
  const content = (
    <>
      <item.icon weight="bold" aria-hidden />
      <span>{item.title}</span>
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
                tooltip={item.title}
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
