import type { HistoryItem } from "./row/history-row";
import type { ThreadGroup } from "./thread-groups";

export type HistoryListRow =
  | { kind: "group"; key: string; groupKey: string; label: string }
  | { kind: "thread"; key: string; thread: HistoryItem; position: number; groupSize: number };

export function historyListRows(groups: ThreadGroup[]): HistoryListRow[] {
  return groups.flatMap((group): HistoryListRow[] => [
    { kind: "group", key: `group:${group.key}`, groupKey: group.key, label: group.label },
    ...group.threads.map((thread, index) => ({
      kind: "thread" as const,
      key: thread.id,
      thread,
      position: index + 1,
      groupSize: group.threads.length,
    })),
  ]);
}

const groupLabelHeightPx = 24;
const groupGapPx = 16;
const threadRowHeightPx = 32;

export function estimatedRowHeight(row: HistoryListRow, index: number): number {
  if (row.kind === "thread") {
    return threadRowHeightPx;
  }
  return index === 0 ? groupLabelHeightPx : groupLabelHeightPx + groupGapPx;
}
