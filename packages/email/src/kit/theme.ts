import { fonts, hairline, lightColors } from "@locusgraph/tokens";

export const emailColors = {
  ...lightColors,
  page: "#f4f4f5",
  line: hairline(lightColors),
};

export const emailFonts = { sans: fonts.emailSafeSans, mono: fonts.emailSafeMono };

export const contentWidth = 560;
