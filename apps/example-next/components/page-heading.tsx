import type * as React from "react";

type PageHeadingProps = {
  meta: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function PageHeading({ meta, title, description, children }: PageHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <p className="font-mono text-2xs text-muted-foreground">{meta}</p>
        <h1 className="text-2xl leading-tight font-semibold tracking-[-0.03em]">{title}</h1>
        <p className="max-w-xl text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
