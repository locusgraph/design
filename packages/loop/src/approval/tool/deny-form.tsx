import { Button, Label, Textarea } from "@locusgraph/components";
import { useId, useState } from "react";
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
      className="flex flex-col gap-2 pl-6"
      onSubmit={(event) => {
        event.preventDefault();
        onDeny(trimmed === "" ? undefined : trimmed);
      }}
    >
      <Label htmlFor={reasonId} className="text-xs font-normal text-faint">
        Reason for the agent (optional)
      </Label>
      <Textarea
        id={reasonId}
        ref={reasonRef}
        value={reason}
        placeholder="Tell the agent what to do instead"
        className="bg-background"
        onChange={(event) => setReason(event.target.value)}
      />
      <div className="flex flex-wrap gap-2 pt-1">
        <Button type="submit" variant="destructive" size="sm">
          Send denial
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>
          Back
        </Button>
      </div>
    </form>
  );
}
