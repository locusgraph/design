import { Button, cn } from "@locusgraph/components";
import {
  Pause as PauseIcon,
  Play as PlayIcon,
  SkipForward as SkipForwardIcon,
  Stop as SquareIcon,
} from "@phosphor-icons/react/ssr";
import { StatusDot, type StatusTone } from "../../shared/status-dot";
import type { RunBarStatus } from "../types";

export type RunBarProps = {
  status: RunBarStatus;
  runName?: string;
  elapsedMs?: number;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onStep?: () => void;
  pending?: boolean;
  className?: string;
};

const statusLabels: Record<RunBarStatus, string> = {
  running: "Running",
  paused: "Paused",
  stopped: "Stopped",
  done: "Done",
};

const statusTone: Record<RunBarStatus, StatusTone> = {
  running: "running",
  paused: "waiting",
  stopped: "danger",
  done: "done",
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

export function RunBar({
  status,
  runName,
  elapsedMs,
  onPause,
  onResume,
  onStop,
  onStep,
  pending = false,
  className,
}: RunBarProps) {
  const live = status === "running" || status === "paused";
  const paused = status === "paused";
  return (
    <div
      role="toolbar"
      aria-label={runName ? `Controls for ${runName}` : "Run controls"}
      data-slot="run-bar"
      data-status={status}
      className={cn(
        "flex min-h-10 min-w-0 flex-wrap items-center gap-x-3 gap-y-2 bg-card py-2 pr-2 pl-3 text-card-foreground ring-1 ring-border",
        className
      )}
    >
      <span className="flex min-w-0 flex-1 items-center gap-2.5 text-sm">
        <StatusDot tone={statusTone[status]} className="size-2" />
        {runName && <span className="truncate font-medium">{runName}</span>}
        <span role="status" aria-live="polite" className="eyebrow shrink-0">
          {statusLabels[status]}
        </span>
        {elapsedMs !== undefined && (
          <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
            <span className="sr-only">Elapsed </span>
            {formatElapsed(elapsedMs)}
          </span>
        )}
      </span>
      {live && (
        <span className="ml-auto flex shrink-0 items-center gap-1">
          <Button
            type="button"
            size="xs"
            variant={paused ? "default" : "outline"}
            disabled={pending}
            onClick={paused ? onResume : onPause}
          >
            {paused ? (
              <PlayIcon weight="bold" aria-hidden />
            ) : (
              <PauseIcon weight="bold" aria-hidden />
            )}
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
              <SkipForwardIcon weight="bold" aria-hidden />
              Step
            </Button>
          )}
          <Button
            type="button"
            size="xs"
            variant="ghost"
            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/15"
            disabled={pending}
            onClick={onStop}
          >
            <SquareIcon weight="fill" aria-hidden className="size-2.5 fill-current" />
            Stop
          </Button>
        </span>
      )}
    </div>
  );
}
