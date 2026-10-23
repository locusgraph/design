import type { Components } from "react-markdown";
import { FencedCode, fencedCode } from "./fenced-code";

export const markdownComponents: Components = {
  a: ({ node: _node, ...props }) => <a target="_blank" rel="noopener noreferrer" {...props} />,
  pre: ({ node, ...props }) => (fencedCode(node) ? <FencedCode node={node} /> : <pre {...props} />),
  table: ({ node: _node, ...props }) => (
    <div data-slot="reply-table" className="typeset-scroll">
      <table {...props} />
    </div>
  ),
};
