export type NavSection = { label: string; paths: string[] };

export const loopSections: NavSection[] = [
  {
    label: "Chat",
    paths: [
      "loop/chat/chat",
      "loop/chat/composer",
      "loop/chat/turn",
      "loop/chat/reply",
      "loop/thread/starters",
      "loop/chat/files",
    ],
  },
  {
    label: "Agent",
    paths: [
      "loop/agent/pulse",
      "loop/agent/thinking",
      "loop/agent/tool",
      "loop/agent/steps",
      "loop/thread/code",
    ],
  },
  {
    label: "Memory",
    paths: [
      "loop/memory/sources",
      "loop/memory/cite",
      "loop/memory/recall",
      "loop/memory/memorized",
    ],
  },
  {
    label: "Approval",
    paths: [
      "loop/approval/approval",
      "loop/approval/args-editor",
      "loop/approval/question",
      "loop/approval/plan-review",
    ],
  },
  {
    label: "Oversight",
    paths: [
      "loop/oversight/run-bar",
      "loop/oversight/inbox",
      "loop/oversight/memory-review",
      "loop/oversight/spend-gate",
    ],
  },
  {
    label: "Cost",
    paths: [
      "loop/cost/cost",
      "loop/cost/cost-steps",
      "loop/cost/context",
      "loop/cost/model-picker",
    ],
  },
  {
    label: "Thread",
    paths: ["loop/thread/actions", "loop/thread/history", "loop/thread/canvas"],
  },
];

export const loopPathOrder = loopSections.flatMap((section) => section.paths);
