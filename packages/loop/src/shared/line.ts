export const lineRowClass =
  "flex min-h-control-sm w-fit max-w-full items-center gap-2 text-left text-sm text-muted-foreground";

export const lineTriggerClass = `group ${lineRowClass} locus-focus-ring transition-colors duration-150 hover:text-foreground motion-reduce:transition-none`;

const lineIconFrame = "flex size-4 shrink-0 items-center justify-center [&_svg]:size-3.5";

export const lineIconClass = `${lineIconFrame} text-faint`;

export const lineMemoryIconClass = `${lineIconFrame} text-memory`;

export const lineObjectClass = "font-medium text-foreground";

export const lineMemoryObjectClass = "font-medium text-memory";

export const lineChevronClass =
  "size-3 shrink-0 text-faint opacity-0 transition-[opacity,transform] duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-100 [@media(hover:none)]:opacity-100 motion-reduce:transition-none";

export const lineDetailClass = "min-w-0 pl-6 text-sm";

export const lineDetailRowClass =
  "flex w-full min-w-0 py-1 text-left outline-none transition-colors duration-150 motion-reduce:transition-none";

export const lineDetailLinkClass = "hover:text-interactive locus-focus-ring";
