import type { PageSection } from "@locusgraph/components";
import type * as React from "react";
import { ChangelogPage, changelogSections } from "./changelog/changelog-page";
import { ForAgentsPage, forAgentsSections } from "./for-agents/for-agents-page";
import {
  HumanInTheLoopPage,
  humanInTheLoopSections,
} from "./human-in-the-loop/human-in-the-loop-page";
import { InstallationPage, installationSections } from "./installation-page";
import { PrinciplesPage, principlesSections } from "./principles/principles-page";

type GuidePage = { Page: () => React.ReactNode; sections: PageSection[] };

export const guidePages: Record<string, GuidePage> = {
  installation: { Page: InstallationPage, sections: installationSections },
  principles: { Page: PrinciplesPage, sections: principlesSections },
  "human-in-the-loop": { Page: HumanInTheLoopPage, sections: humanInTheLoopSections },
  "for-agents": { Page: ForAgentsPage, sections: forAgentsSections },
  changelog: { Page: ChangelogPage, sections: changelogSections },
};
