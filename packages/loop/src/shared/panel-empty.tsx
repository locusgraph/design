import { cn } from "@locusgraph/components";
import type { ComponentProps, ReactNode } from "react";

type PanelEmptyProps = Omit<ComponentProps<"div">, "title"> & {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
};

export function PanelEmpty({ icon, title, description, className, ...props }: PanelEmptyProps) {
  return (
    <div
      data-slot="panel-empty"
      {...props}
      className={cn(
        "flex flex-col items-center gap-1 px-6 pt-8 pb-10 text-center [&_svg]:mb-1 [&_svg]:size-5 [&_svg]:text-muted-foreground",
        className
      )}
    >
      {icon}
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="max-w-xs text-xs text-muted-foreground">{description}</p>}
    </div>
  );
}
