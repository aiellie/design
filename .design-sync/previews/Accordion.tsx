// Accordion preview — canonical sources/follow-ups demo from examples/ui/accordion.tsx
// (collapsed at rest), plus an expanded FAQ so the open panel is visible statically.
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export { AccordionExample as Showcase } from "@/examples/ui/accordion"

export function ExpandedItem() {
  return (
    <Accordion
      defaultValue={["change-plan"]}
      className="mx-auto w-full max-w-md"
    >
      <AccordionItem value="change-plan">
        <AccordionTrigger>Can I change plans mid-cycle?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Yes. Upgrades apply immediately and we prorate the difference;
          downgrades take effect at the start of the next billing period.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="invoices">
        <AccordionTrigger>Where do I find past invoices?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Billing → Invoices lists every receipt as a downloadable PDF.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="seats">
        <AccordionTrigger>How are team seats counted?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Only members with edit access count toward your seat limit.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
