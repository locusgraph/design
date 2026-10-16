import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as Slot from "radix-ui/slot";
import * as React from "react";

const ruleGridVariants = cva("grid grid-cols-1 gap-px p-px", {
  variants: {
    columns: {
      1: "",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-2 lg:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 3,
  },
});

function RuleGrid({
  className,
  columns = 3,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof ruleGridVariants>) {
  return (
    <div
      data-slot="rule-grid"
      data-columns={columns}
      className={cn(ruleGridVariants({ columns, className }))}
      {...props}
    />
  );
}

function RuleGridCell({
  className,
  asChild = false,
  interactive = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
  interactive?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="rule-grid-cell"
      data-interactive={interactive || undefined}
      className={cn(
        "flex min-w-0 flex-col gap-2 bg-card p-6 text-card-foreground ring-1 ring-border",
        interactive &&
          "transition-colors duration-150 ease-out outline-none hover:bg-accent/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring active:bg-accent",
        className
      )}
      {...props}
    />
  );
}

function RuleGridLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="rule-grid-label"
      className={cn("font-mono text-[11.5px] text-muted-foreground", className)}
      {...props}
    />
  );
}

function RuleGridTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="rule-grid-title"
      className={cn("text-[15px] font-medium tracking-[-0.01em]", className)}
      {...props}
    />
  );
}

function RuleGridDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="rule-grid-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  RuleGrid,
  RuleGridCell,
  RuleGridDescription,
  RuleGridLabel,
  RuleGridTitle,
  ruleGridVariants,
};
