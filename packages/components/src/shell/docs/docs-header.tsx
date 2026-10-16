"use client";

import { Menu as MenuIcon } from "@carbon/icons-react";
import { cn } from "cn";
import type * as React from "react";
import { useState } from "react";
import { Button } from "../../action/button";
import { Sheet, SheetContent, SheetTitle } from "../../overlay/sheet";
import type { LinkComponent } from "../link";

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

function MobileNavSheet({ children }: { children: React.ReactNode }) {
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
        <MenuIcon />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 overflow-y-auto p-4">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div onClickCapture={closeOnLinkClick}>{children}</div>
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
      <div className="mx-auto flex h-(--docs-header-height) w-full max-w-[1536px] items-center gap-4 px-6 **:data-[slot=separator]:h-4!">
        <MobileNavSheet>{mobileNav}</MobileNavSheet>
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
                "rounded-md px-2.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground",
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
