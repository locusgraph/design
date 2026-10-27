import {
  Button,
  cn,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@locusgraph/components";
import { ArrowCounterClockwise as RotateCcwIcon } from "@phosphor-icons/react/ssr";
import { type PreviewBackground, setParam } from "../../url-state";

export const previewBackgroundClass: Record<PreviewBackground, string> = {
  surface:
    "bg-surface bg-[radial-gradient(var(--locus-border)_1px,transparent_1px)] [background-size:16px_16px]",
  plain: "bg-white dark:bg-black",
  checker: "preview-checker",
};

const swatches: { value: PreviewBackground; label: string }[] = [
  { value: "surface", label: "Surface" },
  { value: "plain", label: "Plain" },
  { value: "checker", label: "Checkered" },
];

type PreviewToolbarProps = {
  background: PreviewBackground;
  canReset: boolean;
  onReset: () => void;
};

export function PreviewToolbar({ background, canReset, onReset }: PreviewToolbarProps) {
  return (
    <div className="flex shrink-0 items-center gap-1 self-start rounded-full border bg-background p-0.5 sm:ml-auto sm:self-center">
      <ToggleGroup
        type="single"
        size="sm"
        value={background}
        onValueChange={(next) => next && setParam("background", next === "surface" ? null : next)}
        aria-label="Preview background"
      >
        {swatches.map((swatch) => (
          <Tooltip key={swatch.value}>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value={swatch.value}
                aria-label={`${swatch.label} background`}
                className="h-7 w-7 min-w-7 px-0"
              >
                <span
                  className={cn(
                    "block size-3.5 shrink-0 rounded-full border",
                    previewBackgroundClass[swatch.value]
                  )}
                />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>{swatch.label} background</TooltipContent>
          </Tooltip>
        ))}
      </ToggleGroup>
      {canReset && (
        <Button variant="ghost" size="xs" onClick={onReset}>
          <RotateCcwIcon weight="bold" aria-hidden />
          Reset
        </Button>
      )}
    </div>
  );
}
