import {
  DocsHeader,
  DocsNavList,
  DocsShell,
  DocsSidebar,
  OnThisPage,
  Toaster,
} from "@locusgraph/components";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  type DemoEntry,
  findDemoIndexEntry,
  prefetchDemoEntries,
  useDemoEntry,
} from "./registry/load-demos";
import { usePageHead } from "./seo/use-page-head";
import { ShellsPage } from "./shell/blocks/shells-page";
import { InstallationPage, installationSections } from "./shell/guides/installation-page";
import { ThemingPage } from "./shell/guides/theming/theming-page";
import { HomePage, homeSections } from "./shell/home-page";
import { LandingPage } from "./shell/landing/landing-page";
import { HeaderActions } from "./shell/nav/header-actions";
import { libraries, libraryEntries, libraryOfPath } from "./shell/nav/libraries";
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
  { title: "Theming", href: "/theming" },
];

function useShownEntry(loaded: DemoEntry | undefined, isDemoPage: boolean) {
  const previous = useRef<DemoEntry | undefined>(undefined);
  if (loaded) previous.current = loaded;
  if (!isDemoPage) previous.current = undefined;
  return loaded ?? previous.current;
}

function usePrefetchLibrary(id: ReturnType<typeof libraryOfPath>["id"]) {
  useEffect(() => {
    const paths = libraryEntries(id).map((entry) => entry.path);
    const start = () => void prefetchDemoEntries(paths);
    const timer = globalThis.setTimeout(start, 1500);
    return () => globalThis.clearTimeout(timer);
  }, [id]);
}

export function App() {
  const { path, params } = useLocation();
  const settings = readShellSettings(params);
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  useSearchShortcut(openSearch);
  useDocumentTheme(settings.theme);
  const isDemoPage = findDemoIndexEntry(path) !== undefined;
  const loadedEntry = useDemoEntry(path);
  const entry = useShownEntry(loadedEntry, isDemoPage);
  const docs = usePageDocs(entry);
  usePageHead(path, loadedEntry);
  const activeHref = `/${path}`;
  const isShellsPage = path === "shells";
  const isLandingPage = path === "";
  const isThemingPage = path === "theming";
  const isFullWidth = isShellsPage || isLandingPage || isThemingPage;
  const isInstallationPage = path === "installation";
  const library = libraryOfPath(path);
  usePrefetchLibrary(library.id);
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
            activeHref={
              isShellsPage
                ? "/shells"
                : isThemingPage
                  ? "/theming"
                  : isLandingPage
                    ? "/"
                    : library.href
            }
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
        ) : isThemingPage ? (
          <ThemingPage mode={settings.theme} />
        ) : entry && docs ? (
          <DemoPage entry={entry} docs={docs} params={params} settings={settings} />
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
