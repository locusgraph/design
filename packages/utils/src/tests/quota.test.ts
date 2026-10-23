import { describe, expect, it } from "vitest";
import { quotaPercent, quotaStatus } from "../quota";

describe("quota", () => {
  it("caps the percent at 100 and handles a zero allowance", () => {
    expect(quotaPercent({ used: 18200, included: 100000 })).toBe(18);
    expect(quotaPercent({ used: 10450, included: 10000 })).toBe(100);
    expect(quotaPercent({ used: 0, included: 0 })).toBe(0);
    expect(quotaPercent({ used: 1, included: 0 })).toBe(100);
  });

  it("is near from 80 percent and over only past the allowance", () => {
    expect(quotaStatus({ used: 79, included: 100 })).toBe("ok");
    expect(quotaStatus({ used: 796, included: 1000 })).toBe("ok");
    expect(quotaStatus({ used: 80, included: 100 })).toBe("near");
    expect(quotaStatus({ used: 100, included: 100 })).toBe("near");
    expect(quotaStatus({ used: 101, included: 100 })).toBe("over");
  });
});
