import type { DemoEntry } from "../registry/load-demos";
import { libraries, libraryOfPath } from "../shell/nav/libraries";
import {
  defaultDescription,
  defaultTitle,
  descriptionLimit,
  siteName,
  siteOrigin,
} from "./site-meta";

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  canonical: string;
};

const libraryDescriptions: Record<string, string> = {
  components:
    "Radix based React components for LocusGraph apps: square, ruled and quiet, in light and dark. Install @locusgraph/components or copy with shadcn.",
  blocks:
    "Product blocks for usage, quota, wallet, top-ups, plans and API keys. Props and callbacks only, built from @locusgraph/components.",
  loop: "Loop, the agent UI with the human in the loop: chat, thread, agent, approval, memory and cost, on Vercel AI SDK message parts.",
  brand:
    "The LocusGraph and SpendGraph marks, wordmarks, app icon, social card and sign-in marks, as React components and SVG files.",
};

const guidePages: Record<string, { title: string; description: string }> = {
  installation: {
    title: "Installation",
    description:
      "Install Locus Design from npm or copy the source with shadcn, add Tailwind, import the theme and render your first component.",
  },
  theming: {
    title: "Theming",
    description:
      "Monochrome by default. Set one brand color for the primary action and focus ring with three CSS variables; everything else stays grey.",
  },
  shells: {
    title: "Shells",
    description:
      "App and docs shells for LocusGraph apps: header, sidebar, content and aside, responsive and in light and dark.",
  },
};

export function canonicalUrl(path: string) {
  return `${siteOrigin}/${path}`;
}

export function fitDescription(text: string, limit = descriptionLimit) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > limit / 2 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:]+$/, "")}…`;
}

function titled(...parts: string[]) {
  return [...parts, siteName].join(" · ");
}

function meta(path: string, title: string, description: string): PageMeta {
  return { path, title, description, canonical: canonicalUrl(path) };
}

export function staticPageMeta(path: string): PageMeta | undefined {
  if (path === "") return meta("", defaultTitle, defaultDescription);
  const library = libraries.find((item) => item.href === `/${path}`);
  if (library) {
    return meta(path, titled(library.title), libraryDescriptions[library.id] ?? defaultDescription);
  }
  const guide = guidePages[path];
  return guide ? meta(path, titled(guide.title), guide.description) : undefined;
}

export function demoPageMeta(entry: Pick<DemoEntry, "path" | "title">, description?: string) {
  const library = libraryOfPath(entry.path);
  const fitted = description ? fitDescription(description) : defaultDescription;
  return meta(entry.path, titled(entry.title, library.title), fitted);
}

export const staticPagePaths = [
  "",
  ...libraries.map((item) => item.href.slice(1)),
  ...Object.keys(guidePages),
];

export function sitePages(entries: DemoEntry[]): PageMeta[] {
  const fixed = staticPagePaths.map((path) => staticPageMeta(path) as PageMeta);
  const demos = entries.map((entry) => demoPageMeta(entry, entry.demo.description));
  return [...fixed, ...demos];
}
