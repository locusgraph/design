import type { SVGProps } from "react";

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * Example SVG component. Replace or duplicate this pattern for your icons.
 */
export function PlaceholderIcon({ size = 24, className, ...props }: SvgIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l2 2" />
    </svg>
  );
}
