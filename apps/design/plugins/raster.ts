import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { Resvg } from "@resvg/resvg-js";
import type { ReactNode } from "react";
import satori from "satori";

const require = createRequire(import.meta.url);

type FontFile = { name: string; weight: 300 | 400 | 700; file: string };

const fontFiles: FontFile[] = [
  { name: "Archivo", weight: 300, file: "@fontsource/archivo/files/archivo-latin-300-normal.woff" },
  { name: "Archivo", weight: 700, file: "@fontsource/archivo/files/archivo-latin-700-normal.woff" },
  { name: "Inter", weight: 400, file: "@fontsource/inter/files/inter-latin-400-normal.woff" },
  {
    name: "IBM Plex Mono",
    weight: 400,
    file: "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff",
  },
];

function loadFonts() {
  return fontFiles.map(({ name, weight, file }) => ({
    name,
    weight,
    style: "normal" as const,
    data: readFileSync(require.resolve(file)),
  }));
}

export function svgToPng(svg: string, width: number) {
  return new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();
}

export async function elementToPng(element: ReactNode, size: { width: number; height: number }) {
  const svg = await satori(element, { ...size, fonts: loadFonts() });
  return svgToPng(svg, size.width);
}

const icoHeaderBytes = 6;
const icoEntryBytes = 16;

export function pngToIco(png: Uint8Array, size: number) {
  const header = Buffer.alloc(icoHeaderBytes + icoEntryBytes);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(size >= 256 ? 0 : size, 6);
  header.writeUInt8(size >= 256 ? 0 : size, 7);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(icoHeaderBytes + icoEntryBytes, 18);
  return Buffer.concat([header, png]);
}
