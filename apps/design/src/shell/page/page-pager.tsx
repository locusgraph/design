import { Button } from "@locusgraph/components";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { DemoIndexEntry } from "../../registry/load-demos";
import { PlaygroundLink } from "../nav/playground-nav";

export function PagePager({
  previous,
  next,
}: {
  previous?: DemoIndexEntry;
  next?: DemoIndexEntry;
}) {
  return (
    <nav aria-label="Component pages" className="flex items-center justify-between pt-4">
      {previous ? (
        <Button asChild variant="secondary" size="sm" className="shadow-none">
          <PlaygroundLink href={`/${previous.path}`}>
            <ArrowLeftIcon />
            {previous.title}
          </PlaygroundLink>
        </Button>
      ) : (
        <span />
      )}
      {next && (
        <Button asChild variant="secondary" size="sm" className="shadow-none">
          <PlaygroundLink href={`/${next.path}`}>
            {next.title}
            <ArrowRightIcon />
          </PlaygroundLink>
        </Button>
      )}
    </nav>
  );
}
