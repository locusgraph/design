import { cn } from "@locusgraph/components";
import type { ReactNode } from "react";
import { MarketingActions } from "../actions/marketing-actions";
import { linkKey, withUniqueKeys } from "../keys";
import type { LinkComponent, MarketingAction, MarketingLink } from "../types";
import { NavbarMenu } from "./navbar-menu";

type NavbarProps = {
  logo: ReactNode;
  logoHref?: string;
  logoLabel?: string;
  links?: MarketingLink[];
  actions?: MarketingAction[];
  end?: ReactNode;
  menuLabel?: string;
  sticky?: boolean;
  linkComponent?: LinkComponent | "a";
  className?: string;
};

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground locus-focus-ring";

export function Navbar({
  logo,
  logoHref = "/",
  logoLabel = "Home",
  links = [],
  actions = [],
  end,
  menuLabel = "Menu",
  sticky = true,
  linkComponent: Link = "a",
  className,
}: NavbarProps) {
  return (
    <header
      data-slot="marketing-navbar"
      className={cn(
        "z-40 w-full border-b bg-background/85 backdrop-blur",
        sticky && "sticky top-0",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href={logoHref} aria-label={logoLabel} className="flex items-center locus-focus-ring">
          {logo}
        </Link>
        {links.length > 0 && (
          <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
            {withUniqueKeys(links, linkKey).map(({ key, item: link }) => (
              <Link key={key} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </nav>
        )}
        <div className="ml-auto flex items-center gap-2">
          {end}
          <MarketingActions
            actions={actions}
            size="sm"
            linkComponent={Link}
            className="hidden md:flex"
          />
          {(links.length > 0 || actions.length > 0) && (
            <NavbarMenu label={menuLabel}>
              <nav aria-label={menuLabel} className="flex flex-col gap-4">
                {withUniqueKeys(links, linkKey).map(({ key, item: link }) => (
                  <Link key={key} href={link.href} className={cn(linkClass, "text-base")}>
                    {link.label}
                  </Link>
                ))}
              </nav>
              <MarketingActions
                actions={actions}
                linkComponent={Link}
                className="flex-col items-stretch"
              />
            </NavbarMenu>
          )}
        </div>
      </div>
    </header>
  );
}
