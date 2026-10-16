import { cn } from "@locusgraph/components";
import type { Components } from "react-markdown";
import { FencedCodeBlock, fencedCode } from "./fenced-code";

export const markdownComponents: Components = {
  p: ({ node: _node, className, ...props }) => (
    <p className={cn("leading-relaxed [&:not(:first-child)]:mt-3", className)} {...props} />
  ),
  a: ({ node: _node, className, ...props }) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn("text-primary underline underline-offset-3 hover:text-foreground", className)}
      {...props}
    />
  ),
  h1: ({ node: _node, className, ...props }) => (
    <h1 className={cn("mt-5 mb-2 text-lg font-semibold first:mt-0", className)} {...props} />
  ),
  h2: ({ node: _node, className, ...props }) => (
    <h2 className={cn("mt-5 mb-2 text-base font-semibold first:mt-0", className)} {...props} />
  ),
  h3: ({ node: _node, className, ...props }) => (
    <h3 className={cn("mt-4 mb-1.5 text-sm font-semibold first:mt-0", className)} {...props} />
  ),
  ul: ({ node: _node, className, ...props }) => (
    <ul className={cn("mt-3 list-disc space-y-1 pl-5 first:mt-0", className)} {...props} />
  ),
  ol: ({ node: _node, className, ...props }) => (
    <ol className={cn("mt-3 list-decimal space-y-1 pl-5 first:mt-0", className)} {...props} />
  ),
  li: ({ node: _node, className, ...props }) => (
    <li className={cn("pl-1 marker:text-muted-foreground", className)} {...props} />
  ),
  blockquote: ({ node: _node, className, ...props }) => (
    <blockquote
      className={cn(
        "mt-3 border-l-2 border-border pl-3 text-muted-foreground first:mt-0",
        className
      )}
      {...props}
    />
  ),
  hr: ({ node: _node, className, ...props }) => (
    <hr className={cn("my-4 border-border", className)} {...props} />
  ),
  pre: ({ node, className, ...props }) =>
    fencedCode(node) ? (
      <FencedCodeBlock node={node} />
    ) : (
      <pre
        className={cn("mt-3 overflow-x-auto border p-3 font-mono text-[12.5px]", className)}
        {...props}
      />
    ),
  code: ({ node: _node, className, ...props }) => (
    <code className={cn("bg-muted px-1 py-0.5 font-mono text-[0.9em]", className)} {...props} />
  ),
  table: ({ node: _node, className, ...props }) => (
    <div data-slot="response-table" className="mt-3 overflow-x-auto border first:mt-0">
      <table className={cn("w-full border-collapse text-sm tabular-nums", className)} {...props} />
    </div>
  ),
  th: ({ node: _node, className, ...props }) => (
    <th
      className={cn(
        "border-b bg-muted/40 px-3 py-1.5 text-left font-mono text-[11.5px] font-normal text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  td: ({ node: _node, className, ...props }) => (
    <td
      className={cn("border-b px-3 py-1.5 align-top [tr:last-child_&]:border-b-0", className)}
      {...props}
    />
  ),
};
