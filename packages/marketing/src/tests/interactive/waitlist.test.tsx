import { act } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { WaitlistForm } from "../../index";
import { installDom, type Mounted, mount } from "./dom";

let mounted: Mounted | undefined;

beforeAll(installDom);

afterEach(async () => {
  await mounted?.unmount();
  mounted = undefined;
});

async function submitEmail(email: string) {
  const container = mounted?.container as HTMLElement;
  const input = container.querySelector("input") as HTMLInputElement;
  input.value = email;
  const form = container.querySelector("form") as HTMLFormElement;
  await act(async () => {
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
  return container;
}

describe("WaitlistForm", () => {
  it("sends the trimmed email and shows the success message", async () => {
    const onSubmit = vi.fn(async () => undefined);
    mounted = await mount(<WaitlistForm onSubmit={onSubmit} successText="Thanks!" />);
    const container = await submitEmail("  ada@example.com ");
    expect(onSubmit).toHaveBeenCalledWith("ada@example.com");
    expect(container.querySelector('[role="status"]')?.textContent).toBe("Thanks!");
    expect(container.querySelector("form")).toBeNull();
  });

  it("shows the error the handler returns and keeps the form", async () => {
    mounted = await mount(
      <WaitlistForm onSubmit={async () => ({ error: "Already on the list." })} />
    );
    const container = await submitEmail("ada@example.com");
    expect(container.querySelector('[role="alert"]')?.textContent).toBe("Already on the list.");
    expect(container.querySelector("input")?.getAttribute("aria-invalid")).toBe("true");
  });

  it("falls back to the error text when the handler throws", async () => {
    mounted = await mount(
      <WaitlistForm
        errorText="Could not join."
        onSubmit={async () => {
          throw new Error("network");
        }}
      />
    );
    const container = await submitEmail("ada@example.com");
    expect(container.querySelector('[role="alert"]')?.textContent).toBe("Could not join.");
  });

  it("locks the form while the request runs", async () => {
    let finish: () => void = () => undefined;
    const pending = new Promise<void>((resolve) => {
      finish = resolve;
    });
    mounted = await mount(<WaitlistForm onSubmit={() => pending} />);
    const container = await submitEmail("ada@example.com");
    expect(container.querySelector("form")?.getAttribute("aria-busy")).toBe("true");
    expect(container.querySelector("button")?.disabled).toBe(true);
    await act(async () => finish());
  });
});
