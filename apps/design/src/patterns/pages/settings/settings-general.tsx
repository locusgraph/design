"use client";

import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@locusgraph/components";
import { useId, useState } from "react";
import { type WorkspaceGeneral, workspaceUrlPrefix } from "./settings-data";
import { SettingsSection } from "./settings-section";

type SettingsGeneralProps = {
  workspace: WorkspaceGeneral;
  timezones: string[];
  onSave: (workspace: WorkspaceGeneral) => void;
};

function hasChanged(saved: WorkspaceGeneral, draft: WorkspaceGeneral) {
  return (
    saved.name !== draft.name || saved.slug !== draft.slug || saved.timezone !== draft.timezone
  );
}

export function SettingsGeneral({ workspace, timezones, onSave }: SettingsGeneralProps) {
  const fieldId = useId();
  const [saved, setSaved] = useState(workspace);
  const [draft, setDraft] = useState(workspace);
  const update = (field: keyof WorkspaceGeneral, value: string) =>
    setDraft((current) => ({ ...current, [field]: value }));
  const save = () => {
    setSaved(draft);
    onSave(draft);
  };
  return (
    <SettingsSection
      title="General"
      description="How the workspace is named and where it lives."
      footer={
        <Button size="sm" disabled={!hasChanged(saved, draft)} onClick={save}>
          Save
        </Button>
      }
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor={`${fieldId}-name`}>Name</FieldLabel>
          <Input
            id={`${fieldId}-name`}
            value={draft.name}
            onChange={(event) => update("name", event.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${fieldId}-slug`}>URL</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText id={`${fieldId}-slug-prefix`}>{workspaceUrlPrefix}</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id={`${fieldId}-slug`}
              aria-describedby={`${fieldId}-slug-prefix`}
              value={draft.slug}
              onChange={(event) => update("slug", event.target.value)}
            />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor={`${fieldId}-timezone`}>Timezone</FieldLabel>
          <Select value={draft.timezone} onValueChange={(value) => update("timezone", value)}>
            <SelectTrigger id={`${fieldId}-timezone`} className="w-full sm:w-72">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timezones.map((timezone) => (
                <SelectItem key={timezone} value={timezone}>
                  {timezone.replaceAll("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>
    </SettingsSection>
  );
}
