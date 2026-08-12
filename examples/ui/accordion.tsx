"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  HelpCircleIcon,
  Link01Icon,
  MessageQuestionIcon,
} from "@hugeicons/core-free-icons"

export function AccordionExample() {
  return (
    <div className="flex justify-center">
    <Accordion
      multiple={false}
      defaultValue={["sources"]}
      className="w-full max-w-md gap-2"
    >
      <AccordionItem value="sources" className="px-2 rounded-lg border ">
        <AccordionTrigger>
          <span className="flex flex-1 items-center gap-2 pr-2">
            <HugeiconsIcon
              icon={Link01Icon}
              strokeWidth={2}
              className="size-4 text-muted-foreground"
            />
            Sources used
            <Badge variant="secondary" className="ml-auto">
              3
            </Badge>
          </span>
        </AccordionTrigger>
        <AccordionContent className="space-y-1.5 text-muted-foreground">
          <p>1. nextjs.org — Release Blog: Next.js 16</p>
          <p>2. react.dev — You Might Not Need an Effect</p>
          <p>3. internal-architecture.pdf — page 12</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="followups" className="px-2 rounded-lg border ">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <HugeiconsIcon
              icon={MessageQuestionIcon}
              strokeWidth={2}
              className="size-4 text-muted-foreground"
            />
            Suggested follow-ups
          </span>
        </AccordionTrigger>
        <AccordionContent className="space-y-1.5 text-muted-foreground">
          <p>· How do I migrate from the Pages Router?</p>
          <p>· What changed in caching behavior?</p>
          <p>· Show me a minimal example.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="how" className="px-2 rounded-lg border ">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <HugeiconsIcon
              icon={HelpCircleIcon}
              strokeWidth={2}
              className="size-4 text-muted-foreground"
            />
            How was this answered?
          </span>
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Retrieved 3 passages, ranked by similarity, then summarized with Claude
          Opus 4.8 at temperature 0.4.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  )
}
