"use client";

import { Button, cn, Input, Spinner } from "@locusgraph/components";
import { type FormEvent, type ReactNode, useId, useState } from "react";

export type WaitlistResult = { error?: string } | undefined;

export type WaitlistFormProps = {
  onSubmit: (email: string) => Promise<WaitlistResult | void>;
  buttonLabel?: string;
  placeholder?: string;
  emailLabel?: string;
  successText?: ReactNode;
  errorText?: string;
  note?: ReactNode;
  className?: string;
};

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

function failureMessage(result: WaitlistResult | void, fallback: string) {
  return result && typeof result.error === "string" ? result.error || fallback : undefined;
}

async function submitOutcome(
  onSubmit: WaitlistFormProps["onSubmit"],
  email: string,
  errorText: string
): Promise<FormState> {
  try {
    const message = failureMessage(await onSubmit(email), errorText);
    return message ? { status: "error", message } : { status: "success" };
  } catch {
    return { status: "error", message: errorText };
  }
}

export function WaitlistForm({
  onSubmit,
  buttonLabel = "Join the waitlist",
  placeholder = "you@company.com",
  emailLabel = "Email",
  successText = "You're on the list. We'll email you when it's your turn.",
  errorText = "Something went wrong. Try again.",
  note,
  className,
}: WaitlistFormProps) {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const inputId = useId();
  const messageId = useId();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    setState({ status: "submitting" });
    setState(await submitOutcome(onSubmit, email, errorText));
  }

  if (state.status === "success") {
    return (
      <p role="status" data-slot="waitlist-success" className={cn("text-sm text-good", className)}>
        {successText}
      </p>
    );
  }

  const submitting = state.status === "submitting";
  const failed = state.status === "error";
  return (
    <form
      data-slot="waitlist-form"
      onSubmit={submit}
      aria-busy={submitting || undefined}
      className={cn("flex w-full max-w-md flex-col gap-2", className)}
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          {emailLabel}
        </label>
        <Input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={placeholder}
          disabled={submitting}
          aria-invalid={failed || undefined}
          aria-describedby={failed ? messageId : undefined}
          className="sm:flex-1"
        />
        <Button type="submit" disabled={submitting}>
          {submitting && <Spinner aria-hidden />}
          {buttonLabel}
        </Button>
      </div>
      {failed && (
        <p id={messageId} role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}
      {note && !failed && <p className="text-xs text-faint">{note}</p>}
    </form>
  );
}
