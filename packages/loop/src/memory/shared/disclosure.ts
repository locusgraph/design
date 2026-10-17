export const eyebrowClass = "locus-eyebrow [&_svg]:size-3.5 [&_svg]:shrink-0";

export const collapsibleTriggerClass = `group inline-flex w-fit items-center gap-2 py-1 outline-none transition-colors duration-150 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/70 motion-reduce:transition-none ${eyebrowClass}`;

export const chevronClass =
  "opacity-70 transition-transform duration-150 group-data-[state=open]:rotate-90 motion-reduce:transition-none";

export const ruledRowClass = "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm";

export const ruledListClass = "flex flex-col divide-y divide-border bg-card ring-1 ring-border";

export const interactiveRowClass =
  "outline-none transition-colors duration-150 hover:bg-accent/50 focus-visible:bg-accent motion-reduce:transition-none";
