"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AiBrain01Icon,
  Link01Icon,
  Message01Icon,
} from "@hugeicons/core-free-icons"

export function AccordionExample() {
  return (
    <Accordion
      defaultValue={[""]}
      className="w-full max-w-md mx-auto"
    >
      <AccordionItem value="sources">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={Link01Icon} strokeWidth={2} className="size-4 text-muted-foreground" />
            Sources used (3)
          </span>
        </AccordionTrigger>
        <AccordionContent className="space-y-1.5 text-muted-foreground">
          <p>1. nextjs.org — Release Blog: Next.js 16</p>
          <p>2. react.dev — You Might Not Need an Effect</p>
          <p>3. internal-architecture.pdf — page 12</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="followups">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={Message01Icon} strokeWidth={2} className="size-4 text-muted-foreground" />
            Suggested follow-ups
          </span>
        </AccordionTrigger>
        <AccordionContent className="space-y-1.5 text-muted-foreground">
          <p>· How do I migrate from the Pages Router?</p>
          <p>· What changed in caching behavior?</p>
          <p>· Show me a minimal example.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="how">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={AiBrain01Icon} strokeWidth={2} className="size-4 text-muted-foreground" />
            How was this answered?
          </span>
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Retrieved 3 passages, ranked by similarity, then summarized with Claude
          Opus 4.8 at temperature 0.4.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
