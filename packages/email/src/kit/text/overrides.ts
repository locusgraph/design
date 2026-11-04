import type { WithProduct } from "../brand";

export type TextSlot =
  | "label"
  | "heading"
  | "body"
  | "button"
  | "note"
  | "footer"
  | "subject"
  | "preview";

const textSlots: TextSlot[] = [
  "label",
  "heading",
  "body",
  "button",
  "note",
  "footer",
  "subject",
  "preview",
];

export type TextContext<Data> = Data & { brandName: string };

export type SlotText<Data> = string | ((props: TextContext<Data>) => string);

export type EmailOverrides<Data> = Partial<Record<TextSlot, SlotText<Data>>>;

type RequiredSlot = "label" | "heading" | "body" | "subject" | "preview";

export type DefaultText<Data> = EmailOverrides<Data> & Record<RequiredSlot, SlotText<Data>>;

export type WithOverrides<Data> = Data & WithProduct & { overrides?: EmailOverrides<Data> };

export type ResolvedText = Record<TextSlot, string>;

export function resolveText<Data>(
  defaults: DefaultText<Data>,
  props: WithOverrides<Data>,
  brandName: string
): ResolvedText {
  const context = { ...props, brandName } as TextContext<Data>;
  const slots: EmailOverrides<Data> = { ...defaults, ...props.overrides };
  const entries = textSlots.map((slot) => {
    const value = slots[slot];
    return [slot, typeof value === "function" ? value(context) : (value ?? "")];
  });
  return Object.fromEntries(entries) as ResolvedText;
}
