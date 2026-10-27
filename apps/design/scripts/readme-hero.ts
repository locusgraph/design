import { writeFileSync } from "node:fs";
import { createElement } from "react";
import { elementToPng } from "../plugins/raster.ts";
import { withStandaloneServer } from "../plugins/standalone-server.ts";

const heroModule = "/src/seo/build/readme-hero.tsx";
const outputDir = new URL("../../../.github/assets/", import.meta.url);
const retinaScale = 2;

type HeroModule = typeof import("../src/seo/build/readme-hero.tsx");

await withStandaloneServer(async (server) => {
  const { ReadmeHero, readmeHeroSize } = (await server.ssrLoadModule(heroModule)) as HeroModule;
  for (const theme of ["dark", "light"] as const) {
    const png = await elementToPng(
      createElement(ReadmeHero, { theme }),
      readmeHeroSize,
      readmeHeroSize.width * retinaScale
    );
    const file = new URL(`hero-${theme}.png`, outputDir);
    writeFileSync(file, png);
    console.log(`readme hero: ${file.pathname}`);
  }
});
