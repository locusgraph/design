import { cn } from "cn";
import type * as React from "react";
import { SidebarInset } from "../layout/sidebar/sidebar";
import { SidebarProvider } from "../layout/sidebar/sidebar-context";

type AppShellProps = {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  bodyClassName?: string;
};

function AppShell({ sidebar, header, children, defaultOpen, bodyClassName }: AppShellProps) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {sidebar}
      <SidebarInset className="h-svh overflow-hidden">
        {header}
        <div
          data-slot="app-shell-body"
          className={cn(
            "no-scrollbar flex w-full flex-1 flex-col overflow-y-auto px-6 pt-7 pb-8 lg:px-8",
            bodyClassName
          )}
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export { AppShell };
