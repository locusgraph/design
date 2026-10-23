"use client";

import { Keys, Plans, TopUp, Usage, UsageAlert, Wallet } from "@locusgraph/blocks";
import { Button, RuleGrid, RuleGridCell } from "@locusgraph/components";
import { formatMicroUsd } from "@locusgraph/utils";
import Link from "next/link";
import { useState } from "react";
import { PageHeading } from "./page-heading";
import { grants, keys, organization, packs, plans, quotas, wallet } from "./sample-data";

export function Dashboard() {
  const [lastPack, setLastPack] = useState<string | null>(null);
  return (
    <div className="enter-cascade flex flex-col gap-8">
      <PageHeading
        meta={`${organization.name} · ${organization.plan} plan`}
        title="Overview"
        description={`${formatMicroUsd(wallet.balanceMicroUsd)} in credits. Every section below comes from @locusgraph/blocks.`}
      />
      <UsageAlert
        balanceMicroUsd={wallet.balanceMicroUsd}
        quotas={quotas}
        paidPlan={false}
        buyCreditsHref="/#billing"
        upgradeHref="/#plans"
        linkComponent={Link}
      />
      <Usage quotas={quotas} />
      <RuleGrid id="billing" columns={2}>
        <Wallet balanceMicroUsd={wallet.balanceMicroUsd} grants={grants} />
        <TopUp packs={packs} onBuy={setLastPack} />
      </RuleGrid>
      {lastPack && (
        <p className="font-mono text-2xs text-muted-foreground">
          onBuy("{lastPack}") would open Stripe Checkout.
        </p>
      )}
      <div id="plans">
        <Plans
          plans={plans}
          actionFor={(plan) => <Button size="sm">Upgrade to {plan.name}</Button>}
        />
      </div>
      <RuleGrid columns={1}>
        <RuleGridCell className="p-0">
          <Keys
            keys={keys}
            actions={() => (
              <Button size="sm" variant="ghost">
                Revoke
              </Button>
            )}
          />
        </RuleGridCell>
      </RuleGrid>
    </div>
  );
}
