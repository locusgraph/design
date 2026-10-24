import { Button } from "@locusgraph/components";
import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
} from "@phosphor-icons/react/ssr";
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
    <nav aria-label="Docs pages" className="flex items-center justify-between pt-4">
      {previous ? (
        <Button asChild variant="secondary" size="sm" className="shadow-none">
          <PlaygroundLink href={`/${previous.path}`}>
            <ArrowLeftIcon weight="bold" aria-hidden />
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
            <ArrowRightIcon weight="bold" aria-hidden />
          </PlaygroundLink>
        </Button>
      )}
    </nav>
  );
}
