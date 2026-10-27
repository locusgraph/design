import { defineRegistry, useStateStore } from "@json-render/react";
import { type BlockAction, Keys, Plans, TopUp, Usage, Wallet } from "@locusgraph/blocks";
import { Alert, AlertDescription, AlertTitle, RuleGrid } from "@locusgraph/components";
import { catalog } from "./catalog";

const stackGap = { sm: "gap-3", md: "gap-6", lg: "gap-8" } as const;

function withoutNullLabels<T extends { label: string | null }>(items: T[]) {
  return items.map(({ label, ...rest }) => (label === null ? rest : { ...rest, label }));
}

type SpecAction = {
  id: string;
  label: string;
  variant: BlockAction["variant"] | null;
  disabled: boolean | null;
};

function blockActions(actions: SpecAction[]): BlockAction[] {
  return actions.map(({ id, label, variant, disabled }) => ({
    id,
    label,
    variant: variant ?? undefined,
    disabled: disabled ?? undefined,
  }));
}

function pickedLabel(picked: unknown) {
  const { actionId, target } = picked as { actionId: string; target: string };
  return `${actionId} on ${target}`;
}

export const { registry, handlers } = defineRegistry(catalog, {
  components: {
    Stack: ({ props, children }) => (
      <div className={`flex flex-col ${stackGap[props.gap ?? "md"]}`}>{children}</div>
    ),
    Columns: ({ props, children }) => <RuleGrid columns={props.count}>{children}</RuleGrid>,
    Notice: ({ props }) => (
      <Alert variant={props.tone}>
        <AlertTitle>{props.title}</AlertTitle>
        {props.description && <AlertDescription>{props.description}</AlertDescription>}
      </Alert>
    ),
    Usage: ({ props }) => (
      <Usage quotas={withoutNullLabels(props.quotas)} label={props.label ?? undefined} />
    ),
    Wallet: ({ props }) => <Wallet balanceMicroUsd={props.balanceMicroUsd} grants={props.grants} />,
    TopUp: function SpecTopUp({ props, emit }) {
      const { set } = useStateStore();
      const buy = (packId: string) => {
        set("/selectedPackId", packId);
        emit("buy");
      };
      return <TopUp packs={props.packs} onBuy={buy} />;
    },
    Plans: function SpecPlans({ props, emit }) {
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
    },
    Keys: function SpecKeys({ props, emit }) {
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
    },
  },
  actions: {
    buyCredits: async (_params, setState, state) => {
      setState((previous) => ({
        ...previous,
        lastAction: `buyCredits opens Stripe Checkout for ${String(state.selectedPackId)}`,
      }));
    },
    planAction: async (_params, setState, state) => {
      setState((previous) => ({
        ...previous,
        lastAction: `planAction: ${pickedLabel(state.picked)}`,
      }));
    },
    keyAction: async (_params, setState, state) => {
      setState((previous) => ({
        ...previous,
        lastAction: `keyAction: ${pickedLabel(state.picked)}`,
      }));
    },
  },
});
