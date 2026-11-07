import {
  LocusKeys,
  LocusKeysEmpty,
  LocusPlans,
  LocusQuota,
  LocusTopUp,
  LocusUsage,
  LocusUsageAlert,
  LocusWallet,
} from "./blocks";
import { LocusColumns, LocusNotice, LocusStack } from "./layout";

export const locusRenderers = {
  Stack: LocusStack,
  Columns: LocusColumns,
  Notice: LocusNotice,
  Usage: LocusUsage,
  Quota: LocusQuota,
  UsageAlert: LocusUsageAlert,
  Wallet: LocusWallet,
  TopUp: LocusTopUp,
  Plans: LocusPlans,
  KeysEmpty: LocusKeysEmpty,
  Keys: LocusKeys,
};
