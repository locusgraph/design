import type { Plugin, ViteDevServer } from "vite";

const pageMetaModule = "/src/seo/page-meta.ts";
const demosModule = "/src/registry/load-demos.ts";

type PageMetaModule = { staticPageMeta: (path: string) => unknown };
type DemosModule = { findDemoIndexEntry: (path: string) => unknown };

export function pagePathOf(url: string) {
  const path = decodeURIComponent(url.split("?")[0] ?? "");
  return path.replace(/^\/+|\/+$/g, "");
}

async function isSitePage(server: ViteDevServer, path: string) {
  if (path === "" || path.includes(".") || path.startsWith("@")) return false;
  const [meta, demos] = await Promise.all([
    server.ssrLoadModule(pageMetaModule) as Promise<PageMetaModule>,
    server.ssrLoadModule(demosModule) as Promise<DemosModule>,
  ]);
  return meta.staticPageMeta(path) !== undefined || demos.findDemoIndexEntry(path) !== undefined;
}

function rewriteToIndex(request: { url?: string }) {
  const url = request.url ?? "";
  const query = url.includes("?") ? url.slice(url.indexOf("?")) : "";
  request.url = `/${query}`;
  Object.assign(request, { originalUrl: request.url });
}

export function devPageRoutes(): Plugin {
  return {
    name: "locus-dev-page-routes",
    enforce: "pre",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (request, _response, next) => {
        const wantsHtml = request.headers.accept?.includes("text/html") ?? false;
        if (wantsHtml && (await isSitePage(server, pagePathOf(request.url ?? "")))) {
          rewriteToIndex(request);
        }
        next();
      });
    },
  };
}
