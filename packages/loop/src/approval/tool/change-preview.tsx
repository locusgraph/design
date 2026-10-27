import type { ApprovalChange } from "../types";
import { readableValue } from "./tool-inputs";

function ChangeValue({ change }: { change: ApprovalChange }) {
  const after = <ins className="font-medium no-underline">{readableValue(change.after)}</ins>;
  if (change.before === undefined) return after;
  return (
    <>
      <del className="text-faint">{readableValue(change.before)}</del>
      <span aria-hidden className="px-1.5 text-faint">
        →
      </span>
      <span className="sr-only"> becomes </span>
      {after}
    </>
  );
}

export function ChangePreview({ changes }: { changes: ApprovalChange[] }) {
  return (
    <div data-slot="change-preview" className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">What changes</p>
      <dl className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 gap-y-2 text-sm sm:grid-cols-[8rem_minmax(0,1fr)]">
        {changes.map((change) => (
          <div key={change.label} className="contents">
            <dt className="truncate text-muted-foreground">{change.label}</dt>
            <dd className="min-w-0 break-words">
              <ChangeValue change={change} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
