import { type FileItem, Files } from "@locusgraph/loop";
import { useState } from "react";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const layouts = ["inline", "grid"] as const;

const files: FileItem[] = [
  {
    id: "file_memory",
    name: "support-agent-memory.json",
    mediaType: "application/json",
    sizeBytes: 48_210,
  },
  { id: "file_spend", name: "spend-october.csv", mediaType: "text/csv", sizeBytes: 1_284_000 },
  { id: "file_runbook", name: "refund-policy.md", mediaType: "text/markdown", sizeBytes: 6_400 },
];

function Removable() {
  const [items, setItems] = useState(files);
  return (
    <Files
      items={items}
      onRemove={(id) => setItems((current) => current.filter((item) => item.id !== id))}
    />
  );
}

function Grid() {
  return <Files items={files} layout="grid" className="w-full max-w-lg" />;
}

export default defineDemo({
  title: "Files",
  description:
    "Files on a message or in the composer: an icon or image thumbnail, the name, and the size when known. Pass `onRemove` to make each chip removable.",
  controls: { layout: select(layouts), removable: toggle(true) },
  playground: ({ layout, removable }) => (
    <Files
      items={files}
      layout={layout}
      onRemove={removable ? () => {} : undefined}
      className="w-full max-w-lg"
    />
  ),
  code: ({ layout, removable }) =>
    `<Files\n  items={files}${layout === "inline" ? "" : `\n  layout="${layout}"`}${removable ? "\n  onRemove={(id) => removeFile(id)}" : ""}\n/>`,
  props: [
    { name: "items", type: "FileItem[]" },
    { name: "layout", type: layouts.join(" | "), defaultValue: "inline" },
    { name: "onRemove", type: "(id: string) => void" },
    { name: "FileItem", type: "{ id, name, mediaType?, url?, sizeBytes? }" },
    { name: "fileFromFilePart", type: "(part: FilePart, index: number) => FileItem" },
  ],
  examples: {
    Removable: {
      description: "Chips in a composer; each remove button is labelled with the file name.",
      component: Removable,
    },
    Grid: {
      description: "A grid of vertical previews for a message with several files.",
      component: Grid,
    },
  },
  isNew: true,
});
