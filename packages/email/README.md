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
| `invitationEmail` | Invitation to join an organization |
| `receiptEmail` | A payment receipt, amount in cents |
| `lowCreditsEmail` | Low or empty wallet, balance in micro-USD |
| `usageOverPlanEmail` | Quotas over the plan |

Each returns `{ subject, html, text }`; pass all three to your mail provider. Build new templates from `EmailLayout`, `EmailLabel`, `EmailHeading`, `EmailText`, `EmailButton` and `EmailRows`, then `renderEmail(subject, element)`.
