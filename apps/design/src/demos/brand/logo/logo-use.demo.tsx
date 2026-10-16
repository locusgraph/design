import { LocusGraphMark, LocusGraphWordmark } from "@locusgraph/brand";
import { defineDemo, select } from "../../../registry/define-demo";
import { ThemeScope } from "../foundations/colors/theme-scope";
import { ClearSpace, Logo, logoForms } from "./logo-use/clear-space";
import { LogoRuleGrid } from "./logo-use/donts";

const formUse = [
  {
    form: "mark",
    when: "Small or square spaces where the name is already clear: favicon, app icon, avatar, loader, a collapsed sidebar.",
  },
  {
    form: "wordmark",
    when: "Text-led places where the mark already appears nearby, or a line of copy needs the name set as the brand.",
  },
  {
    form: "lockup",
    when: "The first time someone meets the brand: site header, sign-in, emails, social cards, slides.",
  },
] as const;

function MinimumSizes() {
  return (
    <div className="grid w-[36rem] max-w-full grid-cols-2 divide-x ring-1 ring-border">
      <div className="flex flex-col items-center gap-3 px-4 py-6">
        <LocusGraphMark className="size-4" />
        <span className="eyebrow">Mark · 16px tall</span>
      </div>
      <div className="flex flex-col items-center gap-3 px-4 py-6">
        <span className="flex w-20 flex-col gap-1">
          <LocusGraphWordmark className="text-[14.5px] leading-none" />
          <span className="h-px w-20 bg-s1" />
        </span>
        <span className="eyebrow">Wordmark · 80px wide</span>
      </div>
    </div>
  );
}

function WhenToUseEach() {
  return (
    <div className="w-[40rem] max-w-full divide-y ring-1 ring-border">
      {formUse.map((row) => (
        <div key={row.form} className="grid grid-cols-[8rem_1fr] items-center gap-4 px-4 py-4">
          <span className="text-2xl">
            <Logo form={row.form} />
          </span>
          <span className="flex flex-col gap-1">
            <span className="eyebrow">{row.form}</span>
            <span className="text-sm text-muted-foreground">{row.when}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function LightAndDark() {
  return (
    <div className="grid w-[40rem] max-w-full grid-cols-2 ring-1 ring-border">
      <ThemeScope theme="light" className="flex h-36 flex-col items-center justify-center gap-3">
        <LocusGraphWordmark withMark className="text-2xl" />
        <span className="eyebrow">On light: near-black #09090b</span>
      </ThemeScope>
      <ThemeScope theme="dark" className="flex h-36 flex-col items-center justify-center gap-3">
        <LocusGraphWordmark withMark className="text-2xl" />
        <span className="eyebrow">On dark: off-white #ededed</span>
      </ThemeScope>
    </div>
  );
}

function DosAndDonts() {
  return <LogoRuleGrid />;
}

export default defineDemo({
  title: "Logo Use",
  description:
    "How to place the LocusGraph mark, wordmark and lockup: clear space, minimum sizes, which form to use where, light and dark, and what never to do to it. The logo is one color, the current foreground.",
  controls: { form: select(logoForms, "lockup") },
  playground: ({ form }) => <ClearSpace form={form} />,
  code: ({ form }) => {
    if (form === "mark") return '<LocusGraphMark className="size-8" />';
    if (form === "wordmark") return '<LocusGraphWordmark className="text-2xl" />';
    return '<LocusGraphWordmark withMark className="text-2xl" />';
  },
  props: [
    { name: "clear space", type: "rule", defaultValue: "0.25 × mark height on every side" },
    { name: "mark minimum", type: "rule", defaultValue: "16px tall" },
    { name: "wordmark minimum", type: "rule", defaultValue: "80px wide" },
    { name: "color", type: "rule", defaultValue: "currentColor, foreground only" },
  ],
  examples: {
    MinimumSizes: {
      description: "Below these sizes the rays of the mark and the light weight of graph blur.",
      component: MinimumSizes,
    },
    WhenToUseEach: {
      description: "Mark, wordmark or lockup, by the space and the moment.",
      component: WhenToUseEach,
    },
    LightAndDark: {
      description: "One color: the foreground of the surface it sits on.",
      component: LightAndDark,
    },
    DosAndDonts: {
      description: "The supplied lockup, and seven ways not to use it.",
      component: DosAndDonts,
    },
  },
  isNew: true,
});
