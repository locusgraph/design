import { renderToStaticMarkup } from "react-dom/server";
import type { RenderedEmail } from "../../render";
import { brandOf } from "../brand";
import { EmailLayout } from "../email-layout";
import { EmailButton, EmailHeading, EmailLabel, EmailLink, EmailRows, EmailText } from "../parts";
import { displayUrl } from "../words";
import { type DefaultText, resolveText, type WithOverrides } from "./overrides";
import { plainTextOf, type ResolvedEmail } from "./plain-text";

type Row = [label: string, value: string | undefined];

export type EmailDefinition<Data> = {
  text: DefaultText<Data>;
  actionUrl?: (props: Data) => string;
  rows?: (props: Data) => Row[];
  noteUrl?: (props: Data) => string;
};

function hasValue(row: Row): row is [string, string] {
  return row[1] !== undefined;
}

function resolveEmail<Data>(
  definition: EmailDefinition<Data>,
  props: WithOverrides<Data>
): ResolvedEmail {
  const brandName = brandOf(props.product, props.brand).name;
  return {
    text: resolveText(definition.text, props, brandName),
    brandName,
    actionUrl: definition.actionUrl?.(props),
    rows: (definition.rows?.(props) ?? []).filter(hasValue),
    noteUrl: definition.noteUrl?.(props),
  };
}

function EmailBody({ email }: { email: ResolvedEmail }) {
  const { text, actionUrl, rows, noteUrl } = email;
  return (
    <>
      <EmailLabel>{text.label}</EmailLabel>
      <EmailHeading>{text.heading}</EmailHeading>
      <EmailText>{text.body}</EmailText>
      {rows.length > 0 && <EmailRows rows={rows} />}
      {actionUrl && text.button && <EmailButton href={actionUrl}>{text.button}</EmailButton>}
      {text.note && (
        <EmailText muted>
          {text.note}
          {noteUrl && (
            <>
              {" "}
              <EmailLink href={noteUrl}>{displayUrl(noteUrl)}</EmailLink>
            </>
          )}
        </EmailText>
      )}
    </>
  );
}

export function defineEmail<Data>(definition: EmailDefinition<Data>) {
  function Component(props: WithOverrides<Data>) {
    const email = resolveEmail(definition, props);
    return (
      <EmailLayout
        product={props.product}
        brand={props.brand}
        preview={email.text.preview}
        footer={email.text.footer || undefined}
      >
        <EmailBody email={email} />
      </EmailLayout>
    );
  }

  function render(props: WithOverrides<Data>): RenderedEmail {
    const email = resolveEmail(definition, props);
    const html = `<!DOCTYPE html>${renderToStaticMarkup(<Component {...props} />)}`;
    return { subject: email.text.subject, html, text: plainTextOf(email) };
  }

  return { Component, render };
}
