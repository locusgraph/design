import {
  Composer,
  type ComposerStatus,
  type FileItem,
  Files,
  type ModelOption,
  ModelPicker,
} from "@locusgraph/loop";
import { useState } from "react";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const statuses = ["ready", "submitting", "streaming", "error"] as const;

const attached: FileItem[] = [
  { id: "file_spend", name: "spend-october.csv", mediaType: "text/csv", sizeBytes: 1_284_000 },
];

const models: ModelOption[] = [
  {
    id: "claude-sonnet-5-5",
    name: "Claude Sonnet 5.5",
    provider: "Anthropic",
    inputPerMillionMicroUsd: 3_000_000,
    outputPerMillionMicroUsd: 15_000_000,
    speed: "balanced",
    contextTokens: 1_000_000,
  },
  {
    id: "claude-haiku-5-5",
    name: "Claude Haiku 5.5",
    provider: "Anthropic",
    inputPerMillionMicroUsd: 1_000_000,
    outputPerMillionMicroUsd: 5_000_000,
    speed: "fast",
    contextTokens: 200_000,
  },
];

function ComposerModel({ disabled }: { disabled?: boolean }) {
  const [modelId, setModelId] = useState("claude-sonnet-5-5");
  return <ModelPicker models={models} value={modelId} onChange={setModelId} disabled={disabled} />;
}

function itemsFromFiles(files: File[]): FileItem[] {
  return files.map((file, index) => ({
    id: `${index}:${file.name}`,
    name: file.name,
    mediaType: file.type,
    sizeBytes: file.size,
  }));
}

function WithFiles() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<ComposerStatus>("ready");
  return (
    <Composer
      className="w-full max-w-xl"
      status={status}
      files={files}
      onAttachFiles={(picked) => setFiles((current) => [...current, ...picked])}
      attachments={
        <Files
          items={itemsFromFiles(files)}
          onRemove={(id) =>
            setFiles((current) => current.filter((file, index) => `${index}:${file.name}` !== id))
          }
        />
      }
      modelSlot={<ComposerModel />}
      onSubmit={() => {
        setFiles([]);
        setStatus("streaming");
      }}
      onStop={() => setStatus("ready")}
    />
  );
}

export default defineDemo({
  title: "Composer",
  description:
    "The composer. Enter sends, Shift+Enter adds a line, and the textarea grows with the text. While a run is submitting or streaming the send button becomes Stop.",
  controls: {
    status: select(statuses),
    attachments: toggle(false),
    disabled: toggle(false),
  },
  playground: ({ status, attachments, disabled }) => (
    <Composer
      className="w-full max-w-xl"
      status={status}
      disabled={disabled}
      placeholder="Ask what your agents remember or spend…"
      errorMessage="The model did not answer. Try again."
      attachments={attachments ? <Files items={attached} onRemove={() => {}} /> : undefined}
      modelSlot={<ComposerModel disabled={disabled} />}
      onAttachFiles={() => {}}
      onSubmit={() => {}}
      onStop={() => {}}
    />
  ),
  code: ({ status, attachments, disabled }) =>
    [
      "<Composer",
      `  status="${status}"`,
      disabled && "  disabled",
      status === "error" && "  errorMessage={error?.message}",
      attachments && "  files={files}",
      "  onAttachFiles={addFiles}",
      attachments && "  attachments={<Files items={items} onRemove={removeFile} />}",
      "  modelSlot={<ModelPicker />}",
      "  onSubmit={(text, files) => sendMessage({ text, files })}",
      "  onStop={stop}",
      "/>",
    ]
      .filter(Boolean)
      .join("\n"),
  props: [
    { name: "onSubmit", type: "(text: string, files: File[]) => void" },
    { name: "onStop", type: "() => void" },
    { name: "status", type: statuses.join(" | "), defaultValue: "ready" },
    { name: "disabled", type: "boolean", defaultValue: "false" },
    { name: "value / defaultValue / onValueChange", type: "string, (value: string) => void" },
    { name: "files", type: "File[]", defaultValue: "[]" },
    { name: "onAttachFiles", type: "(files: File[]) => void" },
    { name: "attachments", type: "ReactNode" },
    { name: "modelSlot", type: "ReactNode" },
    { name: "errorMessage", type: "string" },
  ],
  examples: {
    WithFiles: {
      description: "Attach files with the paperclip, send, then stop the stream.",
      component: WithFiles,
    },
  },
  isNew: true,
});
