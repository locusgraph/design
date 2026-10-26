import { Alert, AlertDescription, AlertTitle, Button } from "@locusgraph/components";
import {
  type BalanceLevel,
  balanceLevel,
  formatCount,
  formatMicroUsd,
  quotaStatus,
} from "@locusgraph/utils";
import { WarningCircle as CircleAlertIcon } from "@phosphor-icons/react/ssr";
import { type LinkComponent, periodLabel, type QuotaData } from "../types";

type UsageAlertProps = {
  balanceMicroUsd: number | null;
  quotas: QuotaData[];
  paidPlan: boolean;
  buyCreditsHref: string;
  upgradeHref: string;
  lowAtMicroUsd?: number;
  linkComponent?: LinkComponent | "a";
};

function attentionTitle(level: BalanceLevel, overCount: number) {
  if (level === "empty") return "Out of credits";
  if (overCount === 0) return "Credits are running low";
  return level === "low"
    ? "Usage is over your plan and credits are low"
    : "Usage is over your plan";
}

const toneClasses = {
  warn: "bg-warn/5 [&>svg]:text-warn",
  destructive: "bg-destructive/5 text-card-foreground [&>svg]:text-destructive",
} as const;

export function UsageAlert({
  balanceMicroUsd,
  quotas,
  paidPlan,
  buyCreditsHref,
  upgradeHref,
  lowAtMicroUsd,
  linkComponent: Link = "a",
}: UsageAlertProps) {
  const level = balanceMicroUsd === null ? "fine" : balanceLevel(balanceMicroUsd, lowAtMicroUsd);
  const over = quotas.filter((quota) => quotaStatus(quota) === "over");
  if (level === "fine" && over.length === 0) return null;
  const empty = level === "empty";
  const upgradeFirst = !paidPlan && over.length > 0;
  return (
    <Alert className={toneClasses[empty ? "destructive" : "warn"]}>
      <CircleAlertIcon weight="bold" aria-hidden />
      <AlertTitle>{attentionTitle(level, over.length)}</AlertTitle>
      <AlertDescription className="flex flex-col items-start gap-3">
        <ul className="flex flex-col gap-1">
          {over.map((quota) => (
            <li key={quota.key}>
              <span className={quota.label ? undefined : "font-mono"}>
                {quota.label ?? quota.key}
              </span>
              : {formatCount(quota.used)} of {formatCount(quota.included)}{" "}
              {periodLabel(quota.period)}.
            </li>
          ))}
          {balanceMicroUsd !== null && level !== "fine" && (
            <li>
              {empty
                ? "Paid usage is paused until you add credits."
                : `${formatMicroUsd(balanceMicroUsd)} of credits left.`}
            </li>
          )}
        </ul>
        <div className="flex flex-wrap items-center gap-2">
          {!paidPlan && (
            <Button asChild size="sm" variant={upgradeFirst ? "default" : "ghost"}>
              <Link href={upgradeHref}>Upgrade to Pro</Link>
            </Button>
          )}
          <Button asChild size="sm" variant={upgradeFirst ? "ghost" : "default"}>
            <Link href={buyCreditsHref}>Buy credits</Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
