"use client";

import { TrashCan as TrashIcon } from "@carbon/icons-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Field,
  FieldLabel,
  Input,
} from "@locusgraph/components";
import { useRef, useState } from "react";
import { SettingsSection } from "./settings-section";

type SettingsDangerProps = {
  workspaceSlug: string;
  onDelete: () => void;
};

export function SettingsDanger({ workspaceSlug, onDelete }: SettingsDangerProps) {
  const [confirmation, setConfirmation] = useState("");
  const confirmed = confirmation === workspaceSlug;
  const confirmationInput = useRef<HTMLInputElement>(null);
  const focusConfirmationInput = (event: Event) => {
    event.preventDefault();
    confirmationInput.current?.focus();
  };
  return (
    <SettingsSection
      title="Danger zone"
      description="Actions here cannot be undone."
      footer={
        <AlertDialog onOpenChange={() => setConfirmation("")}>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <TrashIcon aria-hidden="true" />
              Delete workspace
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent onOpenAutoFocus={focusConfirmationInput}>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {workspaceSlug}?</AlertDialogTitle>
              <AlertDialogDescription>
                Members lose access, API keys stop working and the usage history is erased. This
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Field>
              <FieldLabel htmlFor="delete-confirmation">
                Type <span className="font-mono">{workspaceSlug}</span> to confirm
              </FieldLabel>
              <Input
                ref={confirmationInput}
                id="delete-confirmation"
                autoComplete="off"
                spellCheck={false}
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
              />
            </Field>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" disabled={!confirmed} onClick={onDelete}>
                Delete {workspaceSlug}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
    >
      <p className="text-sm text-muted-foreground">
        Deleting the workspace removes its members, API keys and usage history for good.
      </p>
    </SettingsSection>
  );
}
