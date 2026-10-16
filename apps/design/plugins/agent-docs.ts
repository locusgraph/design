import type { Plugin, ViteDevServer } from "vite";
import { withStandaloneServer } from "./standalone-server";

const docsModule = "/src/agent-docs/agent-doc-files.ts";

type AgentDocFile = { fileName: string; markdown: string };
type DocsModule = { agentDocFiles: () => Promise<AgentDocFile[]> };

async function readDocFiles(server: ViteDevServer) {
  const docs = (await server.ssrLoadModule(docsModule)) as DocsModule;
  return docs.agentDocFiles();
}

export function agentDocs(): Plugin {
  return {
    name: "locus-agent-docs",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const path = request.url?.split("?")[0] ?? "";
        if (!path.endsWith(".md")) return next();
        const files = await readDocFiles(server);
        const file = files.find((item) => `/${item.fileName}` === decodeURIComponent(path));
        if (!file) return next();
        response.setHeader("content-type", "text/markdown; charset=utf-8");
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
