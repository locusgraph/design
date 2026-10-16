import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { createServer, type Plugin, type ViteDevServer } from "vite";

const appRoot = fileURLToPath(new URL("..", import.meta.url));
const docsModule = "/src/agent-docs/agent-doc-files.ts";

type AgentDocFile = { fileName: string; markdown: string };
type DocsModule = { agentDocFiles: () => Promise<AgentDocFile[]> };

async function readDocFiles(server: ViteDevServer) {
  const docs = (await server.ssrLoadModule(docsModule)) as DocsModule;
  return docs.agentDocFiles();
}

function standaloneServer() {
  return createServer({
    root: appRoot,
    configFile: false,
    logLevel: "error",
    appType: "custom",
    plugins: [react()],
    server: { middlewareMode: true, hmr: false, ws: false },
  });
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
      const server = await standaloneServer();
      try {
        for (const file of await readDocFiles(server)) {
          this.emitFile({ type: "asset", fileName: file.fileName, source: file.markdown });
        }
      } finally {
        await server.close();
      }
    },
  };
}
