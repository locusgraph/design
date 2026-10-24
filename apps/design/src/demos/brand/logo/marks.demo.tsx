import { GitHubMark, GoogleMark, LocusGraphMark, LocusGraphWordmark } from "@locusgraph/brand";
import { Button } from "@locusgraph/components";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const sizes = { sm: "size-5", md: "size-8", lg: "size-12" } as const;
const sizeOptions = ["sm", "md", "lg"] as const;

function SignInButtons() {
  return (
    <div className="flex w-72 flex-col gap-2">
      <Button variant="outline">
        <GoogleMark />
        Continue with Google
      </Button>
      <Button variant="outline">
        <GitHubMark />
        Continue with GitHub
      </Button>
    </div>
  );
}

function Wordmarks() {
  return (
    <div className="flex flex-col items-start gap-4 text-xl">
      <LocusGraphWordmark />
      <LocusGraphWordmark withMark />
    </div>
  );
}

export default defineDemo({
  title: "Marks",
  description:
    "The LocusGraph mark and wordmark, and the Google and GitHub marks for sign-in. From `@locusgraph/brand`.",
  controls: { size: select(sizeOptions, "md"), wordmark: toggle(true) },
  playground: ({ size, wordmark }) => (
    <div className="flex items-center gap-2.5">
      <LocusGraphMark className={sizes[size]} />
      {wordmark && <LocusGraphWordmark className="text-2xl" />}
    </div>
  ),
  code: ({ size, wordmark }) =>
    `<LocusGraphMark className="${sizes[size]}" />${wordmark ? '\n<LocusGraphWordmark className="text-2xl" />' : ""}`,
  props: [
    { name: "LocusGraphMark.className", type: "string" },
    { name: "LocusGraphWordmark.withMark", type: "boolean", defaultValue: "false" },
    { name: "...props", type: "SVG or span props" },
  ],
  examples: {
    SignInButtons: {
      description: "Provider marks inside outline buttons; Google keeps its own colors.",
      component: SignInButtons,
    },
    Wordmarks: {
      description: "The wordmark alone and with the mark in front.",
      component: Wordmarks,
    },
  },
  isNew: true,
});
