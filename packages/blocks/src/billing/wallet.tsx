import { Badge, RuleGridCell, RuleGridLabel } from "@locusgraph/components";
import { balanceLevel, formatDate, formatMicroUsd } from "@locusgraph/utils";
import type { WalletGrant } from "../types";

type WalletProps = {
  balanceMicroUsd: number;
  debtMicroUsd?: number;
  grants: WalletGrant[];
};

const levelHint = {
  low: { badge: "Low", text: "Add credits before usage stops.", tone: "text-warn" },
  empty: {
    badge: "Empty",
    text: "Paid usage is paused until you add credits.",
    tone: "text-destructive",
  },
} as const;

function GrantList({ grants }: { grants: WalletGrant[] }) {
  return (
    <ul className="flex flex-col divide-y divide-line">
      {grants.map((grant) => (
        <li key={`${grant.label}:${grant.expiresAt}`} className="flex justify-between gap-4 py-2">
          <span>{grant.label}</span>
          <span className="flex items-baseline gap-2 tabular-nums">
            <span className="font-medium text-foreground">
              {formatMicroUsd(grant.remainingMicroUsd)}
            </span>
            <span className="text-muted-foreground">
              {grant.expiresAt ? `expires ${formatDate(grant.expiresAt)}` : "never expires"}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Wallet({ balanceMicroUsd, debtMicroUsd = 0, grants }: WalletProps) {
  const level = balanceLevel(balanceMicroUsd);
  const hint = level === "fine" ? null : levelHint[level];
  return (
    <RuleGridCell data-level={level} className="gap-4">
      <span className="flex min-h-6 items-center justify-between">
        <RuleGridLabel>Prepaid credits</RuleGridLabel>
        {hint && (
          <Badge
            variant={level === "empty" ? "destructive" : "secondary"}
            className={level === "low" ? "text-warn" : undefined}
          >
            {hint.badge}
          </Badge>
        )}
      </span>
      <div className="flex flex-col gap-1">
        <span
          className={`font-heading text-3xl font-semibold tracking-[-0.02em] tabular-nums ${hint?.tone ?? ""}`}
        >
          {formatMicroUsd(balanceMicroUsd)}
        </span>
        {hint && <p className="text-sm text-muted-foreground">{hint.text}</p>}
      </div>
      <div className="flex flex-col gap-3 text-sm">
        {grants.length > 0 && <GrantList grants={grants} />}
        {grants.length === 0 && level !== "empty" && (
          <p className="text-muted-foreground">No credit grants to show.</p>
        )}
        {debtMicroUsd > 0 && (
          <p className="text-destructive">
            {formatMicroUsd(debtMicroUsd)} owed. It comes out of the next credits you add.
          </p>
        )}
      </div>
    </RuleGridCell>
  );
}
