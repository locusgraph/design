import { fileURLToPath } from "node:url";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { agentDocs } from "./plugins/agent-docs";
import { fontPreload } from "./plugins/font-preload";
import { siteAssetsPlugin } from "./plugins/site-assets";

const entry = (file: string) => fileURLToPath(new URL(file, import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss(), agentDocs(), siteAssetsPlugin(), fontPreload(), cloudflare()],
  server: { port: 5180, strictPort: true },
  build: {
    rolldownOptions: {
      input: { main: entry("index.html"), frame: entry("frame.html") },
    },
  },
});
