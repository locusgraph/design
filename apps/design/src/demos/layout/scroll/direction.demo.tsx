import {
  DirectionProvider,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ToggleGroup,
  ToggleGroupItem,
} from "@locusgraph/components";
import { defineDemo, select } from "../../../registry/define-demo";

function PlanTabs() {
  return (
    <Tabs defaultValue="monthly" className="w-64">
      <TabsList>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="yearly">Yearly</TabsTrigger>
        <TabsTrigger value="custom">Custom</TabsTrigger>
      </TabsList>
      <TabsContent value="monthly" className="text-sm">
        <bdi>Pro plan, $24 per seat.</bdi>
      </TabsContent>
      <TabsContent value="yearly" className="text-sm">
        <bdi>Pro plan, $20 per seat.</bdi>
      </TabsContent>
      <TabsContent value="custom" className="text-sm">
        <bdi>Talk to sales.</bdi>
      </TabsContent>
    </Tabs>
  );
}

function Comparison() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="locus-eyebrow">ltr</span>
        <DirectionProvider dir="ltr">
          <div dir="ltr">
            <PlanTabs />
          </div>
        </DirectionProvider>
      </div>
      <div className="flex flex-col gap-2">
        <span className="locus-eyebrow">rtl</span>
        <DirectionProvider dir="rtl">
          <div dir="rtl">
            <PlanTabs />
          </div>
        </DirectionProvider>
      </div>
    </div>
  );
}

function ArabicLabels() {
  return (
    <DirectionProvider dir="rtl">
      <div dir="rtl" className="flex flex-col gap-2">
        <span className="text-sm font-medium">الفوترة</span>
        <ToggleGroup type="single" variant="outline" defaultValue="month">
          <ToggleGroupItem value="month">شهري</ToggleGroupItem>
          <ToggleGroupItem value="year">سنوي</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </DirectionProvider>
  );
}

export default defineDemo({
  title: "Direction",
  isNew: true,
  description:
    "Sets the reading direction for every component inside it. Use rtl for right-to-left languages such as Arabic and Hebrew.",
  controls: { dir: select(["rtl", "ltr"]) },
  playground: ({ dir }) => (
    <DirectionProvider key={dir} dir={dir}>
      <div dir={dir}>
        <PlanTabs />
      </div>
    </DirectionProvider>
  ),
  code: ({ dir }) =>
    `<DirectionProvider dir="${dir}">\n  <div dir="${dir}">\n    <Tabs defaultValue="monthly">\n      <TabsList>\n        <TabsTrigger value="monthly">Monthly</TabsTrigger>\n        <TabsTrigger value="yearly">Yearly</TabsTrigger>\n      </TabsList>\n    </Tabs>\n  </div>\n</DirectionProvider>`,
  props: [
    { name: "dir", type: "ltr | rtl" },
    { name: "direction", type: "ltr | rtl (alias of dir)" },
    { name: "useDirection()", type: "returns the current ltr | rtl" },
  ],
  examples: {
    Comparison: {
      description: "The same tabs in ltr and rtl. Keyboard arrows follow the direction too.",
      component: Comparison,
    },
    ArabicLabels: {
      description: "A billing period toggle with Arabic labels, read right to left.",
      component: ArabicLabels,
    },
  },
});
