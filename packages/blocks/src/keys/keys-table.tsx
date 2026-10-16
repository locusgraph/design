import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@locusgraph/components";
import { formatDate } from "@locusgraph/utils";
import type * as React from "react";
import type { ApiKeyRow } from "../types";

type KeysTableProps = {
  keys: ApiKeyRow[];
  actions?: (key: ApiKeyRow) => React.ReactNode;
};

export function KeysTable({ keys, actions }: KeysTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Key</TableHead>
          <TableHead>Product</TableHead>
          <TableHead className="hidden md:table-cell">Created by</TableHead>
          <TableHead className="hidden sm:table-cell">Created</TableHead>
          <TableHead>Expires</TableHead>
          {actions && <TableHead className="w-0" />}
        </TableRow>
      </TableHeader>
      <TableBody>
        {keys.map((key) => (
          <TableRow key={key.id}>
            <TableCell className="font-medium">{key.name ?? "Untitled"}</TableCell>
            <TableCell className="hidden font-mono text-muted-foreground md:table-cell">
              {key.maskedKey}
            </TableCell>
            <TableCell>{key.productLabel}</TableCell>
            <TableCell className="hidden md:table-cell">{key.createdBy}</TableCell>
            <TableCell className="hidden sm:table-cell">{formatDate(key.createdAt)}</TableCell>
            <TableCell>{formatDate(key.expiresAt, "Never")}</TableCell>
            {actions && <TableCell className="text-right">{actions(key)}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
