import { ChevronRight as ChevronRightIcon } from "@carbon/icons-react";
import { useState } from "react";
import { CopyCommand } from "../../../landing/actions/copy-command";
import { CodeBlock, type CodeLanguage } from "../../../preview/code-block";
import { InstallNote, InstallStep, PackageManagerSwitch } from "../install-parts";
import { addPackagesCommand, usePackageManager } from "../package-manager";
import type { InstallFile, RegistryTree } from "../registry-tree";

const themeImport = '@import "../styles/locus.css";';

type SourceFileProps = { file: InstallFile; language?: CodeLanguage };

function SourceFile({ file, language = "tsx" }: SourceFileProps) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="group/file ring-1 ring-border"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 font-mono text-[13px] outline-none select-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
        <ChevronRightIcon
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground motion-safe:transition-transform group-open/file:rotate-90"
        />
        <span className="min-w-0 truncate">{file.targetPath}</span>
      </summary>
      {open && (
        <CodeBlock
          code={file.content}
          language={language}
          className="border-t border-line bg-muted/40 [&>div:last-child]:max-h-120 [&>div:last-child]:overflow-y-auto"
        />
      )}
    </details>
  );
}

function DependenciesStep({ dependencies }: { dependencies: string[] }) {
  const packageManager = usePackageManager();
  return (
    <InstallStep number={1} title="Install the dependencies">
      <div className="flex justify-end">
        <PackageManagerSwitch />
      </div>
      {dependencies.length > 0 ? (
        <CopyCommand command={addPackagesCommand(packageManager, dependencies)} />
      ) : (
        <InstallNote>No npm dependencies beyond React and Tailwind.</InstallNote>
      )}
    </InstallStep>
  );
}

function ThemeStep({ theme }: { theme: RegistryTree["theme"] }) {
  const packageManager = usePackageManager();
  return (
    <>
      <InstallNote>
        The files use the Locus tokens. Add the fonts, copy the theme, and import it under{" "}
        <code className="font-mono text-foreground">@import "tailwindcss";</code>.
      </InstallNote>
      {theme.dependencies.length > 0 && (
        <CopyCommand command={addPackagesCommand(packageManager, theme.dependencies)} />
      )}
      {theme.files.map((file) => (
        <SourceFile key={file.targetPath} file={file} language="css" />
      ))}
      <CopyCommand command={themeImport} prompt={false} />
    </>
  );
}

export function ManualTab({ tree }: { tree: RegistryTree | undefined }) {
  if (!tree) return <InstallNote>Reading the registry item…</InstallNote>;
  return (
    <ol className="flex flex-col gap-6">
      <DependenciesStep dependencies={tree.dependencies} />
      <InstallStep number={2} title="Copy the source files">
        <InstallNote>
          Imports use the <code className="font-mono text-foreground">@/</code> alias and{" "}
          <code className="font-mono text-foreground">cn</code> from{" "}
          <code className="font-mono text-foreground">@/lib/utils</code>, as in a shadcn project.
        </InstallNote>
        {tree.files.map((file) => (
          <SourceFile key={file.targetPath} file={file} />
        ))}
      </InstallStep>
      <InstallStep number={3} title="Add the theme">
        <ThemeStep theme={tree.theme} />
      </InstallStep>
    </ol>
  );
}
