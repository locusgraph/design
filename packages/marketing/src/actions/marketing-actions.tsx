import { Button, cn } from "@locusgraph/components";
import type { LinkComponent, MarketingAction } from "../types";

type MarketingActionsProps = {
  actions: MarketingAction[];
  linkComponent?: LinkComponent | "a";
  size?: "sm" | "default" | "lg";
  className?: string;
};

export function MarketingActions({
  actions,
  linkComponent: Link = "a",
  size = "default",
  className,
}: MarketingActionsProps) {
  if (actions.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {actions.map((action, index) => (
        <Button
          key={action.href}
          asChild
          size={size}
          variant={action.variant ?? (index === 0 ? "default" : "outline")}
        >
          <Link href={action.href}>{action.label}</Link>
        </Button>
      ))}
    </div>
  );
}
