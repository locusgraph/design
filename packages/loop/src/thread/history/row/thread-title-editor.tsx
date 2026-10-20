"use client";

import { Input } from "@locusgraph/components";
import { useState } from "react";

type ThreadTitleEditorProps = {
  title: string;
  onCommit: (title: string) => void;
  onCancel: () => void;
};

export function ThreadTitleEditor({ title, onCommit, onCancel }: ThreadTitleEditorProps) {
  const [draft, setDraft] = useState(title);
  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== title) {
      onCommit(trimmed);
    } else {
      onCancel();
    }
  };
  return (
    <Input
      data-slot="thread-title-editor"
      aria-label="Chat title"
      autoFocus
      value={draft}
      className="h-7 text-sm"
      onChange={(event) => setDraft(event.target.value)}
      onFocus={(event) => event.target.select()}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          commit();
        }
        if (event.key === "Escape") {
          event.preventDefault();
          onCancel();
        }
      }}
    />
  );
}
