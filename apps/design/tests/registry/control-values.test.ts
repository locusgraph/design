import { describe, expect, it } from "vitest";
import { formatProp, readControlValues } from "../../src/registry/control-values";
import { select, text, toggle } from "../../src/registry/define-demo";

const controls = {
  variant: select(["default", "outline"]),
  disabled: toggle(),
  label: text("Save"),
};

describe("readControlValues", () => {
  it("uses initial values when the URL has none", () => {
    expect(readControlValues(controls, new URLSearchParams())).toEqual({
      variant: "default",
      disabled: false,
      label: "Save",
    });
  });

  it("reads values from the URL", () => {
    const params = new URLSearchParams("variant=outline&disabled=true&label=Go");
    expect(readControlValues(controls, params)).toEqual({
      variant: "outline",
      disabled: true,
      label: "Go",
    });
  });

  it("ignores a select value that is not an option", () => {
    const params = new URLSearchParams("variant=huge");
    expect(readControlValues(controls, params).variant).toBe("default");
  });
});

describe("formatProp", () => {
  it("omits a value equal to the initial one", () => {
    expect(formatProp("variant", "default", "default")).toBe("");
  });

  it("writes strings and booleans as JSX props", () => {
    expect(formatProp("variant", "outline", "default")).toBe(' variant="outline"');
    expect(formatProp("disabled", true, false)).toBe(" disabled");
    expect(formatProp("modal", false, true)).toBe(" modal={false}");
  });
});
