import { Alert, AlertDescription, AlertTitle, RuleGrid } from "@locusgraph/components";
import type { LocusRendererProps } from "./props";

const stackGap = { sm: "gap-3", md: "gap-6", lg: "gap-8" } as const;

export function LocusStack({ props, children }: LocusRendererProps<"Stack">) {
  return <div className={`flex flex-col ${stackGap[props.gap ?? "md"]}`}>{children}</div>;
}

export function LocusColumns({ props, children }: LocusRendererProps<"Columns">) {
  return <RuleGrid columns={props.count}>{children}</RuleGrid>;
}

export function LocusNotice({ props }: LocusRendererProps<"Notice">) {
  return (
    <Alert variant={props.tone}>
      <AlertTitle>{props.title}</AlertTitle>
      {props.description && <AlertDescription>{props.description}</AlertDescription>}
    </Alert>
  );
}
