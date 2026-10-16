"use client";

import { Button, cn, ScrollArea } from "@locusgraph/components";
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
        "flex h-full min-h-0 min-w-0 flex-col bg-card text-card-foreground ring-1 ring-border",
        className
      )}
      {...props}
    >
      <header className="flex items-start gap-3 border-b px-5 pt-3.5 pb-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {kind && <span className="eyebrow">{kind}</span>}
          <h2 className="truncate font-sans text-base leading-snug font-semibold tracking-tight">
            {title}
          </h2>
        </div>
        <div className="-mr-2 flex shrink-0 items-center gap-0.5 text-muted-foreground">
          {actions}
          {onClose && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Close panel"
              className="text-muted-foreground hover:text-foreground"
              onClick={onClose}
            >
              <XIcon />
            </Button>
          )}
        </div>
      </header>
      <ScrollArea className="min-h-0 flex-1">
        <div
          data-slot="artifact-content"
          className="px-5 py-4 has-[>[data-slot=code-block]:only-child]:p-0 [&>[data-slot=code-block]:only-child]:ring-0"
        >
          {children}
        </div>
      </ScrollArea>
      {current && (
        <footer className="flex h-10 items-center gap-2 border-t bg-muted/30 pr-3 pl-5">
          <VersionSwitcher
            versions={versions}
            current={current}
            onVersionChange={onVersionChange}
          />
        </footer>
      )}
    </aside>
  );
}
