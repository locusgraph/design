import type { ApiKeyRow, BlockAction, QuotaData } from "@locusgraph/blocks";
import type { LocusProps } from "./props";

type SpecAction = LocusProps<"Plans">["actions"][number];

type SpecQuota = LocusProps<"Usage">["quotas"][number];

type SpecKey = LocusProps<"Keys">["keys"][number];

export function blockActions(actions: SpecAction[], locked = false): BlockAction[] {
  return actions.map(({ id, label, variant, disabled }) => ({
    id,
    label,
    variant: variant ?? undefined,
    disabled: locked || (disabled ?? undefined),
  }));
}

export function keyTarget(key: Pick<ApiKeyRow, "name" | "maskedKey">) {
  return key.name ?? key.maskedKey;
}

export function withKeyId<A extends { target: string }>(action: A | undefined, keys: SpecKey[]) {
  if (!action) return undefined;
  const key = keys.find((candidate) => keyTarget(candidate) === action.target);
  return key ? { ...action, target: key.id } : action;
}

export function quotasWithoutNullLabels(quotas: SpecQuota[]): QuotaData[] {
  return quotas.map(({ label, ...rest }) => (label === null ? rest : { ...rest, label }));
}
