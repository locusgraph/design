import {
  type CreditPack,
  type PlanOffer,
  Plans,
  type QuotaData,
  TopUp,
  Usage,
  UsageAlert,
  Wallet,
} from "@locusgraph/blocks";
import { Button, RuleGrid } from "@locusgraph/components";
import {
  type BillingWallet,
  type Invoice,
  sampleInvoices,
  samplePacks,
  samplePlans,
  sampleQuotas,
  sampleWallet,
} from "./billing/billing-data";
import { BillingInvoices } from "./billing/billing-invoices";

export type BillingPageProps = {
  quotas?: QuotaData[];
  wallet?: BillingWallet;
  packs?: CreditPack[];
  plans?: PlanOffer[];
  invoices?: Invoice[];
  highlightedPackId?: string;
  pendingPackId?: string;
  buyCreditsHref?: string;
  upgradeHref?: string;
  onBuy?: (packId: string) => void;
  onChoosePlan?: (plan: PlanOffer) => void;
  onDownloadInvoice?: (invoiceId: string) => void;
};

function ignore() {}

function onPaidPlan(plans: PlanOffer[]) {
  return plans.some((plan) => plan.current && (plan.amountCents ?? 0) > 0);
}

export function BillingPage({
  quotas = sampleQuotas,
  wallet = sampleWallet,
  packs = samplePacks,
  plans = samplePlans,
  invoices = sampleInvoices,
  highlightedPackId = "credits_200",
  pendingPackId,
  buyCreditsHref = "#credits",
  upgradeHref = "#plans",
  onBuy = ignore,
  onChoosePlan = ignore,
  onDownloadInvoice = ignore,
}: BillingPageProps) {
  return (
    <div className="flex w-full flex-col gap-8 bg-background">
      <header className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold tracking-[-0.02em]">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Usage this period, prepaid credits, your plan and past invoices.
        </p>
      </header>
      <UsageAlert
        balanceMicroUsd={wallet.balanceMicroUsd}
        quotas={quotas}
        paidPlan={onPaidPlan(plans)}
        buyCreditsHref={buyCreditsHref}
        upgradeHref={upgradeHref}
      />
      <Usage quotas={quotas} />
      <RuleGrid id="credits" columns={2}>
        <Wallet
          balanceMicroUsd={wallet.balanceMicroUsd}
          debtMicroUsd={wallet.debtMicroUsd}
          grants={wallet.grants}
        />
        <TopUp
          packs={packs}
          onBuy={onBuy}
          highlightedPackId={highlightedPackId}
          pendingPackId={pendingPackId}
        />
      </RuleGrid>
      <section id="plans">
        <Plans
          plans={plans}
          actionFor={(plan) => (
            <Button size="sm" variant="outline" onClick={() => onChoosePlan(plan)}>
              Switch to {plan.name}
            </Button>
          )}
        />
      </section>
      <BillingInvoices invoices={invoices} onDownload={onDownloadInvoice} />
    </div>
  );
}
