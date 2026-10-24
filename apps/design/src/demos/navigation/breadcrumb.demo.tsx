import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@locusgraph/components";
import { defineDemo, select, text, toggle } from "../../registry/define-demo";

const separators = ["chevron", "slash"] as const;

function Basic() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#orgs">Organizations</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#acme">Acme Inc.</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Members</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function CustomSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#billing">Billing</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <span aria-hidden>/</span>
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Invoices</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function Collapsed() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#home">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#invoices">Invoices</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>INV-2041</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default defineDemo({
  title: "Breadcrumb",
  isNew: true,
  description:
    "Shows where the current page sits in the hierarchy, with a link back to each parent.",
  controls: {
    separator: select(separators),
    collapsed: toggle(),
    page: text("API keys"),
  },
  playground: ({ separator, collapsed, page }) => {
    const separatorIcon = separator === "slash" ? <span aria-hidden>/</span> : undefined;
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#orgs">Organizations</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>{separatorIcon}</BreadcrumbSeparator>
          <BreadcrumbItem>
            {collapsed ? (
              <BreadcrumbEllipsis />
            ) : (
              <BreadcrumbLink href="#acme">Acme Inc.</BreadcrumbLink>
            )}
          </BreadcrumbItem>
          <BreadcrumbSeparator>{separatorIcon}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{page}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
  code: ({ separator, collapsed, page }) => {
    const separatorTag =
      separator === "slash"
        ? "<BreadcrumbSeparator>\n      <span aria-hidden>/</span>\n    </BreadcrumbSeparator>"
        : "<BreadcrumbSeparator />";
    const middle = collapsed
      ? "<BreadcrumbEllipsis />"
      : '<BreadcrumbLink href="#acme">Acme Inc.</BreadcrumbLink>';
    return `<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="#orgs">Organizations</BreadcrumbLink>\n    </BreadcrumbItem>\n    ${separatorTag}\n    <BreadcrumbItem>\n      ${middle}\n    </BreadcrumbItem>\n    ${separatorTag}\n    <BreadcrumbItem>\n      <BreadcrumbPage>${page}</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`;
  },
  props: [
    { name: "BreadcrumbLink.asChild", type: "boolean", defaultValue: "false" },
    { name: "BreadcrumbLink.href", type: "string" },
    { name: "BreadcrumbSeparator.children", type: "ReactNode", defaultValue: "<ChevronRight />" },
    { name: "...props", type: 'ComponentProps<"nav">' },
  ],
  examples: {
    Basic: {
      description: "Links to each parent, ending with the current page as plain text.",
      component: Basic,
    },
    CustomSeparator: {
      description: "Pass any icon as the separator's child.",
      component: CustomSeparator,
    },
    Collapsed: {
      description: "BreadcrumbEllipsis stands in for middle levels on deep pages.",
      component: Collapsed,
    },
  },
  composition: {
    name: "Breadcrumb",
    children: [
      {
        name: "BreadcrumbList",
        children: [
          { name: "BreadcrumbItem", children: [{ name: "BreadcrumbLink" }] },
          { name: "BreadcrumbSeparator" },
          { name: "BreadcrumbItem", children: [{ name: "BreadcrumbEllipsis" }] },
          { name: "BreadcrumbSeparator" },
          { name: "BreadcrumbItem", children: [{ name: "BreadcrumbPage" }] },
        ],
      },
    ],
  },
});
