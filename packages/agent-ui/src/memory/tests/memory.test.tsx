import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { InlineCitation, MemoryRecall, MemoryWrite, Sources } from "../index";

const citation = {
  index: 2,
  title: "Recall ranking in LocusGraph",
  url: "https://www.docs.locusgraph.com/recall",
  snippet: "Recall ranks memories by relevance and recency.",
};

describe("InlineCitation", () => {
  it("renders the number as a link labelled with the source", () => {
    const html = renderToStaticMarkup(<InlineCitation citation={citation} />);
    expect(html).toContain('data-slot="inline-citation"');
    expect(html).toContain('aria-label="Source 2: Recall ranking in LocusGraph"');
    expect(html).toContain('href="https://www.docs.locusgraph.com/recall"');
    expect(html).toContain(">2</a>");
  });

  it("renders a button when the citation has no url", () => {
    const html = renderToStaticMarkup(
      <InlineCitation citation={{ index: 1, title: "Team notes" }} onOpen={() => {}} />
    );
    expect(html).toContain('<button type="button" aria-label="Source 1: Team notes"');
  });
});

describe("Sources", () => {
  const sources = [
    citation,
    { type: "source-url" as const, sourceId: "s1", url: "https://stripe.com/docs/billing" },
  ];

  it("counts the sources while collapsed", () => {
    const html = renderToStaticMarkup(<Sources sources={sources} />);
    expect(html).toContain("Used 2 sources");
    expect(html).not.toContain("stripe.com");
  });

  it("numbers url parts by position and shows hosts when open", () => {
    const html = renderToStaticMarkup(<Sources sources={sources} defaultOpen />);
    expect(html).toContain("[2]");
    expect(html).toContain("docs.locusgraph.com");
    expect(html).toContain("stripe.com");
  });

  it("renders nothing without sources", () => {
    expect(renderToStaticMarkup(<Sources sources={[]} />)).toBe("");
  });
});

describe("MemoryRecall", () => {
  const memories = [
    { id: "mem_1", label: "Prefers weekly invoices", kind: "preference", relevance: 0.92 },
    { id: "mem_2", label: "Billing contact is Dana", kind: "fact", relevance: 0.456 },
  ];

  it("counts recalled memories", () => {
    expect(renderToStaticMarkup(<MemoryRecall memories={memories} />)).toContain(
      "Recalled 2 memories"
    );
  });

  it("exposes relevance as a meter", () => {
    const html = renderToStaticMarkup(
      <MemoryRecall memories={memories} defaultOpen onOpenMemory={() => {}} />
    );
    expect(html).toContain('role="meter"');
    expect(html).toContain('aria-valuenow="92"');
    expect(html).toContain('aria-valuenow="46"');
    expect(html).toContain("preference");
    expect(html).toContain('aria-label="Open memory Prefers weekly invoices"');
  });
});

describe("MemoryWrite", () => {
  it("strikes through undone items and counts only saved ones", () => {
    const html = renderToStaticMarkup(
      <MemoryWrite
        items={[
          { id: "w1", text: "Ships on Fridays", status: "saved" },
          { id: "w2", text: "Uses Postgres", kind: "fact", status: "undone" },
        ]}
        onUndo={() => {}}
      />
    );
    expect(html).toContain("Saved 1 memory");
    expect(html).toContain('data-status="undone"');
    expect(html).toContain("line-through");
    expect(html).toContain("Undone");
    expect(html).toContain('aria-label="Undo saving Ships on Fridays"');
    expect(html).not.toContain('aria-label="Undo saving Uses Postgres"');
  });
});
