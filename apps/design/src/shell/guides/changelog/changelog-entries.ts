export type ChangelogEntry = {
  id: string;
  date: string;
  title: string;
  packages: string[];
  changes: string[];
};

export const changelogEntries: ChangelogEntry[] = [
  {
    id: "2026-11-12-peers",
    date: "2026-11-12",
    title: "Blocks, Loop and json-render accept components 0.7",
    packages: ["blocks 0.9.1", "loop 0.7.1", "json-render 0.3.1"],
    changes: [
      "The components peer range moves to ^0.7.0, so an app on components 0.7 gets one copy and no peer warnings.",
      "Loop's model picker and context popover drop the overlay shadow, like the other overlays.",
    ],
  },
  {
    id: "2026-11-12",
    date: "2026-11-12",
    title: "Counts in the app sidebar",
    packages: ["components 0.7.0"],
    changes: [
      "AppSidebar nav items take an optional count, read as part of the link name and kept for screen readers when the sidebar collapses to icons.",
      "useIsMobile and the docs active section hook start with use client, so a server component can import them.",
      "@phosphor-icons/react is a caret range instead of an exact pin.",
    ],
  },
  {
    id: "2026-11-10",
    date: "2026-11-10",
    title: "Overlays without shadows",
    packages: ["components 0.6.2"],
    changes: [
      "Dialogs, sheets, drawers, popovers, menus, selects, comboboxes, chart tooltips and toasts drop the overlay shadow and keep their border or ring.",
    ],
  },
  {
    id: "2026-11-07",
    date: "2026-11-07",
    title: "More blocks for models, local times and the SpendGraph mark",
    packages: ["blocks 0.9.0", "loop 0.7.0", "json-render 0.3.0", "brand 0.4.0"],
    changes: [
      "SpendGraphMark, the tally stick, alone and in SpendGraphWordmark withMark, also as spendgraph-mark.svg.",
      "json-render catalog adds Quota, UsageAlert and KeysEmpty, with links bound to state.",
      "TopUp takes settled and shows the outcome in place of the packs.",
      "Approval and Decision Log times show in the viewer's time zone after hydration, UTC before.",
    ],
  },
  {
    id: "2026-10-28-actions",
    date: "2026-10-28",
    title: "One click, one run",
    packages: ["blocks 0.8.0", "json-render 0.2.0"],
    changes: [
      "Plans and Keys take pending, which locks every action and spins the one that runs.",
      "Plans and Keys take settled, which shows the outcome in place of the buttons.",
      "guardAction runs one action at a time and writes /pending, then /settled, to state.",
      "/locked freezes an older turn so its buttons cannot fire again.",
      "Generative UI page: an Extend tab for adding, replacing and removing catalog components.",
    ],
  },
  {
    id: "2026-10-28",
    date: "2026-10-28",
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
