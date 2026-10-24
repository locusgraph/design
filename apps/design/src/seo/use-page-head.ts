import { useEffect } from "react";
import { type DemoEntry, findDemoIndexEntry } from "../registry/load-demos";
import { demoPageMeta, notFoundPageMeta, type PageMeta, staticPageMeta } from "./page-meta";

function setHeadAttribute(selector: string, attribute: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attribute, value);
}

export function currentPageMeta(path: string, loaded: DemoEntry | undefined): PageMeta {
  const indexEntry = findDemoIndexEntry(path);
  if (indexEntry) {
    const description = loaded?.path === path ? loaded.demo.description : undefined;
    return demoPageMeta(indexEntry, description);
  }
  return staticPageMeta(path) ?? notFoundPageMeta(path);
}

export function usePageHead(path: string, loaded: DemoEntry | undefined) {
  const { title, description, canonical } = currentPageMeta(path, loaded);
  useEffect(() => {
    document.title = title;
    setHeadAttribute('meta[name="description"]', "content", description);
    setHeadAttribute('link[rel="canonical"]', "href", canonical);
    setHeadAttribute('meta[property="og:title"]', "content", title);
    setHeadAttribute('meta[property="og:description"]', "content", description);
    setHeadAttribute('meta[property="og:url"]', "content", canonical);
    setHeadAttribute('meta[name="twitter:title"]', "content", title);
    setHeadAttribute('meta[name="twitter:description"]', "content", description);
  }, [title, description, canonical]);
}
