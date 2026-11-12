import { describe, expect, it } from "vitest";
import { pagePathOf } from "../../plugins/dev/page-routes";

describe("pagePathOf", () => {
  it("drops the query and the outer slashes", () => {
    expect(pagePathOf("/installation?theme=light")).toBe("installation");
    expect(pagePathOf("/loop/approval/approval/")).toBe("loop/approval/approval");
    expect(pagePathOf("/")).toBe("");
  });

  it("decodes escaped characters", () => {
    expect(pagePathOf("/components/date%20picker")).toBe("components/date picker");
  });
});
