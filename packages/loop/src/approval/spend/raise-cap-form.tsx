import { Button, Input, Label } from "@locusgraph/components";
import { formatMicroUsd } from "@locusgraph/utils";
import { useId, useState } from "react";
import { dollarsToMicroUsd, microUsdToDollarsInput } from "./spend-math";

type RaiseCapFormProps = {
  capMicroUsd: number;
  suggestedMicroUsd: number;
  disabled?: boolean;
  onRaiseCap: (newCapMicroUsd: number) => void;
};

function capError(next: number | null, capMicroUsd: number) {
  if (next === null) return "Enter an amount in dollars.";
  if (next <= capMicroUsd) return `The new cap must be above ${formatMicroUsd(capMicroUsd)}.`;
  return undefined;
}

export function RaiseCapForm({
  capMicroUsd,
  suggestedMicroUsd,
  disabled = false,
  onRaiseCap,
}: RaiseCapFormProps) {
  const inputId = useId();
  const [dollars, setDollars] = useState(() => microUsdToDollarsInput(suggestedMicroUsd));
  const [touched, setTouched] = useState(false);
  const next = dollarsToMicroUsd(dollars);
  const error = capError(next, capMicroUsd);
  const visibleError = touched ? error : undefined;
  return (
    <form
      data-slot="raise-cap-form"
      noValidate
      className="flex flex-col gap-1.5"
      onSubmit={(event) => {
        event.preventDefault();
        setTouched(true);
        if (next !== null && !error) onRaiseCap(next);
      }}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Label htmlFor={inputId} className="text-sm font-normal text-muted-foreground">
          Or raise the cap for this run
        </Label>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-32">
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-faint"
            >
              $
            </span>
            <Input
              id={inputId}
              inputMode="decimal"
              className="border-transparent bg-muted pl-6 tabular-nums shadow-none dark:bg-muted"
              value={dollars}
              disabled={disabled}
              aria-invalid={visibleError ? true : undefined}
              aria-describedby={visibleError ? `${inputId}-error` : undefined}
              onChange={(event) => setDollars(event.target.value)}
              onBlur={() => setTouched(true)}
            />
          </div>
          <Button
            type="submit"
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:bg-transparent hover:text-s1"
            disabled={disabled}
          >
            {next !== null && !error ? `Raise cap to ${formatMicroUsd(next)}` : "Raise cap"}
          </Button>
        </div>
      </div>
      {visibleError && (
        <p id={`${inputId}-error`} className="text-xs text-destructive">
          {visibleError}
        </p>
      )}
    </form>
  );
}
