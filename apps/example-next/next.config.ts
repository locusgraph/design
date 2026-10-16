import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: [
    "@locusgraph/blocks",
    "@locusgraph/brand",
    "@locusgraph/components",
    "@locusgraph/email",
    "@locusgraph/tokens",
    "@locusgraph/utils",
  ],
};

export default config;
