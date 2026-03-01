import type { ReactNode } from "react";
import { cn } from "@locus/components";
import { type BreadcrumbSegment, Header } from "./header/index";
import Sidebar from "./sidebar/index";

interface LayoutProps {
  children: ReactNode;
  /** Header title (shown on the left; when set, breadcrumb is hidden) */
  title: string;
  /** Header subtitle (shown below title) */
  subtitle?: string;
  /** Breadcrumb segments when title is not set */
  breadcrumb?: BreadcrumbSegment[];
  /** Use full viewport height (for workbench-style layouts) */
  fullHeight?: boolean;
}

export function Layout({ children, title, subtitle, breadcrumb = [], fullHeight }: LayoutProps) {
  return (
    <div className={cn("flex", fullHeight ? "h-screen" : "min-h-screen")}>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div
          className={cn(
            "w-full",
            fullHeight ? "flex flex-col flex-1 overflow-hidden" : "mx-auto max-w-7xl",
          )}
        >
          <Header title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
          <div className={cn("flex-1 px-6", fullHeight && "overflow-hidden")}>{children}</div>
        </div>
      </div>
    </div>
  );
}
