import { Button, RuleGridCell, RuleGridDescription, RuleGridLabel } from "@locusgraph/components";
import { centsToMicroUsd, formatCents, formatMicroUsd } from "@locusgraph/utils";
import type { CreditPack } from "../types";

type CreditPacksProps = {
  packs: CreditPack[];
  onBuy: (packId: string) => void;
  pending?: boolean;
  description?: string;
};

export function CreditPacks({
  packs,
  onBuy,
  pending = false,
  description = "Pay once with Stripe. Credits never expire and never renew on their own.",
}: CreditPacksProps) {
  return (
    <RuleGridCell className="gap-4">
      <div className="flex flex-col gap-1.5">
        <RuleGridLabel>Buy credits</RuleGridLabel>
        <RuleGridDescription>{description}</RuleGridDescription>
      </div>
      <div className="flex flex-wrap gap-2">
        {packs.map((pack) => (
          <Button key={pack.id} variant="outline" disabled={pending} onClick={() => onBuy(pack.id)}>
            <span className="tabular-nums">{formatMicroUsd(pack.amountMicroUsd)}</span>
            {centsToMicroUsd(pack.priceCents) !== pack.amountMicroUsd && (
              <span className="text-muted-foreground tabular-nums">
                for {formatCents(pack.priceCents)}
              </span>
            )}
          </Button>
        ))}
      </div>
    </RuleGridCell>
  );
}
