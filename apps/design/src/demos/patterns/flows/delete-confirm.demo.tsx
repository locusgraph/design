import { DeleteConfirm } from "../../../patterns/flows/delete-confirm";
import source from "../../../patterns/flows/delete-confirm.tsx?raw";
import { defineDemo, toggle } from "../../../registry/define-demo";
import { PatternRules } from "./pattern-rules";

const rules = [
  "The row names the thing and its size; Delete is a quiet ghost button, never primary.",
  "The dialog states the consequence in plain words and lists what goes, with counts.",
  "The confirm button is destructive and named by the action, such as Delete 3 nodes.",
  "Cancel takes focus when the dialog opens, so Enter never deletes by accident.",
  "High-risk deletes ask for the exact name before the confirm button turns on.",
  "When the delete can be reversed, the row offers Undo for 5 seconds instead of asking twice.",
];

function Rules() {
  return <PatternRules rules={rules} />;
}

function Frame({ requireTyping = false, undoable = false }) {
  return (
    <div className="w-[36rem] max-w-full">
      <DeleteConfirm requireTyping={requireTyping} undoable={undoable} />
    </div>
  );
}

function Simple() {
  return <Frame />;
}

function HighRisk() {
  return <Frame requireTyping />;
}

function Undoable() {
  return <Frame undoable />;
}

export default defineDemo({
  title: "Delete Confirm",
  description:
    "A destructive flow from a ruled row to an alert dialog that lists what will be removed, with an optional typed name and a 5 second undo.",
  controls: {
    requireTyping: toggle(false),
    undoable: toggle(true),
  },
  playground: ({ requireTyping, undoable }) => (
    <div className="w-[36rem] max-w-full">
      <DeleteConfirm
        key={`${requireTyping}-${undoable}`}
        requireTyping={requireTyping}
        undoable={undoable}
      />
    </div>
  ),
  code: () => source,
  props: [
    { name: "target", type: "DeleteTarget", defaultValue: "sampleDeleteTarget" },
    { name: "requireTyping", type: "boolean", defaultValue: "false" },
    { name: "undoable", type: "boolean", defaultValue: "false" },
    { name: "undoSeconds", type: "number", defaultValue: "5" },
    { name: "onDelete", type: "(target: DeleteTarget) => void" },
    { name: "onUndo", type: "(target: DeleteTarget) => void" },
  ],
  examples: {
    Rules: { description: "The rules this pattern follows.", component: Rules },
    Simple: { description: "Low risk: one click to open, one to confirm.", component: Simple },
    HighRisk: {
      description: "Typing the name turns the confirm button on.",
      component: HighRisk,
    },
    Undoable: {
      description: "After the delete, the row offers Undo for 5 seconds.",
      component: Undoable,
    },
  },
  isNew: true,
});
