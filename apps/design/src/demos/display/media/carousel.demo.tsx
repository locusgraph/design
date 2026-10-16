import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@locusgraph/components";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const plans = [
  { name: "Free", price: "$0", detail: "1 seat, 1k agent runs" },
  { name: "Starter", price: "$19", detail: "5 seats, 10k agent runs" },
  { name: "Pro", price: "$49", detail: "20 seats, 100k agent runs" },
  { name: "Business", price: "$199", detail: "100 seats, 1M agent runs" },
  { name: "Enterprise", price: "Custom", detail: "SSO, audit log, SLA" },
];

const itemBasis = { full: "basis-full", half: "basis-1/2", third: "basis-1/3" } as const;

function PlanSlide({ plan }: { plan: (typeof plans)[number] }) {
  return (
    <div className="flex aspect-square flex-col items-center justify-center gap-1 border bg-card p-6">
      <span className="text-sm text-muted-foreground">{plan.name}</span>
      <span className="text-3xl font-semibold">{plan.price}</span>
      <span className="text-center text-xs text-muted-foreground">{plan.detail}</span>
    </div>
  );
}

function Basic() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {plans.map((plan) => (
          <CarouselItem key={plan.name}>
            <PlanSlide plan={plan} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function MultipleItems() {
  return (
    <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
      <CarouselContent>
        {plans.map((plan) => (
          <CarouselItem key={plan.name} className="basis-1/2">
            <PlanSlide plan={plan} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function Vertical() {
  return (
    <Carousel orientation="vertical" opts={{ align: "start" }} className="my-12 w-full max-w-xs">
      <CarouselContent className="-mt-1 h-48">
        {plans.map((plan) => (
          <CarouselItem key={plan.name} className="basis-1/2 pt-1">
            <div className="flex items-center justify-between border bg-card p-4">
              <span className="font-medium">{plan.name}</span>
              <span className="text-muted-foreground">{plan.price}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default defineDemo({
  title: "Carousel",
  isNew: true,
  description:
    "A row of slides the user can swipe, drag or step through with buttons and arrow keys. Built on Embla.",
  controls: {
    perView: select(["full", "half", "third"]),
    loop: toggle(),
  },
  playground: ({ perView, loop }) => (
    <Carousel key={String(loop)} opts={{ align: "start", loop }} className="w-full max-w-xs">
      <CarouselContent>
        {plans.map((plan) => (
          <CarouselItem key={plan.name} className={itemBasis[perView]}>
            <PlanSlide plan={plan} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  code: ({ perView, loop }) =>
    `<Carousel opts={{ align: "start"${loop ? ", loop: true" : ""} }}>\n  <CarouselContent>\n    {plans.map((plan) => (\n      <CarouselItem key={plan.name}${formatProp("className", itemBasis[perView], "basis-full")}>\n        <PlanSlide plan={plan} />\n      </CarouselItem>\n    ))}\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>`,
  props: [
    { name: "orientation", type: "horizontal | vertical", defaultValue: "horizontal" },
    { name: "opts", type: "EmblaOptionsType" },
    { name: "plugins", type: "EmblaPluginType[]" },
    { name: "setApi", type: "(api: CarouselApi) => void" },
    { name: "CarouselPrevious / CarouselNext", type: "ComponentProps<typeof Button>" },
  ],
  examples: {
    Basic: { description: "One plan per slide with previous and next buttons.", component: Basic },
    MultipleItems: {
      description: "A basis class on each item shows two slides at once.",
      component: MultipleItems,
    },
    Vertical: {
      description: "A vertical carousel scrolls slides up and down.",
      component: Vertical,
    },
  },
  composition: {
    name: "Carousel",
    children: [
      { name: "CarouselContent", children: [{ name: "CarouselItem" }, { name: "CarouselItem" }] },
      { name: "CarouselPrevious" },
      { name: "CarouselNext" },
    ],
  },
});
