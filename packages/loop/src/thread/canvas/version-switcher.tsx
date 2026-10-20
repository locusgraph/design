"use client";

import { ChevronDown as ChevronDownIcon } from "@carbon/icons-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@locusgraph/components";
import { formatDate } from "@locusgraph/utils";

export type CanvasVersion = { id: string; label: string; createdAt: string };

type VersionSwitcherProps = {
  versions: CanvasVersion[];
  current: CanvasVersion;
  onVersionChange?: (id: string) => void;
};

export function VersionSwitcher({ versions, current, onVersionChange }: VersionSwitcherProps) {
  const label = (
    <span className="flex items-center gap-2 font-mono text-[11px] tabular-nums">
      <span data-slot="canvas-current-version">{current.label}</span>
      {versions.length > 1 && <span className="text-muted-foreground">of {versions.length}</span>}
      <time dateTime={current.createdAt} className="text-muted-foreground">
        {formatDate(current.createdAt)}
      </time>
    </span>
  );
  if (versions.length < 2 || !onVersionChange) {
    return label;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="xs"
          className="-ml-2 font-normal"
          aria-label={`Version ${current.label}, choose another version`}
        >
          {label}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={6}>
        <DropdownMenuRadioGroup value={current.id} onValueChange={onVersionChange}>
          {versions.map((version) => (
            <DropdownMenuRadioItem key={version.id} value={version.id}>
              <span className="font-mono text-xs">{version.label}</span>
              <span className="ml-auto pl-4 text-xs text-muted-foreground">
                {formatDate(version.createdAt)}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
