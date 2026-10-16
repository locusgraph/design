import { LocusGraphMark } from "@locusgraph/brand";
import { Badge, Button, Input, Switch } from "@locusgraph/components";
import { Pulse } from "@locusgraph/loop";

const swatches = [
  "bg-s1",
  "bg-s2",
  "bg-s3",
  "bg-good",
  "bg-warn",
  "bg-destructive",
  "bg-foreground",
];

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

export function ColorsPreview() {
  return (
    <div aria-hidden className="flex h-28 items-end gap-2">
      {swatches.map((swatch, index) => (
        <span
          key={swatch}
          className={`w-4 ${swatch}`}
          style={{ height: `${40 + ((index * 23) % 60)}%` }}
        />
      ))}
    </div>
  );
}

export function TypePreview() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <span className="font-heading text-3xl font-semibold tracking-[-0.03em]">Archivo</span>
      <span className="text-lg">Inter for every word you read</span>
      <span className="font-mono text-sm text-muted-foreground">Fira Code · $0.0283</span>
    </div>
  );
}

export function PatternsPreview() {
  return (
    <div className="brand-grid flex h-36 w-full items-center justify-center ring-1 ring-border">
      <span className="eyebrow bg-background px-2">brand-grid</span>
    </div>
  );
}
