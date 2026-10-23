import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Field,
  FieldLabel,
  Input,
} from "@locusgraph/components";
import {
  Graph as NodesIcon,
  Trash as TrashIcon,
  ArrowUUpLeft as UndoIcon,
} from "@phosphor-icons/react/ssr";
import { useEffect, useId, useState } from "react";

export type DeleteRemoval = { label: string; count: number };

export type DeleteTarget = {
  name: string;
  meta: string;
  count: number;
  noun: string;
  removals: DeleteRemoval[];
};

export type DeleteConfirmProps = {
  target?: DeleteTarget;
  requireTyping?: boolean;
  undoable?: boolean;
  undoSeconds?: number;
  onDelete?: (target: DeleteTarget) => void;
  onUndo?: (target: DeleteTarget) => void;
};

export const sampleDeleteTarget: DeleteTarget = {
  name: "stale-invoices",
  meta: "3 nodes · 14 edges · last read 41 days ago",
  count: 3,
  noun: "node",
  removals: [
    { label: "nodes in this set", count: 3 },
    { label: "edges connected to them", count: 14 },
    { label: "saved queries that read them", count: 2 },
  ],
};

function countedNoun(count: number, noun: string) {
  return `${count} ${count === 1 ? noun : `${noun}s`}`;
}

function DeletedNotice({
  name,
  summary,
  undoSeconds,
  onUndo,
}: {
  name: string;
  summary: string;
  undoSeconds: number;
  onUndo: () => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(undoSeconds);
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);
  const canUndo = secondsLeft > 0;
  return (
    <div className="flex w-full max-w-xl flex-wrap items-center gap-x-3 gap-y-2 bg-card px-4 py-3 text-sm ring-1 ring-border">
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-destructive" />
      <span role="status" className="min-w-0 flex-1 text-muted-foreground">
        {summary} from <span className="font-mono text-foreground">{name}</span>.
      </span>
      {canUndo ? (
        <Button variant="outline" size="sm" onClick={onUndo}>
          <UndoIcon weight="bold" aria-hidden="true" />
          Undo
          <span className="text-muted-foreground tabular-nums">{secondsLeft}s</span>
        </Button>
      ) : null}
    </div>
  );
}

export function DeleteConfirm({
  target = sampleDeleteTarget,
  requireTyping = false,
  undoable = false,
  undoSeconds = 5,
  onDelete,
  onUndo,
}: DeleteConfirmProps) {
  const fieldId = useId();
  const [deleted, setDeleted] = useState(false);
  const [typedName, setTypedName] = useState("");
  const actionLabel = `Delete ${countedNoun(target.count, target.noun)}`;
  const canConfirm = !requireTyping || typedName === target.name;

  function restore() {
    setDeleted(false);
    onUndo?.(target);
  }

  function confirmDelete() {
    setDeleted(true);
    setTypedName("");
    onDelete?.(target);
  }

  if (deleted) {
    return (
      <DeletedNotice
        name={target.name}
        summary={`Deleted ${countedNoun(target.count, target.noun)}`}
        undoSeconds={undoable ? undoSeconds : 0}
        onUndo={restore}
      />
    );
  }

  return (
    <div className="flex w-full max-w-xl flex-wrap items-center gap-x-4 gap-y-3 bg-card px-4 py-3 text-card-foreground ring-1 ring-border">
      <NodesIcon
        weight="bold"
        aria-hidden="true"
        className="size-5 shrink-0 text-muted-foreground"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-mono text-sm">{target.name}</span>
        <span className="truncate text-sm text-muted-foreground">{target.meta}</span>
      </div>
      <AlertDialog onOpenChange={(open) => open || setTypedName("")}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <TrashIcon weight="bold" aria-hidden="true" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {target.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              {undoable
                ? `This removes everything below. You can undo for ${undoSeconds} seconds, then it is gone for good.`
                : "This removes everything below for good. It cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <ul className="divide-y text-sm ring-1 ring-border">
            {target.removals.map((removal) => (
              <li key={removal.label} className="flex items-baseline gap-3 px-3 py-2">
                <span className="w-8 text-right font-mono tabular-nums">{removal.count}</span>
                <span className="text-muted-foreground">{removal.label}</span>
              </li>
            ))}
          </ul>
          {requireTyping ? (
            <Field>
              <FieldLabel htmlFor={`${fieldId}-confirmation`}>
                Type <span className="font-mono">{target.name}</span> to confirm
              </FieldLabel>
              <Input
                id={`${fieldId}-confirmation`}
                autoComplete="off"
                spellCheck={false}
                value={typedName}
                onChange={(event) => setTypedName(event.target.value)}
              />
            </Field>
          ) : null}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" disabled={!canConfirm} onClick={confirmDelete}>
              {actionLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
