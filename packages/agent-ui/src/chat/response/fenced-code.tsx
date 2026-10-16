import type { ExtraProps } from "react-markdown";
import { CodeBlock } from "../../thread/code-block/code-block";

type HastNode = NonNullable<ExtraProps["node"]>;
type HastChild = HastNode["children"][number];

function textOf(child: HastChild): string {
  if (child.type === "text") return child.value;
  if (child.type === "element") return child.children.map(textOf).join("");
  return "";
}

function languageOf(className: unknown) {
  const classes = Array.isArray(className) ? className.map(String) : [];
  const language = classes.find((value) => value.startsWith("language-"));
  return language ? language.slice("language-".length) : "text";
}

export function fencedCode(node: HastNode | undefined) {
  const code = node?.children.find(
    (child): child is Extract<HastChild, { type: "element" }> =>
      child.type === "element" && child.tagName === "code"
  );
  if (!code) return null;
  return {
    code: code.children.map(textOf).join("").replace(/\n$/, ""),
    language: languageOf(code.properties.className),
  };
}

export function FencedCodeBlock({ node }: ExtraProps) {
  const fenced = fencedCode(node);
  if (!fenced) return null;
  return <CodeBlock code={fenced.code} language={fenced.language} className="mt-4 first:mt-0" />;
}
