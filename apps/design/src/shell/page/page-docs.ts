import type { PageSection } from "@locusgraph/components";
import { useMemo } from "react";
import { readControlValues } from "../../registry/control-values";
import {
  compositionTree,
  type DocExample,
  docExamples,
  usageImport,
} from "../../registry/demo-docs";
import type { DemoEntry } from "../../registry/load-demos";
import { buildPageMarkdown } from "./page-markdown";

function pageSections(examples: DocExample[], hasComposition: boolean): PageSection[] {
  return [
    { id: "playground", title: "Playground" },
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    ...(hasComposition ? [{ id: "composition", title: "Composition" }] : []),
    ...(examples.length > 0 ? [{ id: "examples", title: "Examples" }] : []),
    ...examples.map((example) => ({ id: example.id, title: example.title, nested: true })),
    { id: "api", title: "API" },
  ];
}

export function buildPageDocs(entry: DemoEntry) {
  const { demo, source } = entry;
  const usageCode = demo.code(readControlValues(demo.controls, new URLSearchParams()) as never);
  const importLine = usageImport(source, usageCode);
  const composition = demo.composition ? compositionTree(demo.composition) : undefined;
  const examples = docExamples(demo, source);
  const markdown = buildPageMarkdown({ ...demo, importLine, usageCode, composition, examples });
  const sections = pageSections(examples, composition !== undefined);
  return { usageCode, importLine, composition, examples, markdown, sections };
}

export function usePageDocs(entry: DemoEntry | undefined) {
  return useMemo(() => (entry ? buildPageDocs(entry) : undefined), [entry]);
}

export type PageDocs = NonNullable<ReturnType<typeof usePageDocs>>;
