"use client"

import {
  Artifact,
  ArtifactAction,
  ArtifactActions,
  ArtifactClose,
  ArtifactContent,
  ArtifactDescription,
  ArtifactHeader,
  ArtifactTitle,
} from "@/components/code/artifact"
import { Button } from "@/components/ui/button"
import {
  Copy01Icon,
  Download01Icon,
  RefreshIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { useEffect, useRef, useState } from "react"

const SCRIPT = `#!/usr/bin/env python3
"""Summarize a CSV of daily visits into weekly totals."""

import csv
from collections import defaultdict
from datetime import date


def weekly_totals(path: str) -> dict[str, int]:
    totals: dict[str, int] = defaultdict(int)
    with open(path, newline="") as file:
        for row in csv.DictReader(file):
            day = date.fromisoformat(row["date"])
            week = f"{day.year}-W{day.isocalendar().week:02d}"
            totals[week] += int(row["visits"])
    return dict(totals)


if __name__ == "__main__":
    for week, visits in sorted(weekly_totals("visits.csv").items()):
        print(f"{week}  {visits:>6}")
`

export function ArtifactExample() {
  const [open, setOpen] = useState(true)
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(0)

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  const copy = async () => {
    await navigator.clipboard?.writeText(SCRIPT)
    setCopied(true)
    timeoutRef.current = window.setTimeout(() => setCopied(false), 2000)
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} variant="outline">
        Show artifact
      </Button>
    )
  }

  return (
    <div className="w-full max-w-2xl">
      <Artifact>
        <ArtifactHeader>
          <div>
            <ArtifactTitle>process_data.py</ArtifactTitle>
            <ArtifactDescription>
              Python script for data processing
            </ArtifactDescription>
          </div>
          <ArtifactActions>
            <ArtifactAction
              icon={copied ? Tick02Icon : Copy01Icon}
              onClick={copy}
              tooltip={copied ? "Copied" : "Copy"}
            />
            <ArtifactAction
              icon={Download01Icon}
              onClick={() => console.log("Download artifact")}
              tooltip="Download"
            />
            <ArtifactAction
              icon={RefreshIcon}
              onClick={() => console.log("Regenerate artifact")}
              tooltip="Regenerate"
            />
            <ArtifactClose onClick={() => setOpen(false)} />
          </ArtifactActions>
        </ArtifactHeader>
        <ArtifactContent>
          <pre className="font-mono text-xs leading-relaxed">
            <code>{SCRIPT}</code>
          </pre>
        </ArtifactContent>
      </Artifact>
    </div>
  )
}
