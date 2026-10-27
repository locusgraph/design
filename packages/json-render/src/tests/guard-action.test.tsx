import { describe, expect, it, vi } from "vitest";
import { guardAction } from "../actions/guard-action";

function harness(initial: Record<string, unknown>) {
  let state = initial;
  const setState = (updater: (previous: Record<string, unknown>) => Record<string, unknown>) => {
    state = updater(state);
  };
  return { setState, read: () => state };
}

const picked = { actionId: "upgrade", target: "Team" };

describe("guardAction", () => {
  it("runs once while a click is in flight, then settles with the label", async () => {
    let finish: (label: string) => void = () => {};
    const run = vi.fn(() => new Promise<string>((resolve) => (finish = resolve)));
    const handler = guardAction(run);
    const { setState, read } = harness({ picked });
    const first = handler({}, setState, read());
    await handler({}, setState, { picked });
    expect(run).toHaveBeenCalledOnce();
    expect(read().pending).toEqual(picked);
    finish("Moved to Team");
    await first;
    expect(read().pending).toBeNull();
    expect(read().settled).toEqual({ ...picked, label: "Moved to Team" });
  });

  it("leaves the turn open when the run returns null", async () => {
    const handler = guardAction(async () => null);
    const { setState, read } = harness({ picked });
    await handler({}, setState, read());
    expect(read().pending).toBeNull();
    expect(read().settled).toBeNull();
  });

  it("does nothing on a settled or locked turn", async () => {
    const run = vi.fn(async () => "Done");
    const handler = guardAction(run);
    const { setState } = harness({});
    await handler({}, setState, { picked, settled: { ...picked, label: "Done" } });
    await handler({}, setState, { picked, locked: true });
    expect(run).not.toHaveBeenCalled();
  });

  it("clears pending when the run throws", async () => {
    const handler = guardAction(async () => {
      throw new Error("network");
    });
    const { setState, read } = harness({ picked });
    await expect(handler({}, setState, read())).rejects.toThrow("network");
    expect(read().pending).toBeNull();
  });
});
