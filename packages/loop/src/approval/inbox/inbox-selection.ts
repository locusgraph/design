import type { PendingApproval } from "../types";

export function bulkApprovable(items: PendingApproval[]): PendingApproval[] {
  return items.filter((item) => item.risk !== "destructive");
}

export function selectedIn(items: PendingApproval[], selected: Set<string>): string[] {
  return bulkApprovable(items)
    .map((item) => item.id)
    .filter((id) => selected.has(id));
}

export type SelectAllState = boolean | "indeterminate";

export function selectAllState(selectableCount: number, selectedCount: number): SelectAllState {
  if (selectedCount === 0 || selectableCount === 0) return false;
  return selectedCount === selectableCount ? true : "indeterminate";
}

export function toggled(selected: Set<string>, id: string, on: boolean): Set<string> {
  const next = new Set(selected);
  if (on) next.add(id);
  else next.delete(id);
  return next;
}
