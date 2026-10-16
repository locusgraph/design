import { ThreadList, type ThreadSummary } from "@locusgraph/agent-ui";
import { useState } from "react";
import { defineDemo, toggle } from "../../../registry/define-demo";

const initialThreads: ThreadSummary[] = [
  { id: "thr_8f2k", title: "October spend by model", updatedAt: "2026-10-16T09:30:00.000Z" },
  { id: "thr_7d1a", title: "Support agent cost per ticket", updatedAt: "2026-10-14T16:05:00.000Z" },
  { id: "thr_6c9e", title: "Acme account graph cleanup", updatedAt: "2026-10-09T11:20:00.000Z" },
  { id: "thr_5b3x", title: "Stripe migration memories", updatedAt: "2026-09-28T08:45:00.000Z" },
  {
    id: "thr_4a7q",
    title: "Budget alerts for the data team",
    updatedAt: "2026-09-12T13:10:00.000Z",
  },
];

function Playground({ editable }: { editable: boolean }) {
  const [threads, setThreads] = useState(initialThreads);
  const [activeId, setActiveId] = useState<string | null>("thr_7d1a");
  const rename = (id: string, title: string) =>
    setThreads((current) =>
      current.map((thread) => (thread.id === id ? { ...thread, title } : thread))
    );
  const archive = (id: string) =>
    setThreads((current) => current.filter((thread) => thread.id !== id));
  const startNew = () => {
    const id = `thr_${Date.now().toString(36)}`;
    setThreads((current) => [
      { id, title: "New conversation", updatedAt: new Date().toISOString() },
      ...current,
    ]);
    setActiveId(id);
  };
  return (
    <div className="h-96 w-full max-w-xs">
      <ThreadList
        className="h-full"
        threads={threads}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={startNew}
        onRename={editable ? rename : undefined}
        onArchive={editable ? archive : undefined}
      />
    </div>
  );
}

function Empty() {
  return (
    <div className="w-full max-w-xs">
      <ThreadList threads={[]} onSelect={() => {}} onNew={() => {}} />
    </div>
  );
}

export default defineDemo({
  title: "Thread List",
  description:
    "Conversation history with the active thread marked. Rename inline from the menu or by double click; Enter saves, Escape cancels.",
  controls: { editable: toggle(true) },
  playground: ({ editable }) => <Playground editable={editable} />,
  code: () =>
    `<ThreadList\n  threads={threads}\n  activeId={threadId}\n  onSelect={openThread}\n  onNew={startThread}\n  onRename={renameThread}\n  onArchive={archiveThread}\n/>`,
  props: [
    { name: "threads", type: "ThreadSummary[]" },
    { name: "activeId", type: "string | null", defaultValue: "null" },
    { name: "onSelect", type: "(id: string) => void" },
    { name: "onNew", type: "() => void" },
    { name: "onRename", type: "(id: string, title: string) => void" },
    { name: "onArchive", type: "(id: string) => void" },
    { name: "label", type: "string", defaultValue: '"Conversations"' },
    { name: "emptyText", type: "string", defaultValue: '"No conversations yet."' },
  ],
  examples: {
    Empty: { description: "Before the first conversation.", component: Empty },
  },
  previewHeight: "tall",
  isNew: true,
});
