import {
  Button,
  cn,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@locusgraph/components";
import { RotateCcwIcon } from "lucide-react";
import { type PreviewBackground, setParam } from "../../url-state";

export const previewBackgroundClass: Record<PreviewBackground, string> = {
  surface: "bg-background",
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
    <div className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-md border bg-background/80 p-0.5 backdrop-blur">
      <ToggleGroup
        type="single"
        size="sm"
        value={background}
        onValueChange={(next) => next && setParam("background", next === "surface" ? null : next)}
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
                    "block size-3.5 shrink-0 rounded-sm border",
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
          <RotateCcwIcon />
          Reset
        </Button>
      )}
    </div>
  );
}
