import {
  Badge,
  Progress,
  RuleGrid,
  RuleGridCell,
  RuleGridDescription,
  RuleGridLabel,
  RuleGridTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@locusgraph/components";

const stats = [
  { label: "Plan", value: "Team", detail: "Renews Nov 1, 2026" },
  { label: "Seats", value: "12 of 20", detail: "8 seats free" },
  { label: "Next invoice", value: "$480.00", detail: "Charged to Visa" },
];

const invoices = [
  { id: "INV-1042", date: "Oct 1, 2026", amount: "$480.00", status: "Paid" },
  { id: "INV-0981", date: "Sep 1, 2026", amount: "$480.00", status: "Paid" },
  { id: "INV-0917", date: "Aug 1, 2026", amount: "$360.00", status: "Refunded" },
];

function invoiceStatusClassName(status: string) {
  return status === "Paid"
    ? "bg-good/10 text-good"
    : "bg-transparent text-muted-foreground ring-1 ring-border";
}

export function BillingOverview() {
  return (
    <div className="flex flex-col gap-6">
      <RuleGrid columns={3}>
        {stats.map((stat) => (
          <RuleGridCell key={stat.label} className="p-5">
            <RuleGridLabel className="eyebrow">{stat.label}</RuleGridLabel>
            <span className="text-2xl font-semibold tracking-[-0.02em]">{stat.value}</span>
            <RuleGridDescription>{stat.detail}</RuleGridDescription>
          </RuleGridCell>
        ))}
      </RuleGrid>
      <RuleGrid columns={1}>
        <RuleGridCell className="gap-3 p-5">
          <RuleGridTitle>Agent runs this month</RuleGridTitle>
          <RuleGridDescription>82,400 of 100,000 included runs</RuleGridDescription>
          <Progress
            value={82.4}
            aria-label="Agent runs this month"
            getValueLabel={() => "82,400 of 100,000 included runs"}
          />
        </RuleGridCell>
      </RuleGrid>
      <RuleGrid columns={1}>
        <RuleGridCell className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="eyebrow">Invoice</TableHead>
                <TableHead className="eyebrow">Date</TableHead>
                <TableHead className="eyebrow">Amount</TableHead>
                <TableHead className="eyebrow">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge className={invoiceStatusClassName(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </RuleGridCell>
      </RuleGrid>
    </div>
  );
}
