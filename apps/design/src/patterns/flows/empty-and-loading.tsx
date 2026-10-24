import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  SkeletonBar,
  SkeletonLoadingLabel,
  skeletonRootProps,
} from "@locusgraph/components";
import {
  Plus as AddIcon,
  Graph as GraphIcon,
  ArrowsClockwise as RetryIcon,
  Warning as WarningIcon,
} from "@phosphor-icons/react/ssr";
import { useId } from "react";

export type ListState = "loading" | "empty" | "ready" | "error";

export type GraphRow = { id: string; name: string; meta: string; nodes: string };

export type EmptyAndLoadingProps = {
  state?: ListState;
  rows?: GraphRow[];
  errorMessage?: string;
  onRetry?: () => void;
  onCreate?: () => void;
};

export const sampleGraphRows: GraphRow[] = [
  { id: "grf_01", name: "support-memory", meta: "Updated 4 minutes ago", nodes: "12,408" },
  { id: "grf_02", name: "billing-agent", meta: "Updated 2 hours ago", nodes: "3,912" },
  { id: "grf_03", name: "onboarding-faq", meta: "Updated yesterday", nodes: "861" },
  { id: "grf_04", name: "sales-notes", meta: "Updated 6 days ago", nodes: "214" },
];

const sampleErrorMessage =
  "The request timed out before the list came back. Check your connection, then retry.";

const loadingRowCount = 4;

function ListRows({ rows }: { rows: GraphRow[] }) {
  return (
    <ul className="divide-y">
      {rows.map((row) => (
        <li key={row.id} className="flex items-center gap-4 px-4 py-3">
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate font-mono text-sm">{row.name}</span>
            <span className="truncate text-sm text-muted-foreground">{row.meta}</span>
          </div>
          <span className="shrink-0 text-sm tabular-nums">{row.nodes} nodes</span>
        </li>
      ))}
    </ul>
  );
}

function LoadingRows() {
  return (
    <ul {...skeletonRootProps} className="divide-y">
      {Array.from({ length: loadingRowCount }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: placeholder rows have no identity
        <li key={index} className="flex items-center gap-4 px-4 py-3">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 py-0.5">
            <SkeletonBar className="h-4 w-36 max-w-full" />
            <SkeletonBar className="h-3.5 w-28 max-w-full" />
          </div>
          <SkeletonBar className="h-4 w-20 shrink-0" />
        </li>
      ))}
      <SkeletonLoadingLabel>Loading graphs…</SkeletonLoadingLabel>
    </ul>
  );
}

function EmptyList({ onCreate }: { onCreate?: () => void }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <GraphIcon weight="bold" aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>No graphs yet</EmptyTitle>
        <EmptyDescription>A graph stores what your agents learn, one per product.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={onCreate}>
          <AddIcon weight="bold" aria-hidden="true" />
          Create graph
        </Button>
      </EmptyContent>
    </Empty>
  );
}

function ErrorNotice({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="p-4">
      <Alert variant="destructive">
        <WarningIcon weight="bold" aria-hidden="true" />
        <AlertTitle>Graphs did not load</AlertTitle>
        <AlertDescription>
          <p>{message}</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={onRetry}>
            <RetryIcon weight="bold" aria-hidden="true" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}

function headerCount(state: ListState, rows: GraphRow[]) {
  if (state === "ready") return `${rows.length} graphs`;
  if (state === "empty") return "0 graphs";
  return null;
}

export function EmptyAndLoading({
  state = "ready",
  rows = sampleGraphRows,
  errorMessage = sampleErrorMessage,
  onRetry,
  onCreate,
}: EmptyAndLoadingProps) {
  const count = headerCount(state, rows);
  const titleId = useId();
  return (
    <section
      aria-labelledby={titleId}
      aria-busy={state === "loading"}
      className="flex w-full max-w-2xl flex-col bg-card text-card-foreground ring-1 ring-border"
    >
      <header className="flex min-h-11 items-center gap-3 border-b bg-muted/20 px-4 py-2.5">
        <h2 id={titleId} className="eyebrow">
          Graphs
        </h2>
        {count ? <span className="text-sm text-muted-foreground tabular-nums">{count}</span> : null}
      </header>
      {state === "loading" ? <LoadingRows /> : null}
      {state === "empty" ? <EmptyList onCreate={onCreate} /> : null}
      {state === "error" ? <ErrorNotice message={errorMessage} onRetry={onRetry} /> : null}
      {state === "ready" ? <ListRows rows={rows} /> : null}
    </section>
  );
}
