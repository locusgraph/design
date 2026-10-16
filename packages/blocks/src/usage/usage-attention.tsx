import { Alert, AlertDescription, AlertTitle, Button } from "@locusgraph/components";
import { balanceLevel, formatCount, formatMicroUsd, quotaStatus } from "@locusgraph/utils";
import { CircleAlertIcon } from "lucide-react";
import { type LinkComponent, periodLabel, type Quota } from "../types";

type UsageAttentionProps = {
  balanceMicroUsd: number | null;
  quotas: Quota[];
  paidPlan: boolean;
  buyCreditsHref: string;
  upgradeHref: string;
  linkComponent?: LinkComponent | "a";
};

function attentionTitle(empty: boolean, overCount: number) {
  if (empty) return "Out of credits";
  return overCount > 0 ? "Usage is over your plan" : "Credits are running low";
}

export function UsageAttention({
  balanceMicroUsd,
  quotas,
  paidPlan,
  buyCreditsHref,
  upgradeHref,
  linkComponent: Link = "a",
}: UsageAttentionProps) {
  const level = balanceMicroUsd === null ? "fine" : balanceLevel(balanceMicroUsd);
  const over = quotas.filter((quota) => quotaStatus(quota) === "over");
  if (level === "fine" && over.length === 0) return null;
  const empty = level === "empty";
  return (
    <Alert
      variant={empty ? "destructive" : "default"}
      className={empty ? undefined : "text-warn *:data-[slot=alert-description]:text-warn/85"}
    >
      <CircleAlertIcon />
      <AlertTitle>{attentionTitle(empty, over.length)}</AlertTitle>
      <AlertDescription className="flex flex-wrap items-end justify-between gap-4">
        <ul className="flex flex-col gap-1">
          {over.map((quota) => (
            <li key={quota.key}>
              <span className="font-mono">{quota.key}</span> is at {formatCount(quota.used)} of{" "}
              {formatCount(quota.included)} {periodLabel(quota.period)}.
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
        <div className="flex items-center gap-4">
          {!paidPlan && (
            <Link
              href={upgradeHref}
              className="text-sm text-foreground underline-offset-4 hover:underline"
            >
              Upgrade to Pro
            </Link>
          )}
          <Button asChild size="sm">
            <Link href={buyCreditsHref}>Buy credits</Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
