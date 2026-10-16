import { cn } from "@locusgraph/components";
import type { Components } from "react-markdown";
import { FencedCodeBlock, fencedCode } from "./fenced-code";

const blockGap = "mt-4 first:mt-0";

export const markdownComponents: Components = {
  p: ({ node: _node, className, ...props }) => (
    <p
      className={cn("leading-relaxed text-pretty [&:not(:first-child)]:mt-3", className)}
      {...props}
    />
  ),
  a: ({ node: _node, className, ...props }) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "font-medium text-foreground underline decoration-muted-foreground/50 underline-offset-3 transition-colors hover:decoration-foreground",
        className
      )}
      {...props}
    />
  ),
  h1: ({ node: _node, className, ...props }) => (
    <h1
      className={cn("mt-7 mb-2 text-base font-semibold tracking-tight first:mt-0", className)}
      {...props}
    />
  ),
  h2: ({ node: _node, className, ...props }) => (
    <h2
      className={cn("mt-6 mb-2 text-base font-semibold tracking-tight first:mt-0", className)}
      {...props}
    />
  ),
  h3: ({ node: _node, className, ...props }) => (
    <h3 className={cn("mt-5 mb-1.5 text-sm font-semibold first:mt-0", className)} {...props} />
  ),
  h4: ({ node: _node, className, ...props }) => (
    <h4 className={cn("eyebrow mt-5 mb-1.5 first:mt-0", className)} {...props} />
  ),
  ul: ({ node: _node, className, ...props }) => (
    <ul
      className={cn("mt-3 list-disc space-y-1.5 pl-5 first:mt-0 [li_&]:mt-1.5", className)}
      {...props}
    />
  ),
  ol: ({ node: _node, className, ...props }) => (
    <ol
      className={cn(
        "mt-3 list-decimal space-y-1.5 pl-5 first:mt-0 marker:tabular-nums [li_&]:mt-1.5",
        className
      )}
      {...props}
    />
  ),
  li: ({ node: _node, className, ...props }) => (
    <li
      className={cn("pl-1 leading-relaxed marker:text-muted-foreground [&>p]:mt-0", className)}
      {...props}
    />
  ),
  blockquote: ({ node: _node, className, ...props }) => (
    <blockquote
      className={cn("border-l-2 border-border pl-4 text-muted-foreground", blockGap, className)}
      {...props}
    />
  ),
  hr: ({ node: _node, className, ...props }) => (
    <hr className={cn("my-6 border-border", className)} {...props} />
  ),
  pre: ({ node, className, ...props }) =>
    fencedCode(node) ? (
      <FencedCodeBlock node={node} />
    ) : (
      <pre
        className={cn(
          "overflow-x-auto bg-muted/40 p-3 font-mono text-xs leading-relaxed",
          blockGap,
          className
        )}
        {...props}
      />
    ),
  code: ({ node: _node, className, ...props }) => (
    <code
      className={cn(
        "bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground [pre_&]:bg-transparent [pre_&]:p-0",
        className
      )}
      {...props}
    />
  ),
  table: ({ node: _node, className, ...props }) => (
    <div data-slot="response-table" className={cn("overflow-x-auto ring-1 ring-border", blockGap)}>
      <table
        className={cn(
          "w-full border-collapse text-sm [&_td:not(:first-child)]:tabular-nums",
          className
        )}
        {...props}
      />
    </div>
  ),
  th: ({ node: _node, className, ...props }) => (
    <th
      className={cn("eyebrow border-b bg-muted/30 px-3 py-2 text-left font-normal", className)}
      {...props}
    />
  ),
  td: ({ node: _node, className, ...props }) => (
    <td
      className={cn("border-b px-3 py-2 align-top [tr:last-child_&]:border-b-0", className)}
      {...props}
    />
  ),
};
