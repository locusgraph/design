import type { Plugin, ViteDevServer } from "vite";
import { withStandaloneServer } from "./standalone-server.ts";

const docsModule = "/src/agent-docs/agent-doc-files.ts";

type AgentDocFile = { fileName: string; markdown: string };
type DocsModule = { agentDocFiles: () => Promise<AgentDocFile[]> };
type LlmsModule = { llmsFiles: (files: AgentDocFile[]) => AgentDocFile[] };

const llmsModule = "/src/agent-docs/llms-files.ts";
const servedDocPattern = /\.(md|txt)$/;

async function readDocFiles(server: ViteDevServer) {
  const docs = (await server.ssrLoadModule(docsModule)) as DocsModule;
  const llms = (await server.ssrLoadModule(llmsModule)) as LlmsModule;
  const files = await docs.agentDocFiles();
  return [...files, ...llms.llmsFiles(files)];
}

function contentTypeOf(fileName: string) {
  return fileName.endsWith(".txt") ? "text/plain" : "text/markdown";
}

export function agentDocs(): Plugin {
  return {
    name: "locus-agent-docs",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const path = request.url?.split("?")[0] ?? "";
        if (!servedDocPattern.test(path)) return next();
        const files = await readDocFiles(server);
        const file = files.find((item) => `/${item.fileName}` === decodeURIComponent(path));
        if (!file) return next();
        response.setHeader("content-type", `${contentTypeOf(file.fileName)}; charset=utf-8`);
        response.end(file.markdown);
      });
    },
    async generateBundle() {
      if (this.environment.name !== "client") return;
      const files = await withStandaloneServer(readDocFiles);
      for (const file of files) {
        this.emitFile({ type: "asset", fileName: file.fileName, source: file.markdown });
      }
    },
  };
}
