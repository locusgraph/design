import {
  DocsHeader,
  DocsNavList,
  DocsShell,
  DocsSidebar,
  OnThisPage,
  ThemeToggle,
} from "@locusgraph/components";
import { DocsArticle, docsArticleSections } from "./content/docs-article";
import { useShellTheme } from "./content/use-shell-theme";
import { defineShell } from "./define-shell";

const navGroups = [
  {
    label: "Get started",
    items: [
      { title: "Introduction", href: "#introduction" },
      { title: "Quickstart", href: "#quickstart" },
    ],
  },
  {
    label: "Platform API",
    items: [
      { title: "API keys", href: "#api-keys" },
      { title: "Usage", href: "#usage" },
      { title: "Webhooks", href: "#webhooks" },
    ],
  },
];

function PlatformDocsShell() {
  const [theme, setTheme] = useShellTheme();
  return (
    <DocsShell
      header={
        <DocsHeader
          brand={{
            name: "locus",
            product: "docs",
            icon: <span className="size-2.5 rotate-45 bg-foreground" />,
            href: "#introduction",
          }}
          links={[
            { title: "Docs", href: "#introduction" },
            { title: "API", href: "#api-keys" },
          ]}
          activeHref="#api-keys"
          mobileNav={<DocsNavList groups={navGroups} activeHref="#api-keys" />}
        >
          <ThemeToggle theme={theme} onThemeChange={setTheme} />
        </DocsHeader>
      }
      sidebar={<DocsSidebar groups={navGroups} activeHref="#api-keys" />}
      aside={<OnThisPage sections={docsArticleSections} />}
    >
      <DocsArticle />
    </DocsShell>
  );
}

export default defineShell({
  title: "Docs Shell",
  description:
    "Sticky header, a text sidebar, a centered article and an On This Page aside. For docs and changelogs.",
  importLine:
    'import { DocsHeader, DocsShell, DocsSidebar, OnThisPage } from "@locusgraph/components";',
  component: PlatformDocsShell,
});
