import type { PageSection } from "@locusgraph/components";
import { siteOrigin } from "../../../agent-docs/design-index";
import { agentPrompt, StartWithAgent } from "../../landing/actions/start-with-agent";
import { GuideArticle, GuideCode, GuideSection, Prose } from "../guide-layout";

export const forAgentsSections: PageSection[] = [
  { id: "start-with-the-index", title: "Start with the index" },
  { id: "one-page-per-part", title: "One page per part" },
  { id: "install-from-the-registry", title: "Install from the registry" },
  { id: "the-prompt", title: "The prompt" },
];

const fetchCode = `curl ${siteOrigin}/DESIGN.md
curl ${siteOrigin}/loop/approval/approval.md`;

const registryCode = `pnpm dlx shadcn@latest add ${siteOrigin}/r/theme.json ${siteOrigin}/r/approval.json`;

export function ForAgentsPage() {
  return (
    <GuideArticle
      title="For agents"
      lead="Every page on this site is also plain Markdown, so a coding agent can read the kit, pick the right parts and use their real props."
    >
      <GuideSection id="start-with-the-index" title="Start with the index">
        <Prose>
          <p>
            <code>/DESIGN.md</code> lists every component, block and Loop part with one line each,
            how to install them and the house style. Point your agent at it before it writes any UI.
          </p>
        </Prose>
        <GuideCode code={fetchCode} language="bash" />
      </GuideSection>
      <GuideSection id="one-page-per-part" title="One page per part">
        <Prose>
          <p>
            Add <code>.md</code> to any page path to get its Markdown: the description, the install
            command, the props table and every example as code. Agents should fetch the page before
            using a part, not guess its props.
          </p>
        </Prose>
      </GuideSection>
      <GuideSection id="install-from-the-registry" title="Install from the registry">
        <Prose>
          <p>
            Each part is also a shadcn registry item, so an agent can copy the source into the app
            instead of adding the npm package. <code>/r/registry.json</code> lists them all.
          </p>
        </Prose>
        <GuideCode code={registryCode} language="bash" />
      </GuideSection>
      <GuideSection id="the-prompt" title="The prompt">
        <Prose>
          <p>Paste this into Claude Code, Cursor, VS Code or Codex to start a screen.</p>
        </Prose>
        <pre className="overflow-x-auto border bg-surface p-4 font-mono text-sm whitespace-pre-wrap text-muted-foreground">
          {agentPrompt}
        </pre>
        <StartWithAgent />
      </GuideSection>
    </GuideArticle>
  );
}
