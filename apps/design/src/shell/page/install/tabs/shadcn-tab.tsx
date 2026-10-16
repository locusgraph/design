import { ChevronRight as ChevronRightIcon } from "@carbon/icons-react";
import { shadcnRegistry } from "../../../guides/installation-snippets";
import { CopyCommand } from "../../../landing/actions/copy-command";
import { CodeBlock } from "../../../preview/code-block";
import { InstallLabel, InstallNote, PackageManagerSwitch } from "../install-parts";
import { shadcnAddCommand, usePackageManager } from "../package-manager";
import { type RegistryTree, registryTreeSummary } from "../registry-tree";

const themeImport = '@import "../styles/locus.css";';

function OneTimeSetup() {
  return (
    <details className="group/setup ring-1 ring-border">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-sm font-medium outline-none select-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
        <ChevronRightIcon
          aria-hidden
          className="size-4 text-muted-foreground motion-safe:transition-transform group-open/setup:rotate-90"
        />
        One-time setup
      </summary>
      <div className="flex flex-col gap-3 border-t border-line p-3">
        <InstallNote>
          Add the registry to <code className="font-mono text-foreground">components.json</code>:
        </InstallNote>
        <CodeBlock code={shadcnRegistry} language="json" className="bg-muted/40" />
        <InstallNote>
          Run <code className="font-mono text-foreground">add @locus/theme</code> once, then import
          it under <code className="font-mono text-foreground">@import "tailwindcss";</code> in your
          global CSS:
        </InstallNote>
        <CopyCommand command={themeImport} prompt={false} />
      </div>
    </details>
  );
}

type ShadcnTabProps = { registryName: string; tree: RegistryTree | undefined };

export function ShadcnTab({ registryName, tree }: ShadcnTabProps) {
  const packageManager = usePackageManager();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <InstallLabel>Add</InstallLabel>
          <PackageManagerSwitch />
        </div>
        <CopyCommand command={shadcnAddCommand(packageManager, registryName)} />
        <InstallNote>{tree ? registryTreeSummary(tree) : "Reading the registry item…"}</InstallNote>
      </div>
      <OneTimeSetup />
    </div>
  );
}
