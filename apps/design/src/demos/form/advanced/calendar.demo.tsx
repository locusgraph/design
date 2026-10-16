import { Calendar } from "@locusgraph/components";
import { useState } from "react";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

type BillingPeriod = { from: Date | undefined; to?: Date | undefined };

const modes = ["single", "range"] as const;
const captionLayouts = ["label", "dropdown"] as const;
const shownMonth = new Date(2026, 9, 1);

function Single() {
  const [renewal, setRenewal] = useState<Date | undefined>(new Date(2026, 9, 15));
  return (
    <div className="flex flex-col gap-2">
      <Calendar
        mode="single"
        selected={renewal}
        onSelect={setRenewal}
        defaultMonth={shownMonth}
        className="rounded-lg border"
      />
      <p className="text-sm text-muted-foreground">
        Renews on {renewal ? renewal.toLocaleDateString("en-US", { dateStyle: "medium" }) : "-"}
      </p>
    </div>
  );
}

function BillingRange() {
  const [period, setPeriod] = useState<BillingPeriod | undefined>({
    from: new Date(2026, 9, 1),
    to: new Date(2026, 9, 31),
  });
  return (
    <Calendar
      mode="range"
      selected={period}
      onSelect={setPeriod}
      defaultMonth={new Date(2026, 8, 1)}
      numberOfMonths={2}
      className="rounded-lg border"
    />
  );
}

function DisabledDays() {
  return (
    <Calendar
      mode="single"
      defaultMonth={shownMonth}
      disabled={[{ before: new Date(2026, 9, 10) }, { dayOfWeek: [0, 6] }]}
      className="rounded-lg border"
    />
  );
}

function YearDropdown() {
  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      defaultMonth={shownMonth}
      startMonth={new Date(2024, 0)}
      endMonth={new Date(2028, 11)}
      className="rounded-lg border"
    />
  );
}

export default defineDemo({
  title: "Calendar",
  isNew: true,
  description:
    "A month grid for picking a date or a range. Use it for renewal dates, billing periods and usage reports.",
  controls: {
    mode: select(modes),
    captionLayout: select(captionLayouts),
    showOutsideDays: toggle(true),
    showWeekNumber: toggle(),
  },
  playground: ({ mode, captionLayout, showOutsideDays, showWeekNumber }) =>
    mode === "single" ? (
      <Calendar
        key="single"
        mode="single"
        defaultMonth={shownMonth}
        captionLayout={captionLayout}
        showOutsideDays={showOutsideDays}
        showWeekNumber={showWeekNumber}
        className="rounded-lg border"
      />
    ) : (
      <Calendar
        key="range"
        mode="range"
        defaultMonth={shownMonth}
        captionLayout={captionLayout}
        showOutsideDays={showOutsideDays}
        showWeekNumber={showWeekNumber}
        className="rounded-lg border"
      />
    ),
  code: ({ mode, captionLayout, showOutsideDays, showWeekNumber }) =>
    `<Calendar\n  mode="${mode}"\n  selected={${mode === "single" ? "date" : "period"}}\n  onSelect={${mode === "single" ? "setDate" : "setPeriod"}}\n  defaultMonth={new Date(2026, 9, 1)}${formatProp("captionLayout", captionLayout, "label")}${formatProp("showOutsideDays", showOutsideDays, true)}${formatProp("showWeekNumber", showWeekNumber, false)}\n  className="rounded-lg border"\n/>`,
  props: [
    { name: "mode", type: "single | multiple | range" },
    { name: "selected / onSelect", type: "Date | Date[] | DateRange, by mode" },
    { name: "defaultMonth", type: "Date" },
    {
      name: "captionLayout",
      type: "label | dropdown | dropdown-months | dropdown-years",
      defaultValue: "label",
    },
    { name: "numberOfMonths", type: "number", defaultValue: "1" },
    { name: "disabled", type: "Matcher | Matcher[]" },
    { name: "showOutsideDays", type: "boolean", defaultValue: "true" },
    { name: "buttonVariant", type: "Button variant", defaultValue: "ghost" },
  ],
  examples: {
    Single: {
      description: "A controlled calendar that picks the plan's renewal date.",
      component: Single,
    },
    BillingRange: {
      description: "Range mode across two months selects a billing period.",
      component: BillingRange,
    },
    DisabledDays: {
      description: "Matchers block past dates and weekends.",
      component: DisabledDays,
    },
    YearDropdown: {
      description: "Dropdowns jump between months and years within set bounds.",
      component: YearDropdown,
    },
  },
});
