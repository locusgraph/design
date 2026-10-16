import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Composer } from "../index";

const noop = () => {};

describe("Composer", () => {
  it("shows a disabled Send button while the prompt is empty", () => {
    const html = renderToStaticMarkup(<Composer onSubmit={noop} />);
    expect(html).toContain('aria-label="Message"');
    expect(html).toMatch(/aria-label="Send"[^>]*disabled=""/);
    expect(html).not.toContain('aria-label="Stop"');
  });

  it("enables Send once there is text", () => {
    const html = renderToStaticMarkup(<Composer onSubmit={noop} defaultValue="Summarise memory" />);
    expect(html).not.toMatch(/aria-label="Send"[^>]*disabled=""/);
  });

  it.each(["submitting", "streaming"] as const)("shows Stop while %s", (status) => {
    const html = renderToStaticMarkup(<Composer onSubmit={noop} onStop={noop} status={status} />);
    expect(html).toContain('aria-label="Stop"');
    expect(html).not.toContain('aria-label="Send"');
    expect(html).toContain('aria-busy="true"');
  });

  it("renders the attachments and model slots, attach button and error", () => {
    const html = renderToStaticMarkup(
      <Composer
        onSubmit={noop}
        onAttachFiles={noop}
        status="error"
        errorMessage="The model is unavailable."
        attachments={<span>notes.md</span>}
        modelSlot={<span>claude-sonnet</span>}
      />
    );
    expect(html).toContain("notes.md");
    expect(html).toContain("claude-sonnet");
    expect(html).toContain('aria-label="Attach files"');
    expect(html).toContain('role="alert"');
    expect(html).toContain('aria-invalid="true"');
  });

  it("disables the textarea when disabled", () => {
    const html = renderToStaticMarkup(<Composer onSubmit={noop} disabled defaultValue="hi" />);
    expect(html).toMatch(/<textarea[^>]*disabled=""/);
    expect(html).toContain('data-disabled="true"');
  });
});
