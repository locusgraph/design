import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@locusgraph/components";
import { useState } from "react";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const lengths = ["6", "4", "8"] as const;

function Separated() {
  return (
    <InputOTP maxLength={6} aria-label="Verification code">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

function Controlled() {
  const [code, setCode] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <InputOTP
        maxLength={6}
        value={code}
        onChange={setCode}
        pattern="^\d+$"
        aria-label="Verification code"
      >
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">
        {code.length === 6 ? `Verifying ${code}...` : "Digits only."}
      </p>
    </div>
  );
}

function WithField() {
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor="two-factor">Authentication code</FieldLabel>
      <InputOTP id="two-factor" maxLength={6}>
        <InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <FieldDescription>Enter the code from your authenticator app.</FieldDescription>
    </Field>
  );
}

function Invalid() {
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor="rejected-code">Verification code</FieldLabel>
      <InputOTP id="rejected-code" maxLength={4} defaultValue="1234">
        <InputOTPGroup>
          {[0, 1, 2, 3].map((index) => (
            <InputOTPSlot key={index} index={index} aria-invalid="true" />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <FieldError>That code has expired. Request a new one.</FieldError>
    </Field>
  );
}

export default defineDemo({
  title: "Input OTP",
  isNew: true,
  description:
    "A one-time code field split into slots. Use it to confirm a login or a sensitive change such as a new API key.",
  controls: {
    length: select(lengths),
    separator: toggle(),
    disabled: toggle(),
  },
  playground: ({ length, separator, disabled }) => {
    const slots = Array.from({ length: Number(length) }, (_, index) => index);
    const half = slots.length / 2;
    return (
      <InputOTP
        key={length}
        maxLength={Number(length)}
        disabled={disabled}
        aria-label="Verification code"
      >
        <InputOTPGroup>
          {(separator ? slots.slice(0, half) : slots).map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
        {separator && <InputOTPSeparator />}
        {separator && (
          <InputOTPGroup>
            {slots.slice(half).map((index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        )}
      </InputOTP>
    );
  },
  code: ({ length, separator, disabled }) => {
    const slots = Array.from({ length: Number(length) }, (_, index) => index);
    const half = slots.length / 2;
    const group = (indexes: number[]) =>
      `  <InputOTPGroup>\n${indexes.map((index) => `    <InputOTPSlot index={${index}} />`).join("\n")}\n  </InputOTPGroup>`;
    const body = separator
      ? `${group(slots.slice(0, half))}\n  <InputOTPSeparator />\n${group(slots.slice(half))}`
      : group(slots);
    return `<InputOTP maxLength={${length}}${formatProp("disabled", disabled, false)}>\n${body}\n</InputOTP>`;
  },
  props: [
    { name: "maxLength", type: "number" },
    { name: "value / onChange", type: "controlled string" },
    { name: "pattern", type: "string (regular expression)" },
    { name: "onComplete", type: "(value: string) => void" },
    { name: "disabled", type: "boolean", defaultValue: "false" },
    { name: "containerClassName", type: "string" },
    { name: "InputOTPSlot.index", type: "number" },
  ],
  examples: {
    Separated: {
      description: "A separator splits a six digit code into two groups of three.",
      component: Separated,
    },
    Controlled: {
      description: "value and onChange track the code, and pattern allows digits only.",
      component: Controlled,
    },
    WithField: {
      description: "Field adds a label and a description for two-factor login.",
      component: WithField,
    },
    Invalid: {
      description: "aria-invalid on each slot marks a code that was rejected.",
      component: Invalid,
    },
  },
  composition: {
    name: "InputOTP",
    children: [
      { name: "InputOTPGroup", children: [{ name: "InputOTPSlot" }, { name: "InputOTPSlot" }] },
      { name: "InputOTPSeparator" },
      { name: "InputOTPGroup", children: [{ name: "InputOTPSlot" }, { name: "InputOTPSlot" }] },
    ],
  },
});
