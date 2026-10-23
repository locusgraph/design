import { fonts, headingTracking } from "@locusgraph/tokens";

export type TypeFamily = {
  name: string;
  role: string;
  className: string;
  stack: string;
  tracking?: string;
};

export const typeFamilies: TypeFamily[] = [
  {
    name: "Archivo",
    role: "Headings and the wordmark",
    className: "font-heading",
    stack: fonts.heading,
    tracking: headingTracking,
  },
  { name: "Inter", role: "Body, labels and controls", className: "font-sans", stack: fonts.sans },
  {
    name: "Fira Code",
    role: "Code, ids, numbers in tables",
    className: "font-mono",
    stack: fonts.mono,
  },
];

export type TypeStep = { name: string; className: string; size: string; use: string };

export const typeScale: TypeStep[] = [
  { name: "eyebrow", className: "eyebrow", size: "11px", use: "Section labels, column headers" },
  { name: "2xs", className: "text-2xs", size: "11px", use: "Badges, chips, counters, timestamps" },
  { name: "xs", className: "text-xs", size: "12px", use: "Hints, metadata, captions" },
  {
    name: "code",
    className: "text-code font-mono",
    size: "13px",
    use: "Fenced code and code panels",
  },
  { name: "sm", className: "text-sm", size: "14px", use: "Default UI text, buttons, tables" },
  { name: "base", className: "text-base", size: "16px", use: "Long-form body copy" },
  { name: "lg", className: "text-lg", size: "18px", use: "Card and dialog titles" },
  { name: "xl", className: "text-xl", size: "20px", use: "Section headings" },
  { name: "2xl", className: "text-2xl", size: "24px", use: "Page titles, big numbers" },
];

export type TypeWeight = { value: number; className: string; use: string };

export const typeWeights: TypeWeight[] = [
  { value: 400, className: "font-normal", use: "Body text" },
  { value: 500, className: "font-medium", use: "Labels, buttons, emphasis" },
  { value: 600, className: "font-semibold", use: "Headings" },
];
