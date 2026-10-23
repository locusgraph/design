import type * as React from "react";
import { cn } from "../../../cn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../table";
import { SkeletonBar, SkeletonLoadingLabel, skeletonRootProps } from "../skeleton-parts";

type SkeletonTableProps = React.ComponentProps<"div"> & {
  rows?: number;
  columns?: number;
  label?: string;
};

const cellWidths = ["w-24", "w-32", "w-20", "w-28", "w-16"] as const;

function cellWidth(column: number) {
  return cellWidths[column % cellWidths.length];
}

function indexes(count: number) {
  return Array.from({ length: Math.max(1, Math.floor(count)) }, (_, index) => index);
}

function SkeletonTable({ rows = 5, columns = 4, label, className, ...props }: SkeletonTableProps) {
  const columnIndexes = indexes(columns);
  return (
    <div
      data-slot="skeleton-table"
      {...skeletonRootProps}
      className={cn("w-full", className)}
      {...props}
    >
      <Table aria-hidden="true">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columnIndexes.map((column) => (
              <TableHead key={column}>
                <SkeletonBar className="h-3 w-16" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {indexes(rows).map((row) => (
            <TableRow key={row} data-slot="skeleton-table-row" className="hover:bg-transparent">
              {columnIndexes.map((column) => (
                <TableCell key={column}>
                  <SkeletonBar className={cn("h-4", cellWidth(column))} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SkeletonLoadingLabel>{label}</SkeletonLoadingLabel>
    </div>
  );
}

export { SkeletonTable };
