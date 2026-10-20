import { ChevronRight as ChevronRightIcon } from "@carbon/icons-react";
import { shadcnRegistry } from "../../../guides/installation-snippets";
import { CopyCommand } from "../../../landing/actions/copy-command";
import { CodeBlock } from "../../../preview/code/code-block";
import { InstallLabel, InstallMeta, InstallNote } from "../install-parts";
import { shadcnAddCommand, usePackageManager } from "../package-manager";
import { packageNameOf, type RegistryTree, registryTreeMeta } from "../registry-tree";

const themeImport = '@import "../styles/locus.css";';

function OneTimeSetup() {
  return (
    <details className="group/setup border-t border-line pt-4">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium outline-none select-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
        <ChevronRightIcon
          aria-hidden
          className="size-4 text-muted-foreground motion-safe:transition-transform group-open/setup:rotate-90"
        />
        One-time setup
      </summary>
      <div className="flex flex-col gap-3 pt-3">
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
        <InstallLabel>Add</InstallLabel>
        <CopyCommand command={shadcnAddCommand(packageManager, registryName)} />
        {tree ? (
          <InstallMeta parts={registryTreeMeta(tree)} />
        ) : (
          <InstallNote>Reading the registry item…</InstallNote>
        )}
        {tree && tree.dependencies.length > 0 && (
          <p className="text-xs text-muted-foreground">
            Copies into <code className="font-mono">components/locus</code> and adds{" "}
            {tree.dependencies.map(packageNameOf).join(", ")}.
          </p>
        )}
      </div>
      <OneTimeSetup />
    </div>
  );
}
