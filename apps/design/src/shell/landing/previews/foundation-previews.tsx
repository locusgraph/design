import { LocusGraphMark } from "@locusgraph/brand";
import { Badge, Button, Input, SkeletonAvatar, SkeletonText, Switch } from "@locusgraph/components";
import { Pulse } from "@locusgraph/loop";

export function ComponentsPreview() {
  return (
    <div className="flex w-full max-w-60 flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button size="sm">Upgrade</Button>
        <Button size="sm" variant="outline">
          Cancel
        </Button>
      </div>
      <Input placeholder="Search keys" aria-label="Search keys" />
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="flex items-center gap-2">
          <Switch defaultChecked aria-label="Usage alerts" />
          Usage alerts
        </span>
        <Badge variant="success">Active</Badge>
      </div>
    </div>
  );
}

export function BrandPreview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <LocusGraphMark className="h-14 w-auto" />
      <Pulse variant="locus" label="Walking the graph…" />
    </div>
  );
}

const sidebarLines = ["w-16", "w-20", "w-14", "w-18"];

export function ShellsPreview() {
  return (
    <div aria-hidden className="flex h-36 w-full max-w-64 ring-1 ring-border">
      <div className="flex w-20 flex-col gap-2 border-r p-3">
        <span className="size-3 rotate-45 bg-foreground" />
        {sidebarLines.map((width, index) => (
          <span
            key={width}
            className={`h-1.5 ${width} max-w-full ${index === 1 ? "bg-foreground/60" : "bg-skeleton"}`}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex h-7 items-center justify-end gap-1.5 border-b px-3">
          <span className="size-2.5 rounded-full bg-skeleton" />
          <span className="h-1.5 w-8 bg-skeleton" />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <span className="h-2 w-20 bg-foreground/60" />
          <span className="h-1.5 w-full bg-skeleton" />
          <span className="h-1.5 w-3/4 bg-skeleton" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonsPreview() {
  return (
    <div className="flex w-full max-w-64 items-start gap-3">
      <SkeletonAvatar />
      <SkeletonText lines={3} className="flex-1" />
    </div>
  );
}

const designIndexLines = [
  { text: "# Locus Design", tone: "text-foreground" },
  { text: "## Loop (@locusgraph/loop)", tone: "text-foreground/80" },
  { text: "- [Approval](…/approval.md)", tone: "text-muted-foreground" },
  { text: "- [Question](…/question.md)", tone: "text-muted-foreground" },
  { text: "- [Composer](…/composer.md)", tone: "text-muted-foreground" },
];

export function AgentsPreview() {
  return (
    <div aria-hidden className="flex w-full max-w-72 flex-col gap-2 font-mono text-xs">
      <span className="locus-eyebrow">GET /DESIGN.md</span>
      <div className="flex flex-col gap-1 bg-muted/40 px-3 py-2.5">
        {designIndexLines.map((line) => (
          <span key={line.text} className={`truncate ${line.tone}`}>
            {line.text}
          </span>
        ))}
      </div>
    </div>
  );
}
