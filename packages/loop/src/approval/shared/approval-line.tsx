import { cn } from "@locusgraph/components";
import { ShieldWarning as ShieldAlertIcon, Wrench as WrenchIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import { lineIconClass, lineObjectClass, lineRowClass } from "../../shared/line";
import type { RiskLevel } from "../../types";
import { RiskBadge } from "./risk-badge";

type PendingLineProps = {
  icon: ReactNode;
  status?: ReactNode;
  tone?: "warn" | "destructive";
  iconClassName?: string;
  wrap?: boolean;
  after?: ReactNode;
  children: ReactNode;
};

export function PendingLine({
  icon,
  status = "Waiting",
  tone = "warn",
  iconClassName,
  wrap = false,
  after,
  children,
}: PendingLineProps) {
  return (
    <div className={cn(lineRowClass, "w-full text-base", wrap && "items-start")}>
      <span
        aria-hidden
        className={cn(lineIconClass, "size-5 [&_svg]:size-4", wrap && "mt-1.5", iconClassName)}
      >
        {icon}
      </span>
      <span className={wrap ? "min-w-0 py-1" : "min-w-0 truncate"}>
        {status && (
          <>
            <span
              className={cn(
                "font-medium",
                tone === "destructive" ? "text-destructive" : "text-warn"
              )}
            >
              {status}
            </span>{" "}
          </>
        )}
        {children}
      </span>
      {after}
    </div>
  );
}

type ApprovalHeadlineProps = {
  name: string;
  risk?: RiskLevel;
  action?: string;
  icon?: ReactNode;
};

export function ApprovalHeadline({ name, risk, action = "to run", icon }: ApprovalHeadlineProps) {
  const destructive = risk === "destructive";
  const RiskIcon = destructive ? ShieldAlertIcon : WrenchIcon;
  return (
    <PendingLine
      icon={icon ?? <RiskIcon weight="bold" aria-hidden />}
      iconClassName={destructive ? "text-destructive" : undefined}
      after={risk && <RiskBadge risk={risk} className="mt-1.5 ml-1" />}
      wrap
    >
      {action} <span className={lineObjectClass}>{name}</span>
    </PendingLine>
  );
}

type SettledLineProps = {
  name: string;
  verb?: string;
  icon?: ReactNode;
  children: ReactNode;
};

export function SettledLine({ name, verb = "Asked to run", icon, children }: SettledLineProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <div className={lineRowClass}>
        <span aria-hidden className={lineIconClass}>
          {icon ?? <WrenchIcon weight="bold" aria-hidden />}
        </span>
        <span className="truncate">
          {verb} <span className={lineObjectClass}>{name}</span>
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}
