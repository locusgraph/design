import {
  AlertTriangle,
  Bell,
  Box,
  Check,
  ChevronDown,
  Circle,
  CircleUser,
  Code,
  Edit3,
  Layers,
  LayoutGrid,
  List,
  ListOrdered,
  MessageSquare,
  Minus,
  MoveVertical,
  Palette,
  PanelTop,
  Square,
  SquareStack,
  Sun,
  ToggleLeft,
  Type,
} from "lucide-react";
import { useLocation } from "react-router";
import { NavigationLink } from "@locus/components";

const SECTIONS = [
  { id: "theme", label: "Theme", icon: Sun },
  { id: "color-palette", label: "Color palette", icon: Palette },
  { id: "typography", label: "Typography", icon: Type },
  { id: "spacing", label: "Spacing", icon: MoveVertical },
  { id: "border-radius", label: "Border radius", icon: Box },
  { id: "shadows", label: "Shadows", icon: Layers },
] as const;

const UI_COMPONENTS = [
  { id: "button", label: "Button", icon: Square },
  { id: "pill-button", label: "Pill Button", icon: Circle },
  { id: "input", label: "Input", icon: Edit3 },
  { id: "card", label: "Card", icon: LayoutGrid },
  { id: "badge", label: "Badge", icon: SquareStack },
  { id: "skeleton", label: "Skeleton", icon: LayoutGrid },
  { id: "separator", label: "Separator", icon: Minus },
  { id: "table", label: "Table", icon: List },
  { id: "tooltip", label: "Tooltip", icon: MessageSquare },
  { id: "popover", label: "Popover", icon: PanelTop },
  { id: "dialog", label: "Dialog", icon: PanelTop },
  { id: "alert-dialog", label: "Alert Dialog", icon: AlertTriangle },
  { id: "dropdown-menu", label: "Dropdown Menu", icon: ChevronDown },
  { id: "select", label: "Select", icon: ChevronDown },
  { id: "textarea", label: "Textarea", icon: Edit3 },
  { id: "checkbox", label: "Checkbox", icon: Check },
  { id: "switch", label: "Switch", icon: ToggleLeft },
  { id: "toast", label: "Toast", icon: Bell },
  { id: "avatar", label: "Avatar", icon: CircleUser },
  { id: "stepper", label: "Stepper", icon: ListOrdered },
  { id: "content-viewer", label: "Content Viewer", icon: Code },
] as const;

interface SidebarNavProps {
  collapsed?: boolean;
}

export function SidebarNav({ collapsed = false }: SidebarNavProps) {
  const location = useLocation();

  return (
    <nav className="flex-1 overflow-y-auto py-2" aria-label="Branding sections">
      {/* Design System */}
      {!collapsed && (
        <div className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Design System
        </div>
      )}
      {SECTIONS.map(({ id, label, icon: Icon }) => {
        const path = `/${id}`;
        const isActive = location.pathname === path;
        return (
          <NavigationLink key={id} url={path} active={isActive}>
            <Icon className="size-4 shrink-0" aria-hidden />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavigationLink>
        );
      })}

      {/* UI Components */}
      {!collapsed && (
        <div className="mt-4 px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          UI Components
        </div>
      )}
      {UI_COMPONENTS.map(({ id, label, icon: Icon }) => {
        const path = `/${id}`;
        const isActive = location.pathname === path;
        return (
          <NavigationLink key={id} url={path} active={isActive}>
            <Icon className="size-4 shrink-0" aria-hidden />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavigationLink>
        );
      })}
    </nav>
  );
}
