import type { PlanStepDraft } from "../types";
import type { StepAction } from "./plan-step-row";

export function applyStepAction(
  steps: PlanStepDraft[],
  stepId: string,
  action: StepAction
): PlanStepDraft[] {
  const index = steps.findIndex((step) => step.id === stepId);
  if (index === -1) return steps;
  if (action === "remove") return steps.filter((step) => step.id !== stepId);
  const target = action === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= steps.length) return steps;
  const reordered = [...steps];
  const [moved] = reordered.splice(index, 1);
  if (moved) reordered.splice(target, 0, moved);
  return reordered;
}

export function focusAfterAction(
  steps: PlanStepDraft[],
  stepId: string,
  action: StepAction
): { stepId: string; control: StepAction | "title" } | null {
  if (action !== "remove") {
    const index = steps.findIndex((step) => step.id === stepId);
    const atEdge = action === "up" ? index === 0 : index === steps.length - 1;
    return { stepId, control: atEdge ? "title" : action };
  }
  const neighbor = steps[0];
  return neighbor ? { stepId: neighbor.id, control: "title" } : null;
}

export function describeStepAction(position: number, action: StepAction) {
  if (action === "remove") return `Step ${position + 1} removed.`;
  return `Step moved ${action}.`;
}
