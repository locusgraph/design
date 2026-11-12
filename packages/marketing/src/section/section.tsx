import { cn } from "@locusgraph/components";
import type { ReactNode } from "react";

export type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
};

type SectionProps = SectionHeadingProps & {
  slot: string;
  id?: string;
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
}: SectionHeadingProps) {
  if (!eyebrow && !title && !description) return null;
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        centered && "mx-auto items-center text-center"
      )}
    >
      {eyebrow && <p className="locus-eyebrow">{eyebrow}</p>}
      {title && <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>}
      {description && <p className="text-lg text-muted-foreground">{description}</p>}
    </div>
  );
}

export function Section({ slot, id, className, children, ...heading }: SectionProps) {
  return (
    <section
      id={id}
      data-slot={slot}
      className={cn(
        "mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 sm:py-24",
        className
      )}
    >
      <SectionHeading {...heading} />
      {children}
    </section>
  );
}
