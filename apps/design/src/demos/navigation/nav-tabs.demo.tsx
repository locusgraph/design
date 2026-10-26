import { type NavTabItem, NavTabs } from "@locusgraph/components";
import {
  Broadcast as BroadcastIcon,
  Files as FilesIcon,
  Graph as GraphIcon,
  MagnifyingGlass as MagnifyingGlassIcon,
} from "@phosphor-icons/react/ssr";
import { defineDemo, select, toggle } from "../../registry/define-demo";

const graphTabs: NavTabItem[] = [
  { title: "Sources", href: "#sources", description: "Documents, and the knowledge they wrote" },
  { title: "Explore", href: "#explore", description: "Browse and edit the graph" },
  { title: "Search", href: "#search", description: "Recall, and why it returned that" },
  { title: "Activity", href: "#activity", description: "Every write, and what admission did" },
  { title: "Review", href: "#review", description: "Decisions waiting", count: 3 },
  { title: "Connect", href: "#connect", description: "Connect an agent" },
];

const iconTabs: NavTabItem[] = [
  { title: "Sources", href: "#sources", icon: FilesIcon },
  { title: "Explore", href: "#explore", icon: GraphIcon },
  { title: "Search", href: "#search", icon: MagnifyingGlassIcon },
  { title: "Activity", href: "#activity", icon: BroadcastIcon },
];

const active = graphTabs.map((tab) => tab.href);

function Basic() {
  return <NavTabs items={graphTabs} activeHref="#sources" label="This graph" />;
}

function WithIcons() {
  return <NavTabs items={iconTabs} activeHref="#search" label="This graph" />;
}

function WithCount() {
  return <NavTabs items={graphTabs.slice(3)} activeHref="#review" label="This graph" />;
}

export default defineDemo({
  title: "Nav Tabs",
  isNew: true,
  description:
    "Links between the pages of one place, such as the sections of a graph, with the current page underlined. Each tab is a real link, so the URL, back button and new tabs work.",
  controls: {
    activeHref: select(active),
    showCount: toggle(true),
  },
  playground: ({ activeHref, showCount }) => (
    <NavTabs
      items={graphTabs.map((tab) => (showCount ? tab : { ...tab, count: undefined }))}
      activeHref={activeHref}
      label="This graph"
    />
  ),
  code: ({ activeHref, showCount }) =>
    `<NavTabs\n  label="This graph"\n  activeHref="${activeHref}"\n  linkComponent={Link}\n  items={[\n    { title: "Sources", href: "#sources", description: "Documents, and the knowledge they wrote" },\n    { title: "Review", href: "#review"${showCount ? ", count: 3" : ""} },\n  ]}\n/>`,
  props: [
    { name: "items", type: "NavTabItem[]" },
    { name: "activeHref", type: "string" },
    { name: "label", type: "string" },
    { name: "linkComponent", type: 'LinkComponent | "a"', defaultValue: '"a"' },
    { name: "NavTabItem.icon", type: "Icon" },
    { name: "NavTabItem.description", type: "string" },
    { name: "NavTabItem.count", type: "number" },
    { name: "NavTabItem.exact", type: "boolean", defaultValue: "false" },
    { name: "...props", type: 'ComponentProps<"nav">' },
  ],
  examples: {
    Basic: {
      description:
        "The active tab and its child pages are underlined; a description shows on hover.",
      component: Basic,
    },
    WithIcons: {
      description: "An icon goes before the title, bold and hidden from screen readers.",
      component: WithIcons,
    },
    WithCount: {
      description: "A count above zero shows as a secondary badge, read as part of the link.",
      component: WithCount,
    },
  },
  composition: { name: "NavTabs", children: [{ name: "NavTabItem" }, { name: "NavTabItem" }] },
});
