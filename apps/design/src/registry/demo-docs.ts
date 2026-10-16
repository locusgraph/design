import type { ComponentType } from "react";
import type { CompositionNode, Demo } from "./define-demo";
import { extractExampleSource, titleFromName } from "./example-source";

export type DocExample = {
  id: string;
  title: string;
  description?: string;
  component: ComponentType;
  code: string;
};

export function docExamples(demo: Demo, fileSource: string): DocExample[] {
  return Object.entries(demo.examples).map(([name, definition]) => {
    const isComponent = typeof definition === "function";
    return {
      id: `example-${name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`,
      title: titleFromName(name),
      description: isComponent ? undefined : definition.description,
      component: isComponent ? definition : definition.component,
      code: extractExampleSource(fileSource, name),
    };
  });
}

function importedNamesByPackage(fileSource: string) {
  const imports = fileSource.matchAll(/import \{([^}]*)\} from "(@locusgraph\/[a-z-]+)";/g);
  return [...imports].map(([, names = "", packageName = ""]) => ({
    packageName,
    names: names
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean),
  }));
}

const MAX_IMPORT_LINE = 80;

function importStatement(names: string[], packageName: string) {
  const singleLine = `import { ${names.join(", ")} } from "${packageName}";`;
  if (singleLine.length <= MAX_IMPORT_LINE) {
    return singleLine;
  }
  return `import {\n${names.map((name) => `  ${name},`).join("\n")}\n} from "${packageName}";`;
}

export function usageImport(fileSource: string, usageCode: string) {
  return importedNamesByPackage(fileSource)
    .map(({ packageName, names }) => ({
      packageName,
      used: names.filter((name) => new RegExp(`\\b${name}\\b`).test(usageCode)),
    }))
    .filter(({ used }) => used.length > 0)
    .map(({ packageName, used }) => importStatement(used, packageName))
    .join("\n");
}

export function neighborEntries<Entry extends { path: string }>(entries: Entry[], path: string) {
  const index = entries.findIndex((entry) => entry.path === path);
  return {
    previous: index > 0 ? entries[index - 1] : undefined,
    next: index >= 0 ? entries[index + 1] : undefined,
  };
}

function treeLines(
  node: CompositionNode,
  prefix: string,
  isLast: boolean,
  isRoot: boolean
): string[] {
  const branch = isRoot ? "" : isLast ? "└── " : "├── ";
  const childPrefix = isRoot ? "" : `${prefix}${isLast ? "    " : "│   "}`;
  const children = node.children ?? [];
  return [
    `${prefix}${branch}${node.name}`,
    ...children.flatMap((child, index) =>
      treeLines(child, childPrefix, index === children.length - 1, false)
    ),
  ];
}

export function compositionTree(node: CompositionNode) {
  return treeLines(node, "", true, true).join("\n");
}
