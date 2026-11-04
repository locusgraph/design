import type { ResolvedText } from "./overrides";

export type ResolvedEmail = {
  text: ResolvedText;
  brandName: string;
  actionUrl?: string;
  rows: [label: string, value: string][];
  noteUrl?: string;
};

function actionLine({ text, actionUrl }: ResolvedEmail) {
  return actionUrl && text.button ? `${text.button}: ${actionUrl}` : "";
}

function noteLine({ text, noteUrl }: ResolvedEmail) {
  return text.note ? [text.note, noteUrl].filter(Boolean).join(" ") : "";
}

export function plainTextOf(email: ResolvedEmail): string {
  return [
    email.text.heading,
    email.text.body,
    actionLine(email),
    email.rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
    noteLine(email),
    email.text.footer,
    `—\n${email.brandName}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}
