# @locusgraph/utils

Formatting and quota helpers LocusGraph apps share. No dependencies, no React.

```bash
pnpm add @locusgraph/utils
```

| Function | Example |
|---|---|
| `formatCents(4000)` | `$40.00` |
| `formatMicroUsd(1_234_500)` | `$1.2345` (sub-cent amounts keep four places) |
| `centsToMicroUsd(1000)` | `10000000` |
| `formatCount(10450)` | `10,450` |
| `pluralize(2, "key")` | `2 keys` |
| `formatDate("2026-11-15T12:00:00Z", "Never")` | `Nov 15, 2026` (UTC; the fallback when empty or invalid) |
| `quotaPercent({ used, included })` | 0–100, capped |
| `quotaStatus({ used, included })` | `"ok"`, `"near"` from 80%, `"over"` past the allowance |
| `balanceLevel(microUsd)` | `"empty"` at or below 0, `"low"` under $2, else `"fine"` |

Money follows the platform's rules: prices and Stripe amounts are integer cents; wallet balances and charges are integer micro-USD ($1 = 1,000,000).
