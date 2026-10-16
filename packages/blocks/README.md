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
| `Usage` | `quotas`, optional `label`, `emptyText` |
| `Quota` | `quota`, a `QuotaData` (`key`, `period`, `used`, `included`) |
| `UsageAlert` | `balanceMicroUsd`, `quotas`, `paidPlan`, `buyCreditsHref`, `upgradeHref`, `linkComponent`. Renders nothing when credits are fine and no quota is over |
| `Wallet` | `balanceMicroUsd`, `debtMicroUsd`, `grants`. A Rule Grid cell |
| `TopUp` | `packs`, `onBuy(packId)`, `pending`. A Rule Grid cell |
| `Plans` | `plans`, `actionFor(plan)` for plans that are not current |
| `Keys` | `keys`, `actions(key)`, `highlightedId` to flash a just-created key. Dates render in the viewer's time zone after hydration |
| `LocalDate` | `value` (ISO string): UTC on the server, the viewer's time zone after hydration |
| `KeysEmpty` | `newKeyHref` (omit for read-only roles), `linkComponent` |

`Wallet` and `TopUp` are cells, so put them in a `RuleGrid`:

```tsx
<RuleGrid columns={2}>
  <Wallet balanceMicroUsd={wallet.balanceMicroUsd} grants={grants} />
  <TopUp packs={wallet.packs} onBuy={buy} pending={pending} />
</RuleGrid>
```

Pass your router's link as `linkComponent` (for example Next.js `Link`); plain `<a>` is the default.
