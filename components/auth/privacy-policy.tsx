"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const LAST_UPDATED = "August 3, 2026"

const SECTIONS = [
  {
    title: "1. Information we collect",
    body: "We collect the email address you sign in with, the content you send to the assistant, and basic usage data such as device type, browser and the pages you open. We do not ask for payment card numbers — those are handled by our payment processor.",
  },
  {
    title: "2. How we use your information",
    body: "Your information is used to authenticate you, deliver and improve the service, keep conversations in sync across your devices, respond to support requests, and detect abuse. We do not sell your personal information.",
  },
  {
    title: "3. AI processing",
    body: "Prompts and files you submit are processed by our model providers to generate a response. Unless you opt in, your content is not used to train foundation models.",
  },
  {
    title: "4. Sharing",
    body: "We share data with service providers who host our infrastructure, process payments and send transactional email, and with authorities where the law requires it. Every provider is bound by a data processing agreement.",
  },
  {
    title: "5. Retention",
    body: "Conversations stay available until you delete them. Deleted content is removed from backups within 30 days. Account records are kept while your account is open and for as long as the law requires afterwards.",
  },
  {
    title: "6. Your rights",
    body: "You can access, export, correct or delete your data at any time from your account settings. Depending on where you live you may also object to processing or lodge a complaint with your local data protection authority.",
  },
  {
    title: "7. Cookies",
    body: "We use strictly necessary cookies to keep you signed in and remember your theme. Analytics cookies are only set with your consent and can be withdrawn at any time.",
  },
  {
    title: "8. Contact",
    body: "Questions about this policy can be sent to privacy@aiellie.dev and we will reply within 30 days.",
  },
]

export function PrivacyPolicyDialog({
  trigger,
  className,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  trigger?: React.ReactNode
  className?: string
}) {
  return (
    <Dialog {...props}>
      <DialogTrigger
        render={
          <button
            type="button"
            className={cn(
              "underline underline-offset-4 transition-colors hover:text-primary",
              className
            )}
          />
        }
      >
        {trigger ?? "Privacy Policy"}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>
            How AI Ellie collects, uses and protects your data. Last updated{" "}
            {LAST_UPDATED}.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="-me-2 h-[min(55vh,26rem)] pe-4">
          <div className="flex flex-col gap-4 text-sm text-muted-foreground">
            {SECTIONS.map((section) => (
              <section key={section.title} className="flex flex-col gap-1">
                <h3 className="font-medium text-foreground">{section.title}</h3>
                <p className="leading-normal">{section.body}</p>
              </section>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
