import { cn } from "@locusgraph/components";
import { shellEntries } from "../../shells/load-shells";
import type { Theme } from "../../url-state";
import { ShellViewer } from "./shell-viewer";
import { useCurrentShell } from "./use-current-shell";

const shellIds = shellEntries.map((shell) => shell.id);

export function ShellsPage({ theme }: { theme: Theme }) {
  const currentShellId = useCurrentShell(shellIds);
  return (
    <div className="flex flex-col gap-10">
      <header className="mx-auto flex max-w-2xl flex-col items-center gap-3 py-8 text-center">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Shells</h1>
        <p className="text-balance text-muted-foreground">
          Page frames for locus apps. Each one is a single component with a header, navigation and a
          body slot.
        </p>
      </header>
      <nav aria-label="Shells" className="flex items-center gap-4 border-b">
        {shellEntries.map((shell) => (
          <a
            key={shell.id}
            href={`#${shell.id}`}
            aria-current={shell.id === currentShellId ? "location" : undefined}
            className={cn(
              "-mb-px border-b-2 border-transparent pb-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              shell.id === currentShellId && "border-foreground text-foreground"
            )}
          >
            {shell.title}
          </a>
        ))}
      </nav>
      {shellEntries.map((shell) => (
        <ShellViewer key={shell.id} shell={shell} theme={theme} />
      ))}
    </div>
  );
}
