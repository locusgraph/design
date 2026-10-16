import {
  RuleGrid,
  RuleGridCell,
  RuleGridFooter,
  RuleGridHeader,
  RuleGridLabel,
} from "@locusgraph/components";
import type { ReactNode } from "react";

type SettingsSectionProps = {
  title: string;
  description: string;
  footer: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function SettingsSection({
  title,
  description,
  footer,
  children,
  className,
}: SettingsSectionProps) {
  return (
    <RuleGrid columns={1} className={className}>
      <RuleGridCell className="gap-5">
        <RuleGridHeader className="mb-0 flex-col items-start gap-0.5 py-3">
          <RuleGridLabel>{title}</RuleGridLabel>
          <p className="text-sm text-muted-foreground">{description}</p>
        </RuleGridHeader>
        {children}
        <RuleGridFooter className="justify-end">{footer}</RuleGridFooter>
      </RuleGridCell>
    </RuleGrid>
  );
}
