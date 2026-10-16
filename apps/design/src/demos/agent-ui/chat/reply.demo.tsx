import { Reply } from "@locusgraph/agent-ui";
import { useEffect, useState } from "react";
import { defineDemo, select } from "../../../registry/define-demo";

const states = ["done", "streaming"] as const;

const answer = `Your **support agent** spent more yesterday because it re-read memory on every turn.

| Agent | Runs | Cost |
| --- | ---: | ---: |
| support-agent | 1,204 | $18.40 |
| billing-agent | 312 | $2.10 |

Next steps:

1. Cache the customer profile from [LocusGraph](https://locusgraph.com) for the session.
2. Set a daily budget in SpendGraph.

\`\`\`ts
const memory = await locus.recall({ agent: "support-agent", limit: 8 });
\`\`\``;

function Streaming() {
  const [length, setLength] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setLength((current) => (current >= answer.length ? 0 : current + 6));
    }, 40);
    return () => clearInterval(timer);
  }, []);
  const isDone = length >= answer.length;
  return (
    <Reply state={isDone ? "done" : "streaming"} className="w-full max-w-xl">
      {answer.slice(0, length)}
    </Reply>
  );
}

export default defineDemo({
  title: "Reply",
  description:
    "Assistant Markdown with GitHub tables, lists, code and links that open in a new tab. While streaming it is announced politely and an open code fence is closed so the block does not jump.",
  controls: { state: select(states) },
  playground: ({ state }) => (
    <Reply state={state} className="w-full max-w-xl">
      {answer}
    </Reply>
  ),
  code: ({ state }) => `<Reply${state === "done" ? "" : ` state="${state}"`}>{part.text}</Reply>`,
  props: [
    { name: "children", type: "string" },
    { name: "state", type: states.join(" | "), defaultValue: "done" },
  ],
  examples: {
    Streaming: {
      description: "Text arriving a few characters at a time, as it does from a model.",
      component: Streaming,
    },
  },
  isNew: true,
});
