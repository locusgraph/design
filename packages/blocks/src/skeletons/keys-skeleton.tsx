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

type KeysSkeletonProps = {
  rows?: number;
  actions?: boolean;
};

const columns = [
  { name: "Key", visibility: "hidden md:table-cell", bar: "w-36" },
  { name: "Product", visibility: "", bar: "w-20" },
  { name: "Created by", visibility: "hidden md:table-cell", bar: "w-32" },
  { name: "Created", visibility: "hidden md:table-cell", bar: "w-20" },
  { name: "Expires", visibility: "", bar: "w-20" },
] as const;

function NameCellSkeleton() {
  return (
    <TableCell className="max-w-40">
      <div className="flex flex-col gap-1">
        <SkeletonBar className="h-4 w-28" />
        <SkeletonBar className="h-3 w-20 md:hidden" />
      </div>
    </TableCell>
  );
}

export function KeysSkeleton({ rows = 3, actions = false }: KeysSkeletonProps) {
  const count = Math.max(1, Math.floor(rows));
  return (
    <div data-slot="keys-skeleton" {...skeletonRootProps} className="w-full">
      <Table aria-hidden="true">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            {columns.map((column) => (
              <TableHead key={column.name} className={column.visibility}>
                {column.name}
              </TableHead>
            ))}
            {actions && <TableHead className="w-0" />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: count }, (_, row) => (
            <TableRow
              // biome-ignore lint/suspicious/noArrayIndexKey: placeholder rows have no identity
              key={row}
              data-slot="keys-skeleton-row"
              className="hover:bg-transparent"
            >
              <NameCellSkeleton />
              {columns.map((column) => (
                <TableCell key={column.name} className={column.visibility}>
                  <SkeletonBar className={`h-4 ${column.bar}`} />
                </TableCell>
              ))}
              {actions && (
                <TableCell className="w-0 pr-2 text-right">
                  <SkeletonBar className="ml-auto h-control-sm w-16 rounded-full" />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SkeletonLoadingLabel>Loading API keys…</SkeletonLoadingLabel>
    </div>
  );
}
