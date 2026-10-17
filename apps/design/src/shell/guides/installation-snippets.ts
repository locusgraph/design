export const addFromRegistry = "pnpm add @locusgraph/components";

export const tailwindDependencies = `pnpm add tailwindcss tw-animate-css
pnpm add -D @tailwindcss/vite`;

export const globalsCss = `@import "tailwindcss";
@import "tw-animate-css";
@import "@locusgraph/components/theme.css";`;

export const viteConfig = `import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`;

export const nextConfig = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@locusgraph/components"],
  experimental: {
    optimizePackageImports: ["@locusgraph/components"],
  },
};

export default nextConfig;`;

export const nextPostcss = `export default {
  plugins: { "@tailwindcss/postcss": {} },
};`;

export const rootProviders = `import { Toaster, TooltipProvider } from "@locusgraph/components";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={0}>
      {children}
      <Toaster />
    </TooltipProvider>
  );
}`;

export const firstComponent = `import { Button, RuleGrid, RuleGridCell, RuleGridTitle } from "@locusgraph/components";

export function UpgradePanel() {
  return (
    <RuleGrid columns={1}>
      <RuleGridCell>
        <RuleGridTitle>Team plan</RuleGridTitle>
        <Button>Upgrade</Button>
      </RuleGridCell>
    </RuleGrid>
  );
}`;

export const darkMode = `document.documentElement.classList.toggle("dark", theme === "dark");`;

export const shadcnRegistry = `{
  "registries": {
    "@locus": "https://design.locusgraph.com/r/{name}.json"
  }
}`;

export const shadcnAdd = `pnpm dlx shadcn@latest add @locus/theme @locus/button @locus/approval`;

export const shadcnAliases = `@import "tailwindcss";
@import "tw-animate-css";
@import "@locusgraph/components/theme.css";
@import "@locusgraph/components/shadcn.css";`;

export const shadcnTheme = `@import "tailwindcss";
@import "../styles/locus.css";`;
