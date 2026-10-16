import { History, type HistoryItem } from "@locusgraph/loop";
import { useState } from "react";
import { defineDemo, toggle } from "../../../registry/define-demo";

function localIso(month: number, day: number, hour: number, minute: number) {
  return new Date(2026, month - 1, day, hour, minute).toISOString();
}

const demoNow = localIso(10, 16, 18, 0);

const initialThreads: HistoryItem[] = [
  { id: "thr_9g4m", title: "Forecast for the indexer", updatedAt: localIso(10, 16, 15, 12) },
  { id: "thr_8f2k", title: "October spend by model", updatedAt: localIso(10, 16, 9, 30) },
  { id: "thr_7d1a", title: "Support agent cost per ticket", updatedAt: localIso(10, 15, 16, 5) },
  { id: "thr_7c0b", title: "Idle API keys", updatedAt: localIso(10, 15, 8, 40) },
  { id: "thr_6c9e", title: "Acme account graph cleanup", updatedAt: localIso(10, 9, 11, 20) },
  { id: "thr_5b3x", title: "Stripe migration memories", updatedAt: localIso(9, 28, 8, 45) },
  {
    id: "thr_4a7q",
    title: "Budget alerts for the data team",
    updatedAt: localIso(9, 12, 13, 10),
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
    setThreads((current) => [{ id, title: "New conversation", updatedAt: demoNow }, ...current]);
    setActiveId(id);
  };
  return (
    <div className="h-72 w-full max-w-xs">
      <History
        className="h-full"
        threads={threads}
        now={demoNow}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={startNew}
        onRename={editable ? rename : undefined}
        onArchive={editable ? archive : undefined}
      />
    </div>
  );
}

const longHistory: HistoryItem[] = Array.from({ length: 1000 }, (_, index) => ({
  id: `thr_long_${index}`,
  title: `${initialThreads[index % initialThreads.length].title} ${index + 1}`,
  updatedAt: new Date(new Date(demoNow).getTime() - index * 5 * 3_600_000).toISOString(),
}));

function LongHistory() {
  const [activeId, setActiveId] = useState<string | null>("thr_long_2");
  return (
    <div className="h-80 w-full max-w-xs">
      <History
        className="h-full"
        threads={longHistory}
        now={demoNow}
        activeId={activeId}
        onSelect={setActiveId}
      />
    </div>
  );
}

function Empty() {
  return (
    <div className="w-full max-w-xs">
      <History threads={[]} onSelect={() => {}} onNew={() => {}} />
    </div>
  );
}

export default defineDemo({
  title: "History",
  description:
    "Chat history grouped by day, with the active thread marked. Rename inline from the menu or by double click; Enter saves, Escape cancels.",
  controls: { editable: toggle(true) },
  playground: ({ editable }) => <Playground editable={editable} />,
  code: () =>
    `<History\n  threads={threads}\n  activeId={threadId}\n  onSelect={openThread}\n  onNew={startThread}\n  onRename={renameThread}\n  onArchive={archiveThread}\n/>`,
  props: [
    { name: "threads", type: "HistoryItem[]" },
    { name: "activeId", type: "string | null", defaultValue: "null" },
    { name: "onSelect", type: "(id: string) => void" },
    { name: "onNew", type: "() => void" },
    { name: "onRename", type: "(id: string, title: string) => void" },
    { name: "onArchive", type: "(id: string) => void" },
    { name: "label", type: "string", defaultValue: '"Conversations"' },
    { name: "emptyText", type: "string", defaultValue: '"No conversations yet."' },
    { name: "now", type: "Date | string", defaultValue: "new Date()" },
    { name: "virtualize", type: "boolean", defaultValue: "true" },
  ],
  examples: {
    Empty: { description: "Before the first conversation.", component: Empty },
    "Long history": {
      description: "1,000 threads. Above 50 threads only the rows near the viewport are mounted.",
      component: LongHistory,
    },
  },
  isNew: true,
});
