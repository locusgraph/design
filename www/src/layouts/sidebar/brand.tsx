import { ChevronLeft } from "lucide-react";
import { LogoIcon } from "@locus/components";

interface SidebarBrandProps {
  collapsed?: boolean;
  onCollapse?: () => void;
}

export function SidebarBrand({ collapsed = false, onCollapse }: SidebarBrandProps) {
  return (
    <div className="animated-dashed-border-bottom flex shrink-0 items-center gap-2 px-2 py-6">
      <LogoIcon className="size-4 shrink-0 text-foreground" aria-hidden />
      {!collapsed && (
        <>
          <span className="truncate text-base font-normal text-foreground">Locusgraph</span>
          {onCollapse && (
            <button
              type="button"
              onClick={onCollapse}
              className="ml-auto rounded-md p-1.5 text-primary-500 hover:bg-primary-800 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="size-4" />
            </button>
          )}
        </>
      )}
      {collapsed && onCollapse && (
        <button
          type="button"
          onClick={onCollapse}
          className="mx-auto rounded-md p-1.5 text-primary-500 hover:bg-primary-800 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Expand sidebar"
        >
          <ChevronLeft className="size-4 rotate-180" />
        </button>
      )}
    </div>
  );
}
