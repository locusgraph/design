"use client";

import type * as React from "react";
import { useEffect } from "react";
import { cn } from "../../cn";
import { useActiveSection } from "./use-active-section";

type PageSection = { id: string; title: string; nested?: boolean };

type OnThisPageProps = { sections: PageSection[]; title?: string };

function isPlainLeftClick(event: React.MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function useScrollToHashSection(sectionIds: string[], pinSection: (id: string) => void) {
  const idsKey = sectionIds.join(" ");
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!idsKey.split(" ").includes(id)) return;
    pinSection(id);
    document.getElementById(id)?.scrollIntoView();
  }, [idsKey, pinSection]);
}

function OnThisPage({ sections, title = "On This Page" }: OnThisPageProps) {
  const sectionIds = sections.map((section) => section.id);
  const [activeId, pinSection] = useActiveSection(sectionIds);
  useScrollToHashSection(sectionIds, pinSection);
  return (
    <nav aria-label={title} className="-m-1 flex flex-col gap-2 p-1 text-sm">
      <p className="eyebrow flex h-6 items-center">{title}</p>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={(event) => {
            if (!isPlainLeftClick(event)) return;
            event.preventDefault();
            pinSection(section.id);
            document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
            history.replaceState(history.state, "", `#${section.id}`);
          }}
          aria-current={activeId === section.id ? "location" : undefined}
          className={cn(
            "w-fit text-xs text-muted-foreground transition-colors focus-ring hover:text-foreground",
            section.nested && "pl-4",
            activeId === section.id && "font-medium text-foreground"
          )}
        >
          {section.title}
        </a>
      ))}
    </nav>
  );
}

export { OnThisPage, type PageSection };
