import type { ComponentType } from "react";

export type ShellDefinition = {
  title: string;
  description: string;
  importLine: string;
  component: ComponentType;
};

export function defineShell(shell: ShellDefinition): ShellDefinition {
  return shell;
}
