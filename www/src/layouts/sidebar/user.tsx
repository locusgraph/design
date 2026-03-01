import { ChevronsUpDown, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@locus/components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@locus/components";
import { useAuth } from "@/lib/hooks/use-auth";
import { useAuthStore } from "@/lib/store/auth";
import { cn } from "@locus/components";

interface SidebarUserProps {
  collapsed?: boolean;
}

export function SidebarUser({ collapsed = false }: SidebarUserProps) {
  const { logout } = useAuth();
  const user = useAuthStore((s) => s.user);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const displayName = user?.name || user?.email || "Not signed in";

  const handleLogout = () => {
    setPopoverOpen(false);
    logout();
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full rounded-sm px-2",
            collapsed ? "min-w-0 justify-center" : "justify-between",
          )}
        >
          <span className="flex min-w-0 items-center gap-2 overflow-hidden">
            <User className="size-4 shrink-0 text-primary-500" aria-hidden />
            {!collapsed && (
              <span className="min-w-0 truncate text-xs">
                {displayName}
              </span>
            )}
          </span>
          {!collapsed && (
            <ChevronsUpDown
              className="size-4 shrink-0 text-muted-foreground opacity-60"
              aria-hidden
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 p-0" sideOffset={4}>
        {user && (
          <div className="p-3 text-sm">
            <p className="font-medium truncate">{user.name || "User"}</p>
            <p className="text-muted-foreground text-xs truncate">{user.email}</p>
          </div>
        )}
        <div className="animated-dashed-border-top p-1">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
          >
            <LogOut className="size-4 shrink-0" />
            <span>Log out</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
