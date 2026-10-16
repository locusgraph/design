import {
  DocsHeader,
  DocsNavList,
  DocsShell,
  DocsSidebar,
  OnThisPage,
  Toaster,
} from "@locusgraph/components";
import { useCallback, useState } from "react";
import { findDemoIndexEntry, useDemoEntry } from "./registry/load-demos";
import { ShellsPage } from "./shell/blocks/shells-page";
import { InstallationPage, installationSections } from "./shell/guides/installation-page";
import { HomePage, homeSections } from "./shell/home-page";
import { LandingPage } from "./shell/landing/landing-page";
import { HeaderActions } from "./shell/nav/header-actions";
import { libraries, libraryOfPath } from "./shell/nav/libraries";
import { PlaygroundLink, playgroundNavGroups } from "./shell/nav/playground-nav";
import { SearchDialog, useSearchShortcut } from "./shell/nav/search-dialog";
import { DemoPage } from "./shell/page/demo-page";
import { usePageDocs } from "./shell/page/page-docs";
import { useDocumentTheme } from "./shell/theme";
import { readShellSettings, useLocation } from "./url-state";

const brand = {
  name: "locus",
  product: "design",
  icon: <span className="size-2.5 rotate-45 bg-foreground" />,
  href: "/",
};

const headerLinks = [
  ...libraries.map(({ title, href }) => ({ title, href })),
  { title: "Shells", href: "/shells" },
];

export function App() {
  const { path, params } = useLocation();
  const settings = readShellSettings(params);
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  useSearchShortcut(openSearch);
  useDocumentTheme(settings.theme);
  const isDemoPage = findDemoIndexEntry(path) !== undefined;
  const entry = useDemoEntry(path);
  const docs = usePageDocs(entry);
  const activeHref = `/${path}`;
  const isShellsPage = path === "shells";
  const isLandingPage = path === "";
  const isFullWidth = isShellsPage || isLandingPage;
  const isInstallationPage = path === "installation";
  const library = libraryOfPath(path);
  const navGroups = playgroundNavGroups(library);
  const pageSections =
    docs?.sections ??
    (isInstallationPage ? installationSections : isDemoPage ? [] : homeSections(library));

  return (
    <>
      <DocsShell
        header={
          <DocsHeader
            brand={brand}
            links={headerLinks}
            activeHref={isShellsPage ? "/shells" : isLandingPage ? "/" : library.href}
            linkComponent={PlaygroundLink}
            mobileNav={
              <DocsNavList
                groups={navGroups}
                activeHref={activeHref}
                linkComponent={PlaygroundLink}
              />
            }
          >
            <HeaderActions settings={settings} onSearch={openSearch} />
          </DocsHeader>
        }
        sidebar={
          isFullWidth ? undefined : (
            <DocsSidebar
              groups={navGroups}
              activeHref={activeHref}
              linkComponent={PlaygroundLink}
            />
          )
        }
        aside={
          isFullWidth ? undefined : pageSections.length === 0 ? (
            <span aria-hidden="true" />
          ) : (
            <OnThisPage key={entry?.path ?? path} sections={pageSections} />
          )
        }
      >
        {isLandingPage ? (
          <LandingPage />
        ) : isShellsPage ? (
          <ShellsPage theme={settings.theme} />
        ) : isInstallationPage ? (
          <InstallationPage />
        ) : entry && docs ? (
          <DemoPage
            key={entry.path}
            entry={entry}
            docs={docs}
            params={params}
            settings={settings}
          />
        ) : isDemoPage ? (
          <div aria-busy="true" className="min-h-svh" />
        ) : (
          <HomePage library={library} />
        )}
      </DocsShell>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <Toaster theme={settings.theme} />
    </>
  );
}
