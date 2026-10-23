import { ShieldAlert as ShieldAlertIcon, Tools as WrenchIcon } from "@carbon/icons-react";
import { cn } from "@locusgraph/components";
import type { ReactNode } from "react";
import { lineIconClass, lineObjectClass, lineRowClass } from "../../shared/line";
import type { RiskLevel } from "../../types";
import { RiskBadge } from "./risk-badge";

type ApprovalHeadlineProps = {
  name: string;
  risk: RiskLevel;
  action?: string;
  icon?: ReactNode;
};

export function ApprovalHeadline({ name, risk, action = "to run", icon }: ApprovalHeadlineProps) {
  const destructive = risk === "destructive";
  const RiskIcon = destructive ? ShieldAlertIcon : WrenchIcon;
  return (
    <div className={cn(lineRowClass, "w-full text-base")}>
      <span
        aria-hidden
        className={cn(lineIconClass, "size-5 [&_svg]:size-4", destructive && "text-destructive")}
      >
        {icon ?? <RiskIcon />}
      </span>
      <span className="min-w-0 truncate">
        <span className="font-medium text-warn">Waiting</span> {action}{" "}
        <span className={lineObjectClass}>{name}</span>
      </span>
      <RiskBadge risk={risk} className="ml-1" />
    </div>
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
          {icon ?? <WrenchIcon />}
        </span>
        <span className="truncate">
          {verb} <span className={lineObjectClass}>{name}</span>
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}
