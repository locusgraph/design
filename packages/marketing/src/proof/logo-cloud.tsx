import type { ReactNode } from "react";
import { Section, type SectionHeadingProps } from "../section/section";

export type LogoItem = { name: string; logo: ReactNode; href?: string };

type LogoCloudProps = Omit<SectionHeadingProps, "align"> & {
  logos: LogoItem[];
  id?: string;
  className?: string;
};

export function LogoCloud({ logos, ...section }: LogoCloudProps) {
  return (
    <Section
      slot="marketing-logo-cloud"
      align="center"
      className="gap-8 py-12 sm:py-16"
      {...section}
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 text-muted-foreground">
        {logos.map((item) => (
          <li key={item.name} className="flex h-8 items-center [&_img]:h-full [&_svg]:h-full">
            {item.href ? (
              <a
                href={item.href}
                aria-label={item.name}
                className="flex h-full items-center locus-focus-ring"
              >
                {item.logo}
              </a>
            ) : (
              <span role="img" aria-label={item.name} className="flex h-full items-center">
                {item.logo}
              </span>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
