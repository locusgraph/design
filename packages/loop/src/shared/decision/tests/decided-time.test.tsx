import { act, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { beforeAll, describe, expect, it } from "vitest";
import { installDom } from "../../virtual/tests/dom";

const decidedAt = new Date("2026-10-28T10:00:00Z");
const firstCommitTexts: string[] = [];

function RecordFirstCommit({ container }: { container: HTMLElement }) {
  useLayoutEffect(() => {
    firstCommitTexts.push(container.querySelector("time")?.textContent ?? "");
  }, [container]);
  return null;
}

async function loadDecidedTime() {
  const module = await import("../decided-time");
  return module.DecidedTime;
}

describe("DecidedTime", () => {
  beforeAll(() => {
    process.env.TZ = "Asia/Kolkata";
    installDom();
  });

  it("renders UTC on the server", async () => {
    const DecidedTime = await loadDecidedTime();
    const html = renderToString(<DecidedTime date={decidedAt} style="time" />);
    expect(html).toContain("10:00 AM UTC");
  });

  it("shows the viewer's local time on the first client render, without UTC", async () => {
    const DecidedTime = await loadDecidedTime();
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () =>
      root.render(
        <>
          <DecidedTime date={decidedAt} style="time" />
          <RecordFirstCommit container={container} />
        </>
      )
    );
    expect(firstCommitTexts).toEqual(["3:30 PM"]);
    expect(container.querySelector("time")?.textContent).toBe("3:30 PM");
    await act(async () => root.unmount());
  });
});
