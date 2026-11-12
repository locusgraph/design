import { renderToStaticMarkup } from "react-dom/server";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type DocFile = { fileName: string; markdown: string };

export function staticPageMarkdown(path: string, docs: DocFile[]) {
  const own = docs.find((doc) => doc.fileName === `${path}.md`);
  const index = docs.find((doc) => doc.fileName === "DESIGN.md");
  return (own ?? index)?.markdown ?? "";
}

export function staticPageBody(markdown: string) {
  if (!markdown) return "";
  return renderToStaticMarkup(
    <main data-static-page="" className="typeset mx-auto max-w-3xl px-6 py-12">
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </main>
  );
}

export function withStaticBody(html: string, body: string) {
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}
