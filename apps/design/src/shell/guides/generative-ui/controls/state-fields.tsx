import { Input, Label } from "@locusgraph/components";
import { useId, useState } from "react";
import type { GenerativeSession } from "../session/use-generative-session";

const microUsdPerDollar = 1_000_000;
const eventsIncluded = 10_000;

type StateFieldProps = { label: string; value: number; onChange: (value: number) => void };

function StateField({ label, value, onChange }: StateFieldProps) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-3">
      <Label htmlFor={id} className="text-sm font-normal text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Math.max(0, Number(event.target.value) || 0))}
        className="h-control-sm w-28 text-right font-mono text-xs tabular-nums"
      />
    </div>
  );
}

export function StateFields({ store }: { store: GenerativeSession["store"] }) {
  const [balance, setBalance] = useState(1);
  const [eventsUsed, setEventsUsed] = useState(10_450);
  const changeBalance = (dollars: number) => {
    setBalance(dollars);
    store.set("/wallet/balanceMicroUsd", dollars * microUsdPerDollar);
  };
  const changeEvents = (used: number) => {
    setEventsUsed(used);
    const quotas = store.get("/quotas") as { used: number }[];
    store.set(
      "/quotas",
      quotas.map((quota, index) => (index === 0 ? { ...quota, used } : quota))
    );
    store.set("/overQuota", used > eventsIncluded);
  };
  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      <div className="flex flex-col gap-1">
        <span className="locus-eyebrow">State</span>
        <p className="text-xs text-pretty text-faint">
          The spec binds to these values. The model never writes the numbers.
        </p>
      </div>
      <StateField label="Balance ($)" value={balance} onChange={changeBalance} />
      <StateField label="Events used" value={eventsUsed} onChange={changeEvents} />
    </div>
  );
}
