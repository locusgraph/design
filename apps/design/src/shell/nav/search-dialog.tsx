import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@locusgraph/components";
import { useEffect } from "react";
import type { DemoIndexEntry } from "../../registry/load-demos";
import { navigate } from "../../url-state";
import { groupTitle, libraries, libraryGroups } from "./libraries";

type SearchDialogProps = { open: boolean; onOpenChange: (open: boolean) => void };

const searchSections = libraries.map((library) => ({
  library,
  groups: libraryGroups(library),
}));

export function useSearchShortcut(openSearch: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openSearch]);
}

function SearchItem({
  entry,
  group,
  onChoose,
}: {
  entry: DemoIndexEntry;
  group: string;
  onChoose: (path: string) => void;
}) {
  return (
    <CommandItem value={`${entry.title} ${entry.path}`} onSelect={() => onChoose(entry.path)}>
      {entry.title}
      <span className="ml-auto text-xs text-muted-foreground">{groupTitle(group)}</span>
    </CommandItem>
  );
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const choose = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search the docs"
      description="Find a component, block, agent component, pattern or brand asset."
    >
      <CommandInput placeholder="Search the docs…" />
      <CommandList>
        <CommandEmpty>Nothing matches.</CommandEmpty>
        {searchSections.map(({ library, groups }) => (
          <CommandGroup key={library.id} heading={library.title}>
            {groups.flatMap(({ group, entries }) =>
              entries.map((entry) => (
                <SearchItem key={entry.path} entry={entry} group={group} onChoose={choose} />
              ))
            )}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
