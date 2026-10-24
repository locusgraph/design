"use client";

import { Button, cn } from "@locusgraph/components";
import {
  Pause as PauseIcon,
  Play as PlayIcon,
  SkipForward as SkipForwardIcon,
  Stop as SquareIcon,
} from "@phosphor-icons/react/ssr";
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

const statusTone: Record<RunBarStatus, string> = {
  running: "text-muted-foreground motion-safe:locus-shimmer",
  paused: "font-medium text-warn",
  stopped: "font-medium text-destructive",
  done: "font-medium text-good",
};

const quietButtonClass = "text-faint hover:bg-transparent hover:text-interactive";

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
        "flex min-h-control-sm min-w-0 flex-wrap items-center gap-x-3 gap-y-1",
        className
      )}
    >
      <span className="flex min-w-0 flex-auto items-center gap-2.5 text-sm">
        {runName && <span className="truncate font-medium text-foreground">{runName}</span>}
        <span role="status" aria-live="polite" className={cn("shrink-0", statusTone[status])}>
          {statusLabels[status]}
        </span>
        {elapsedMs !== undefined && (
          <span className="shrink-0 text-faint tabular-nums">
            <span className="sr-only">Elapsed </span>
            {formatElapsed(elapsedMs)}
          </span>
        )}
      </span>
      {live && (
        <span className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            size="xs"
            variant={paused ? "default" : "ghost"}
            className={paused ? undefined : quietButtonClass}
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
              className={quietButtonClass}
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
            className="text-faint hover:bg-transparent hover:text-destructive"
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
