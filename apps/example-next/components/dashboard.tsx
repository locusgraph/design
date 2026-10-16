"use client";

import {
  CreditPacks,
  KeysTable,
  PlanOptions,
  UsageAttention,
  UsageSummary,
  WalletPanel,
} from "@locusgraph/blocks";
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
      <UsageAttention
        balanceMicroUsd={wallet.balanceMicroUsd}
        quotas={quotas}
        paidPlan={false}
        buyCreditsHref="/#billing"
        upgradeHref="/#plans"
        linkComponent={Link}
      />
      <UsageSummary quotas={quotas} />
      <RuleGrid id="billing" columns={2}>
        <WalletPanel balanceMicroUsd={wallet.balanceMicroUsd} grants={grants} />
        <CreditPacks packs={packs} onBuy={setLastPack} />
      </RuleGrid>
      {lastPack && (
        <p className="font-mono text-[11.5px] text-muted-foreground">
          onBuy("{lastPack}") would open Stripe Checkout.
        </p>
      )}
      <div id="plans">
        <PlanOptions
          plans={plans}
          actionFor={(plan) => <Button size="sm">Upgrade to {plan.name}</Button>}
        />
      </div>
      <RuleGrid columns={1}>
        <RuleGridCell className="p-0">
          <KeysTable
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
