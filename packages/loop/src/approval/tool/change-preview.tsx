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
    <div data-slot="change-preview" className="@container flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">What changes</p>
      <dl className="flex flex-col gap-3 text-sm @sm:grid @sm:grid-cols-[8rem_minmax(0,1fr)] @sm:gap-x-4 @sm:gap-y-2">
        {changes.map((change) => (
          <div key={change.label} className="flex flex-col gap-0.5 @sm:contents">
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
