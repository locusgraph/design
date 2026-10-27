import { act, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Keys, Plans } from "../../index";
import type { ApiKeyRow, PlanOffer } from "../../types";
import { installDom } from "./dom";

const plans: PlanOffer[] = [
  { name: "Free", price: "$0", points: ["A free tier"], current: true },
  { name: "Pro", price: "$40.00 per month", points: ["Higher quotas"], current: false },
  { name: "Team", price: "$90.00 per month", points: ["Seats"], current: false },
];

const keys: ApiKeyRow[] = ["k1", "k2"].map((id) => ({
  id,
  name: id,
  maskedKey: `lg_…${id}`,
  productLabel: "LocusGraph",
  createdBy: "You",
  createdAt: null,
  expiresAt: null,
}));

let root: Root | undefined;
let container: HTMLElement;

async function mount(node: ReactNode) {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () => root?.render(node));
}

function buttonsFor(actionId: string) {
  return [...container.querySelectorAll<HTMLButtonElement>(`[data-action-id="${actionId}"]`)];
}

beforeAll(installDom);

afterEach(async () => {
  await act(async () => root?.unmount());
  container.remove();
});

describe("pending", () => {
  it("disables every action and marks the one that is running", async () => {
    const onAction = vi.fn();
    await mount(
      <Plans
        plans={plans}
        actions={[{ id: "upgrade", label: "Upgrade" }]}
        onAction={onAction}
        pending={{ actionId: "upgrade", target: "Team" }}
      />
    );
    const [pro, team] = buttonsFor("upgrade");
    expect(pro?.disabled).toBe(true);
    expect(team?.disabled).toBe(true);
    expect(team?.getAttribute("aria-busy")).toBe("true");
    expect(pro?.hasAttribute("aria-busy")).toBe(false);
    await act(async () => pro?.click());
    expect(onAction).not.toHaveBeenCalled();
  });
});

describe("settled", () => {
  it("shows the outcome on the target and locks the other actions", async () => {
    await mount(
      <Keys
        keys={keys}
        actions={[{ id: "revoke", label: "Revoke" }]}
        settled={{ actionId: "revoke", target: "k1", label: "Revoked" }}
      />
    );
    const outcome = container.querySelector('[data-slot="block-action-outcome"]');
    expect(outcome?.textContent).toBe("Revoked");
    const remaining = buttonsFor("revoke");
    expect(remaining).toHaveLength(1);
    expect(remaining[0]?.disabled).toBe(true);
  });
});
