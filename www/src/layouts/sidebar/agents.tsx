import { ChevronDown } from "lucide-react";

interface SidebarAgentsProps {
  label: string;
  avatar?: string;
}

export function SidebarAgents({ label, avatar }: SidebarAgentsProps) {
  return (
    <div className="animated-dashed-border-bottom flex items-center gap-2 px-2 py-4">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-700 text-xs font-medium text-primary-foreground">
        {avatar ?? label.charAt(0).toUpperCase()}
      </div>
      <span className="min-w-0 flex-1 truncate text-sm text-foreground">{label}</span>
      <button
        type="button"
        className="shrink-0 rounded p-0.5 text-primary-500 hover:bg-primary-800 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Switch workspace"
      >
        <ChevronDown className="size-4" />
      </button>
    </div>
  );
}
