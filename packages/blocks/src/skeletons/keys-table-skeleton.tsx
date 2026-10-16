import {
  SkeletonBar,
  SkeletonLoadingLabel,
  skeletonRootProps,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@locusgraph/components";

type KeysTableSkeletonProps = {
  rows?: number;
};

const columns = [
  { name: "Name", visibility: "", bar: "w-28" },
  { name: "Key", visibility: "hidden md:table-cell", bar: "w-36" },
  { name: "Product", visibility: "", bar: "w-20" },
  { name: "Created by", visibility: "hidden md:table-cell", bar: "w-32" },
  { name: "Created", visibility: "hidden sm:table-cell", bar: "w-20" },
  { name: "Expires", visibility: "", bar: "w-20" },
] as const;

export function KeysTableSkeleton({ rows = 3 }: KeysTableSkeletonProps) {
  const count = Math.max(1, Math.floor(rows));
  return (
    <div data-slot="keys-table-skeleton" {...skeletonRootProps} className="w-full">
      <Table aria-hidden="true">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((column) => (
              <TableHead key={column.name} className={column.visibility}>
                {column.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: count }, (_, row) => (
            <TableRow
              // biome-ignore lint/suspicious/noArrayIndexKey: placeholder rows have no identity
              key={row}
              data-slot="keys-table-skeleton-row"
              className="hover:bg-transparent"
            >
              {columns.map((column) => (
                <TableCell key={column.name} className={column.visibility}>
                  <SkeletonBar className={`h-4 ${column.bar}`} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SkeletonLoadingLabel>Loading API keys…</SkeletonLoadingLabel>
    </div>
  );
}
