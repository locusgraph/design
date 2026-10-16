import { Button, Label, Textarea } from "@locusgraph/components";
import { useId, useState } from "react";
import { PanelBody, PanelFooter } from "../../shared/panel";
import { useFocusOnMount } from "../shared/use-focus-on-mount";

type DenyFormProps = {
  onDeny: (reason?: string) => void;
  onBack: () => void;
};

export function DenyForm({ onDeny, onBack }: DenyFormProps) {
  const [reason, setReason] = useState("");
  const reasonId = useId();
  const reasonRef = useFocusOnMount<HTMLTextAreaElement>(true);
  const trimmed = reason.trim();
  return (
    <form
      data-slot="deny-form"
      onSubmit={(event) => {
        event.preventDefault();
        onDeny(trimmed === "" ? undefined : trimmed);
      }}
    >
      <PanelBody className="gap-2 pt-0">
        <Label htmlFor={reasonId} className="text-xs font-normal text-muted-foreground">
          Reason for the agent (optional)
        </Label>
        <Textarea
          id={reasonId}
          ref={reasonRef}
          value={reason}
          placeholder="Tell the agent what to do instead"
          onChange={(event) => setReason(event.target.value)}
        />
      </PanelBody>
      <PanelFooter>
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="destructive" size="sm">
          Send denial
        </Button>
      </PanelFooter>
    </form>
  );
}
