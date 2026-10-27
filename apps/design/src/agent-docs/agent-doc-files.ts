import { loadAllDemoEntries } from "../registry/load-demos";
import { buildPageDocs } from "../shell/page/page-docs";
import { designIndex, siteOrigin } from "./design-index";
import { guideDocs } from "./guide-markdown";

export type AgentDocFile = { fileName: string; markdown: string };

function pageFooter(path: string) {
  return `\n\n---\n\nAll pages: ${siteOrigin}/DESIGN.md · This page: ${siteOrigin}/${path}\n`;
}

export async function agentDocFiles(): Promise<AgentDocFile[]> {
  const entries = await loadAllDemoEntries();
  const pages = entries.map((entry) => ({
    fileName: `${entry.path}.md`,
    markdown: buildPageDocs(entry).markdown + pageFooter(entry.path),
  }));
  const guides = guideDocs();
  const guideFiles = guides.map((guide) => ({
    fileName: `${guide.path}.md`,
    markdown: guide.markdown + pageFooter(guide.path),
  }));
  return [
    { fileName: "DESIGN.md", markdown: designIndex(entries, guides) },
    ...guideFiles,
    ...pages,
  ];
}
