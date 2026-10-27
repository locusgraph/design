"use client";

import { useStateStore, useStateValue } from "@json-render/react";
import { Keys, Plans, TopUp, Usage, Wallet } from "@locusgraph/blocks";
import type { PickedAction, SettledAction } from "../actions/guard-action";
import { blockActions, keyTarget, quotasWithoutNullLabels, withKeyId } from "./conversions";
import type { LocusRendererProps } from "./props";

function useActionState() {
  const pending = useStateValue<PickedAction | null>("/pending") ?? undefined;
  const settled = useStateValue<SettledAction | null>("/settled") ?? undefined;
  const locked = useStateValue<boolean>("/locked") === true;
  return { pending, settled, locked };
}

export function LocusUsage({ props }: LocusRendererProps<"Usage">) {
  return <Usage quotas={quotasWithoutNullLabels(props.quotas)} label={props.label ?? undefined} />;
}

export function LocusWallet({ props }: LocusRendererProps<"Wallet">) {
  return <Wallet balanceMicroUsd={props.balanceMicroUsd} grants={props.grants} />;
}

export function LocusTopUp({ props, emit }: LocusRendererProps<"TopUp">) {
  const { set } = useStateStore();
  const { pending, settled, locked } = useActionState();
  const buy = (packId: string) => {
    set("/selectedPackId", packId);
    set("/picked", { actionId: "buy", target: packId });
    emit("buy");
  };
  return (
    <TopUp
      packs={props.packs}
      onBuy={buy}
      pending={Boolean(settled || locked)}
      pendingPackId={pending?.actionId === "buy" ? pending.target : undefined}
    />
  );
}

export function LocusPlans({ props, emit }: LocusRendererProps<"Plans">) {
  const { set } = useStateStore();
  const { pending, settled, locked } = useActionState();
  return (
    <Plans
      plans={props.plans}
      actions={blockActions(props.actions, locked)}
      pending={pending}
      settled={settled}
      onAction={(actionId, plan) => {
        set("/picked", { actionId, target: plan.name });
        emit("action");
      }}
    />
  );
}

export function LocusKeys({ props, emit }: LocusRendererProps<"Keys">) {
  const { set } = useStateStore();
  const { pending, settled, locked } = useActionState();
  return (
    <Keys
      keys={props.keys}
      actions={blockActions(props.actions, locked)}
      pending={withKeyId(pending, props.keys)}
      settled={withKeyId(settled, props.keys)}
      onAction={(actionId, key) => {
        set("/picked", { actionId, target: keyTarget(key) });
        emit("action");
      }}
    />
  );
}
