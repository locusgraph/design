export type ProfileValues = {
  name: string;
  email: string;
  role: string;
  bio: string;
};

export type ProfileField = keyof ProfileValues;

export type ProfileErrors = Partial<Record<ProfileField, string>>;

export const bioLimit = 160;

export const sampleRoles = ["Owner", "Admin", "Developer", "Billing", "Viewer"];

export const sampleProfile: ProfileValues = {
  name: "Ada Lovelace",
  email: "ada@locusgraph.com",
  role: "Developer",
  bio: "Builds the metering pipeline and keeps usage counts honest.",
};

export const invalidProfile: ProfileValues = {
  name: "",
  email: "ada@locusgraph",
  role: "",
  bio: "Builds the metering pipeline, keeps usage counts honest, reviews every migration before it ships, answers on-call pages within five minutes and writes the runbooks.",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateProfile(values: ProfileValues): ProfileErrors {
  const errors: ProfileErrors = {};
  if (!values.name.trim()) errors.name = "Enter your full name.";
  if (!values.email.trim()) errors.email = "Enter an email address.";
  else if (!emailPattern.test(values.email))
    errors.email = "Use a full address, like ada@example.com.";
  if (!values.role) errors.role = "Choose a role.";
  if (values.bio.length > bioLimit)
    errors.bio = `Shorten the bio to ${bioLimit} characters or fewer.`;
  return errors;
}

export function missingFieldsHint(errors: ProfileErrors) {
  const count = Object.keys(errors).length;
  if (count === 0) return "All fields look good.";
  return count === 1 ? "Fix 1 field to save." : `Fix ${count} fields to save.`;
}

export function waitForSave() {
  return new Promise<void>((resolve) => setTimeout(resolve, 900));
}
