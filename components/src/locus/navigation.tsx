import type { ReactNode } from "react";
import type { To } from "react-router";
import { Link } from "react-router";

import { cn } from "../lib/utils";

interface NavigationLinkProps {
  /** Link destination (path or location object) */
  url: To;
  /** When true, applies active state (e.g. left border, background, foreground text) */
  active?: boolean;
  /** Link contents (e.g. icon + label) */
  children: ReactNode;
  className?: string;
}

function NavigationLink({ url, active = false, children, className }: NavigationLinkProps) {
  return (
    <Link
      to={url}
      data-navigation
      data-active={active}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-base transition-colors [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "w-full justify-start gap-3 px-3 py-3 text-primary-300",
        active ? "bg-primary-800" : "hover:text-primary",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export { NavigationLink };
