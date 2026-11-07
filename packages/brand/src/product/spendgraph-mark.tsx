import type * as React from "react";

const leftHalf =
  "M8 4H12A2 2 0 0 1 14 6V8H11A1 1 0 0 0 11 10H14V12H12A1 1 0 0 0 12 14H14V16H11A1 1 0 0 0 11 18H14V20H13A1 1 0 0 0 13 22H14V24A2 2 0 0 1 12 26H8A2 2 0 0 1 6 24V6A2 2 0 0 1 8 4Z";
const rightHalf =
  "M20 4H24A2 2 0 0 1 26 6V24A2 2 0 0 1 24 26H20A2 2 0 0 1 18 24V22H19A1 1 0 0 0 19 20H18V18H21A1 1 0 0 0 21 16H18V14H20A1 1 0 0 0 20 12H18V10H21A1 1 0 0 0 21 8H18V6A2 2 0 0 1 20 4Z";

const spendGraphTallyPath = `${leftHalf}${rightHalf}`;

export function SpendGraphMark({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d={spendGraphTallyPath} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
