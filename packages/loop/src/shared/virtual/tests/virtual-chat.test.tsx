import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { Chat } from "../../../chat/chat/chat";
import { Turn } from "../../../chat/turn/turn";
import type { AgentMessage } from "../../../types";
import { installDom } from "./dom";

function thread(count: number): AgentMessage[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `msg_${index}`,
    role: index % 2 === 0 ? "user" : "assistant",
    parts: [{ type: "text", text: `Message number ${index}` }],
  }));
}

function chatOf(messages: AgentMessage[]) {
  return (
    <Chat>
      {messages.map((message) => (
        <Turn key={message.id} message={message} />
      ))}
    </Chat>
  );
}

let root: Root | undefined;
let container: HTMLElement;

function mount(messages: AgentMessage[]) {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => root?.render(chatOf(messages)));
}

function renderedTurns() {
  return [...container.querySelectorAll('[data-slot="chat-item"]')].map((item) =>
    Number(item.getAttribute("data-index"))
  );
}

function scrollViewportTo(top: number) {
  const viewport = container.querySelector<HTMLElement>('[data-slot="chat-viewport"]');
  if (!viewport) throw new Error("no viewport");
  act(() => {
    viewport.scrollTop = top;
    viewport.dispatchEvent(new Event("scroll"));
  });
}

describe("virtual Chat in a browser", () => {
  beforeAll(() => {
    installDom();
  });

  afterEach(() => {
    act(() => root?.unmount());
    container.remove();
  });

  it("mounts at the latest turn and renders a window of turns", () => {
    mount(thread(200));
    const indexes = renderedTurns();
    expect(indexes.length).toBeLessThan(40);
    expect(indexes).toContain(199);
    expect(container.textContent).toContain("Message number 199");
  });

  it("renders the newest turn when one is appended", () => {
    const messages = thread(200);
    mount(messages);
    act(() => root?.render(chatOf([...messages, ...thread(201).slice(200)])));
    expect(renderedTurns()).toContain(200);
  });

  it("keeps the focused turn rendered after it scrolls out of view", () => {
    mount(thread(200));
    const last = container.querySelector<HTMLElement>('[data-index="199"]');
    act(() => {
      last?.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    });
    scrollViewportTo(0);
    const indexes = renderedTurns();
    expect(indexes).toContain(0);
    expect(indexes).toContain(199);
  });
});
