import type { BlockAction, QuotaData } from "@locusgraph/blocks";
import type { LocusProps } from "./props";

type SpecAction = LocusProps<"Plans">["actions"][number];

type SpecQuota = LocusProps<"Usage">["quotas"][number];

export function blockActions(actions: SpecAction[]): BlockAction[] {
  return actions.map(({ id, label, variant, disabled }) => ({
    id,
    label,
    variant: variant ?? undefined,
    disabled: disabled ?? undefined,
  }));
}

export function quotasWithoutNullLabels(quotas: SpecQuota[]): QuotaData[] {
  return quotas.map(({ label, ...rest }) => (label === null ? rest : { ...rest, label }));
}
