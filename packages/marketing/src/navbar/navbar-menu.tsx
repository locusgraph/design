"use client";

import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@locusgraph/components";
import { List as ListIcon } from "@phosphor-icons/react/ssr";
import { type MouseEvent, type ReactNode, useState } from "react";

type NavbarMenuProps = { label: string; children: ReactNode };

function followedLink(event: MouseEvent<HTMLElement>) {
  return event.target instanceof Element && event.target.closest("a") !== null;
}

export function NavbarMenu({ label, children }: NavbarMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label={label} className="md:hidden">
          <ListIcon weight="bold" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xs">
        <SheetTitle className="sr-only">{label}</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <div
          className="flex flex-col gap-6 px-6 pt-14 pb-6"
          onClickCapture={(event) => {
            if (followedLink(event)) setOpen(false);
          }}
        >
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
