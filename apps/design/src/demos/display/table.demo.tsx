import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@locusgraph/components";
import { defineDemo, toggle } from "../../registry/define-demo";

const invoices = [
  { id: "INV-1042", date: "Oct 1, 2026", status: "Paid", amount: "$158.40" },
  { id: "INV-1031", date: "Sep 1, 2026", status: "Paid", amount: "$149.00" },
  { id: "INV-1020", date: "Aug 1, 2026", status: "Refunded", amount: "$49.00" },
];

function Invoices() {
  return (
    <Table>
      <TableCaption>Invoices for Acme Inc.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>
              <Badge variant={invoice.status === "Paid" ? "secondary" : "outline"}>
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function WithFooter() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          <TableHead className="text-right">Cost</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Seats</TableCell>
          <TableCell className="text-right">$120.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>API calls</TableCell>
          <TableCell className="text-right">$38.40</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">$158.40</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function SelectedRow() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Last used</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow data-state="selected">
          <TableCell className="font-mono">lg_live_4f9a…</TableCell>
          <TableCell>2 minutes ago</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono">lg_test_91c0…</TableCell>
          <TableCell>Yesterday</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default defineDemo({
  title: "Table",
  description:
    "A responsive table for rows of records like invoices, members or API keys. It scrolls sideways on narrow screens.",
  controls: { caption: toggle(true), footer: toggle() },
  playground: ({ caption, footer }) => (
    <Table className="min-w-96">
      {caption ? <TableCaption>Invoices for Acme Inc.</TableCaption> : null}
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {footer ? (
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-right">$356.40</TableCell>
          </TableRow>
        </TableFooter>
      ) : null}
    </Table>
  ),
  code: ({ caption, footer }) =>
    `<Table>${caption ? "\n  <TableCaption>Invoices for Acme Inc.</TableCaption>" : ""}\n  <TableHeader>\n    <TableRow>\n      <TableHead>Invoice</TableHead>\n      <TableHead className="text-right">Amount</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell>INV-1042</TableCell>\n      <TableCell className="text-right">$158.40</TableCell>\n    </TableRow>\n  </TableBody>${footer ? '\n  <TableFooter>\n    <TableRow>\n      <TableCell>Total</TableCell>\n      <TableCell className="text-right">$356.40</TableCell>\n    </TableRow>\n  </TableFooter>' : ""}\n</Table>`,
  props: [
    { name: "...props", type: 'ComponentProps<"table">' },
    { name: "TableRow.data-state", type: '"selected"' },
    { name: "TableHead / TableCell", type: 'ComponentProps<"th" | "td">' },
  ],
  examples: {
    Invoices: {
      description: "Invoice history with a status badge and right-aligned amounts.",
      component: Invoices,
    },
    WithFooter: {
      description: "A footer row holds the total.",
      component: WithFooter,
    },
    SelectedRow: {
      description: 'data-state="selected" highlights a row.',
      component: SelectedRow,
    },
  },
  composition: {
    name: "Table",
    children: [
      { name: "TableCaption" },
      { name: "TableHeader", children: [{ name: "TableRow", children: [{ name: "TableHead" }] }] },
      { name: "TableBody", children: [{ name: "TableRow", children: [{ name: "TableCell" }] }] },
      { name: "TableFooter", children: [{ name: "TableRow", children: [{ name: "TableCell" }] }] },
    ],
  },
});
