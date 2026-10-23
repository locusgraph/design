import { LocusGraphMark, LocusGraphWordmark } from "@locusgraph/brand";
import type { ReactNode } from "react";

export const logoForms = ["mark", "wordmark", "lockup"] as const;

export type LogoForm = (typeof logoForms)[number];

export function Logo({ form }: { form: LogoForm }) {
  if (form === "mark") return <LocusGraphMark className="size-[1em]" />;
  return <LocusGraphWordmark withMark={form === "lockup"} className="leading-none" />;
}

function GuideLabel({ className, children }: { className: string; children: ReactNode }) {
  return (
    <span className={`absolute font-mono text-2xs leading-none text-interactive ${className}`}>
      {children}
    </span>
  );
}

export function ClearSpace({ form }: { form: LogoForm }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative text-[64px]">
        <div className="border border-dashed border-interactive p-[0.25em]">
          <div className="flex outline-1 outline-interactive/50 outline-dashed">
            <Logo form={form} />
          </div>
        </div>
        <GuideLabel className="-top-4 left-0">0.25×</GuideLabel>
        <GuideLabel className="top-1/2 -right-9 -translate-y-1/2">0.25×</GuideLabel>
      </div>
      <p className="max-w-sm text-center text-xs text-muted-foreground">
        Keep clear space on every side equal to a quarter of the mark's height. Nothing else, not
        text, not an edge, enters the dashed box.
      </p>
    </div>
  );
}
