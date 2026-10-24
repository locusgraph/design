import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@locusgraph/components";
import type * as React from "react";
import { LocalDate } from "../dates/local-date";
import type { ApiKeyRow } from "../types";

type KeysProps = {
  keys: ApiKeyRow[];
  actions?: (key: ApiKeyRow) => React.ReactNode;
  highlightedId?: string;
};

function dateOr(value: string | null, empty: string) {
  return value ? <LocalDate value={value} /> : empty;
}

function expiryPhrase(expiresAt: string | null) {
  return expiresAt ? (
    <>
      Expires <LocalDate value={expiresAt} />
    </>
  ) : (
    "Never expires"
  );
}

export function Keys({ keys, actions, highlightedId }: KeysProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Key</TableHead>
          <TableHead className="hidden sm:table-cell">Product</TableHead>
          <TableHead className="hidden md:table-cell">Created by</TableHead>
          <TableHead className="hidden md:table-cell">Created</TableHead>
          <TableHead className="hidden sm:table-cell">Expires</TableHead>
          {actions && <TableHead className="w-0" />}
        </TableRow>
      </TableHeader>
      <TableBody>
        {keys.map((key) => (
          <TableRow
            key={key.id}
            data-new={key.id === highlightedId ? "" : undefined}
            className="transition-colors duration-1000 data-new:bg-accent"
          >
            <TableCell className="w-full max-w-0 sm:w-auto sm:max-w-40">
              <span className="block truncate font-medium">{key.name ?? "Untitled"}</span>
              <span className="block truncate font-mono text-xs text-muted-foreground md:hidden">
                {key.maskedKey}
              </span>
              <span className="block truncate text-xs text-muted-foreground sm:hidden">
                {key.productLabel} · {expiryPhrase(key.expiresAt)}
              </span>
            </TableCell>
            <TableCell className="hidden font-mono text-muted-foreground md:table-cell">
              {key.maskedKey}
            </TableCell>
            <TableCell className="hidden sm:table-cell">{key.productLabel}</TableCell>
            <TableCell className="hidden md:table-cell">{key.createdBy}</TableCell>
            <TableCell className="hidden md:table-cell">{dateOr(key.createdAt, "—")}</TableCell>
            <TableCell className="hidden sm:table-cell">{dateOr(key.expiresAt, "Never")}</TableCell>
            {actions && (
              <TableCell className="w-0 pr-2 text-right whitespace-nowrap">
                {actions(key)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
