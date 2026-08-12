"use client"

import {
  BankIcon,
  Copy01Icon,
  CreditCardIcon,
  Trash,
  Download02Icon,
  Edit02Icon,
  MoreHorizontalIcon,
  PaypalIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

/**
 * Status dot for a badge. Plain spans rather than an icon, so it inherits the
 * badge's colour through `currentColor` and always matches whatever palette
 * the badge is wearing. `data-icon` is what earns the tighter start padding.
 */
function BadgeDot({ pulse = false }: { pulse?: boolean }) {
  return (
    <span
      data-icon="inline-start"
      className="relative flex size-1.5 shrink-0 items-center justify-center"
    >
      {pulse && (
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60 motion-reduce:hidden" />
      )}
      <span
        aria-hidden
        className="absolute inline-flex size-full rounded-full border border-current/30"
      />
      <span className="relative inline-flex size-1 rounded-full bg-current" />
    </span>
  )
}

/**
 * Same colour recipe as the badge statuses: `border-{c}-500/20 bg-{c}-50
 * text-{c}-700` with dark stepping the border/text down a stop and the
 * surface to 950. Written out in full — Tailwind only picks up literals.
 */
const statusStyles = {
  Paid: "border-emerald-500/20 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-950 dark:text-emerald-300",
  Pending:
    "border-amber-500/20 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-950 dark:text-amber-300",
  Unpaid:
    "border-red-500/20 bg-red-50 text-red-700 dark:border-red-400/20 dark:bg-red-950 dark:text-red-300",
} as const

const paymentMethodIcons = {
  "Credit Card": CreditCardIcon,
  PayPal: PaypalIcon,
  "Bank Transfer": BankIcon,
} as const

type PaymentStatus = keyof typeof statusStyles
type PaymentMethod = keyof typeof paymentMethodIcons

function customerAvatarUrl(name: string, icon: string) {
  return `https://avatar.aiellie.dev/${encodeURIComponent(name)}?icon=${encodeURIComponent(icon)}`
}

function customerInitials(name: string) {
  return name.slice(0, 2).toUpperCase()
}

const customers: {
  name: string
  icon: string
  paymentStatus: PaymentStatus
  totalAmount: string
  paymentMethod: PaymentMethod
}[] = [
  {
    name: "perkynaner",
    icon: "banana",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    name: "sophie",
    icon: "coffee-01",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    name: "milo",
    icon: "cat",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    name: "nova",
    icon: "sparkles",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    name: "reef",
    icon: "fish",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    name: "cinder",
    icon: "fire",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    name: "orbit",
    icon: "planet",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export function TableExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="w-10">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => {
          const MethodIcon = paymentMethodIcons[customer.paymentMethod]

          return (
            <TableRow key={customer.name}>
              <TableCell>
                <span className="inline-flex items-center gap-2.5">
                  <Avatar size="sm">
                    <AvatarImage
                      src={customerAvatarUrl(customer.name, customer.icon)}
                      alt={customer.name}
                    />
                    <AvatarFallback>
                      {customerInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-normal">{customer.name}</span>
                </span>
              </TableCell>
              <TableCell>
                <Badge className={statusStyles[customer.paymentStatus]}>
                  <BadgeDot pulse={customer.paymentStatus !== "Unpaid"} />
                  {customer.paymentStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-2">
                  <HugeiconsIcon
                    icon={MethodIcon}
                    strokeWidth={2}
                    className="size-3.5 text-muted-foreground"
                  />
                  {customer.paymentMethod}
                </span>
              </TableCell>
              <TableCell className="text-right">{customer.totalAmount}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Actions for ${customer.name}`}
                      >
                        <HugeiconsIcon
                          icon={MoreHorizontalIcon}
                          strokeWidth={2}
                        />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <HugeiconsIcon
                          icon={ViewIcon}
                          strokeWidth={2}
                          className="text-muted-foreground"
                        />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <HugeiconsIcon
                          icon={Copy01Icon}
                          strokeWidth={2}
                          className="text-muted-foreground"
                        />
                        Copy ID
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <HugeiconsIcon
                          icon={Download02Icon}
                          strokeWidth={2}
                          className="text-muted-foreground"
                        />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <HugeiconsIcon
                          icon={Edit02Icon}
                          strokeWidth={2}
                          className="text-muted-foreground"
                        />
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem variant="destructive">
                        <HugeiconsIcon
                          icon={Trash}
                          strokeWidth={2}
                          className="text-muted-foreground"
                        />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,250.00</TableCell>
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  )
}
