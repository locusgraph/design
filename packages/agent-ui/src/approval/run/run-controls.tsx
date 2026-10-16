import { Button, cn } from "@locusgraph/components";
import { PauseIcon, PlayIcon, SkipForwardIcon, SquareIcon } from "lucide-react";
import type { RunControlStatus } from "../types";

export type RunControlsProps = {
  status: RunControlStatus;
  runName?: string;
  elapsedMs?: number;
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
  running: "bg-emerald-500 motion-safe:animate-pulse",
  paused: "bg-amber-500",
  stopped: "bg-destructive",
  done: "bg-muted-foreground/50",
};

function twoDigits(value: number) {
  return String(value).padStart(2, "0");
}

function formatElapsed(elapsedMs: number) {
  const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}:${twoDigits(minutes)}:${twoDigits(seconds)}`;
  return `${minutes}:${twoDigits(seconds)}`;
}

export function RunControls({
  status,
  runName,
  elapsedMs,
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
        "flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 bg-card py-2 pr-2 pl-3 text-card-foreground ring-1 ring-border",
        className
      )}
    >
      <span className="flex min-w-0 flex-1 items-center gap-2.5 text-sm">
        <span aria-hidden className={cn("size-2 shrink-0 rounded-full", statusDot[status])} />
        {runName && <span className="truncate font-medium">{runName}</span>}
        <span
          role="status"
          aria-live="polite"
          className="shrink-0 font-mono text-[11px] tracking-wide text-muted-foreground uppercase"
        >
          {statusLabels[status]}
        </span>
        {elapsedMs !== undefined && (
          <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
            <span className="sr-only">Elapsed </span>
            {formatElapsed(elapsedMs)}
          </span>
        )}
      </span>
      <span className="ml-auto flex shrink-0 items-center gap-1">
        <Button
          type="button"
          size="xs"
          variant={paused ? "default" : "outline"}
          disabled={!live || pending}
          onClick={paused ? onResume : onPause}
        >
          {paused ? <PlayIcon aria-hidden /> : <PauseIcon aria-hidden />}
          {paused ? "Resume" : "Pause"}
        </Button>
        {onStep && (
          <Button
            type="button"
            size="xs"
            variant="ghost"
            aria-label="Run one step"
            title="Run one step"
            disabled={!paused || pending}
            onClick={onStep}
          >
            <SkipForwardIcon aria-hidden />
            Step
          </Button>
        )}
        <Button
          type="button"
          size="xs"
          variant="ghost"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/15"
          disabled={!live || pending}
          onClick={onStop}
        >
          <SquareIcon aria-hidden className="size-2.5 fill-current" />
          Stop
        </Button>
      </span>
    </div>
  );
}
