"use client";

import { useEffect, useState } from "react";

const utcFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });
const localFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

export function LocalDate({ value }: { value: string }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return (
    <time dateTime={value}>{(hydrated ? localFormat : utcFormat).format(new Date(value))}</time>
  );
}
