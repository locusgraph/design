import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { createServer, type ViteDevServer } from "vite";

const appRoot = fileURLToPath(new URL("..", import.meta.url));

export function standaloneServer() {
  return createServer({
    root: appRoot,
    cacheDir: "node_modules/.vite-standalone",
    configFile: false,
    logLevel: "error",
    appType: "custom",
    plugins: [react()],
    server: { middlewareMode: true, hmr: false, ws: false },
  });
}

export async function withStandaloneServer<Result>(
  run: (server: ViteDevServer) => Promise<Result>
) {
  const server = await standaloneServer();
  try {
    return await run(server);
  } finally {
    await server.close();
  }
}
