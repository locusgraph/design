import type { EmailProduct, RenderedEmail } from "@locusgraph/email";
import * as email from "@locusgraph/email";
import { sampleProps } from "./sample-props";

export const emailTemplates = [
  "invitation",
  "invitation-accepted",
  "role-changed",
  "member-removed",
  "ownership-transferred",
  "organization-deleted",
  "key-created",
  "key-revoked",
  "key-expiring",
  "low-credits",
  "receipt",
  "usage-warning",
  "usage-over-plan",
  "usage-summary",
] as const;

export type EmailTemplate = (typeof emailTemplates)[number];

type TemplateFunction = keyof typeof sampleProps;

export function functionNameOf(template: EmailTemplate): TemplateFunction {
  const camel = template.replace(/-(\w)/g, (_, letter: string) => letter.toUpperCase());
  return `${camel}Email` as TemplateFunction;
}

const rendered = new Map<string, RenderedEmail>();

export function renderSampleEmail(
  template: EmailTemplate,
  product: EmailProduct = "locusgraph"
): RenderedEmail {
  const cacheKey = `${product}:${template}`;
  const cached = rendered.get(cacheKey);
  if (cached) return cached;
  const name = functionNameOf(template);
  const render = email[name] as (props: object) => RenderedEmail;
  const result = render({ ...sampleProps[name], product });
  rendered.set(cacheKey, result);
  return result;
}

export function templateCode(template: EmailTemplate, product: EmailProduct): string {
  const name = functionNameOf(template);
  const props = JSON.stringify({ product, ...sampleProps[name] }, null, 2);
  return `import { ${name} } from "@locusgraph/email";\n\nconst { subject, html, text } = ${name}(${props});`;
}
