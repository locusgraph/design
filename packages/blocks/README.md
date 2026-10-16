# @locusgraph/blocks

Product sections built from `@locusgraph/components` and its Rule Grid: the same usage, billing and API-key screens in every LocusGraph app. Blocks take plain data and callbacks; they never fetch.

```bash
pnpm add @locusgraph/blocks @locusgraph/components
```

```css
@import "@locusgraph/components/theme.css";
@import "@locusgraph/blocks/sources.css";
```

| Block | Props |
|---|---|
| `UsageSummary` | `quotas`, optional `label`, `emptyText` |
| `QuotaMeter` | `quota` (`key`, `period`, `used`, `included`) |
| `UsageAttention` | `balanceMicroUsd`, `quotas`, `paidPlan`, `buyCreditsHref`, `upgradeHref`, `linkComponent`. Renders nothing when credits are fine and no quota is over |
| `WalletPanel` | `balanceMicroUsd`, `debtMicroUsd`, `grants`. A Rule Grid cell |
| `CreditPacks` | `packs`, `onBuy(packId)`, `pending`. A Rule Grid cell |
| `PlanOptions` | `plans`, `actionFor(plan)` for plans that are not current |
| `KeysTable` | `keys`, `actions(key)`, `highlightedId` to flash a just-created key. Dates render in the viewer's time zone after hydration |
| `LocalDate` | `value` (ISO string): UTC on the server, the viewer's time zone after hydration |
| `NoKeys` | `newKeyHref` (omit for read-only roles), `linkComponent` |

`WalletPanel` and `CreditPacks` are cells, so put them in a `RuleGrid`:

```tsx
<RuleGrid columns={2}>
  <WalletPanel balanceMicroUsd={wallet.balanceMicroUsd} grants={grants} />
  <CreditPacks packs={wallet.packs} onBuy={buy} pending={pending} />
</RuleGrid>
```

Pass your router's link as `linkComponent` (for example Next.js `Link`); plain `<a>` is the default.
