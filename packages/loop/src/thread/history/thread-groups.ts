import type { HistoryItem } from "./row/history-row";

export type ThreadGroup = { key: string; label: string; threads: HistoryItem[] };

const timeOfDay = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const calendarDate = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

function localDayStart(value: string | number | Date) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysBetween(earlier: Date, later: Date) {
  const utcOf = (date: Date) => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((utcOf(later) - utcOf(earlier)) / 86_400_000);
}

function dayLabel(day: Date | undefined, today: Date | undefined) {
  if (!day) {
    return "Earlier";
  }
  const daysAgo = today ? daysBetween(day, today) : Number.NaN;
  if (daysAgo === 0) {
    return "Today";
  }
  if (daysAgo === 1) {
    return "Yesterday";
  }
  return calendarDate.format(day);
}

export function formatTimeOfDay(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : timeOfDay.format(date);
}

export function groupThreadsByDay(threads: HistoryItem[], now: Date | string): ThreadGroup[] {
  const today = localDayStart(now);
  const groups = new Map<string, ThreadGroup>();
  for (const thread of threads) {
    const day = localDayStart(thread.updatedAt);
    const key = day ? String(day.getTime()) : "earlier";
    const group = groups.get(key) ?? { key, label: dayLabel(day, today), threads: [] };
    group.threads.push(thread);
    groups.set(key, group);
  }
  return [...groups.values()];
}
