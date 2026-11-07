"use client";

import { useEffect, useState } from "react";

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

export function DecidedTime({ date, style }: { date: Date; style: DecisionTimeStyle }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return (
    <time
      dateTime={date.toISOString()}
      title={hydrated ? localFull.format(date) : serverText(date, "full")}
      className="tabular-nums"
    >
      {hydrated ? viewerText(date, style) : serverText(date, style)}
    </time>
  );
}
