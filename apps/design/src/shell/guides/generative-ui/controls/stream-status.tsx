import { cn } from "@locusgraph/components";

type StreamStatusProps = {
  bytes: number;
  shownCount: number;
  total: number;
  gatedActions: number;
  streaming: boolean;
};

function StatusRow({ label, value, done }: { label: string; value: string; done: boolean }) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          done ? "bg-good-fill" : "bg-warn-fill motion-safe:animate-pulse"
        )}
      />
      <span className="text-muted-foreground">{label}</span>
      <span className="ml-auto font-mono text-xs tabular-nums">{value}</span>
    </div>
  );
}

export function StreamStatus({
  bytes,
  shownCount,
  total,
  gatedActions,
  streaming,
}: StreamStatusProps) {
  return (
    <div className="flex flex-col gap-2.5 px-4 py-4" aria-live="polite">
      <span className="locus-eyebrow">Stream</span>
      <StatusRow label="Spec" value={`${(bytes / 1024).toFixed(1)} kB`} done={!streaming} />
      <StatusRow label="Elements" value={`${shownCount} of ${total}`} done={!streaming} />
      <StatusRow label="Actions gated" value={String(gatedActions)} done />
    </div>
  );
}
