import { Button, cn } from "@locusgraph/components";
import { PauseIcon, PlayIcon, SkipForwardIcon, SquareIcon } from "lucide-react";
import type { RunControlStatus } from "../types";

export type RunControlsProps = {
  status: RunControlStatus;
  runName?: string;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onStep?: () => void;
  pending?: boolean;
  className?: string;
};

const statusLabels: Record<RunControlStatus, string> = {
  running: "Running",
  paused: "Paused",
  stopped: "Stopped",
  done: "Done",
};

const statusDot: Record<RunControlStatus, string> = {
  running: "bg-good motion-safe:animate-pulse",
  paused: "bg-warn",
  stopped: "bg-destructive",
  done: "bg-muted-foreground",
};

export function RunControls({
  status,
  runName,
  onPause,
  onResume,
  onStop,
  onStep,
  pending = false,
  className,
}: RunControlsProps) {
  const live = status === "running" || status === "paused";
  const paused = status === "paused";
  return (
    <div
      role="toolbar"
      aria-label={runName ? `Controls for ${runName}` : "Run controls"}
      data-slot="run-controls"
      data-status={status}
      className={cn(
        "flex flex-wrap items-center gap-3 bg-card px-3 py-2 text-card-foreground ring-1 ring-border",
        className
      )}
    >
      <span className="flex min-w-0 items-center gap-2 text-sm">
        <span aria-hidden className={cn("size-2 shrink-0 rounded-full", statusDot[status])} />
        {runName && <span className="truncate font-medium">{runName}</span>}
        <span role="status" aria-live="polite" className="text-muted-foreground">
          {statusLabels[status]}
        </span>
      </span>
      <span className="ml-auto flex flex-wrap gap-1.5">
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={!live || pending}
          onClick={paused ? onResume : onPause}
        >
          {paused ? <PlayIcon aria-hidden /> : <PauseIcon aria-hidden />}
          {paused ? "Resume" : "Pause"}
        </Button>
        {onStep && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={!paused || pending}
            onClick={onStep}
          >
            <SkipForwardIcon aria-hidden />
            Run one step
          </Button>
        )}
        <Button
          type="button"
          size="sm"
          variant={live ? "destructive" : "outline"}
          disabled={!live || pending}
          onClick={onStop}
        >
          <SquareIcon aria-hidden />
          Stop
        </Button>
      </span>
    </div>
  );
}
