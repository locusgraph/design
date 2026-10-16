import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@locusgraph/components";
import { CreditCardIcon, KeyRoundIcon, UsersIcon } from "lucide-react";
import { formatProp } from "../../registry/control-values";
import { defineDemo, text, toggle } from "../../registry/define-demo";

const productLinks = [
  { href: "#locusgraph", title: "LocusGraph", body: "Graph memory for your agents." },
  { href: "#spendgraph", title: "SpendGraph", body: "Track and forecast cloud spend." },
  { href: "#platform", title: "Platform", body: "Shared billing, orgs and API keys." },
];

function Basic() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-1">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <NavigationMenuLink href={link.href}>
                    <div className="font-medium">{link.title}</div>
                    <p className="text-muted-foreground">{link.body}</p>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#pricing" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function WithIcons() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-52 gap-1">
              <li>
                <NavigationMenuLink href="#members" className="flex-row items-center gap-2">
                  <UsersIcon />
                  Members
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#billing" className="flex-row items-center gap-2">
                  <CreditCardIcon />
                  Billing
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#api-keys" className="flex-row items-center gap-2">
                  <KeyRoundIcon />
                  API keys
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default defineDemo({
  title: "Navigation Menu",
  isNew: true,
  previewHeight: "tall",
  description:
    "Top-level site links where some items open a panel of related pages. Built on Radix with full keyboard support.",
  controls: { viewport: toggle(true), trigger: text("Products") },
  playground: ({ viewport, trigger }) => (
    <NavigationMenu key={String(viewport)} viewport={viewport}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{trigger}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-1">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <NavigationMenuLink href={link.href}>
                    <div className="font-medium">{link.title}</div>
                    <p className="text-muted-foreground">{link.body}</p>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#docs" className={navigationMenuTriggerStyle()}>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  code: ({ viewport, trigger }) =>
    `<NavigationMenu${formatProp("viewport", viewport, true)}>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>${trigger}</NavigationMenuTrigger>\n      <NavigationMenuContent>\n        <NavigationMenuLink href="#locusgraph">LocusGraph</NavigationMenuLink>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n    <NavigationMenuItem>\n      <NavigationMenuLink href="#docs" className={navigationMenuTriggerStyle()}>\n        Docs\n      </NavigationMenuLink>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>`,
  props: [
    { name: "viewport", type: "boolean", defaultValue: "true" },
    { name: "value / onValueChange", type: "controlled open item" },
    { name: "delayDuration", type: "number", defaultValue: "200" },
    { name: "navigationMenuTriggerStyle", type: "() => string" },
  ],
  examples: {
    Basic: {
      description: "A trigger that opens product links, next to a plain top-level link.",
      component: Basic,
    },
    WithIcons: {
      description: "viewport={false} anchors the panel under its own trigger.",
      component: WithIcons,
    },
  },
  composition: {
    name: "NavigationMenu",
    children: [
      {
        name: "NavigationMenuList",
        children: [
          {
            name: "NavigationMenuItem",
            children: [
              { name: "NavigationMenuTrigger" },
              { name: "NavigationMenuContent", children: [{ name: "NavigationMenuLink" }] },
            ],
          },
          { name: "NavigationMenuItem", children: [{ name: "NavigationMenuLink" }] },
        ],
      },
    ],
  },
});
