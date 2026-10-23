import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Input,
  RuleGridFooter,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Textarea,
} from "@locusgraph/components";
import { type FormEvent, useId, useState } from "react";
import {
  bioLimit,
  missingFieldsHint,
  type ProfileField,
  type ProfileValues,
  sampleProfile,
  sampleRoles,
  validateProfile,
  waitForSave,
} from "./profile-form-data";
import { FooterStatus, RequiredLabel } from "./profile-form-parts";

export type ProfileFormProps = {
  defaultValues?: ProfileValues;
  roles?: string[];
  showErrors?: boolean;
  saving?: boolean;
  onSave?: (values: ProfileValues) => Promise<void> | void;
  onCancel?: () => void;
};

const allFields: ProfileField[] = ["name", "email", "role", "bio"];

export function ProfileForm({
  defaultValues = sampleProfile,
  roles = sampleRoles,
  showErrors = false,
  saving = false,
  onSave = waitForSave,
  onCancel,
}: ProfileFormProps) {
  const fieldId = useId();
  const [values, setValues] = useState(defaultValues);
  const [touched, setTouched] = useState<ProfileField[]>(showErrors ? allFields : []);
  const [pending, setPending] = useState(false);
  const [savedName, setSavedName] = useState<string | null>(null);
  const errors = validateProfile(values);
  const isValid = Object.keys(errors).length === 0;
  const isSaving = saving || pending;

  function visibleError(field: ProfileField) {
    return touched.includes(field) ? errors[field] : undefined;
  }

  function markTouched(field: ProfileField) {
    setTouched((current) => (current.includes(field) ? current : [...current, field]));
  }

  function update(field: ProfileField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setSavedName(null);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(allFields);
    if (!isValid || isSaving) return;
    setPending(true);
    try {
      await onSave(values);
      setSavedName(values.name);
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={submit}
      className="flex w-full max-w-xl flex-col bg-card text-card-foreground ring-1 ring-border"
    >
      <FieldSet className="p-6" disabled={isSaving}>
        <FieldLegend className="mb-0">Profile</FieldLegend>
        <FieldDescription>How you appear to people in your organization.</FieldDescription>
        <FieldGroup className="gap-6">
          <Field data-invalid={!!visibleError("name") || undefined}>
            <RequiredLabel htmlFor={`${fieldId}-name`}>Full name</RequiredLabel>
            <Input
              id={`${fieldId}-name`}
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!visibleError("name")}
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              onBlur={() => markTouched("name")}
            />
            <FieldError>{visibleError("name")}</FieldError>
          </Field>
          <Field data-invalid={!!visibleError("email") || undefined}>
            <RequiredLabel htmlFor={`${fieldId}-email`}>Email</RequiredLabel>
            <Input
              id={`${fieldId}-email`}
              type="email"
              autoComplete="email"
              aria-required="true"
              aria-invalid={!!visibleError("email")}
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              onBlur={() => markTouched("email")}
            />
            <FieldDescription>Sign-in links and invoices go here.</FieldDescription>
            <FieldError>{visibleError("email")}</FieldError>
          </Field>
          <Field data-invalid={!!visibleError("role") || undefined}>
            <RequiredLabel htmlFor={`${fieldId}-role`}>Role</RequiredLabel>
            <Select
              value={values.role}
              onValueChange={(role) => {
                update("role", role);
                markTouched("role");
              }}
              onOpenChange={(open) => open || markTouched("role")}
            >
              <SelectTrigger
                id={`${fieldId}-role`}
                aria-required="true"
                aria-invalid={!!visibleError("role")}
                className="w-full"
              >
                <SelectValue placeholder="Choose a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription>Decides what you can change in billing and keys.</FieldDescription>
            <FieldError>{visibleError("role")}</FieldError>
          </Field>
          <Field data-invalid={!!visibleError("bio") || undefined}>
            <div className="flex items-baseline justify-between gap-3">
              <FieldLabel htmlFor={`${fieldId}-bio`}>Bio</FieldLabel>
              <span className="text-xs text-muted-foreground tabular-nums" aria-live="polite">
                {values.bio.length}/{bioLimit}
              </span>
            </div>
            <Textarea
              id={`${fieldId}-bio`}
              rows={3}
              aria-invalid={!!visibleError("bio")}
              value={values.bio}
              onChange={(event) => update("bio", event.target.value)}
              onBlur={() => markTouched("bio")}
            />
            <FieldDescription>Optional. One or two lines about what you work on.</FieldDescription>
            <FieldError>{visibleError("bio")}</FieldError>
          </Field>
        </FieldGroup>
      </FieldSet>
      <RuleGridFooter className="mx-0 mb-0 justify-end">
        <FooterStatus saving={isSaving} savedName={savedName} hint={missingFieldsHint(errors)} />
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSaving}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isValid} aria-disabled={isSaving} aria-busy={isSaving}>
          {isSaving ? <Spinner /> : null}
          {isSaving ? "Saving…" : "Save profile"}
        </Button>
      </RuleGridFooter>
    </form>
  );
}
