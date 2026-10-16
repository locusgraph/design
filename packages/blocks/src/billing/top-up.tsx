import {
  Button,
  RuleGridCell,
  RuleGridDescription,
  RuleGridLabel,
  Spinner,
} from "@locusgraph/components";
import { centsToMicroUsd, formatCents, formatMicroUsd } from "@locusgraph/utils";
import type { CreditPack } from "../types";

type TopUpProps = {
  packs: CreditPack[];
  onBuy: (packId: string) => void;
  pending?: boolean;
  pendingPackId?: string;
  highlightedPackId?: string;
  description?: string;
};

function hasBonus(pack: CreditPack) {
  return centsToMicroUsd(pack.priceCents) !== pack.amountMicroUsd;
}

export function TopUp({
  packs,
  onBuy,
  pending = false,
  pendingPackId,
  highlightedPackId,
  description = "Pay once with Stripe. Credits never expire and never renew on their own.",
}: TopUpProps) {
  const busy = pending || pendingPackId !== undefined;
  return (
    <RuleGridCell className="gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="flex min-h-6 items-center">
          <RuleGridLabel>Buy credits</RuleGridLabel>
        </span>
        <RuleGridDescription>{description}</RuleGridDescription>
      </div>
      <div className="flex flex-wrap gap-2">
        {packs.map((pack) => (
          <Button
            key={pack.id}
            variant={pack.id === highlightedPackId ? "default" : "outline"}
            disabled={busy}
            aria-busy={pack.id === pendingPackId || undefined}
            onClick={() => onBuy(pack.id)}
          >
            {pack.id === pendingPackId && <Spinner aria-hidden="true" role={undefined} />}
            <span className="tabular-nums">{formatMicroUsd(pack.amountMicroUsd)}</span>
            {hasBonus(pack) && (
              <span
                className={
                  pack.id === highlightedPackId
                    ? "tabular-nums opacity-75"
                    : "font-medium text-good tabular-nums"
                }
              >
                for {formatCents(pack.priceCents)}
              </span>
            )}
          </Button>
        ))}
      </div>
    </RuleGridCell>
  );
}
