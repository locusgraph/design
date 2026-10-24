"use client";

import { cn, Textarea } from "@locusgraph/components";
import * as React from "react";
import { ComposerAttachButton, ComposerSubmit } from "./composer-actions";
import { type ComposerStatus, isComposerBusy } from "./composer-status";
import { useAutoGrow } from "./use-auto-grow";

export type ComposerProps = Omit<React.ComponentProps<"form">, "onSubmit" | "children"> & {
  onSubmit: (text: string, files: File[]) => void;
  onStop?: () => void;
  status?: ComposerStatus;
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

export function Composer({
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
}: ComposerProps) {
  const [uncontrolledText, setUncontrolledText] = React.useState(defaultValue);
  const text = value ?? uncontrolledText;
  const errorId = React.useId();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  useAutoGrow(textareaRef, text);
  const isBusy = isComposerBusy(status);
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
      data-slot="composer"
      data-status={status}
      data-disabled={disabled || undefined}
      aria-busy={isBusy || undefined}
      className={cn(
        "flex flex-col bg-card text-card-foreground ring-1 ring-border transition-shadow focus-within:ring-ring data-[status=error]:ring-destructive data-disabled:opacity-60",
        className
      )}
      onSubmit={(event) => {
        event.preventDefault();
        send();
      }}
      {...props}
    >
      {attachments && (
        <div data-slot="composer-attachments" className="px-3 pt-3 empty:hidden">
          {attachments}
        </div>
      )}
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
        className="max-h-48 min-h-14 resize-none border-0 bg-transparent px-4 pt-3.5 pb-1 text-sm leading-relaxed shadow-none placeholder:text-faint focus-visible:ring-0 dark:bg-transparent"
      />
      {showError && (
        <p id={errorId} role="alert" className="px-4 pt-1 text-xs text-destructive">
          {errorMessage}
        </p>
      )}
      <div data-slot="composer-toolbar" className="flex items-center gap-1 px-2.5 pt-1 pb-2.5">
        {onAttachFiles && (
          <ComposerAttachButton
            accept={accept}
            disabled={disabled || isBusy}
            onAttachFiles={onAttachFiles}
          />
        )}
        {modelSlot && (
          <div
            data-slot="composer-model"
            inert={disabled || undefined}
            className={cn("min-w-0", disabled && "opacity-50")}
          >
            {modelSlot}
          </div>
        )}
        <div className="ml-auto">
          <ComposerSubmit status={status} canSend={canSend} onStop={onStop} />
        </div>
      </div>
    </form>
  );
}
