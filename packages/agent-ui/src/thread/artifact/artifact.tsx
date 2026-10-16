"use client";

import { Button, cn, RuleGridLabel, ScrollArea } from "@locusgraph/components";
import { XIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { type ArtifactVersion, VersionSwitcher } from "./version-switcher";

type ArtifactProps = Omit<ComponentProps<"aside">, "title"> & {
  title: string;
  kind?: string;
  versions?: ArtifactVersion[];
  versionId?: string;
  onVersionChange?: (id: string) => void;
  actions?: ReactNode;
  onClose?: () => void;
  children: ReactNode;
};

function currentVersionOf(versions: ArtifactVersion[], versionId?: string) {
  return versions.find((version) => version.id === versionId) ?? versions.at(-1);
}

export function Artifact({
  title,
  kind,
  versions = [],
  versionId,
  onVersionChange,
  actions,
  onClose,
  children,
  className,
  ...props
}: ArtifactProps) {
  const current = currentVersionOf(versions, versionId);
  return (
    <aside
      data-slot="artifact"
      aria-label={title}
      className={cn(
        "flex h-full min-h-0 min-w-0 flex-col border-l border-border bg-background",
        className
      )}
      {...props}
    >
      <header className="flex flex-col gap-2 border-b border-border px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            {kind && <RuleGridLabel>{kind}</RuleGridLabel>}
            <h2 className="truncate text-[15px] font-medium tracking-[-0.01em]">{title}</h2>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {actions}
            {onClose && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Close panel"
                onClick={onClose}
              >
                <XIcon />
              </Button>
            )}
          </div>
        </div>
        {current && (
          <VersionSwitcher
            versions={versions}
            current={current}
            onVersionChange={onVersionChange}
          />
        )}
      </header>
      <ScrollArea className="min-h-0 flex-1">
        <div data-slot="artifact-content" className="p-4">
          {children}
        </div>
      </ScrollArea>
    </aside>
  );
}
