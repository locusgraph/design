import type { WithProduct } from "./kit/brand";
import type { EmailOverrides } from "./kit/text/overrides";
import type { RenderedEmail } from "./render";
import { type EmailTemplateName, emailTemplates } from "./templates/all";

type Templates = typeof emailTemplates;

type PropsOf<Name extends EmailTemplateName> = Parameters<Templates[Name]>[0];

type OverridesOf<Name extends EmailTemplateName> = NonNullable<PropsOf<Name>["overrides"]>;

export type EmailDefaults = WithProduct & {
  overrides?: { [Name in EmailTemplateName]?: OverridesOf<Name> };
};

export type BrandedEmails = {
  [Name in EmailTemplateName]: (
    props: Omit<PropsOf<Name>, keyof WithProduct> & WithProduct
  ) => RenderedEmail;
};

type AnyProps = WithProduct & { overrides?: EmailOverrides<object> };

type AnyTemplate = (props: AnyProps) => RenderedEmail;

function withDefaults(
  render: AnyTemplate,
  defaults: WithProduct,
  templateOverrides: EmailOverrides<object> = {}
): AnyTemplate {
  return (props) =>
    render({
      ...props,
      product: props.product ?? defaults.product,
      brand: { ...defaults.brand, ...props.brand },
      overrides: { ...templateOverrides, ...props.overrides },
    });
}

export function createEmails({ overrides = {}, ...defaults }: EmailDefaults = {}): BrandedEmails {
  const entries = Object.entries(emailTemplates).map(([name, render]) => [
    name,
    withDefaults(
      render as AnyTemplate,
      defaults,
      overrides[name as EmailTemplateName] as EmailOverrides<object> | undefined
    ),
  ]);
  return Object.fromEntries(entries) as BrandedEmails;
}
