"use client";

import { cn, Textarea } from "@locusgraph/components";
import * as React from "react";
import {
  isPromptBusy,
  PromptAttachButton,
  type PromptStatus,
  PromptSubmit,
} from "./prompt-actions";
import { useAutoGrow } from "./use-auto-grow";

export type PromptInputProps = Omit<React.ComponentProps<"form">, "onSubmit" | "children"> & {
  onSubmit: (text: string, files: File[]) => void;
  onStop?: () => void;
  status?: PromptStatus;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  files?: File[];
  onAttachFiles?: (files: File[]) => void;
  accept?: string;
  attachments?: React.ReactNode;
  modelSlot?: React.ReactNode;
  errorMessage?: string;
};

const noFiles: File[] = [];

function isSendShortcut(event: React.KeyboardEvent<HTMLTextAreaElement>): boolean {
  return event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing;
}

export function PromptInput({
  onSubmit,
  onStop,
  status = "ready",
  disabled = false,
  value,
  defaultValue = "",
  onValueChange,
  placeholder = "Ask the agent…",
  label = "Message",
  files = noFiles,
  onAttachFiles,
  accept,
  attachments,
  modelSlot,
  errorMessage,
  className,
  ...props
}: PromptInputProps) {
  const [uncontrolledText, setUncontrolledText] = React.useState(defaultValue);
  const text = value ?? uncontrolledText;
  const errorId = React.useId();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  useAutoGrow(textareaRef, text);
  const isBusy = isPromptBusy(status);
  const canSend = !disabled && !isBusy && (text.trim().length > 0 || files.length > 0);

  const changeText = (next: string) => {
    if (value === undefined) {
      setUncontrolledText(next);
    }
    onValueChange?.(next);
  };

  const send = () => {
    if (!canSend) {
      return;
    }
    onSubmit(text.trim(), files);
    changeText("");
  };

  const showError = status === "error" && errorMessage;

  return (
    <form
      data-slot="prompt-input"
      data-status={status}
      data-disabled={disabled || undefined}
      aria-busy={isBusy || undefined}
      className={cn(
        "flex flex-col gap-2 border bg-card p-2 text-card-foreground transition-colors focus-within:border-ring data-[status=error]:border-destructive/50 data-disabled:opacity-60",
        className
      )}
      onSubmit={(event) => {
        event.preventDefault();
        send();
      }}
      {...props}
    >
      {attachments && <div data-slot="prompt-input-attachments">{attachments}</div>}
      <Textarea
        ref={textareaRef}
        aria-label={label}
        aria-invalid={status === "error" || undefined}
        aria-describedby={showError ? errorId : undefined}
        placeholder={placeholder}
        disabled={disabled}
        value={text}
        rows={1}
        onChange={(event) => changeText(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (isSendShortcut(event)) {
            event.preventDefault();
            send();
          }
        }}
        className="max-h-48 min-h-10 resize-none border-0 bg-transparent px-2 py-1.5 shadow-none focus-visible:ring-0 dark:bg-transparent"
      />
      {showError && (
        <p id={errorId} role="alert" className="px-2 text-xs text-destructive">
          {errorMessage}
        </p>
      )}
      <div data-slot="prompt-input-toolbar" className="flex items-center gap-1">
        {onAttachFiles && (
          <PromptAttachButton
            accept={accept}
            disabled={disabled || isBusy}
            onAttachFiles={onAttachFiles}
          />
        )}
        {modelSlot && (
          <div data-slot="prompt-input-model" className="min-w-0">
            {modelSlot}
          </div>
        )}
        <div className="ml-auto">
          <PromptSubmit status={status} canSend={canSend} onStop={onStop} />
        </div>
      </div>
    </form>
  );
}
