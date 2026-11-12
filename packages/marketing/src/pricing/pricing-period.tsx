"use client";

import { ToggleGroup, ToggleGroupItem } from "@locusgraph/components";
import { type ReactNode, useState } from "react";

export type BillingPeriod = "monthly" | "yearly";

type PricingPeriodProps = {
  defaultPeriod: BillingPeriod;
  labels: Record<BillingPeriod, ReactNode>;
  label: string;
  children: ReactNode;
};

function isPeriod(value: string): value is BillingPeriod {
  return value === "monthly" || value === "yearly";
}

export function PricingPeriod({ defaultPeriod, labels, label, children }: PricingPeriodProps) {
  const [period, setPeriod] = useState<BillingPeriod>(defaultPeriod);
  return (
    <div data-period={period} className="group/pricing flex flex-col gap-8">
      <ToggleGroup
        type="single"
        variant="outline"
        value={period}
        aria-label={label}
        onValueChange={(value) => {
          if (isPeriod(value)) setPeriod(value);
        }}
        className="self-center"
      >
        <ToggleGroupItem value="monthly">{labels.monthly}</ToggleGroupItem>
        <ToggleGroupItem value="yearly">{labels.yearly}</ToggleGroupItem>
      </ToggleGroup>
      {children}
    </div>
  );
}
