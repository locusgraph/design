import type { ComponentType, ReactNode } from "react";

type SelectControl<Option extends string> = {
  kind: "select";
  options: readonly Option[];
  initial: Option;
};
type ToggleControl = { kind: "toggle"; initial: boolean };
type TextControl = { kind: "text"; initial: string };

export type Control = SelectControl<string> | ToggleControl | TextControl;
export type Controls = Record<string, Control>;
export type ControlValue = string | boolean;

export type ControlValues<C extends Controls> = {
  [Key in keyof C]: C[Key] extends SelectControl<infer Option>
    ? Option
    : C[Key] extends ToggleControl
      ? boolean
      : string;
};

export type CompositionNode = { name: string; children?: CompositionNode[] };

export type ExampleDefinition = ComponentType | { description: string; component: ComponentType };

export type PreviewHeight = "auto" | "tall";

export type PropRow = { name: string; type: string; defaultValue?: string };

export type Demo<C extends Controls = Controls> = {
  title: string;
  description: string;
  controls: C;
  playground(values: ControlValues<C>): ReactNode;
  code(values: ControlValues<C>): string;
  props: PropRow[];
  examples: Record<string, ExampleDefinition>;
  composition?: CompositionNode;
  previewHeight?: PreviewHeight;
  isNew?: boolean;
};

export function select<const Option extends string>(
  options: readonly Option[],
  initial: Option = options[0] as Option
): SelectControl<Option> {
  return { kind: "select", options, initial };
}

export function toggle(initial = false): ToggleControl {
  return { kind: "toggle", initial };
}

export function text(initial: string): TextControl {
  return { kind: "text", initial };
}

export function defineDemo<C extends Controls>(demo: Demo<C>): Demo<C> {
  return demo;
}
