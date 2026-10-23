"use client";

import { Minus as MinusIcon } from "@phosphor-icons/react/ssr";
import { cn } from "cn";
import { OTPInput, OTPInputContext } from "input-otp";
import * as React from "react";

function InputOTP({
  className,
  containerClassName,
  value,
  defaultValue,
  onChange,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    typeof defaultValue === "string" ? defaultValue : ""
  );
  const controlled = value !== undefined;
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      value={controlled ? value : uncontrolledValue}
      onChange={(next: string) => {
        if (!controlled) setUncontrolledValue(next);
        onChange?.(next);
      }}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-group" className={cn("flex items-center", className)} {...props} />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-control items-center justify-center border-y border-r border-input font-mono text-base tabular-nums shadow-xs transition-[color,background-color,border-color,box-shadow] duration-150 ease-out outline-none first:border-l aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-1 data-[active=true]:ring-ring data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon weight="bold" aria-hidden />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
