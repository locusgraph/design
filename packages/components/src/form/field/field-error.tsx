import { cn } from "cn";
import type * as React from "react";

type FieldErrorMessage = { message?: string } | undefined;

function uniqueMessages(errors: FieldErrorMessage[]) {
  const messages = errors.map((error) => error?.message).filter((message) => !!message);
  return [...new Set(messages)] as string[];
}

function FieldErrorContent({ messages }: { messages: string[] }) {
  if (messages.length === 1) {
    return messages[0];
  }
  return (
    <ul className="ml-4 flex list-disc flex-col gap-1">
      {messages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & { errors?: FieldErrorMessage[] }) {
  const messages = uniqueMessages(errors ?? []);
  if (!children && messages.length === 0) {
    return null;
  }
  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-normal text-destructive", className)}
      {...props}
    >
      {children ?? <FieldErrorContent messages={messages} />}
    </div>
  );
}

export { FieldError };
