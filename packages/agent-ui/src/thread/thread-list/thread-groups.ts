import { formatDate } from "@locusgraph/utils";
import type { ThreadSummary } from "./thread-list-item";

export type ThreadGroup = { key: string; label: string; threads: ThreadSummary[] };

const dayMs = 86_400_000;

const timeOfDay = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "UTC",
});

function utcDayOf(value: string | number | Date) {
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? Number.NaN : Math.floor(time / dayMs);
}

function dayLabel(day: number, today: number) {
  if (day === today) {
    return "Today";
  }
  if (day === today - 1) {
    return "Yesterday";
  }
  return Number.isNaN(day) ? "Earlier" : formatDate(day * dayMs);
}

export function formatTimeOfDay(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : timeOfDay.format(date);
}

export function groupThreadsByDay(threads: ThreadSummary[], now: Date | string): ThreadGroup[] {
  const today = utcDayOf(now);
  const groups = new Map<string, ThreadGroup>();
  for (const thread of threads) {
    const day = utcDayOf(thread.updatedAt);
    const key = String(day);
    const group = groups.get(key) ?? { key, label: dayLabel(day, today), threads: [] };
    group.threads.push(thread);
    groups.set(key, group);
  }
  return [...groups.values()];
}
