"use client";

import { Bot as BotIcon, Grid as LayoutGridIcon, Email as MailIcon } from "@carbon/icons-react";
import { LocusGraphMark } from "@locusgraph/brand";
import { AppHeader, AppShell, AppSidebar, ThemeToggle } from "@locusgraph/components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { useState } from "react";

const groups = [
  {
    label: "",
    items: [
      { title: "Overview", href: "/", icon: LayoutGridIcon },
      { title: "Emails", href: "/email", icon: MailIcon },
      { title: "Agent", href: "/agent", icon: BotIcon },
    ],
  },
];

const brand = {
  title: (
    <span className="font-brand">
      <span className="font-bold">locus</span>
      <span className="font-light">graph</span>
    </span>
  ),
  subtitle: "Next.js example",
  icon: <LocusGraphMark className="size-5" />,
  href: "/",
};

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const changeTheme = (next: "light" | "dark") => {
    document.documentElement.classList.toggle("dark", next === "dark");
    setTheme(next);
  };
  return (
    <AppShell
      bodyClassName="brand-grid-quiet"
      sidebar={
        <AppSidebar brand={brand} groups={groups} activeHref={pathname} linkComponent={Link} />
      }
      header={
        <AppHeader>
          <ThemeToggle theme={theme} onThemeChange={changeTheme} />
        </AppHeader>
      }
    >
      {children}
    </AppShell>
  );
}
