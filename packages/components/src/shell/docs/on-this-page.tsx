"use client";

import { cn } from "cn";
import { useActiveSection } from "./use-active-section";

type PageSection = { id: string; title: string; nested?: boolean };

type OnThisPageProps = { sections: PageSection[]; title?: string };

function OnThisPage({ sections, title = "On This Page" }: OnThisPageProps) {
  const [activeId, pinSection] = useActiveSection(sections.map((section) => section.id));
  return (
    <nav aria-label={title} className="-m-1 flex flex-col gap-2 p-1 text-sm">
      <p className="eyebrow flex h-6 items-center">{title}</p>
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => {
            pinSection(section.id);
            document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
          }}
          aria-current={activeId === section.id ? "location" : undefined}
          className={cn(
            "w-fit text-left text-xs text-muted-foreground transition-colors focus-ring hover:text-foreground",
            section.nested && "pl-4",
            activeId === section.id && "font-medium text-foreground"
          )}
        >
          {section.title}
        </button>
      ))}
    </nav>
  );
}

export { OnThisPage, type PageSection };
