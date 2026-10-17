import { ChevronDown as ChevronDownIcon } from "@carbon/icons-react";
import {
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@locusgraph/components";
import { type ModelOption, ModelOptionRow } from "./shared/model-option-row";

export {
  type ModelOption,
  type ModelSpeed,
  modelPriceLabel,
} from "./shared/model-option-row";

export type ModelPickerProps = {
  models: ModelOption[];
  value: string;
  onChange: (id: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function ModelPicker({
  models,
  value,
  onChange,
  label = "Model",
  disabled = false,
  className,
}: ModelPickerProps) {
  const selected = models.find((model) => model.id === value);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-slot="model-picker"
        data-value={value}
        disabled={disabled}
        aria-label={`${label}: ${selected?.name ?? "none selected"}`}
        className={cn(
          "group inline-flex h-7 max-w-full items-center gap-1.5 rounded-full px-2.5 text-xs outline-none transition-colors duration-150 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent motion-reduce:transition-none",
          className
        )}
      >
        <span className="truncate font-medium">{selected?.name ?? label}</span>
        {selected && (
          <span className="truncate text-muted-foreground max-sm:hidden">{selected.provider}</span>
        )}
        <ChevronDownIcon
          aria-hidden
          className="size-3 shrink-0 text-muted-foreground transition-transform duration-150 group-data-[state=open]:rotate-180 motion-reduce:transition-none"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className="w-80 rounded-none border-0 bg-popover p-0 shadow-overlay ring-1 ring-border"
      >
        <DropdownMenuLabel className="locus-eyebrow flex justify-between gap-3 border-b border-border px-3 py-2 font-normal">
          <span>{label}</span>
          <span className="pr-7">Per 1M tokens</span>
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={onChange}
          className="flex flex-col divide-y divide-border"
        >
          {models.map((model) => (
            <ModelOptionRow key={model.id} model={model} />
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
