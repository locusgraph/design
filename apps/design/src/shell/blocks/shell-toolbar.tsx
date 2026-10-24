import {
  Button,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@locusgraph/components";
import type { Icon as IconType } from "@phosphor-icons/react";
import {
  ArrowSquareOut as ExternalLinkIcon,
  ArrowsOut as MaximizeIcon,
  Monitor as MonitorIcon,
  ArrowClockwise as RotateCwIcon,
  DeviceMobile as SmartphoneIcon,
  DeviceTablet as TabletIcon,
} from "@phosphor-icons/react/ssr";
import type * as React from "react";

export type ShellView = "preview" | "layout" | "code";
export type ShellViewport = "desktop" | "tablet" | "mobile";

type ShellToolbarProps = {
  title: string;
  description: string;
  view: ShellView;
  viewport: ShellViewport;
  frameUrl: string;
  onViewChange: (view: ShellView) => void;
  onViewportChange: (viewport: ShellViewport) => void;
  onReload: () => void;
  onFullscreen: () => void;
};

const viewports: { value: ShellViewport; label: string; icon: IconType }[] = [
  { value: "desktop", label: "Desktop", icon: MonitorIcon },
  { value: "tablet", label: "Tablet", icon: TabletIcon },
  { value: "mobile", label: "Mobile", icon: SmartphoneIcon },
];

function IconAction({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function ShellToolbar(props: ShellToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tabs value={props.view} onValueChange={(value) => props.onViewChange(value as ShellView)}>
        <TabsList className="h-control-sm">
          <TabsTrigger value="preview" className="text-xs">
            Preview
          </TabsTrigger>
          <TabsTrigger value="layout" className="text-xs">
            Layout
          </TabsTrigger>
          <TabsTrigger value="code" className="text-xs">
            Code
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Separator orientation="vertical" className="mx-1 h-4" />
      <p className="shrink-0 text-sm font-medium">{props.title}</p>
      <p
        title={props.description}
        className="hidden min-w-0 flex-1 basis-0 truncate text-sm text-muted-foreground xl:block"
      >
        {props.description}
      </p>
      <div className="ml-auto flex h-control-sm items-center gap-1 border p-0.5">
        <ToggleGroup
          type="single"
          size="sm"
          spacing={1}
          value={props.viewport}
          onValueChange={(value) => value && props.onViewportChange(value as ShellViewport)}
        >
          {viewports.map((viewport) => (
            <ToggleGroupItem
              key={viewport.value}
              value={viewport.value}
              aria-label={viewport.label}
              className="size-control-xs px-0"
            >
              <viewport.icon weight="bold" aria-hidden />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Separator orientation="vertical" className="h-4" />
        <IconAction label="Full screen">
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Full screen"
            disabled={props.view === "code"}
            onClick={props.onFullscreen}
          >
            <MaximizeIcon weight="bold" aria-hidden />
          </Button>
        </IconAction>
        <IconAction label="Open in new tab">
          <Button asChild variant="ghost" size="icon-xs">
            <a href={props.frameUrl} target="_blank" rel="noreferrer" aria-label="Open in new tab">
              <ExternalLinkIcon weight="bold" aria-hidden />
            </a>
          </Button>
        </IconAction>
        <IconAction label="Reload">
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Reload preview"
            onClick={props.onReload}
          >
            <RotateCwIcon weight="bold" aria-hidden />
          </Button>
        </IconAction>
      </div>
    </div>
  );
}
