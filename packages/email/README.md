# @locusgraph/email

[![npm](https://img.shields.io/npm/v/@locusgraph/email?color=111111&style=flat-square)](https://www.npmjs.com/package/@locusgraph/email) [![MIT license](https://img.shields.io/badge/license-MIT-111111?style=flat-square)](https://github.com/locusgraph/design/blob/master/LICENSE)

[Docs](https://design.locusgraph.com) · [Source](https://github.com/locusgraph/design/tree/master/packages/email) · [All packages](https://github.com/locusgraph/design#packages)

LocusGraph transactional emails as React templates. Square panel, hairline borders and a pill button, with colors from `@locusgraph/tokens`. Everything is inline-styled tables, so it renders in Gmail, Outlook and Apple Mail. No React Email dependency.

```bash
pnpm add @locusgraph/email react react-dom
```

```ts
import { invitationEmail } from "@locusgraph/email";

const { subject, html, text } = invitationEmail({
  organizationName: "Acme Inc",
  inviterName: "Dana Rivera",
  role: "member",
  acceptUrl,
  expiresOn: "Oct 24, 2026",
});
```

| Function | Sends |
|---|---|
| `welcomeEmail` | Welcome after account creation, with a docs link |
| `emailVerificationEmail` | Verification code and link after signup |
| `paymentFailedEmail` | A failed charge, with reason and next try |
| `planChangedEmail` | An upgrade or downgrade |
| `spendLimitReachedEmail` | Spend limit hit, requests paused |
| `approvalRequestedEmail` | An agent waiting for a person to approve an action |
| `invitationEmail` | Invitation to join an organization |
| `receiptEmail` | A payment receipt, amount in cents |
| `lowCreditsEmail` | Low or empty wallet, balance in micro-USD |
| `usageOverPlanEmail` | Quotas over the plan |
| `usageWarningEmail` | A share of the plan used, before it runs out |
| `usageSummaryEmail` | A usage summary for a period |
| `invitationAcceptedEmail` | A member accepted an invitation |
| `roleChangedEmail` | Your role in an organization changed |
| `memberRemovedEmail` | You were removed from an organization |
| `ownershipTransferredEmail` | An organization has a new owner |
| `organizationDeletedEmail` | An organization was deleted |
| `keyCreatedEmail` | A new API key was created |
| `keyRevokedEmail` | An API key was revoked |
| `keyExpiringEmail` | An API key expires soon |

Each returns `{ subject, html, text }`; pass all three to your mail provider. The plain text part is written from the same text as the HTML: heading, body, the action link, the facts, then the brand.

## Brand

Every template takes `product` (`"locusgraph"` or `"spendgraph"`, default `"locusgraph"`) and an optional `brand` override, merged over that product's brand. Pass only the fields you want to change:

```ts
welcomeEmail({
  product: "spendgraph",
  brand: { markUrl: "https://cdn.example.com/logo.png", markWidth: 32, markHeight: 32 },
  userName: "Dana",
  dashboardUrl,
  docsUrl,
});
```

`name` also changes subjects and text that name the product, and `wordmark` is the bold and light text beside the mark. Host the logo as a PNG on a public URL; most mail clients block SVG.

## Override text

Every template has the same text slots, and `overrides` replaces any of them. Logo and name go in `brand`; words go in `overrides`.

| Slot | Where it shows |
|---|---|
| `subject` | Subject line |
| `preview` | Inbox preview after the subject; says the next step, never repeats the subject |
| `label` | Small mono label above the heading |
| `heading` | What happened |
| `body` | One or two sentences: what it means and what to do |
| `button` | Button label; an empty string removes the button |
| `note` | Muted line under the button, with a link when the template has one |
| `footer` | Line under the panel |

A slot is a string, or a function that gets the template's props plus `brandName`. Slots you leave out keep the default.

```ts
import { formatMicroUsd, lowCreditsEmail } from "@locusgraph/email";

lowCreditsEmail({
  organizationName,
  balanceMicroUsd,
  buyCreditsUrl,
  overrides: {
    heading: "Budget running low",
    body: (p) => `${p.organizationName} has ${formatMicroUsd(p.balanceMicroUsd)} left in its budget.`,
    button: "Add budget",
  },
});
```

## Set up once

`createEmails` applies your product, brand and per-template overrides to every template and returns them under short names (`welcome`, `paymentFailed`, `invitation`, ...):

```ts
// lib/emails.ts
import { createEmails } from "@locusgraph/email";

export const emails = createEmails({
  product: "spendgraph",
  brand: { markUrl: "https://cdn.example.com/mark.png", markWidth: 32, markHeight: 32 },
  overrides: {
    welcome: { body: "Connect your first agent to start tracking spend." },
    lowCredits: { heading: "Budget running low", button: "Add budget" },
  },
});

// anywhere you send mail
const { subject, html, text } = emails.welcome({ userName, dashboardUrl, docsUrl });
```

A single call can still pass its own `product`, `brand` or `overrides`; they merge over the defaults.

## Standard

Every template follows the same rules, and new ones should too:

- One purpose and at most one button. The raw link prints under every button for clients that hide it.
- Subject says what happened and names the organization or object; `preview` gives the next step.
- Body is active voice, present tense, at most two sentences. Name the product through `brandName`, never in fixed text.
- Facts go in rows (`label: value` in plain text). Optional facts are left out when missing.
- Security emails (verification, keys, roles, ownership, deletion) end with a calm footer from `securityFooter`.

## Build your own

`defineEmail` gives a new template the same layout, slots, overrides and plain text:

```ts
import { defineEmail } from "@locusgraph/email";

type GraphReadyData = { graphName: string; graphUrl: string };

export const { Component: GraphReadyEmail, render: graphReadyEmail } = defineEmail<GraphReadyData>({
  text: {
    subject: (p) => `${p.graphName} is ready`,
    preview: "Agents can write to it now",
    label: "Graphs",
    heading: (p) => `${p.graphName} is ready`,
    body: "Agents can now write to it with the key you created.",
    button: "Open the graph",
  },
  actionUrl: (p) => p.graphUrl,
  rows: (p) => [["Graph", p.graphName]],
});
```

For a fully custom layout, compose `EmailLayout`, `EmailLabel`, `EmailHeading`, `EmailText`, `EmailButton`, `EmailLink` and `EmailRows`, then call `renderEmail(subject, element)`.
