import type { KeyboardEvent } from "react";

const stepByKey: Partial<Record<string, number>> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
};

export function selectRadioWithArrowKeys<Value>(
  values: readonly Value[],
  current: Value,
  onSelect: (value: Value) => void
) {
  return (event: KeyboardEvent<HTMLElement>) => {
    const step = stepByKey[event.key];
    if (step === undefined) return;
    event.preventDefault();
    const index = (values.indexOf(current) + step + values.length) % values.length;
    const next = values[index] as Value;
    onSelect(next);
    event.currentTarget.querySelectorAll<HTMLElement>("[role=radio]")[index]?.focus();
  };
}
