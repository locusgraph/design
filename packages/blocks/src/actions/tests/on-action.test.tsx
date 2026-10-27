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

const keys: ApiKeyRow[] = [
  {
    id: "k1",
    name: "worker",
    maskedKey: "lg_…a1b2",
    productLabel: "LocusGraph",
    createdBy: "You",
    createdAt: null,
    expiresAt: null,
  },
  {
    id: "k2",
    name: "report",
    maskedKey: "sg_…9f3c",
    productLabel: "SpendGraph",
    createdBy: "You",
    createdAt: null,
    expiresAt: null,
  },
];

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

describe("onAction", () => {
  it("passes the action id and the plan that was clicked", async () => {
    const onAction = vi.fn();
    await mount(
      <Plans plans={plans} actions={[{ id: "upgrade", label: "Upgrade" }]} onAction={onAction} />
    );
    const [, team] = buttonsFor("upgrade");
    await act(async () => team?.click());
    expect(onAction).toHaveBeenCalledExactlyOnceWith("upgrade", plans[2]);
  });

  it("passes the action id and the key that was clicked", async () => {
    const onAction = vi.fn();
    await mount(
      <Keys
        keys={keys}
        actions={[
          { id: "rotate", label: "Rotate" },
          { id: "revoke", label: "Revoke", variant: "destructive" },
        ]}
        onAction={onAction}
      />
    );
    const [firstRevoke] = buttonsFor("revoke");
    await act(async () => firstRevoke?.click());
    expect(onAction).toHaveBeenCalledExactlyOnceWith("revoke", keys[0]);
  });

  it("does not fire for a disabled action", async () => {
    const onAction = vi.fn();
    await mount(
      <Keys
        keys={keys}
        actions={[{ id: "revoke", label: "Revoke", disabled: true }]}
        onAction={onAction}
      />
    );
    const [firstRevoke] = buttonsFor("revoke");
    await act(async () => firstRevoke?.click());
    expect(onAction).not.toHaveBeenCalled();
  });
});
