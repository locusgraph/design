import { LocusGraphMark, LocusGraphWordmark } from "@locusgraph/brand";
import type { ReactNode } from "react";

type LogoRule = { label: string; correct: boolean; logo: ReactNode; backdrop?: string };

const busyBackdrop =
  "repeating-linear-gradient(45deg, var(--locus-s1) 0 10px, var(--locus-s2) 10px 20px, var(--locus-s3) 20px 30px)";

const lockup = <LocusGraphWordmark withMark className="text-base" />;

export const logoRules: LogoRule[] = [
  { label: "Use the lockup as supplied", correct: true, logo: lockup },
  {
    label: "Don't stretch or squash it",
    correct: false,
    logo: <LocusGraphWordmark withMark className="origin-center scale-x-125 text-base" />,
  },
  {
    label: "Don't recolor it",
    correct: false,
    logo: <LocusGraphWordmark withMark className="text-base text-s2" />,
  },
  {
    label: "Don't rotate it",
    correct: false,
    logo: <LocusGraphWordmark withMark className="-rotate-12 text-base" />,
  },
  {
    label: "Don't add shadows or effects",
    correct: false,
    logo: (
      <LocusGraphWordmark
        withMark
        className="text-base drop-shadow-[0_3px_3px_color-mix(in_oklch,var(--locus-s1)_70%,transparent)]"
      />
    ),
  },
  {
    label: "Don't fade it or lower its contrast",
    correct: false,
    logo: <LocusGraphWordmark withMark className="text-base opacity-25" />,
  },
  {
    label: "Don't place it on a busy background",
    correct: false,
    logo: lockup,
    backdrop: busyBackdrop,
  },
  {
    label: "Don't rearrange the lockup",
    correct: false,
    logo: (
      <span className="inline-flex flex-col items-center gap-1 text-base">
        <LocusGraphWordmark />
        <LocusGraphMark className="size-[1.1em]" />
      </span>
    ),
  },
];

function RuleVerdict({ rule }: { rule: LogoRule }) {
  return (
    <span
      className={`flex items-center gap-1.5 text-xs ${rule.correct ? "text-good" : "text-destructive"}`}
    >
      <span aria-hidden className="font-semibold">
        {rule.correct ? "✓" : "✕"}
      </span>
      {rule.label}
    </span>
  );
}

export function LogoRuleGrid() {
  return (
    <div className="grid w-[48rem] max-w-full grid-cols-1 gap-px bg-border ring-1 ring-border sm:grid-cols-2 lg:grid-cols-4">
      {logoRules.map((rule) => (
        <div key={rule.label} className="flex flex-col bg-background">
          <div
            className="flex h-28 items-center justify-center overflow-hidden"
            style={rule.backdrop ? { background: rule.backdrop } : undefined}
          >
            {rule.logo}
          </div>
          <div className="border-t px-3 py-2.5">
            <RuleVerdict rule={rule} />
          </div>
        </div>
      ))}
    </div>
  );
}
