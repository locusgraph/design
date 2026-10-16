import type * as React from "react";
import { LocusGraphMark } from "../locusgraph-mark";
import { brandGlow, brandThemes } from "../themes/brand-themes";

export type LocusGraphIconVariant = "dark" | "light" | "brand";

export const iconPaddingRatio = 0.18;

export const iconColors: Record<LocusGraphIconVariant, { tile: string; mark: string }> = {
  dark: { tile: brandThemes.dark.background, mark: brandThemes.dark.foreground },
  light: { tile: brandThemes.light.background, mark: brandThemes.light.foreground },
  brand: { tile: brandGlow, mark: "#ffffff" },
};

const markViewBox = { width: 29, height: 26 };

type LocusGraphIconProps = Omit<React.SVGProps<SVGSVGElement>, "children"> & {
  size?: number;
  variant?: LocusGraphIconVariant;
};

function markPathElements(): React.ReactNode {
  return LocusGraphMark({}).props.children;
}

function centeredMarkTransform(size: number) {
  const padding = size * iconPaddingRatio;
  const markBox = size - padding * 2;
  const scale = markBox / markViewBox.width;
  const top = padding + (markBox - markViewBox.height * scale) / 2;
  return `translate(${round(padding)} ${round(top)}) scale(${round(scale)})`;
}

function round(value: number) {
  return Math.round(value * 1000) / 1000;
}

export function LocusGraphIcon({
  size = 64,
  variant = "dark",
  style,
  ...props
}: LocusGraphIconProps) {
  const colors = iconColors[variant];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label="LocusGraph"
      data-slot="locusgraph-icon"
      color={colors.mark}
      style={{ color: colors.mark, ...style }}
      {...props}
    >
      <rect width={size} height={size} fill={colors.tile} />
      <g transform={centeredMarkTransform(size)} fill={colors.mark}>
        {markPathElements()}
      </g>
    </svg>
  );
}
