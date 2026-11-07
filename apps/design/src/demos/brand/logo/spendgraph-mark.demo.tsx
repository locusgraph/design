import {
  type BrandTheme,
  dotGridStyle,
  SpendGraphMark,
  SpendGraphWordmark,
} from "@locusgraph/brand";
import type { ReactNode } from "react";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const sizes = { sm: "size-5", md: "size-8", lg: "size-12", xl: "size-24" } as const;
const sizeOptions = ["sm", "md", "lg", "xl"] as const;
const themes = ["dark", "light"] as const;
const pixelSizes = [16, 20, 24, 32, 48] as const;

function ThemePanel({ theme, children }: { theme: BrandTheme; children: ReactNode }) {
  return (
    <div
      className="flex min-h-36 flex-col items-start justify-center gap-5 p-8 ring-1 ring-border"
      style={dotGridStyle(theme)}
    >
      <span className="font-mono text-2xs uppercase tracking-[0.05em] opacity-60">On {theme}</span>
      {children}
    </div>
  );
}

function SmallSizes() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      {pixelSizes.map((pixels) => (
        <figure key={pixels} className="flex flex-col items-center gap-2">
          <SpendGraphMark width={pixels} height={pixels} />
          <figcaption className="font-mono text-2xs text-muted-foreground">{pixels}px</figcaption>
        </figure>
      ))}
    </div>
  );
}

function OnBothThemes() {
  return (
    <div className="grid w-full gap-px sm:grid-cols-2">
      {themes.map((theme) => (
        <ThemePanel key={theme} theme={theme}>
          <div className="flex flex-wrap items-center gap-6 text-2xl">
            <SpendGraphMark className="size-10" />
            <SpendGraphWordmark withMark />
          </div>
        </ThemePanel>
      ))}
    </div>
  );
}

function InTextColor() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <SpendGraphMark className="size-10 text-foreground" />
      <SpendGraphMark className="size-10 text-primary" />
      <SpendGraphMark className="size-10 text-muted-foreground" />
    </div>
  );
}

export default defineDemo({
  title: "SpendGraph Mark",
  description:
    "The SpendGraph tally stick. A debt was notched across a stick, then the stick was split so each party kept a half; neither could change the record because the notches had to line up. One priced record both sides trust. One path in the current text color, so it renders in `ImageResponse` and as a plain SVG file.",
  controls: { size: select(sizeOptions, "lg"), wordmark: toggle(false) },
  playground: ({ size, wordmark }) => (
    <div className="flex items-center gap-2.5">
      <SpendGraphMark className={sizes[size]} />
      {wordmark && <SpendGraphWordmark className="text-2xl" />}
    </div>
  ),
  code: ({ size, wordmark }) =>
    `<SpendGraphMark className="${sizes[size]}" />${wordmark ? '\n<SpendGraphWordmark className="text-2xl" />' : ""}`,
  props: [
    { name: "className", type: "string" },
    { name: "...props", type: "SVG props, same as LocusGraphMark" },
  ],
  examples: {
    SmallSizes: {
      description:
        "Drawn on a 32 unit grid so every edge lands on a whole pixel at 16px: 1px notches and a 2px split between the halves.",
      component: SmallSizes,
    },
    OnBothThemes: {
      description:
        "The mark alone and in the wordmark, on the dark and light dotted grid. The notches are cut out of the path, so the background shows through.",
      component: OnBothThemes,
    },
    InTextColor: {
      description: "The mark takes the text color, like the LocusGraph mark.",
      component: InTextColor,
    },
  },
  isNew: true,
});
