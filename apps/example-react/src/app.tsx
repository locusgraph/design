import {
  CreditPacks,
  KeysTable,
  PlanOptions,
  UsageAttention,
  UsageSummary,
  WalletPanel,
} from "@locusgraph/blocks";
import { LocusGraphWordmark } from "@locusgraph/brand";
import {
  Button,
  RuleGrid,
  RuleGridCell,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ThemeToggle,
} from "@locusgraph/components";
import { formatMicroUsd } from "@locusgraph/utils";
import { useState } from "react";
import { EmailPreview } from "./email-preview";
import { grants, keys, organization, packs, plans, quotas, wallet } from "./sample-data";

export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lastPack, setLastPack] = useState<string | null>(null);
  const changeTheme = (next: "light" | "dark") => {
    document.documentElement.classList.toggle("dark", next === "dark");
    setTheme(next);
  };
  return (
    <div className="min-h-svh">
      <header className="flex h-14 items-center justify-between border-b px-6">
        <LocusGraphWordmark withMark className="text-base" />
        <ThemeToggle theme={theme} onThemeChange={changeTheme} />
      </header>
      <main className="brand-grid-quiet mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-[11.5px] text-muted-foreground">
            {organization.name} · {formatMicroUsd(wallet.balanceMicroUsd)} in credits
          </p>
          <h1 className="text-[26px] leading-tight font-semibold tracking-[-0.03em]">
            React example
          </h1>
        </div>
        <Tabs defaultValue="billing">
          <TabsList>
            <TabsTrigger value="billing">Usage and billing</TabsTrigger>
            <TabsTrigger value="keys">API keys</TabsTrigger>
            <TabsTrigger value="email">Emails</TabsTrigger>
          </TabsList>
          <TabsContent value="billing" className="enter-cascade flex flex-col gap-8 pt-6">
            <UsageAttention
              balanceMicroUsd={wallet.balanceMicroUsd}
              quotas={quotas}
              paidPlan={false}
              buyCreditsHref="#billing"
              upgradeHref="#plans"
            />
            <UsageSummary quotas={quotas} />
            <RuleGrid columns={2}>
              <WalletPanel balanceMicroUsd={wallet.balanceMicroUsd} grants={grants} />
              <CreditPacks packs={packs} onBuy={setLastPack} />
            </RuleGrid>
            {lastPack && (
              <p className="font-mono text-[11.5px] text-muted-foreground">
                onBuy("{lastPack}") would open Stripe Checkout.
              </p>
            )}
            <PlanOptions
              plans={plans}
              actionFor={(plan) => <Button size="sm">Upgrade to {plan.name}</Button>}
            />
          </TabsContent>
          <TabsContent value="keys" className="pt-6">
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
          </TabsContent>
          <TabsContent value="email" className="pt-6">
            <EmailPreview />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
