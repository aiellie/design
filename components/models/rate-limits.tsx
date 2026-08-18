"use client"

import * as React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export interface RateLimitValues {
  rpm: number | null
  tpm: number | null
  batchQueueLimit: number | null
}

export interface RateLimitTier {
  tier: string
  standard: RateLimitValues
  longContext: RateLimitValues
}

function RateLimitCells({ rpm, tpm, batchQueueLimit }: RateLimitValues) {
  if (rpm === null || tpm === null || batchQueueLimit === null) {
    return (
      <TableCell colSpan={3} className="text-muted-foreground">
        Not supported
      </TableCell>
    )
  }

  return (
    <>
      <TableCell className="text-end font-mono">{rpm.toLocaleString()}</TableCell>
      <TableCell className="text-end font-mono">{tpm.toLocaleString()}</TableCell>
      <TableCell className="text-end font-mono">
        {batchQueueLimit.toLocaleString()}
      </TableCell>
    </>
  )
}

export function RateLimits({ tiers }: { tiers: RateLimitTier[] }) {
  const [longContext, setLongContext] = React.useState(false)

  return (
    <div className="w-full max-w-2xl space-y-3 mx-auto">
      <div className="flex items-center justify-between rounded-xl border px-4 py-3">
        <div className="grid gap-0.5 leading-snug">
          <Label htmlFor="long-context">Long context</Label>
          <span className="text-xs text-muted-foreground">
            {longContext
              ? "Showing limits for requests over 200K tokens"
              : "Showing standard limits for requests up to 200K tokens"}
          </span>
        </div>
        <Switch
          size="sm"
          id="long-context"
          checked={longContext}
          onCheckedChange={setLongContext}
        />
      </div>

      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tier</TableHead>
              <TableHead className="text-end">RPM</TableHead>
              <TableHead className="text-end">TPM</TableHead>
              <TableHead className="text-end">Batch queue limit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tiers.map((tier) => {
              const limits = longContext ? tier.longContext : tier.standard

              return (
                <TableRow key={tier.tier}>
                  <TableCell>
                    <Badge variant="secondary">{tier.tier}</Badge>
                  </TableCell>
                  <RateLimitCells {...limits} />
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
