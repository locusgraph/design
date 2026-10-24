import {
  Badge,
  Button,
  RuleGrid,
  RuleGridCell,
  RuleGridHeader,
  RuleGridLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@locusgraph/components";
import { formatCents, formatDate } from "@locusgraph/utils";
import { DownloadSimple as DownloadIcon } from "@phosphor-icons/react/ssr";
import type { Invoice } from "./billing-data";

type BillingInvoicesProps = {
  invoices: Invoice[];
  onDownload: (invoiceId: string) => void;
};

function InvoiceStatusBadge({ status }: { status: Invoice["status"] }) {
  return status === "paid" ? (
    <Badge variant="success">Paid</Badge>
  ) : (
    <Badge variant="destructive-soft">Past due</Badge>
  );
}

export function BillingInvoices({ invoices, onDownload }: BillingInvoicesProps) {
  return (
    <RuleGrid columns={1}>
      <RuleGridCell className="gap-0 pb-2">
        <RuleGridHeader className="mb-0">
          <RuleGridLabel>Invoices</RuleGridLabel>
        </RuleGridHeader>
        {invoices.length === 0 ? (
          <p className="py-4 text-sm text-muted-foreground">No invoices yet.</p>
        ) : (
          <Table className="[&_tr>*:first-child]:pl-0 [&_tr>*:last-child]:pr-0">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead>
                  <span className="sr-only">Download</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <span className="flex flex-col items-start gap-1">
                      {formatDate(invoice.issuedAt)}
                      <span className="sm:hidden">
                        <InvoiceStatusBadge status={invoice.status} />
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCents(invoice.amountCents)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <InvoiceStatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label={`Download invoice from ${formatDate(invoice.issuedAt)}`}
                      onClick={() => onDownload(invoice.id)}
                    >
                      <DownloadIcon weight="bold" aria-hidden="true" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </RuleGridCell>
    </RuleGrid>
  );
}
