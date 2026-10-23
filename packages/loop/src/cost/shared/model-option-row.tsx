import { DropdownMenuRadioItem } from "@locusgraph/components";
import { formatMicroUsd } from "@locusgraph/utils";
import { Check as CheckIcon } from "@phosphor-icons/react/ssr";
import { formatTokensShort } from "./usage-totals";

export type ModelSpeed = "fast" | "balanced" | "deep";

export type ModelOption = {
  id: string;
  name: string;
  provider: string;
  inputPerMillionMicroUsd?: number;
  outputPerMillionMicroUsd?: number;
  speed?: ModelSpeed;
  contextTokens?: number;
};

const speedLabel = { fast: "Fast", balanced: "Balanced", deep: "Deep" } as const;

export function modelPriceLabel(model: ModelOption): string | undefined {
  const input = model.inputPerMillionMicroUsd;
  const output = model.outputPerMillionMicroUsd;
  if (input === undefined && output === undefined) return undefined;
  if (output === undefined) return `${formatMicroUsd(input ?? 0)} / 1M in`;
  if (input === undefined) return `${formatMicroUsd(output)} / 1M out`;
  return `${formatMicroUsd(input)} in · ${formatMicroUsd(output)} out / 1M`;
}

function modelFacts(model: ModelOption): string[] {
  return [
    model.speed && speedLabel[model.speed],
    model.contextTokens !== undefined && `${formatTokensShort(model.contextTokens)} context`,
  ].filter((fact): fact is string => typeof fact === "string");
}

function PriceColumn({ model }: { model: ModelOption }) {
  const input = model.inputPerMillionMicroUsd;
  const output = model.outputPerMillionMicroUsd;
  return (
    <span className="flex flex-col items-end font-mono text-2xs text-muted-foreground tabular-nums">
      {input !== undefined && <span>{formatMicroUsd(input)} in</span>}
      {output !== undefined && <span>{formatMicroUsd(output)} out</span>}
    </span>
  );
}

export function ModelOptionRow({ model }: { model: ModelOption }) {
  const facts = modelFacts(model);
  return (
    <DropdownMenuRadioItem
      value={model.id}
      data-slot="model-picker-item"
      className="group grid grid-cols-[1fr_auto_1rem] items-center gap-x-3 rounded-none px-3 py-2.5 transition-colors duration-150 focus:bg-accent/50 data-[state=checked]:bg-accent motion-reduce:transition-none [&>span:first-child]:hidden"
    >
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="flex items-baseline gap-2">
          <span className="truncate font-medium">{model.name}</span>
          <span className="truncate text-xs text-muted-foreground">{model.provider}</span>
        </span>
        {facts.length > 0 && (
          <span className="font-mono text-2xs text-muted-foreground tabular-nums">
            {facts.join(" · ")}
          </span>
        )}
      </span>
      <PriceColumn model={model} />
      <CheckIcon
        weight="bold"
        aria-hidden
        className="size-4 text-foreground opacity-0 group-data-[state=checked]:opacity-100"
      />
    </DropdownMenuRadioItem>
  );
}
