import { Button } from "@locusgraph/components";
import { useState } from "react";
import { CodeBlock } from "./code-block";

const TEASER_LINES = 4;

function firstLines(code: string, count: number) {
  return code.split("\n").slice(0, count).join("\n");
}

export function CodeTeaser({ code }: { code: string }) {
  const [expanded, setExpanded] = useState(false);
  const fitsInTeaser = code.split("\n").length <= TEASER_LINES;

  if (expanded || fitsInTeaser) {
    return (
      <div className="relative border-t bg-surface">
        <CodeBlock code={code} collapsible={false} />
        {expanded && (
          <Button
            variant="ghost"
            size="xs"
            className="absolute right-2 bottom-2"
            onClick={() => setExpanded(false)}
          >
            Collapse
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="relative border-t bg-surface pb-12">
      <div
        aria-hidden
        className="pointer-events-none [mask-image:linear-gradient(to_bottom,black_30%,transparent)]"
      >
        <CodeBlock code={firstLines(code, TEASER_LINES)} showCopy={false} />
      </div>
      <Button
        variant="outline"
        size="sm"
        className="absolute bottom-3 left-1/2 -translate-x-1/2"
        onClick={() => setExpanded(true)}
      >
        View code
      </Button>
    </div>
  );
}
