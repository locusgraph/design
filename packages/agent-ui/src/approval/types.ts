import type { RiskLevel } from "../types";

export type DecidedAt = number | string | Date;

export type ApprovalDecision = {
  approved: boolean;
  by: string;
  at: DecidedAt;
  reason?: string;
};

export type ArgFieldType = "text" | "number" | "boolean" | "select";

export type ArgFieldOption = { value: string; label: string };

export type ArgField = {
  name: string;
  label: string;
  type: ArgFieldType;
  options?: ArgFieldOption[];
  required?: boolean;
  min?: number;
  max?: number;
  description?: string;
};

export type ArgValue = string | number | boolean;

export type ArgValues = Record<string, ArgValue>;

export type PlanStepDraft = { id: string; title: string; detail?: string };

export type QuestionOption = { id: string; label: string; description?: string };

export type QuestionAnswer = { optionId?: string; text?: string };

export type ProposedMemory = { id: string; text: string; kind?: string; sensitive?: boolean };

export type MemoryReviewResult = {
  kept: ProposedMemory[];
  edited: ProposedMemory[];
  discarded: ProposedMemory[];
};

export type RunControlStatus = "running" | "paused" | "stopped" | "done";

export type PendingApproval = {
  id: string;
  title: string;
  runName: string;
  risk: RiskLevel;
  requestedAt: DecidedAt;
  summary?: string;
};
