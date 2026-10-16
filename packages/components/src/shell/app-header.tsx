import type * as React from "react";
import { Separator } from "../display/separator";
import { SidebarTrigger } from "../layout/sidebar/sidebar";

type AppHeaderProps = { breadcrumbs?: React.ReactNode; children?: React.ReactNode };

function AppHeader({ breadcrumbs, children }: AppHeaderProps) {
  return (
    <header
      data-slot="app-header"
      className="flex h-14 shrink-0 items-center gap-3 border-b border-line bg-background px-4"
    >
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4" />
      {breadcrumbs}
      <div className="ml-auto flex shrink-0 items-center gap-2">{children}</div>
    </header>
  );
}

function CommandHint({
  shortcut = "⌘K",
  label = "commands",
}: {
  shortcut?: string;
  label?: string;
}) {
  return (
    <span className="hidden items-center gap-1.5 text-xs text-faint 2xl:flex">
      <kbd className="rounded border border-line bg-ghost px-1.5 py-0.5 font-mono text-[11px]">
        {shortcut}
      </kbd>
      {label}
    </span>
  );
}

export { AppHeader, CommandHint };
