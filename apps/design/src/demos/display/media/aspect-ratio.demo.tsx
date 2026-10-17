import { Play as PlayIcon } from "@carbon/icons-react";
import { AspectRatio } from "@locusgraph/components";
import { defineDemo, select } from "../../../registry/define-demo";

const ratios = ["16 / 9", "4 / 3", "1 / 1", "21 / 9"] as const;

function parseRatio(ratio: string) {
  const [width, height] = ratio.split(" / ").map(Number);
  return (width ?? 16) / (height ?? 9);
}

function VideoThumbnail() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio
        ratio={16 / 9}
        className="flex items-center justify-center overflow-hidden bg-muted ring-1 ring-border"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <PlayIcon className="size-5" />
        </span>
      </AspectRatio>
    </div>
  );
}

function SquareAvatar() {
  return (
    <div className="w-32">
      <AspectRatio
        ratio={1}
        className="flex items-center justify-center bg-muted text-2xl font-semibold text-foreground ring-1 ring-border"
      >
        AC
      </AspectRatio>
    </div>
  );
}

function PlanBanner() {
  return (
    <div className="w-full max-w-lg">
      <AspectRatio
        ratio={21 / 9}
        className="flex flex-col justify-end gap-1 overflow-hidden bg-muted p-6 ring-1 ring-border"
      >
        <span className="locus-eyebrow">Pro plan</span>
        <span className="text-xl font-semibold text-foreground">
          Unlimited seats for your whole team
        </span>
      </AspectRatio>
    </div>
  );
}

export default defineDemo({
  title: "Aspect Ratio",
  isNew: true,
  description:
    "Keeps content at a fixed width-to-height ratio as its container resizes. Use it for thumbnails, banners and embeds.",
  controls: { ratio: select(ratios) },
  playground: ({ ratio }) => (
    <div className="w-80">
      <AspectRatio
        ratio={parseRatio(ratio)}
        className="flex items-center justify-center bg-muted font-mono text-sm text-muted-foreground ring-1 ring-border"
      >
        {ratio}
      </AspectRatio>
    </div>
  ),
  code: ({ ratio }) =>
    `<div className="w-80">\n  <AspectRatio ratio={${ratio}} className="bg-muted">\n    <img src="/invoice-preview.png" alt="Invoice preview" className="size-full object-cover" />\n  </AspectRatio>\n</div>`,
  props: [
    { name: "ratio", type: "number", defaultValue: "1" },
    { name: "asChild", type: "boolean", defaultValue: "false" },
    { name: "...props", type: 'ComponentProps<"div">' },
  ],
  examples: {
    VideoThumbnail: {
      description: "A 16:9 frame for a product walkthrough video.",
      component: VideoThumbnail,
    },
    SquareAvatar: {
      description: "A square tile for an organization logo or initials.",
      component: SquareAvatar,
    },
    PlanBanner: {
      description: "A wide 21:9 banner for a plan announcement.",
      component: PlanBanner,
    },
  },
});
