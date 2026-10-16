import { FieldLabel } from "@locusgraph/components";
import type { ReactNode } from "react";

export function RequiredLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <FieldLabel htmlFor={htmlFor}>
      {children}
      <span aria-hidden="true" className="text-muted-foreground">
        *
      </span>
    </FieldLabel>
  );
}

type FooterStatusProps = { saving: boolean; savedName: string | null; hint: string };

function footerStatusText({ saving, savedName, hint }: FooterStatusProps) {
  if (saving) return "Saving your changes…";
  if (savedName !== null) return `Saved ${savedName}'s profile.`;
  return hint;
}

export function FooterStatus(props: FooterStatusProps) {
  const saved = !props.saving && props.savedName !== null;
  return (
    <p
      role="status"
      className="flex w-full items-center gap-2 text-sm text-muted-foreground sm:mr-auto sm:w-auto"
    >
      {saved ? <span aria-hidden="true" className="size-1.5 rounded-full bg-good" /> : null}
      {footerStatusText(props)}
    </p>
  );
}
