import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { readControlValues } from "../../src/registry/control-values";
import { docExamples } from "../../src/registry/demo-docs";
import { loadAllDemoEntries } from "../../src/registry/load-demos";

const demoEntries = await loadAllDemoEntries();

describe.each(demoEntries.map((entry) => [entry.path, entry] as const))("%s", (_, entry) => {
  const defaults = readControlValues(entry.demo.controls, new URLSearchParams());

  it("renders its playground with default controls", () => {
    expect(() => renderToStaticMarkup(entry.demo.playground(defaults as never))).not.toThrow();
  });

  it("produces code for its default controls", () => {
    expect(entry.demo.code(defaults as never).length).toBeGreaterThan(0);
  });

  it.each(
    docExamples(entry.demo, entry.source).map((example) => [example.title, example] as const)
  )("renders example %s with extracted source", (_title, example) => {
    const Example = example.component;
    expect(() => renderToStaticMarkup(<Example />)).not.toThrow();
    expect(example.code.length).toBeGreaterThan(0);
  });
});
