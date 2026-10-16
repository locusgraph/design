import { Button } from "@locusgraph/components";
import { ArrowUpIcon, PaperclipIcon, SquareIcon } from "lucide-react";
import { useRef } from "react";

export type PromptStatus = "ready" | "submitting" | "streaming" | "error";

export function isPromptBusy(status: PromptStatus): boolean {
  return status === "submitting" || status === "streaming";
}

type PromptSubmitProps = {
  status: PromptStatus;
  canSend: boolean;
  onStop?: () => void;
};

export function PromptSubmit({ status, canSend, onStop }: PromptSubmitProps) {
  if (isPromptBusy(status)) {
    return (
      <Button
        type="button"
        size="icon-sm"
        variant="secondary"
        data-slot="prompt-input-stop"
        aria-label="Stop"
        disabled={!onStop}
        onClick={onStop}
      >
        <SquareIcon aria-hidden="true" className="size-3 fill-current" />
      </Button>
    );
  }
  return (
    <Button
      type="submit"
      size="icon-sm"
      data-slot="prompt-input-send"
      aria-label="Send"
      disabled={!canSend}
    >
      <ArrowUpIcon aria-hidden="true" />
    </Button>
  );
}

type PromptAttachButtonProps = {
  accept?: string;
  disabled?: boolean;
  onAttachFiles: (files: File[]) => void;
};

export function PromptAttachButton({ accept, disabled, onAttachFiles }: PromptAttachButtonProps) {
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
        data-slot="prompt-input-attach"
        aria-label="Attach files"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        <PaperclipIcon aria-hidden="true" />
      </Button>
    </>
  );
}
