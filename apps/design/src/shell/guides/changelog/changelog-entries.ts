export type ChangelogEntry = {
  id: string;
  date: string;
  title: string;
  packages: string[];
  changes: string[];
};

export const changelogEntries: ChangelogEntry[] = [
  {
    id: "next",
    date: "Next release",
    title: "Human in the loop, IBM Plex and a quieter light theme",
    packages: [
      "tokens 0.5.0",
      "components 0.6.0",
      "loop 0.6.0",
      "blocks 0.7.1",
      "email 0.2.1",
      "brand 0.3.0",
      "json-render 0.1.0",
    ],
    changes: [
      "Approval Gate, change preview, Allow for this run and Decision Log with a timeline rail.",
      "@locusgraph/json-render: a catalog and registry so a model can lay out Locus Design screens.",
      "IBM Plex Sans and Plex Mono replace Inter and Fira Code; Archivo for labels and buttons.",
      "Deeper light palette, good and warn fill tokens for bars, pointer cursor on controls.",
      "Toaster as a quiet card with a status icon, a detail line and one action.",
      "Segmented tabs are pills; vertical tabs drop the track and mark the active tab with a muted pill.",
      "Chat fades at its scroll edges, the composer is shorter and a disabled send stays a solid pill.",
      "Approval inputs and changes stack label over value in narrow containers.",
      "Docs sidebar and On this page titles in semibold foreground, so groups stand out from links.",
      "Guides for principles, human in the loop and agents, each also served as Markdown.",
    ],
  },
  {
    id: "2026-10-27",
    date: "2026-10-27",
    title: "Actions as data",
    packages: ["blocks 0.7.0", "loop 0.5.0"],
    changes: [
      "Plans and Keys take actions as data through onAction, so a spec can drive them.",
      "Turn renders data parts through renderData.",
    ],
  },
  {
    id: "2026-10-26",
    date: "2026-10-26",
    title: "Nav tabs and usage alerts",
    packages: ["components 0.5.0", "blocks 0.6.1", "blocks 0.6.0", "loop 0.4.1"],
    changes: [
      "Nav Tabs link the pages of one place.",
      "Usage Alert takes a low balance threshold and states quotas as used of included.",
      "Quota is a client component, so server pages can render it.",
    ],
  },
  {
    id: "2026-10-24",
    date: "2026-10-24",
    title: "Text-first chat and readable role colors",
    packages: ["tokens 0.4.0", "components 0.4.0", "blocks 0.5.0", "loop 0.4.0", "email 0.2.0"],
    changes: [
      "Loop chat leads with text: no frames or panels in the thread.",
      "Role colors renamed for their meaning and darkened to pass WCAG AA.",
      "One type scale, four control heights and the locus focus ring.",
      "Every theme variable, class and keyframe is prefixed with locus.",
    ],
  },
  {
    id: "2026-10-20",
    date: "2026-10-20",
    title: "React Compiler",
    packages: ["components 0.3.1", "loop 0.3.1"],
    changes: [
      "Client components are memoized by the React Compiler.",
      "Vertical line tabs tint the active tab instead of drawing a side bar.",
    ],
  },
  {
    id: "2026-10-17",
    date: "2026-10-17",
    title: "Surface depth and virtualized lists",
    packages: ["tokens 0.2.0", "brand 0.2.0", "components 0.2.1", "blocks 0.3.1", "loop 0.2.0"],
    changes: [
      "Cells sit one step above the page in both themes.",
      "Chat, history and inbox virtualize long lists, and dist is built with the React Compiler.",
    ],
  },
];
