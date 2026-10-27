import { defineRegistry, useStateStore } from "@json-render/react";
import { TopUp, Usage, Wallet } from "@locusgraph/blocks";
import { Alert, AlertDescription, AlertTitle, Button, RuleGrid } from "@locusgraph/components";
import { catalog } from "./catalog";

const stackGap = { sm: "gap-3", md: "gap-6", lg: "gap-8" } as const;

function withoutNullLabels<T extends { label: string | null }>(items: T[]) {
  return items.map(({ label, ...rest }) => (label === null ? rest : { ...rest, label }));
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
    Action: ({ props, emit }) => (
      <Button size="sm" variant={props.variant} onClick={() => emit("press")}>
        {props.label}
      </Button>
    ),
  },
  actions: {
    buyCredits: async (_params, setState, state) => {
      setState((previous) => ({
        ...previous,
        lastAction: `buyCredits opens Stripe Checkout for ${String(state.selectedPackId)}`,
      }));
    },
    upgrade: async (_params, setState) => {
      setState((previous) => ({ ...previous, lastAction: "upgrade opens the plan picker" }));
    },
  },
});
