import { Label, Slider } from "@locusgraph/components";
import { useState } from "react";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const steps = ["1", "5", "10", "25"] as const;
const orientations = ["horizontal", "vertical"] as const;

function SeatCount() {
  const [seats, setSeats] = useState([12]);
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="seats" className="font-normal text-muted-foreground">
          Seats
        </Label>
        <span className="text-sm font-medium tabular-nums">
          {seats[0]} seats, ${(seats[0] ?? 0) * 8}/mo
        </span>
      </div>
      <Slider
        id="seats"
        aria-label="Seats"
        value={seats}
        onValueChange={setSeats}
        min={1}
        max={50}
      />
    </div>
  );
}

function Range() {
  const [range, setRange] = useState([20, 80]);
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center justify-between">
        <Label className="font-normal text-muted-foreground">Alert between</Label>
        <span className="text-sm font-medium tabular-nums">
          {range[0]}% and {range[1]}% of quota
        </span>
      </div>
      <Slider
        value={range}
        onValueChange={setRange}
        step={5}
        minStepsBetweenThumbs={2}
        thumbLabels={["Alert from", "Alert up to"]}
      />
    </div>
  );
}

function Vertical() {
  return (
    <div className="flex h-44 items-center gap-8">
      <Slider defaultValue={[40]} orientation="vertical" aria-label="Spend cap" />
      <Slider defaultValue={[25, 75]} orientation="vertical" aria-label="Usage window" />
    </div>
  );
}

function Disabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Label className="text-muted-foreground">Spend cap (set by your plan)</Label>
      <Slider defaultValue={[60]} disabled aria-label="Locked spend cap" />
    </div>
  );
}

export default defineDemo({
  title: "Slider",
  isNew: true,
  description:
    "Pick a number or a range by dragging along a track. Good for seat counts, spend caps and alert thresholds.",
  controls: {
    step: select(steps),
    orientation: select(orientations),
    range: toggle(),
    disabled: toggle(),
  },
  playground: ({ step, orientation, range, disabled }) => (
    <div className={orientation === "vertical" ? "flex h-44" : "w-72"}>
      <Slider
        key={`${orientation}-${range}`}
        defaultValue={range ? [25, 75] : [50]}
        step={Number(step)}
        orientation={orientation}
        disabled={disabled}
        aria-label="Spend cap"
      />
    </div>
  ),
  code: ({ step, orientation, range, disabled }) =>
    `<Slider defaultValue={${range ? "[25, 75]" : "[50]"}} max={100}${step === "1" ? "" : ` step={${step}}`}${formatProp("orientation", orientation, "horizontal")}${formatProp("disabled", disabled, false)} />`,
  props: [
    { name: "value / onValueChange", type: "controlled number[]" },
    { name: "defaultValue", type: "number[]" },
    { name: "min", type: "number", defaultValue: "0" },
    { name: "max", type: "number", defaultValue: "100" },
    { name: "step", type: "number", defaultValue: "1" },
    { name: "orientation", type: "horizontal | vertical", defaultValue: "horizontal" },
    { name: "minStepsBetweenThumbs", type: "number", defaultValue: "0" },
    { name: "disabled", type: "boolean", defaultValue: "false" },
    { name: "aria-label", type: "string" },
    { name: "thumbLabels", type: "string[]" },
  ],
  examples: {
    SeatCount: {
      description: "A controlled slider that prices the seat count as it moves.",
      component: SeatCount,
    },
    Range: {
      description: "Two values make two thumbs, here a low and high usage alert.",
      component: Range,
    },
    Vertical: {
      description: "orientation turns the track upright, for one or two thumbs.",
      component: Vertical,
    },
    Disabled: {
      description: "A disabled slider shows a limit set by the plan.",
      component: Disabled,
    },
  },
});
