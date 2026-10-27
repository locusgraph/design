"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as TabsPrimitive from "radix-ui/tabs";
import * as React from "react";
import { cn } from "../cn";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "group/tabs flex gap-4 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:gap-6",
        className
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-control group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-muted group-data-[orientation=vertical]/tabs:rounded-none group-data-[orientation=vertical]/tabs:bg-transparent group-data-[orientation=vertical]/tabs:p-0",
        line: "gap-1 bg-transparent group-data-[orientation=horizontal]/tabs:border-b group-data-[orientation=horizontal]/tabs:border-border group-data-[orientation=vertical]/tabs:border-r group-data-[orientation=vertical]/tabs:border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 group-data-[variant=default]/tabs-list:rounded-full group-data-[orientation=vertical]/tabs:group-data-[variant=default]/tabs-list:data-[state=active]:border-transparent group-data-[orientation=vertical]/tabs:group-data-[variant=default]/tabs-list:data-[state=active]:bg-muted group-data-[orientation=vertical]/tabs:group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none dark:group-data-[orientation=vertical]/tabs:group-data-[variant=default]/tabs-list:data-[state=active]:bg-muted items-center justify-center gap-1.5 border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-[color,background-color,border-color,box-shadow] duration-150 ease-out group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground locus-focus-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent group-data-[orientation=vertical]/tabs:group-data-[variant=line]/tabs-list:data-[state=active]:bg-accent",
        "data-[state=active]:text-foreground group-data-[variant=default]/tabs-list:data-[state=active]:border-input group-data-[variant=default]/tabs-list:data-[state=active]:bg-background dark:group-data-[variant=default]/tabs-list:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground",
        "after:absolute after:inset-x-0 after:bottom-[-4px] after:h-0.5 after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 locus-focus-ring-inset", className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants };
