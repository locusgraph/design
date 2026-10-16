import { SocialCard, type SocialCardProps, socialCardSize } from "@locusgraph/brand";
import { useEffect, useRef, useState } from "react";
import { defineDemo, select, text } from "../../../registry/define-demo";
import { CodeBlock } from "../../../shell/preview/code-block";

const themes = ["dark", "light"] as const;

const brandPackage = "@locusgraph/brand";

const openGraphSource = `import { SocialCard, socialCardSize } from "${brandPackage}";
import { ImageResponse } from "next/og";

export const alt = "SpendGraph: know where every dollar of LLM spend goes";
export const size = socialCardSize;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const archivo = await fetch(
    new URL("./fonts/Archivo-Bold.ttf", import.meta.url)
  ).then((response) => response.arrayBuffer());
  return new ImageResponse(
    <SocialCard
      title="Know where every dollar of LLM spend goes"
      description="Cost per workflow, model and customer."
      product="SpendGraph"
      url="spendgraph.com"
    />,
    { ...size, fonts: [{ name: "Archivo", data: archivo, weight: 700 }] }
  );
}`;

function useFitScale() {
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setScale(entry.contentRect.width / socialCardSize.width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { frame, scale };
}

function ScaledSocialCard(props: SocialCardProps) {
  const { frame, scale } = useFitScale();
  return (
    <div
      ref={frame}
      className="relative w-full overflow-hidden ring-1 ring-border"
      style={{ aspectRatio: `${socialCardSize.width} / ${socialCardSize.height}` }}
    >
      <div
        className="absolute top-0 left-0"
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        <SocialCard {...props} />
      </div>
    </div>
  );
}

function BothThemes() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <ScaledSocialCard
        title="Memory for agents that learn"
        description="LocusGraph keeps what your agents learn and serves it back."
        url="locusgraph.com"
      />
      <ScaledSocialCard
        title="Know where every dollar of LLM spend goes"
        product="SpendGraph"
        url="spendgraph.com"
        theme="light"
      />
    </div>
  );
}

function TitleOnly() {
  return (
    <div className="w-full max-w-xl">
      <ScaledSocialCard title="Changelog: October 2026" />
    </div>
  );
}

function NextOpenGraphImage() {
  return (
    <div className="w-full ring-1 ring-border">
      <p className="eyebrow border-border border-b px-4 py-2">app/opengraph-image.tsx</p>
      <CodeBlock code={openGraphSource} />
    </div>
  );
}

export default defineDemo({
  title: "Social",
  description:
    "The 1200 by 630 Open Graph card. Inline styles and flexbox only, so the same component renders in the browser and in Next.js ImageResponse.",
  controls: {
    title: text("Know where every dollar of LLM spend goes"),
    description: text("Cost per workflow, model and customer, from one SDK call."),
    product: text("SpendGraph"),
    url: text("spendgraph.com"),
    theme: select(themes, "dark"),
  },
  playground: ({ title, description, product, url, theme }) => (
    <div className="w-full max-w-3xl">
      <ScaledSocialCard
        title={title}
        description={description || undefined}
        product={product || undefined}
        url={url || undefined}
        theme={theme}
      />
    </div>
  ),
  code: ({ title, description, product, url, theme }) =>
    [
      "<SocialCard",
      `  title="${title}"`,
      description && `  description="${description}"`,
      product && `  product="${product}"`,
      url && `  url="${url}"`,
      theme !== "dark" && `  theme="${theme}"`,
      "/>",
    ]
      .filter(Boolean)
      .join("\n"),
  props: [
    { name: "title", type: "string" },
    { name: "description", type: "string" },
    { name: "product", type: "string" },
    { name: "url", type: "string" },
    { name: "theme", type: '"dark" | "light"', defaultValue: '"dark"' },
  ],
  examples: {
    BothThemes: {
      description:
        "Dark is the default; use light where the card sits on a light feed. Keep titles under about 60 characters.",
      component: BothThemes,
    },
    TitleOnly: {
      description: "Description, product and url are optional; the title alone still balances.",
      component: TitleOnly,
    },
    NextOpenGraphImage: {
      description:
        "In Next.js, return it from app/opengraph-image.tsx. Satori only has the fonts you pass, so load Archivo.",
      component: NextOpenGraphImage,
    },
  },
  previewHeight: "tall",
  isNew: true,
});
