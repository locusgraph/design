import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Chat } from "../index";

describe("Chat", () => {
  it("renders the empty slot when there are no messages", () => {
    const html = renderToStaticMarkup(<Chat empty={<p>Ask about your agent memory</p>} />);
    expect(html).toContain('data-slot="chat-empty"');
    expect(html).toContain("Ask about your agent memory");
    expect(html).toContain('data-empty="true"');
  });

  it("renders messages in a labelled log and no jump pill while at the bottom", () => {
    const html = renderToStaticMarkup(
      <Chat empty="Nothing yet" label="Agent thread">
        <p>First message</p>
      </Chat>
    );
    expect(html).toContain('role="log"');
    expect(html).toContain('aria-label="Agent thread"');
    expect(html).toContain("First message");
    expect(html).not.toContain("Nothing yet");
    expect(html).not.toContain("Jump to latest");
  });
});
