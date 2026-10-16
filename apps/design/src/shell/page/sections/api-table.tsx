import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@locusgraph/components";
import type { PropRow } from "../../../registry/define-demo";

export function ApiTable({ rows }: { rows: PropRow[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">No props documented.</p>;
  }
  return (
    <div className="overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prop</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className="font-mono text-[13px]">{row.name}</TableCell>
              <TableCell className="font-mono text-[13px] whitespace-normal text-muted-foreground">
                {row.type}
              </TableCell>
              <TableCell className="font-mono text-[13px]">{row.defaultValue ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
