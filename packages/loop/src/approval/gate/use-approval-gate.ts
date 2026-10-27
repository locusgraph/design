"use client";

import { useRef, useState } from "react";
import type { RiskLevel, ToolPart } from "../../types";
import type {
  ApprovalChange,
  ApprovalDecision,
  DecidedAt,
  DecisionLogEntry,
  DecisionLogKind,
} from "../types";

export type ApprovalRequest = {
  toolName: string;
  input?: unknown;
  risk?: RiskLevel;
  title?: string;
  actionLabel?: string;
  description?: string;
  changes?: ApprovalChange[];
};

export type OpenApproval = { request: ApprovalRequest; part: ToolPart };

export type UseApprovalGateOptions = {
  by?: string;
  now?: () => DecidedAt;
};

export type ApprovalGateController = {
  open: OpenApproval | null;
  decision?: ApprovalDecision;
  log: DecisionLogEntry[];
  ask: (request: ApprovalRequest) => Promise<ApprovalDecision>;
  approve: () => void;
  deny: (reason?: string) => void;
  allowForRun: () => void;
  resetRun: () => void;
};

const supersededReason = "A newer request replaced this one";
const allowedForRunBy = "Allowed for this run";

function partFor(request: ApprovalRequest, toolCallId: string): ToolPart {
  return {
    type: `tool-${request.toolName}`,
    toolCallId,
    state: "approval-requested",
    input: request.input,
  };
}

function titleOf(request: ApprovalRequest) {
  return request.title ?? request.actionLabel ?? request.toolName;
}

export function useApprovalGate({
  by = "You",
  now = Date.now,
}: UseApprovalGateOptions = {}): ApprovalGateController {
  const [open, setOpen] = useState<OpenApproval | null>(null);
  const [decision, setDecision] = useState<ApprovalDecision>();
  const [log, setLog] = useState<DecisionLogEntry[]>([]);
  const resolveRef = useRef<((decision: ApprovalDecision) => void) | null>(null);
  const openRef = useRef<OpenApproval | null>(null);
  const allowedRef = useRef<Set<string>>(new Set());
  const countRef = useRef(0);

  const nextId = () => {
    countRef.current += 1;
    return `decision_${countRef.current}`;
  };

  const record = (
    request: ApprovalRequest,
    next: ApprovalDecision,
    kind: DecisionLogKind,
    detail?: string
  ) => {
    const entry = { id: nextId(), title: titleOf(request), kind, decision: next, detail };
    setLog((current) => [...current, entry]);
  };

  const settle = (next: ApprovalDecision, kind: DecisionLogKind, detail?: string) => {
    const current = openRef.current;
    if (!current || !resolveRef.current) return;
    setDecision(next);
    record(current.request, next, kind, detail);
    resolveRef.current(next);
    resolveRef.current = null;
  };

  const ask = (request: ApprovalRequest) => {
    if (request.risk !== "destructive" && allowedRef.current.has(request.toolName)) {
      const allowed = { approved: true, by: allowedForRunBy, at: now() };
      record(request, allowed, "rule");
      return Promise.resolve(allowed);
    }
    settle({ approved: false, by, at: now(), reason: supersededReason }, "approval");
    const next = { request, part: partFor(request, nextId()) };
    openRef.current = next;
    setOpen(next);
    setDecision(undefined);
    return new Promise<ApprovalDecision>((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const allowForRun = () => {
    const current = openRef.current;
    if (!current) return;
    allowedRef.current.add(current.request.toolName);
    settle({ approved: true, by, at: now() }, "approval", "Allowed for the rest of this run");
  };

  return {
    open,
    decision,
    log,
    ask,
    approve: () => settle({ approved: true, by, at: now() }, "approval"),
    deny: (reason) => settle({ approved: false, by, at: now(), reason }, "approval"),
    allowForRun,
    resetRun: () => allowedRef.current.clear(),
  };
}
