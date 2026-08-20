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
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"
import { toast } from "@/components/ui/toast"
import { CodeIcons } from "@/icons/icons"
import { getHighlightedCode } from "@/lib/highlight-code-action"
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

const FILENAME = "process_data.py"
const SCRIPT_META = `Python · ${new TextEncoder().encode(SCRIPT).length} B`

export function ArtifactExample() {
  const [open, setOpen] = useState(true)
  const [copied, setCopied] = useState(false)
  const [html, setHtml] = useState<string | null>(null)
  const timeoutRef = useRef(0)

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  useEffect(() => {
    let cancelled = false

    getHighlightedCode(SCRIPT, "python").then((result) => {
      if (!cancelled) {
        setHtml(result)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  const copy = async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      toast.add({ title: "Could not copy code", type: "error" })
      return
    }

    try {
      await navigator.clipboard.writeText(SCRIPT)
      setCopied(true)
      toast.add({ title: "Code copied", type: "success" })
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.add({ title: "Could not copy code", type: "error" })
    }
  }

  const download = () => {
    if (typeof window === "undefined") {
      toast.add({ title: "Could not download code", type: "error" })
      return
    }

    try {
      const url = URL.createObjectURL(
        new Blob([SCRIPT], { type: "text/plain;charset=utf-8" })
      )
      const link = document.createElement("a")
      link.href = url
      link.download = FILENAME
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(url), 0)
      toast.add({ title: `Downloaded ${FILENAME}`, type: "success" })
    } catch {
      toast.add({ title: "Could not download code", type: "error" })
    }
  }

  if (!open) {
    return (
      <div className="flex w-full max-w-2xl mx-auto justify-center">
        <Attachment size="sm">
          <AttachmentMedia>
            <CodeIcons.python />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{FILENAME}</AttachmentTitle>
            <AttachmentDescription>{SCRIPT_META}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentTrigger
            aria-label={`Open ${FILENAME}`}
            onClick={() => setOpen(true)}
          />
        </Attachment>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto justify-center">
      <Artifact>
        <ArtifactHeader>
          <div>
            <div className="flex items-center gap-1.5">
              <CodeIcons.python className="size-4 shrink-0" />
              <ArtifactTitle>{FILENAME}</ArtifactTitle>
            </div>
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
              onClick={download}
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
          {html ? (
            <div
              className="overflow-x-auto dark:[&_pre]:text-[var(--shiki-dark)]! dark:[&_span]:text-[var(--shiki-dark)]! [&_pre]:m-0 [&_pre]:p-0! [&_pre]:text-xs [&_pre]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <pre className="font-mono text-xs leading-relaxed">
              <code>{SCRIPT}</code>
            </pre>
          )}
        </ArtifactContent>
      </Artifact>
    </div>
  )
}
