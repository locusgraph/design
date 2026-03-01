import { HelpCircle, Palette } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@locus/components";
import { cn } from "@locus/components";

import { type BreadcrumbSegment, HeaderBreadcrumb } from "./breadcrumb";
import { HeaderHead } from "./head";
import { HeaderThemeToggle } from "./theme-toggle";

export type { BreadcrumbSegment } from "./breadcrumb";

interface HeaderProps {
  breadcrumb?: BreadcrumbSegment[];
  title: string;
  subtitle?: string;
  className?: string;
}

export function Header({ breadcrumb = [], title, subtitle, className }: HeaderProps) {
  return (
    <header
      data-layout-header
      className={cn(
        "sticky top-0 z-10 flex flex-col gap-2 py-4 px-6 backdrop-blur-md bg-background/50",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <HeaderBreadcrumb segments={breadcrumb} />
        <div className="flex shrink-0 items-center gap-4">
          <HeaderThemeToggle />
          {import.meta.env.DEV && (
            <Button type="button" variant="secondary" className="rounded-md" size="sm" asChild>
              <Link to="/branding">
                <Palette className="size-4" aria-hidden />
                Branding
              </Link>
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            className="rounded-md"
            size="sm"
            onClick={() => {
              // TODO: Add support action
            }}
          >
            <HelpCircle className="size-4" aria-hidden />
            Support
          </Button>
        </div>
      </div>
      <HeaderHead title={title} subtitle={subtitle} />
    </header>
  );
}
