import {
  Badge,
  Button,
  Checkbox,
  Input,
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Slider,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@locusgraph/components";
import type * as React from "react";
import { GreySample } from "./grey-sample";

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6">
      <span className="eyebrow w-24 shrink-0">{label}</span>
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function StateSwatch({ label, color }: { label: string; color: string }) {
  return (
    <span className="flex flex-col items-center gap-1.5">
      <span className="h-8 w-16 rounded-full ring-1 ring-border" style={{ background: color }} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </span>
  );
}

export function ComponentsSample() {
  return (
    <div className="m-auto w-full max-w-160 divide-y bg-surface ring-1 ring-border">
      <PreviewRow label="Actions">
        <Button>Save changes</Button>
        <Button variant="outline">Cancel</Button>
        <Button variant="ghost">Skip</Button>
        <Badge>New</Badge>
      </PreviewRow>
      <PreviewRow label="States">
        <StateSwatch label="Rest" color="var(--btn)" />
        <StateSwatch label="Hover" color="var(--btn-hover)" />
        <StateSwatch label="Pressed" color="var(--btn-active)" />
        <StateSwatch label="Subtle" color="var(--btn-subtle)" />
      </PreviewRow>
      <PreviewRow label="Greys">
        <GreySample />
      </PreviewRow>
      <PreviewRow label="Choice">
        <Label className="gap-2">
          <Checkbox defaultChecked /> Email me
        </Label>
        <Label className="gap-2">
          <Switch defaultChecked /> Alerts
        </Label>
        <RadioGroup defaultValue="month" className="flex gap-4">
          <Label className="gap-2">
            <RadioGroupItem value="month" /> Monthly
          </Label>
          <Label className="gap-2">
            <RadioGroupItem value="year" /> Yearly
          </Label>
        </RadioGroup>
      </PreviewRow>
      <PreviewRow label="Input">
        <Input placeholder="Tab here to see the ring" className="max-w-64" />
        <Tabs defaultValue="usage">
          <TabsList>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
        </Tabs>
      </PreviewRow>
      <PreviewRow label="Progress">
        <Progress value={62} className="max-w-64" />
        <Slider defaultValue={[40]} max={100} className="max-w-48" />
      </PreviewRow>
    </div>
  );
}
