export type { LinkComponent } from "@locusgraph/components";

export type MarketingLink = { label: string; href: string };

export type MarketingActionVariant = "default" | "outline" | "ghost";

export type MarketingAction = MarketingLink & { variant?: MarketingActionVariant };
