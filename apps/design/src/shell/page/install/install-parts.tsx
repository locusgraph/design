import { cn } from "@locusgraph/components";
import type { ReactNode } from "react";
import { packageManagers, selectPackageManager, usePackageManager } from "./package-manager";

export function PackageManagerSwitch() {
  const active = usePackageManager();
  return (
    <div role="radiogroup" aria-label="Package manager" className="flex items-center gap-0.5">
      {packageManagers.map((packageManager) => (
        <button
          key={packageManager}
          type="button"
          role="radio"
          aria-checked={packageManager === active}
          onClick={() => selectPackageManager(packageManager)}
          className={cn(
            "h-7 px-2 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring",
            packageManager === active
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {packageManager}
        </button>
      ))}
    </div>
  );
}

export function InstallMeta({ parts }: { parts: string[] }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted-foreground">
      {parts.map((part, index) => (
        <span key={part} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden>·</span>}
          {part}
        </span>
      ))}
    </p>
  );
}

export function InstallLabel({ children }: { children: ReactNode }) {
  return <span className="locus-eyebrow">{children}</span>;
}

type InstallStepProps = { number: number; title: string; children: ReactNode };

export function InstallStep({ number, title, children }: InstallStepProps) {
  return (
    <li className="flex flex-col gap-3">
      <span className="flex items-center gap-2.5 text-sm font-medium">
        <span className="flex size-5 items-center justify-center font-mono text-[11px] text-muted-foreground ring-1 ring-border">
          {number}
        </span>
        {title}
      </span>
      <div className="flex min-w-0 flex-col gap-2">{children}</div>
    </li>
  );
}

export function InstallNote({ children }: { children: ReactNode }) {
  return <p className="text-sm text-pretty text-muted-foreground">{children}</p>;
}
