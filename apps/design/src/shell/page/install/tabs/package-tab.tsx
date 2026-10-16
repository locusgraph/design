import { CopyCommand } from "../../../landing/actions/copy-command";
import { CodeBlock } from "../../../preview/code-block";
import { InstallLabel, PackageManagerSwitch } from "../install-parts";
import { addPackagesCommand, usePackageManager } from "../package-manager";

const componentsPackage = "@locusgraph/components";
const packagesWithSources = ["@locusgraph/blocks", "@locusgraph/loop", "@locusgraph/brand"];
const packagesNeedingComponents = ["@locusgraph/blocks", "@locusgraph/loop"];

function importedPackages(importLine: string) {
  return [...importLine.matchAll(/from "(@locusgraph\/[a-z-]+)"/g)].map(([, name = ""]) => name);
}

export function pagePackages(libraryPackage: string, importLine: string) {
  const packages = new Set([libraryPackage, ...importedPackages(importLine)]);
  if (packagesNeedingComponents.some((name) => packages.has(name))) packages.add(componentsPackage);
  return [...packages];
}

function cssImports(packages: string[]) {
  const sources = packages.filter((name) => packagesWithSources.includes(name));
  if (packages.includes("@locusgraph/loop")) sources.push("@locusgraph/brand");
  const theme = packages.includes(componentsPackage) ? [`${componentsPackage}/theme.css`] : [];
  const files = [...theme, ...[...new Set(sources)].map((name) => `${name}/sources.css`)];
  return files.map((file) => `@import "${file}";`);
}

type PackageTabProps = { packages: string[]; importLine: string };

export function PackageTab({ packages, importLine }: PackageTabProps) {
  const packageManager = usePackageManager();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <InstallLabel>Install</InstallLabel>
          <PackageManagerSwitch />
        </div>
        <CopyCommand command={addPackagesCommand(packageManager, packages)} />
      </div>
      <div className="flex flex-col gap-2">
        <InstallLabel>Global CSS</InstallLabel>
        <CodeBlock code={cssImports(packages).join("\n")} language="css" className="bg-muted/40" />
      </div>
      {importLine && (
        <div className="flex flex-col gap-2">
          <InstallLabel>Import</InstallLabel>
          <CodeBlock code={importLine} className="bg-muted/40" />
        </div>
      )}
    </div>
  );
}
