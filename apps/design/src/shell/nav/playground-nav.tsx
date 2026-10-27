import type { DocsNavGroup } from "@locusgraph/components";
import type * as React from "react";
import { loadDemoEntry } from "../../registry/load-demos";
import { navigate } from "../../url-state";
import { groupTitle, type Library, type LibraryGroup, libraryGroups } from "./libraries";

function libraryNavGroups(library: Library): DocsNavGroup[] {
  const groups = libraryGroups(library);
  const itemsOf = (entries: LibraryGroup["entries"]) =>
    entries.map((entry) => ({ title: entry.title, href: `/${entry.path}` }));
  if (groups.length < 2) {
    return [{ label: library.title, items: itemsOf(groups[0]?.entries ?? []) }];
  }
  return groups.map(({ group, entries }) => ({
    label: groupTitle(group),
    items: itemsOf(entries),
  }));
}

export function playgroundNavGroups(library: Library): DocsNavGroup[] {
  return [
    {
      label: "Start",
      items: [
        { title: "Installation", href: "/installation" },
        { title: "Principles", href: "/principles" },
        { title: "HITL", href: "/human-in-the-loop" },
        { title: "For agents", href: "/for-agents" },
        { title: "Changelog", href: "/changelog" },
      ],
    },
    ...libraryNavGroups(library),
  ];
}

function isPlainLeftClick(event: React.MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function prefetchPage(href: string) {
  void loadDemoEntry(href.replace(/^\/+/, "").split("?")[0] ?? "")?.catch(() => undefined);
}

export function PlaygroundLink({
  href,
  onClick,
  onPointerEnter,
  onFocus,
  ...props
}: React.ComponentProps<"a"> & { href: string }) {
  return (
    <a
      {...props}
      href={href}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        prefetchPage(href);
      }}
      onFocus={(event) => {
        onFocus?.(event);
        prefetchPage(href);
      }}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || !isPlainLeftClick(event)) {
          return;
        }
        event.preventDefault();
        navigate(href.replace(/^\/+/, ""));
      }}
    />
  );
}
