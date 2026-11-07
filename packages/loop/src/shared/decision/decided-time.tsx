"use client";

import { useSyncExternalStore } from "react";

const utcFull = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});
const utcClock = new Intl.DateTimeFormat("en-US", { timeStyle: "short", timeZone: "UTC" });
const localFull = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" });
const localClock = new Intl.DateTimeFormat("en-US", { timeStyle: "short" });

export type DecisionTimeStyle = "full" | "time";

function serverText(date: Date, style: DecisionTimeStyle) {
  return style === "time" ? `${utcClock.format(date)} UTC` : `${utcFull.format(date)} UTC`;
}

function viewerText(date: Date, style: DecisionTimeStyle) {
  return style === "time" ? localClock.format(date) : localFull.format(date);
}

function subscribeToNothing() {
  return () => {};
}

function useIsClient() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  );
}

export function DecidedTime({ date, style }: { date: Date; style: DecisionTimeStyle }) {
  const onClient = useIsClient();
  return (
    <time
      dateTime={date.toISOString()}
      title={onClient ? localFull.format(date) : serverText(date, "full")}
      className="tabular-nums"
    >
      {onClient ? viewerText(date, style) : serverText(date, style)}
    </time>
  );
}
