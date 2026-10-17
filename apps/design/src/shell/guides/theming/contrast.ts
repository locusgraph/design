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
