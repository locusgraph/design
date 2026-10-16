import type { DocsNavGroup } from "@locusgraph/components";
import type * as React from "react";
import { demoIndexByTitle } from "../../registry/load-demos";
import { navigate } from "../../url-state";

export function playgroundNavGroups(): DocsNavGroup[] {
  const components = demoIndexByTitle.map((entry) => ({
    title: entry.title,
    href: `/${entry.path}`,
  }));
  return [
    {
      label: "Sections",
      items: [
        { title: "Introduction", href: "/" },
        { title: "Installation", href: "/installation" },
        { title: "Shells", href: "/shells" },
      ],
    },
    { label: "Components", items: components },
  ];
}

function isPlainLeftClick(event: React.MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function PlaygroundLink({
  href,
  onClick,
  ...props
}: React.ComponentProps<"a"> & { href: string }) {
  return (
    <a
      {...props}
      href={href}
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
