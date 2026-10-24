"use client";

import { List as MenuIcon } from "@phosphor-icons/react/ssr";
import type * as React from "react";
import { useState } from "react";
import { Button } from "../../action/button";
import { cn } from "../../cn";
import { Sheet, SheetContent, SheetTitle } from "../../overlay/sheet";
import type { LinkComponent } from "../link";
import { DocsNavList } from "./docs-sidebar";

type DocsBrand = { name: string; product?: string; icon: React.ReactNode; href: string };
type DocsHeaderLink = { title: string; href: string };

type DocsHeaderProps = {
  brand: DocsBrand;
  links: DocsHeaderLink[];
  activeHref: string;
  mobileNav: React.ReactNode;
  linkComponent?: LinkComponent | "a";
  children?: React.ReactNode;
};

type MobileNavSheetProps = Pick<DocsHeaderProps, "links" | "activeHref" | "linkComponent"> & {
  children: React.ReactNode;
};

function MobileNavSheet({ links, activeHref, linkComponent, children }: MobileNavSheetProps) {
  const [open, setOpen] = useState(false);
  const closeOnLinkClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest("a")) {
      setOpen(false);
    }
  };
  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        className="lg:hidden"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <MenuIcon weight="bold" aria-hidden />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 overflow-y-auto p-4">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div onClickCapture={closeOnLinkClick} className="flex flex-col gap-4">
            <DocsNavList
              groups={[{ label: "Sections", items: links }]}
              activeHref={activeHref}
              linkComponent={linkComponent}
            />
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function DocsHeader({
  brand,
  links,
  activeHref,
  mobileNav,
  linkComponent: Link = "a",
  children,
}: DocsHeaderProps) {
  return (
    <header
      data-slot="docs-header"
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur"
    >
      <div className="mx-auto flex h-(--locus-docs-header-height) w-full max-w-[1536px] items-center gap-4 px-6 **:data-[slot=separator]:h-4!">
        <MobileNavSheet links={links} activeHref={activeHref} linkComponent={Link}>
          {mobileNav}
        </MobileNavSheet>
        <Link
          href={brand.href}
          className="flex items-center gap-2 font-brand text-base tracking-tight"
        >
          {brand.icon}
          <span>
            <span className="font-bold">{brand.name}</span>
            {brand.product && <span className="font-light">{brand.product}</span>}
          </span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.href === activeHref ? "page" : undefined}
              className={cn(
                "px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors locus-focus-ring hover:text-foreground",
                link.href === activeHref && "text-foreground"
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">{children}</div>
      </div>
    </header>
  );
}

export { type DocsBrand, DocsHeader, type DocsHeaderLink };
