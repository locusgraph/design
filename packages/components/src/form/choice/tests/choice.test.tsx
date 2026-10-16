import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Slider } from "../slider";

describe("RadioGroup", () => {
  it("checks the default item only", () => {
    const html = renderToStaticMarkup(
      <RadioGroup defaultValue="monthly">
        <RadioGroupItem value="monthly" aria-label="Monthly" />
        <RadioGroupItem value="yearly" aria-label="Yearly" />
      </RadioGroup>
    );
    expect(html.match(/aria-checked="true"/g)).toHaveLength(1);
    expect(html.match(/role="radio"/g)).toHaveLength(2);
  });
});

describe("Slider", () => {
  it("renders one thumb per value", () => {
    const html = renderToStaticMarkup(<Slider defaultValue={[20, 80]} max={100} />);
    expect(html.match(/data-slot="slider-thumb"/g)).toHaveLength(2);
  });
});
