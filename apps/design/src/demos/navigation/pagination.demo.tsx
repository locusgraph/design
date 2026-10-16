import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@locusgraph/components";
import { defineDemo, select, toggle } from "../../registry/define-demo";

const pages = ["1", "2", "3"] as const;

function Basic() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#invoices-page-1" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#invoices-page-1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#invoices-page-2" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#invoices-page-3">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#invoices-page-3" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function PreviousNextOnly() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#usage-newer" />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#usage-older" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function WithSummary() {
  return (
    <div className="flex w-full max-w-xl items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">Showing 21–30 of 84 members</p>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#members-page-2" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#members-page-3" isActive>
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#members-page-4" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default defineDemo({
  title: "Pagination",
  isNew: true,
  description:
    "Page through long lists such as invoices or members. Each page is a link, and the current one is marked.",
  controls: { active: select(pages, "2"), ellipsis: toggle(true) },
  playground: ({ active, ellipsis }) => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#previous" />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href={`#page-${page}`} isActive={page === active}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {ellipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext href="#next" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  code: ({ active, ellipsis }) => {
    const links = pages
      .map(
        (page) =>
          `    <PaginationItem>\n      <PaginationLink href="#page-${page}"${page === active ? " isActive" : ""}>${page}</PaginationLink>\n    </PaginationItem>`
      )
      .join("\n");
    const ellipsisItem = ellipsis
      ? "\n    <PaginationItem>\n      <PaginationEllipsis />\n    </PaginationItem>"
      : "";
    return `<Pagination>\n  <PaginationContent>\n    <PaginationItem>\n      <PaginationPrevious href="#previous" />\n    </PaginationItem>\n${links}${ellipsisItem}\n    <PaginationItem>\n      <PaginationNext href="#next" />\n    </PaginationItem>\n  </PaginationContent>\n</Pagination>`;
  },
  props: [
    { name: "PaginationLink.isActive", type: "boolean", defaultValue: "false" },
    { name: "PaginationLink.size", type: "Button size", defaultValue: "icon" },
    { name: "PaginationLink.href", type: "string" },
    { name: "...props", type: 'ComponentProps<"nav">' },
  ],
  examples: {
    Basic: {
      description: "Numbered pages between previous and next, with an ellipsis for the rest.",
      component: Basic,
    },
    PreviousNextOnly: {
      description: "Only previous and next, for cursor-based lists like usage events.",
      component: PreviousNextOnly,
    },
    WithSummary: {
      description: "A count beside the controls tells people where they are.",
      component: WithSummary,
    },
  },
  composition: {
    name: "Pagination",
    children: [
      {
        name: "PaginationContent",
        children: [
          { name: "PaginationItem", children: [{ name: "PaginationPrevious" }] },
          { name: "PaginationItem", children: [{ name: "PaginationLink" }] },
          { name: "PaginationItem", children: [{ name: "PaginationEllipsis" }] },
          { name: "PaginationItem", children: [{ name: "PaginationNext" }] },
        ],
      },
    ],
  },
});
