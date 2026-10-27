import { Badge, type PageSection } from "@locusgraph/components";
import { GuideArticle, GuideSection, Prose } from "../guide-layout";
import { changelogEntries } from "./changelog-entries";

export const changelogSections: PageSection[] = changelogEntries.map((entry) => ({
  id: entry.id,
  title: entry.date,
}));

export function ChangelogPage() {
  return (
    <GuideArticle
      title="Changelog"
      lead="What changed in each release. Packages are versioned on their own and published from tags such as tokens-v0.5.0."
    >
      {changelogEntries.map((entry) => (
        <GuideSection key={entry.id} id={entry.id} title={entry.title}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="locus-eyebrow">{entry.date}</span>
            {entry.packages.map((name) => (
              <Badge key={name} variant="secondary" className="font-mono">
                {name}
              </Badge>
            ))}
          </div>
          <Prose>
            <ul>
              {entry.changes.map((change) => (
                <li key={change}>{change}</li>
              ))}
            </ul>
          </Prose>
        </GuideSection>
      ))}
    </GuideArticle>
  );
}
