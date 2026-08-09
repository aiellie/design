"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionExample() {
  return (
    <Accordion
      multiple={false}
      defaultValue={["shipping"]}
      className="w-full"
    >
      <AccordionItem value="shipping">
        <AccordionTrigger>How long does shipping take?</AccordionTrigger>
        <AccordionContent>
          Orders placed before 2pm ship the same day. Standard delivery takes
          3&ndash;5 business days, and express delivery arrives within 48
          hours.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          <p>
            Every purchase can be returned within 30 days of delivery for a
            full refund, no questions asked.
          </p>
          <p>
            Items must be unused and in their original packaging. Return
            labels are prepaid and included in every box.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger>Is there a warranty?</AccordionTrigger>
        <AccordionContent>
          Yes. All products include a two-year limited warranty covering
          manufacturing defects and everyday wear.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
