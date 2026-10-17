import { cn } from "cn";
import type * as React from "react";
import { TooltipProvider } from "../../overlay/tooltip";

type DocsShellProps = {
  header: React.ReactNode;
  sidebar?: React.ReactNode;
  aside?: React.ReactNode;
  children: React.ReactNode;
};

function DocsShell({ header, sidebar, aside, children }: DocsShellProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div
        data-slot="docs-shell"
        className="flex min-h-svh flex-col bg-background [--locus-docs-header-height:3.5rem] lg:[--locus-docs-header-height:4rem]"
      >
        {header}
        <div
          className={cn(
            "mx-auto w-full max-w-[1536px] flex-1 items-start px-2",
            sidebar && "lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]"
          )}
        >
          {sidebar && (
            <aside
              data-slot="docs-sidebar"
              className="sticky top-[calc(var(--locus-docs-header-height)+0.6rem)] hidden h-[calc(100svh-10rem)] lg:block"
            >
              {sidebar}
            </aside>
          )}
          <div className="flex min-w-0 items-stretch">
            <main data-slot="docs-body" className="min-w-0 flex-1 px-4 pt-6 pb-16 md:px-6 lg:pt-10">
              {children}
            </main>
            {aside && (
              <aside
                data-slot="docs-aside"
                className="sticky top-[calc(var(--locus-docs-header-height)+1px)] hidden h-[90svh] w-72 shrink-0 flex-col gap-8 overflow-hidden pt-10 xl:flex"
              >
                <div className="locus-no-scrollbar flex flex-col gap-8 overflow-y-auto px-8">
                  {aside}
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export { DocsShell };
