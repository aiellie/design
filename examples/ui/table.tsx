"use client"

import { Badge } from "@/components/ui/badge"
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

const invoices = [
  { id: "INV-001", status: "Paid", amount: "$250.00" },
  { id: "INV-002", status: "Pending", amount: "$150.00" },
  { id: "INV-003", status: "Paid", amount: "$350.00" },
  { id: "INV-004", status: "Overdue", amount: "$450.00" },
] as const

function statusVariant(status: (typeof invoices)[number]["status"]) {
  if (status === "Paid") return "secondary"
  if (status === "Overdue") return "destructive"
  return "outline"
}

export function TableExample() {
  return (
    <Table>
      <TableCaption>A summary of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>
              <Badge variant={statusVariant(invoice.status)}>
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {invoice.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right tabular-nums">$1,200.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
