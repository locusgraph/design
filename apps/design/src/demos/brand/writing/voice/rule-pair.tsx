import type { ReactNode } from "react";
import type { VoiceRule } from "./voice-rules";

export const voiceViews = ["pairs", "do", "don't"] as const;

export type VoiceView = (typeof voiceViews)[number];

type ExampleCellProps = { verdict: "do" | "don't"; copy: string; children: ReactNode };

function ExampleCell({ verdict, copy, children }: ExampleCellProps) {
  const isDo = verdict === "do";
  return (
    <div className="flex min-w-0 flex-col gap-3 px-4 py-4">
      <span
        className={`flex items-center gap-1.5 text-xs ${isDo ? "text-good" : "text-destructive"}`}
      >
        <span aria-hidden className="font-semibold">
          {isDo ? "✓" : "✕"}
        </span>
        <span className="font-medium">{isDo ? "Do" : "Don't"}</span>
        <span className="sr-only">{copy}</span>
      </span>
      <div className="flex min-h-12 items-center">{children}</div>
    </div>
  );
}

export function RulePair({ rule, view }: { rule: VoiceRule; view: VoiceView }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[14rem_1fr]">
      <div className="flex flex-col gap-1 px-4 py-4 md:border-r">
        <span className="text-sm font-medium">{rule.rule}</span>
        <span className="text-xs text-muted-foreground">{rule.why}</span>
      </div>
      <div
        className={`grid grid-cols-1 divide-y ${view === "pairs" ? "sm:grid-cols-2 sm:divide-x sm:divide-y-0" : ""}`}
      >
        {view !== "don't" && (
          <ExampleCell verdict="do" copy={rule.good.copy}>
            {rule.good.example}
          </ExampleCell>
        )}
        {view !== "do" && (
          <ExampleCell verdict="don't" copy={rule.bad.copy}>
            {rule.bad.example}
          </ExampleCell>
        )}
      </div>
    </div>
  );
}
