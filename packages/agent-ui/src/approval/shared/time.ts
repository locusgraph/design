import type { DecidedAt } from "../types";

const decisionTimeFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

const minuteMs = 60_000;
const hourMs = 60 * minuteMs;
const dayMs = 24 * hourMs;

export function toDate(value: DecidedAt): Date {
  return value instanceof Date ? value : new Date(value);
}

export function isoOf(value: DecidedAt): string | undefined {
  const date = toDate(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function formatDecidedAt(value: DecidedAt): string {
  const date = toDate(value);
  return Number.isNaN(date.getTime()) ? "" : `${decisionTimeFormat.format(date)} UTC`;
}

export function formatWaiting(since: DecidedAt, now: number): string {
  const waitedMs = Math.max(0, now - toDate(since).getTime());
  if (waitedMs < minuteMs) return "just now";
  if (waitedMs < hourMs) return `${Math.floor(waitedMs / minuteMs)} min`;
  if (waitedMs < dayMs) return `${Math.floor(waitedMs / hourMs)} h`;
  return `${Math.floor(waitedMs / dayMs)} d`;
}
