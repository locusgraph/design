import { toDate } from "../../shared/decision-summary";
import type { DecidedAt } from "../types";

const minuteMs = 60_000;
const hourMs = 60 * minuteMs;
const dayMs = 24 * hourMs;

export function formatWaiting(since: DecidedAt, now: number): string {
  const waitedMs = Math.max(0, now - toDate(since).getTime());
  if (waitedMs < minuteMs) return "just now";
  if (waitedMs < hourMs) return `${Math.floor(waitedMs / minuteMs)} min`;
  if (waitedMs < dayMs) return `${Math.floor(waitedMs / hourMs)} h`;
  return `${Math.floor(waitedMs / dayMs)} d`;
}
