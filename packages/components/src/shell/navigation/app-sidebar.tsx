import type * as React from "react";
import { Sidebar, SidebarRail } from "../../layout/sidebar/sidebar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../layout/sidebar/sidebar-menu";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../../layout/sidebar/sidebar-sections";
import type { LinkComponent } from "../link";
import { type AppNavGroup, type AppNavItem, NavGroup } from "./nav-group";

type AppBrand = { title: React.ReactNode; subtitle?: string; icon: React.ReactNode; href: string };

type AppSidebarProps = {
  brand: AppBrand;
  groups: AppNavGroup[];
  bottomItems?: AppNavItem[];
  footer?: React.ReactNode;
  activeHref: string;
  linkComponent?: LinkComponent | "a";
};

function BrandLink({ brand, Link }: { brand: AppBrand; Link: LinkComponent | "a" }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href={brand.href}>
            <span
              data-slot="app-brand-icon"
              className="flex aspect-square size-8 shrink-0 items-center justify-center border border-border bg-muted"
            >
              {brand.icon}
            </span>
            <span className="grid flex-1 text-left leading-tight">
              <span className="truncate text-sm font-semibold tracking-tight">{brand.title}</span>
              {brand.subtitle && (
                <span className="truncate text-xs text-muted-foreground">{brand.subtitle}</span>
              )}
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function AppSidebar({
  brand,
  groups,
  bottomItems,
  footer,
  activeHref,
  linkComponent = "a",
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 justify-center border-b border-border py-0">
        <BrandLink brand={brand} Link={linkComponent} />
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group) => (
          <NavGroup key={group.label} group={group} activeHref={activeHref} Link={linkComponent} />
        ))}
        {bottomItems && bottomItems.length > 0 && (
          <NavGroup
            group={{ label: "", items: bottomItems }}
            activeHref={activeHref}
            Link={linkComponent}
            className="mt-auto"
          />
        )}
      </SidebarContent>
      {footer && <SidebarFooter className="border-t border-border">{footer}</SidebarFooter>}
      <SidebarRail />
    </Sidebar>
  );
}

export { type AppBrand, AppSidebar };
