import { cn } from "@locus/components";
import { SidebarBrand } from "./brand";
import { SidebarNav } from "./nav";
import { SidebarUser } from "./user";

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: () => void;
  workspaceLabel?: string;
  workspaceAvatar?: string;
}

export default function Sidebar({ collapsed = false, onCollapse }: SidebarProps) {
  return (
    <div
      data-layout-sidebar
      className={cn(
        "sticky top-0 h-screen shrink-0 flex-col transition-[width]",
        collapsed ? "w-16" : "w-56",
      )}
    >
      <div data-slot="sidebar-container" className="flex h-full flex-col">
        <SidebarBrand collapsed={collapsed} onCollapse={onCollapse} />
        <SidebarNav collapsed={collapsed} />
        <div className="animated-dashed-border-top px-2 py-2">
          <SidebarUser collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
}
