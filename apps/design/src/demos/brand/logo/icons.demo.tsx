import { LocusGraphIcon, type LocusGraphIconVariant } from "@locusgraph/brand";
import { Button } from "@locusgraph/components";
import { DownloadSimple as DownloadIcon } from "@phosphor-icons/react/ssr";
import { useRef } from "react";
import { defineDemo, select } from "../../../registry/define-demo";
import { CodeBlock } from "../../../shell/preview/code/code-block";

const variants = ["dark", "light", "brand"] as const;
const sizeOptions = ["16", "32", "48", "64", "180", "192", "512"] as const;

const iconSizes = [
  { size: 16, use: "Favicon" },
  { size: 32, use: "Favicon, retina" },
  { size: 48, use: "Windows tile" },
  { size: 180, use: "Apple touch" },
  { size: 192, use: "Android" },
  { size: 512, use: "PWA splash" },
] as const;

const brandPackage = "@locusgraph/brand";

const largestShownSize = 48;
const previewBox = { width: 64, height: 64 };

const nextIconSource = `import { LocusGraphIcon } from "${brandPackage}";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ display: "flex" }}>
      <LocusGraphIcon size={32} variant="dark" />
    </div>,
    size
  );
}`;

const htmlLinksSource = `<link rel="icon" href="/icon.svg" type="image/svg+xml" />
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
<link rel="manifest" href="/site.webmanifest" />`;

function DownloadableIcon({ size, variant }: { size: number; variant: LocusGraphIconVariant }) {
  const frame = useRef<HTMLDivElement>(null);
  const download = () => {
    const markup = frame.current?.innerHTML ?? "";
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([markup], { type: "image/svg+xml" }));
    link.download = `locusgraph-icon-${variant}-${size}.svg`;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  return (
    <div className="flex flex-col items-center gap-5">
      <div
        ref={frame}
        className="flex max-w-full ring-1 ring-border [&_svg]:h-auto [&_svg]:max-w-full"
      >
        <LocusGraphIcon size={size} variant={variant} />
      </div>
      <Button variant="outline" size="sm" onClick={download}>
        <DownloadIcon weight="bold" aria-hidden />
        Download SVG
      </Button>
    </div>
  );
}

function Sizes() {
  return (
    <div className="grid w-full grid-cols-1 gap-px bg-border ring-1 ring-border sm:grid-cols-2 lg:grid-cols-3">
      {iconSizes.map(({ size, use }) => (
        <figure key={size} className="flex flex-col justify-between gap-4 bg-background p-5">
          <div className="flex min-h-16 items-end gap-3">
            {variants.map((variant) => (
              <LocusGraphIcon
                key={variant}
                size={size}
                variant={variant}
                className="ring-1 ring-border"
                style={size > largestShownSize ? previewBox : undefined}
              />
            ))}
          </div>
          <figcaption className="flex items-baseline justify-between gap-2">
            <span className="font-medium font-mono text-sm">{size}px</span>
            <span className="locus-eyebrow">
              {use}
              {size > largestShownSize ? ", shown at 64" : ""}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function NextAppIcon() {
  return (
    <div className="w-full ring-1 ring-border">
      <p className="locus-eyebrow border-border border-b px-4 py-2">app/icon.tsx</p>
      <CodeBlock code={nextIconSource} />
    </div>
  );
}

function HtmlLinkTags() {
  return (
    <div className="w-full ring-1 ring-border">
      <p className="locus-eyebrow border-border border-b px-4 py-2">
        head · svg files in @locusgraph/brand/svg
      </p>
      <CodeBlock code={htmlLinksSource} />
    </div>
  );
}

export default defineDemo({
  title: "Icons",
  description:
    "The mark centered on a square tile with 18% padding, drawn as one SVG so it saves straight to a favicon or app icon.",
  controls: { variant: select(variants, "dark"), size: select(sizeOptions, "180") },
  playground: ({ variant, size }) => <DownloadableIcon size={Number(size)} variant={variant} />,
  code: ({ variant, size }) => `<LocusGraphIcon size={${size}} variant="${variant}" />`,
  props: [
    { name: "size", type: "number (px)", defaultValue: "64" },
    { name: "variant", type: '"dark" | "light" | "brand"', defaultValue: '"dark"' },
    { name: "...props", type: "SVG props" },
  ],
  examples: {
    Sizes: {
      description:
        "Every size a site needs, in each variant. The tile is square, never rounded: platforms apply their own mask.",
      component: Sizes,
    },
    NextAppIcon: {
      description:
        "In Next.js, render it with `ImageResponse` from `app/icon.tsx`; repeat in `app/apple-icon.tsx` at 180.",
      component: NextAppIcon,
    },
    HtmlLinkTags: {
      description:
        "Anywhere else, ship the SVG from @locusgraph/brand/svg/locusgraph-icon-dark.svg and PNG exports.",
      component: HtmlLinkTags,
    },
  },
  isNew: true,
});
