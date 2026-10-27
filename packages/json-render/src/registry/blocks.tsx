"use client";

import { useStateStore } from "@json-render/react";
import { Keys, Plans, TopUp, Usage, Wallet } from "@locusgraph/blocks";
import { blockActions, quotasWithoutNullLabels } from "./conversions";
import type { LocusRendererProps } from "./props";

export function LocusUsage({ props }: LocusRendererProps<"Usage">) {
  return <Usage quotas={quotasWithoutNullLabels(props.quotas)} label={props.label ?? undefined} />;
}

export function LocusWallet({ props }: LocusRendererProps<"Wallet">) {
  return <Wallet balanceMicroUsd={props.balanceMicroUsd} grants={props.grants} />;
}

export function LocusTopUp({ props, emit }: LocusRendererProps<"TopUp">) {
  const { set } = useStateStore();
  const buy = (packId: string) => {
    set("/selectedPackId", packId);
    emit("buy");
  };
  return <TopUp packs={props.packs} onBuy={buy} />;
}

export function LocusPlans({ props, emit }: LocusRendererProps<"Plans">) {
  const { set } = useStateStore();
  return (
    <Plans
      plans={props.plans}
      actions={blockActions(props.actions)}
      onAction={(actionId, plan) => {
        set("/picked", { actionId, target: plan.name });
        emit("action");
      }}
    />
  );
}

export function LocusKeys({ props, emit }: LocusRendererProps<"Keys">) {
  const { set } = useStateStore();
  return (
    <Keys
      keys={props.keys}
      actions={blockActions(props.actions)}
      onAction={(actionId, key) => {
        set("/picked", { actionId, target: key.name ?? key.maskedKey });
        emit("action");
      }}
    />
  );
}
