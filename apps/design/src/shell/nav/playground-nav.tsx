import type { DocsNavGroup } from "@locusgraph/components";
import type * as React from "react";
import { loadDemoEntry } from "../../registry/load-demos";
import { navigate } from "../../url-state";
import { type Library, libraryEntries } from "./libraries";

export function playgroundNavGroups(library: Library): DocsNavGroup[] {
  const items = libraryEntries(library.id).map((entry) => ({
    title: entry.title,
    href: `/${entry.path}`,
  }));
  return [
    {
      label: "Start",
      items: [
        { title: "Introduction", href: "/" },
        { title: "Installation", href: "/installation" },
        { title: "Theming", href: "/theming" },
      ],
    },
    { label: library.title, items },
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
