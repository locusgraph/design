import { Button } from "@locusgraph/components";
import { MagnifyingGlass as SearchIcon } from "@phosphor-icons/react/ssr";
import { findDemoIndexEntryByName } from "../registry/load-demos";
import { PlaygroundLink } from "./nav/playground-nav";

export function NotFoundPage({ path, onSearch }: { path: string; onSearch: () => void }) {
  const suggestion = findDemoIndexEntryByName(path);
  return (
    <article className="mx-auto flex w-full max-w-160 min-w-0 flex-col gap-4">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-balance text-muted-foreground">
        Nothing lives at <code className="font-mono text-foreground">/{path}</code>. It may have
        moved. Search the docs or start from the introduction.
      </p>
      {suggestion && (
        <p className="text-muted-foreground">
          Did you mean{" "}
          <PlaygroundLink
            href={`/${suggestion.path}`}
            className="font-medium text-foreground underline underline-offset-4 focus-ring hover:text-interactive"
          >
            {suggestion.title}
          </PlaygroundLink>
          ?
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <Button onClick={onSearch}>
          <SearchIcon weight="bold" aria-hidden />
          Search the docs
        </Button>
        <Button asChild variant="ghost">
          <PlaygroundLink href="/">Introduction</PlaygroundLink>
        </Button>
      </div>
    </article>
  );
}
