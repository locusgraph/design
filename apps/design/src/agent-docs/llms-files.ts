import type { AgentDocFile } from "./agent-doc-files";

const indexFileName = "DESIGN.md";

function pagesAfterIndex(files: AgentDocFile[]) {
  return files.filter((file) => file.fileName !== indexFileName);
}

export function llmsFiles(files: AgentDocFile[]): AgentDocFile[] {
  const index = files.find((file) => file.fileName === indexFileName);
  if (!index) throw new Error(`${indexFileName} is missing from the agent docs`);
  const full = [index, ...pagesAfterIndex(files)].map((file) => file.markdown.trim()).join("\n\n");
  return [
    { fileName: "llms.txt", markdown: index.markdown },
    { fileName: "llms-full.txt", markdown: `${full}\n` },
  ];
}
