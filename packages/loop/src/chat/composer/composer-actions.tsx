"use client";

import {
  ArrowUp as ArrowUpIcon,
  Attachment as PaperclipIcon,
  StopFilledAlt as SquareIcon,
} from "@carbon/icons-react";
import { Button } from "@locusgraph/components";
import { useRef } from "react";
import { type ComposerStatus, isComposerBusy } from "./composer-status";

type ComposerSubmitProps = {
  status: ComposerStatus;
  canSend: boolean;
  onStop?: () => void;
};

export function ComposerSubmit({ status, canSend, onStop }: ComposerSubmitProps) {
  if (isComposerBusy(status)) {
    return (
      <Button
        type="button"
        size="sm"
        variant="outline"
        data-slot="composer-stop"
        aria-label="Stop"
        disabled={!onStop}
        onClick={onStop}
      >
        <SquareIcon aria-hidden="true" className="size-2.5 fill-current" />
        Stop
      </Button>
    );
  }
  return (
    <Button
      type="submit"
      size="icon-sm"
      data-slot="composer-send"
      aria-label="Send"
      disabled={!canSend}
    >
      <ArrowUpIcon aria-hidden="true" />
    </Button>
  );
}

type ComposerAttachButtonProps = {
  accept?: string;
  disabled?: boolean;
  onAttachFiles: (files: File[]) => void;
};

export function ComposerAttachButton({
  accept,
  disabled,
  onAttachFiles,
}: ComposerAttachButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        accept={accept}
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => {
          const picked = Array.from(event.currentTarget.files ?? []);
          event.currentTarget.value = "";
          if (picked.length > 0) {
            onAttachFiles(picked);
          }
        }}
      />
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        data-slot="composer-attach"
        aria-label="Attach files"
        className="text-muted-foreground hover:text-foreground"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        <PaperclipIcon aria-hidden="true" />
      </Button>
    </>
  );
}
