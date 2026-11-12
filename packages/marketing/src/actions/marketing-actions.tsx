import { Button, cn } from "@locusgraph/components";
import { linkKey, withUniqueKeys } from "../keys";
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
      {withUniqueKeys(actions, linkKey).map(({ key, item: action }, index) => (
        <Button
          key={key}
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
