"use client";

import { cn } from "cn";
import { useActiveSection } from "./use-active-section";

type PageSection = { id: string; title: string; nested?: boolean };

type OnThisPageProps = { sections: PageSection[]; title?: string };

function OnThisPage({ sections, title = "On This Page" }: OnThisPageProps) {
  const [activeId, pinSection] = useActiveSection(sections.map((section) => section.id));
  return (
    <nav aria-label={title} className="flex flex-col gap-2 text-sm">
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
            "text-left text-[0.8rem] text-muted-foreground transition-colors hover:text-foreground",
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
