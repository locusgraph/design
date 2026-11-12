import { act } from "react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { Pricing } from "../../index";
import { installDom, type Mounted, mount } from "./dom";

let mounted: Mounted | undefined;

beforeAll(installDom);

afterEach(async () => {
  await mounted?.unmount();
  mounted = undefined;
});

const plans = [
  {
    name: "Pro",
    price: { monthly: "$29", yearly: "$290" },
    action: { label: "Start", href: "/signup" },
  },
];

describe("Pricing period toggle", () => {
  it("switches every plan between monthly and yearly prices", async () => {
    mounted = await mount(<Pricing plans={plans} />);
    const scope = mounted.container.querySelector("[data-period]") as HTMLElement;
    expect(scope.dataset.period).toBe("monthly");
    const yearly = [...mounted.container.querySelectorAll("button")].find(
      (button) => button.textContent === "Yearly"
    );
    await act(async () => {
      (yearly as HTMLButtonElement).click();
    });
    expect(scope.dataset.period).toBe("yearly");
  });
});
