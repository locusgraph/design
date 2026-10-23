"use client";

import { Close as XIcon } from "@carbon/icons-react";
import { Button, cn, ScrollArea } from "@locusgraph/components";
import { type ComponentProps, type ReactNode, useState } from "react";
import { CanvasMeta } from "./canvas-meta";
import type { CanvasVersion } from "./version-switcher";

type CanvasProps = Omit<ComponentProps<"aside">, "title"> & {
  title: string;
  kind?: string;
  versions?: CanvasVersion[];
  versionId?: string;
  onVersionChange?: (id: string) => void;
  actions?: ReactNode;
  onClose?: () => void;
  children: ReactNode;
};

function currentVersionOf(versions: CanvasVersion[], versionId?: string) {
  return versions.find((version) => version.id === versionId) ?? versions.at(-1);
}

export function Canvas({
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
}: CanvasProps) {
  const current = currentVersionOf(versions, versionId);
  const [scrolled, setScrolled] = useState(false);
  return (
    <aside
      data-slot="canvas"
      aria-label={title}
      className={cn(
        "flex h-full min-h-0 min-w-0 flex-col border-l bg-background text-foreground",
        className
      )}
      {...props}
    >
      <header
        data-scrolled={scrolled || undefined}
        className="flex items-start gap-3 border-b border-transparent px-6 pt-4 pb-3 transition-colors duration-150 data-scrolled:border-border motion-reduce:transition-none"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h2 className="truncate text-base leading-snug font-semibold tracking-tight">{title}</h2>
          <CanvasMeta
            kind={kind}
            versions={versions}
            current={current}
            onVersionChange={onVersionChange}
          />
        </div>
        <div className="-mr-2 flex shrink-0 items-center gap-0.5 text-faint [&_button:hover]:text-s1">
          {actions}
          {onClose && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Close panel"
              className="text-faint hover:bg-transparent hover:text-s1"
              onClick={onClose}
            >
              <XIcon />
            </Button>
          )}
        </div>
      </header>
      <ScrollArea
        className="min-h-0 flex-1"
        onScrollCapture={(event) => setScrolled((event.target as HTMLElement).scrollTop > 0)}
      >
        <div
          data-slot="canvas-content"
          className="px-6 pt-1 pb-6 has-[>[data-slot=code]:only-child]:p-0 [&>[data-slot=code]:only-child]:ring-0"
        >
          {children}
        </div>
      </ScrollArea>
    </aside>
  );
}
