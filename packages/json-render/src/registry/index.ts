import { LocusKeys, LocusPlans, LocusTopUp, LocusUsage, LocusWallet } from "./blocks";
import { LocusColumns, LocusNotice, LocusStack } from "./layout";

export const locusRenderers = {
  Stack: LocusStack,
  Columns: LocusColumns,
  Notice: LocusNotice,
  Usage: LocusUsage,
  Wallet: LocusWallet,
  TopUp: LocusTopUp,
  Plans: LocusPlans,
  Keys: LocusKeys,
};
