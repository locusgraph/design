import { cn } from "@locusgraph/components";
import type * as React from "react";
import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { StreamState } from "../../types";
import { markdownComponents } from "./markdown-components";

export type ResponseProps = Omit<React.ComponentProps<"div">, "children"> & {
  children: string;
  state?: StreamState;
};

const codeFence = /^ {0,3}(```|~~~)/gm;

export function closeOpenCodeFence(markdown: string): string {
  const fences = markdown.match(codeFence) ?? [];
  const lastFence = fences.at(-1)?.trim().slice(0, 3);
  return fences.length % 2 === 1 ? `${markdown}\n${lastFence}` : markdown;
}

const Markdown = memo(function Markdown({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {markdown}
    </ReactMarkdown>
  );
});

const streamingCaret =
  "data-[state=streaming]:[&>:last-child]:after:ml-0.5 data-[state=streaming]:[&>:last-child]:after:inline-block data-[state=streaming]:[&>:last-child]:after:h-[1em] data-[state=streaming]:[&>:last-child]:after:w-[0.5ch] data-[state=streaming]:[&>:last-child]:after:translate-y-[0.15em] data-[state=streaming]:[&>:last-child]:after:bg-foreground/70 data-[state=streaming]:[&>:last-child]:after:content-[''] motion-safe:data-[state=streaming]:[&>:last-child]:after:animate-pulse";

export function Response({ children, state = "done", className, ...props }: ResponseProps) {
  const isStreaming = state === "streaming";
  const markdown = isStreaming ? closeOpenCodeFence(children) : children;
  return (
    <div
      data-slot="response"
      data-state={state}
      aria-live={isStreaming ? "polite" : undefined}
      className={cn("min-w-0 text-sm wrap-break-word text-foreground", streamingCaret, className)}
      {...props}
    >
      <Markdown markdown={markdown} />
    </div>
  );
}
