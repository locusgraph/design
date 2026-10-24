function channelLuminance(channel: number) {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string) {
  const digits = hex.replace("#", "");
  const [red, green, blue] = [0, 2, 4].map((start) =>
    channelLuminance(Number.parseInt(digits.slice(start, start + 2), 16))
  );
  return 0.2126 * (red ?? 0) + 0.7152 * (green ?? 0) + 0.0722 * (blue ?? 0);
}

export function contrastRatio(foreground: string, background: string) {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort(
    (first, second) => second - first
  );
  return ((lighter ?? 0) + 0.05) / ((darker ?? 0) + 0.05);
}

export function meetsTextContrast(ratio: number) {
  return ratio >= 4.5;
}

function apcaLuminance(hex: string) {
  const digits = hex.replace("#", "");
  const [red, green, blue] = [0, 2, 4].map(
    (start) => (Number.parseInt(digits.slice(start, start + 2), 16) / 255) ** 2.4
  );
  const luminance = 0.2126729 * (red ?? 0) + 0.7151522 * (green ?? 0) + 0.072175 * (blue ?? 0);
  return luminance < 0.022 ? luminance + (0.022 - luminance) ** 1.414 : luminance;
}

export function apcaLightness(text: string, background: string) {
  const textY = apcaLuminance(text);
  const backgroundY = apcaLuminance(background);
  if (Math.abs(backgroundY - textY) < 0.0005) return 0;
  if (backgroundY > textY) {
    const contrast = (backgroundY ** 0.56 - textY ** 0.57) * 1.14;
    return contrast < 0.1 ? 0 : (contrast - 0.027) * 100;
  }
  const contrast = (backgroundY ** 0.65 - textY ** 0.62) * 1.14;
  return contrast > -0.1 ? 0 : (contrast + 0.027) * 100;
}

export function meetsApcaBodyText(lightness: number) {
  return Math.abs(lightness) >= 60;
}
