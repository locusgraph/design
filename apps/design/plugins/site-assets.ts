import type { ReactNode } from "react";
import type { Plugin, ViteDevServer } from "vite";
import { elementToPng, pngToIco, svgToPng } from "./raster";
import { withStandaloneServer } from "./standalone-server";

const siteFilesModule = "/src/seo/build/site-files.ts";
const siteMetaModule = "/src/seo/site-meta.ts";
const headTagsModule = "/src/seo/head-tags.ts";

type PageMeta = { path: string; title: string; description: string; canonical: string };
type SiteFilesModule = {
  buildSitePages: () => Promise<PageMeta[]>;
  iconSvg: (size: number) => string;
  webManifest: () => string;
  socialCardElement: () => ReactNode;
};
type SiteMetaModule = {
  iconFiles: Record<"svg" | "ico" | "appleTouch" | "maskable" | "manifest", string>;
  socialImage: { path: string; width: number; height: number };
};
type HeadTagsModule = {
  withPageHead: (html: string, page: PageMeta) => string;
  pageHtmlFileName: (path: string) => string;
};
type SiteAsset = {
  fileName: string;
  contentType: string;
  source: () => Promise<string | Uint8Array>;
};

const rootFilePattern = /^\/[^/]+\.(svg|ico|png|webmanifest)$/;

async function loadModules(server: ViteDevServer) {
  const [files, meta, head] = await Promise.all([
    server.ssrLoadModule(siteFilesModule) as Promise<SiteFilesModule>,
    server.ssrLoadModule(siteMetaModule) as Promise<SiteMetaModule>,
    server.ssrLoadModule(headTagsModule) as Promise<HeadTagsModule>,
  ]);
  return { files, meta, head };
}

function siteAssets({ files, meta }: Awaited<ReturnType<typeof loadModules>>): SiteAsset[] {
  const { iconFiles, socialImage } = meta;
  const iconPng = async (size: number) => svgToPng(files.iconSvg(size), size);
  return [
    {
      fileName: iconFiles.svg,
      contentType: "image/svg+xml",
      source: async () => files.iconSvg(64),
    },
    {
      fileName: iconFiles.ico,
      contentType: "image/x-icon",
      source: async () => pngToIco(await iconPng(32), 32),
    },
    { fileName: iconFiles.appleTouch, contentType: "image/png", source: () => iconPng(180) },
    { fileName: iconFiles.maskable, contentType: "image/png", source: () => iconPng(512) },
    {
      fileName: iconFiles.manifest,
      contentType: "application/manifest+json",
      source: async () => files.webManifest(),
    },
    {
      fileName: socialImage.path.slice(1),
      contentType: "image/png",
      source: () => elementToPng(files.socialCardElement(), socialImage),
    },
  ];
}

async function readBuildOutput(server: ViteDevServer) {
  const modules = await loadModules(server);
  const assets = siteAssets(modules);
  const sources = await Promise.all(assets.map((asset) => asset.source()));
  const pages = await modules.files.buildSitePages();
  return { assets, sources, pages, head: modules.head };
}

export function siteAssetsPlugin(): Plugin {
  return {
    name: "locus-site-assets",
    enforce: "post",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const path = decodeURIComponent(request.url?.split("?")[0] ?? "");
        if (!rootFilePattern.test(path)) return next();
        const assets = siteAssets(await loadModules(server));
        const asset = assets.find((item) => `/${item.fileName}` === path);
        if (!asset) return next();
        response.setHeader("content-type", asset.contentType);
        response.end(await asset.source());
      });
    },
    async generateBundle(_options, bundle) {
      if (this.environment.name !== "client") return;
      const indexHtml = bundle["index.html"];
      if (indexHtml?.type !== "asset") {
        this.error("index.html is missing from the client bundle");
      }
      const template = String(indexHtml.source);
      const { assets, sources, pages, head } = await withStandaloneServer(readBuildOutput);
      assets.forEach((asset, index) => {
        this.emitFile({ type: "asset", fileName: asset.fileName, source: sources[index] });
      });
      for (const page of pages) {
        const html = head.withPageHead(template, page);
        const fileName = head.pageHtmlFileName(page.path);
        if (fileName === "index.html") indexHtml.source = html;
        else this.emitFile({ type: "asset", fileName, source: html });
      }
    },
  };
}
