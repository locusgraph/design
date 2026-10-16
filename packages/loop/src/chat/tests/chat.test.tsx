import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { AgentMessage } from "../../types";
import { Chat, Turn } from "../index";

function longThread(count: number): AgentMessage[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `msg_${index}`,
    role: index % 2 === 0 ? "user" : "assistant",
    parts: [{ type: "text", text: `Message number ${index}` }],
  }));
}

function renderThread(messages: AgentMessage[], virtualize?: boolean) {
  return renderToStaticMarkup(
    <Chat virtualize={virtualize}>
      {messages.map((message) => (
        <Turn key={message.id} message={message} />
      ))}
    </Chat>
  );
}

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

  it("renders a short thread plainly", () => {
    const html = renderThread(longThread(50));
    expect(html).not.toContain("data-virtual");
    expect(html.match(/role="article"/g)).toHaveLength(50);
  });

  it("renders only the latest screen of a long thread", () => {
    const html = renderThread(longThread(300));
    const rendered = html.match(/data-slot="chat-item"/g) ?? [];
    expect(html).toContain('data-virtual="true"');
    expect(rendered.length).toBeGreaterThan(0);
    expect(rendered.length).toBeLessThan(30);
    expect(html).toContain("Message number 299");
    expect(html).not.toContain("Message number 0<");
    expect(html).toContain('aria-setsize="300"');
    expect(html).toContain('aria-posinset="300"');
  });

  it("renders every turn when virtualization is off", () => {
    const html = renderThread(longThread(120), false);
    expect(html).not.toContain("data-virtual");
    expect(html.match(/role="article"/g)).toHaveLength(120);
  });
});
