import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "../pagination";

describe("Breadcrumb", () => {
  it("marks the last crumb as the current page", () => {
    const html = renderToStaticMarkup(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/billing">Billing</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Invoices</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    expect(html).toContain('aria-label="breadcrumb"');
    expect(html).toMatch(/aria-current="page"[^>]*>Invoices</);
  });
});

describe("Pagination", () => {
  it("marks the active page link", () => {
    const html = renderToStaticMarkup(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="?page=2" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="?page=3" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    expect(html).toMatch(
      /aria-current="page"[^>]*href="\?page=2"|href="\?page=2"[^>]*aria-current="page"/
    );
    expect(html).toContain('href="?page=3"');
  });
});
