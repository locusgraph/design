import { Dialog, DialogContent, DialogTitle, Input } from "@locusgraph/components";
import { useEffect, useState } from "react";
import { demoIndex } from "../../registry/load-demos";
import { navigate } from "../../url-state";

type SearchDialogProps = { open: boolean; onOpenChange: (open: boolean) => void };

function matchingEntries(query: string) {
  const needle = query.trim().toLowerCase();
  return demoIndex.filter(
    (entry) => entry.title.toLowerCase().includes(needle) || entry.path.includes(needle)
  );
}

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

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const results = matchingEntries(query);
  const choose = (path: string) => {
    navigate(path);
    onOpenChange(false);
    setQuery("");
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="gap-0 p-0">
        <DialogTitle className="sr-only">Search components</DialogTitle>
        <form
          className="border-b p-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (results[0]) choose(results[0].path);
          }}
        >
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search components…"
          />
        </form>
        <ul className="max-h-80 overflow-y-auto p-2">
          {results.map((entry) => (
            <li key={entry.path}>
              <button
                type="button"
                onClick={() => choose(entry.path)}
                className="flex w-full justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
              >
                {entry.title}
                <span className="text-muted-foreground">{entry.path}</span>
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              No components found.
            </li>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
