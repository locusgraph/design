import { RuleGrid, RuleGridCell, Skeleton } from "@locusgraph/components";
import { defineDemo, select } from "../../../registry/define-demo";

const shapes = ["line", "circle", "block"] as const;

const shapeClasses = {
  line: "h-4 w-64",
  circle: "size-12 rounded-full",
  block: "h-32 w-64",
} as const;

function MemberRow() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}

function PlanPanel() {
  return (
    <RuleGrid columns={1} className="w-80">
      <RuleGridCell className="gap-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-9 w-full rounded-full" />
      </RuleGridCell>
    </RuleGrid>
  );
}

function TableRows() {
  return (
    <div className="w-80 space-y-3">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}

export default defineDemo({
  title: "Skeleton",
  description:
    "A pulsing placeholder shown while content loads. Match its shape to the content it stands in for.",
  controls: { shape: select(shapes) },
  playground: ({ shape }) => <Skeleton className={shapeClasses[shape]} />,
  code: ({ shape }) => `<Skeleton className="${shapeClasses[shape]}" />`,
  props: [
    { name: "className", type: "string" },
    { name: "...props", type: 'ComponentProps<"div">' },
  ],
  examples: {
    MemberRow: {
      description: "An avatar and two lines while the member list loads.",
      component: MemberRow,
    },
    PlanPanel: { description: "A placeholder for the current plan panel.", component: PlanPanel },
    TableRows: { description: "Rows that stand in for an invoice table.", component: TableRows },
  },
});
