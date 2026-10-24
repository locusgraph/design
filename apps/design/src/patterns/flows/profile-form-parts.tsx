import { Button, FieldLabel, RuleGridFooter, Spinner } from "@locusgraph/components";
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

export function describedByIds(...ids: (string | false)[]) {
  const present = ids.filter(Boolean);
  return present.length > 0 ? present.join(" ") : undefined;
}

type FooterStatusProps = { saving: boolean; savedName: string | null; hint: string };

function footerStatusText({ saving, savedName, hint }: FooterStatusProps) {
  if (saving) return "Saving your changes…";
  if (savedName !== null) return `Saved ${savedName}'s profile.`;
  return hint;
}

function FooterStatus(props: FooterStatusProps) {
  const saved = !props.saving && props.savedName !== null;
  return (
    <p
      role="status"
      className="flex w-full items-center gap-2 text-sm text-muted-foreground sm:ml-2 sm:w-auto"
    >
      {saved ? <span aria-hidden="true" className="size-1.5 rounded-full bg-good" /> : null}
      {footerStatusText(props)}
    </p>
  );
}

type ProfileFooterProps = FooterStatusProps & { canSave: boolean; onCancel?: () => void };

export function ProfileFooter({ canSave, saving, savedName, hint, onCancel }: ProfileFooterProps) {
  return (
    <RuleGridFooter className="mx-0 mb-0">
      <Button type="submit" disabled={!canSave} aria-disabled={saving} aria-busy={saving}>
        {saving ? <Spinner /> : null}
        {saving ? "Saving…" : "Save profile"}
      </Button>
      <Button type="button" variant="ghost" onClick={onCancel} disabled={saving}>
        Cancel
      </Button>
      <FooterStatus saving={saving} savedName={savedName} hint={hint} />
    </RuleGridFooter>
  );
}
