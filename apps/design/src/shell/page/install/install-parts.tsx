import { cn } from "@locusgraph/components";
import type { ReactNode } from "react";
import { packageManagers, selectPackageManager, usePackageManager } from "./package-manager";

export function PackageManagerSwitch() {
  const active = usePackageManager();
  return (
    <div role="radiogroup" aria-label="Package manager" className="flex items-center gap-1">
      {packageManagers.map((packageManager) => (
        <button
          key={packageManager}
          type="button"
          role="radio"
          aria-checked={packageManager === active}
          onClick={() => selectPackageManager(packageManager)}
          className={cn(
            "px-2 py-0.5 font-mono text-xs focus-ring",
            packageManager === active
              ? "bg-muted text-foreground ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {packageManager}
        </button>
      ))}
    </div>
  );
}

export function InstallLabel({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

type InstallStepProps = { number: number; title: string; children: ReactNode };

export function InstallStep({ number, title, children }: InstallStepProps) {
  return (
    <li className="flex flex-col gap-3">
      <span className="flex items-center gap-2.5 text-sm font-medium">
        <span className="flex size-5 items-center justify-center font-mono text-2xs text-muted-foreground ring-1 ring-border">
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
