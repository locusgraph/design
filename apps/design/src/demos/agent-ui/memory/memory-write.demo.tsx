import { MemoryWrite, type MemoryWriteItem } from "@locusgraph/agent-ui";
import { useState } from "react";
import { defineDemo } from "../../../registry/define-demo";

const savedThisTurn: MemoryWriteItem[] = [
  {
    id: "w_1",
    text: "Acme moves billing to the 1st of each month",
    kind: "preference",
    status: "saved",
  },
  { id: "w_2", text: "Dana Ruiz approves changes above $500", kind: "person", status: "saved" },
  { id: "w_3", text: "Overage dispute resolved in May", kind: "event", status: "undone" },
];

function UndoableWrites() {
  const [items, setItems] = useState(savedThisTurn);
  const undo = (id: string) =>
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, status: "undone" } : item))
    );
  return (
    <div className="w-full max-w-lg">
      <MemoryWrite items={items} onUndo={undo} />
    </div>
  );
}

export default defineDemo({
  title: "Memory Write",
  description:
    "What the agent saved to the graph this turn. Each item can be undone; undone items stay in the list, struck through.",
  controls: {},
  playground: () => <UndoableWrites />,
  code: () => `<MemoryWrite items={turn.memoryWrites} onUndo={undoMemoryWrite} />`,
  props: [
    { name: "items", type: "MemoryWriteItem[]" },
    { name: "onUndo", type: "(id: string) => void" },
  ],
  examples: {},
  isNew: true,
});
