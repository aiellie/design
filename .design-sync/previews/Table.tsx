// Table preview — canonical payments table ported from examples/ui/table.tsx,
// plus caption/footer anatomy and a selected-row + checkbox-column state.
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export { TableExample as Showcase } from "@/examples/ui/table"

const invoices = [
  { id: "INV-0042", date: "Apr 02, 2024", status: "Paid", amount: "$1,250.00" },
  { id: "INV-0041", date: "Mar 28, 2024", status: "Refunded", amount: "$96.00" },
  { id: "INV-0040", date: "Mar 14, 2024", status: "Paid", amount: "$420.00" },
  { id: "INV-0039", date: "Feb 29, 2024", status: "Overdue", amount: "$1,975.00" },
]

const statusVariant = {
  Paid: "secondary",
  Refunded: "outline",
  Overdue: "destructive",
} as const

export function CaptionAndFooter() {
  return (
    <Table>
      <TableCaption>Invoices issued in the last 90 days.</TableCaption>
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
            <TableCell className="text-muted-foreground">
              {invoice.date}
            </TableCell>
            <TableCell>
              <Badge variant={statusVariant[invoice.status as keyof typeof statusVariant]}>
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total billed</TableCell>
          <TableCell className="text-right">$3,741.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

const domains = [
  { name: "aiellie.dev", records: 12, selected: false },
  { name: "avatar.aiellie.dev", records: 4, selected: true },
  { name: "docs.aiellie.dev", records: 7, selected: false },
]

export function SelectedRows() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox aria-label="Select all domains" />
          </TableHead>
          <TableHead>Domain</TableHead>
          <TableHead className="text-right">DNS records</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {domains.map((domain) => (
          <TableRow
            key={domain.name}
            data-state={domain.selected ? "selected" : undefined}
          >
            <TableCell>
              <Checkbox
                defaultChecked={domain.selected}
                aria-label={`Select ${domain.name}`}
              />
            </TableCell>
            <TableCell className="font-medium">{domain.name}</TableCell>
            <TableCell className="text-right text-muted-foreground">
              {domain.records}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
