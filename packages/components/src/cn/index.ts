import type { CnFunction } from "cn";
import { createCn } from "cn/config";

const controlSizes = ["control", "control-xs", "control-sm", "control-lg"];
const textSteps = ["2xs", "code"];

export const cn: CnFunction = createCn({
  extend: { theme: { spacing: controlSizes, text: textSteps } },
});
