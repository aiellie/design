"use client"

import * as React from "react"
import { toast } from "sonner"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
const deliveryTimes = [
  {
    value: "asap",
    id: "delivery-asap",
    label: "Standard delivery",
    description: "25–35 min · Driver assigned now",
    badge: "Fastest",
  },
  {
    value: "5-00",
    id: "delivery-5-00",
    label: "5:00 PM – 5:15 PM",
    description: "Prep starts at 4:45 PM",
  },
  {
    value: "5-30",
    id: "delivery-5-30",
    label: "5:30 PM – 5:45 PM",
    description: "Good if you're heading home",
  },
  {
    value: "6-00",
    id: "delivery-6-00",
    label: "6:00 PM – 6:15 PM",
    description: "Most popular · High demand",
  },
  {
    value: "6-30",
    id: "delivery-6-30",
    label: "6:30 PM – 6:45 PM",
    description: "Last slot before kitchen closes",
  },
]

function DeliveryTimeDrawer() {
  const [open, setOpen] = React.useState(false)
  const [deliveryTime, setDeliveryTime] = React.useState("asap")
  const isMobile = useIsMobile()

  function handleConfirm() {
    const selected = deliveryTimes.find((time) => time.value === deliveryTime)

    if (!selected) {
      return
    }

    setOpen(false)
    toast("Delivery time confirmed", {
      description: selected.label,
    })
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger render={<Button variant="outline" size="sm" className="rounded-full">Open Drawer</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pick a delivery time</DrawerTitle>
          <DrawerDescription>
            We&apos;ll prepare your order as soon as possible.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 scroll-fade overflow-y-auto p-4">
          <RadioGroup
            value={deliveryTime}
            onValueChange={setDeliveryTime}
            className="gap-2"
          >
            {deliveryTimes.map((time) => (
              <FieldLabel key={time.value} htmlFor={time.id}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle className="flex items-center gap-2">
                      {time.label}
                      {time.badge ? (
                        <Badge variant="secondary">{time.badge}</Badge>
                      ) : null}
                    </FieldTitle>
                    <FieldDescription>{time.description}</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value={time.value} id={time.id} />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </div>
        <DrawerFooter>
          <Button onClick={handleConfirm} className="h-[34px]">
            Confirm Delivery Time
          </Button>
          <DrawerClose render={<Button variant="outline">Cancel</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function NestedDrawer() {
  const isMobile = useIsMobile()

  const swipeDirection = isMobile ? "down" : "right"

  return (
    <Drawer showSwipeHandle={isMobile} swipeDirection={swipeDirection}>
      <DrawerTrigger render={<Button variant="outline" size="sm" className="rounded-full">Nested Drawer</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>
            Open another drawer from the same direction.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <div className="bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:aspect-video group-data-[swipe-axis=y]/drawer-popup:w-full" />
        </div>
        <DrawerFooter>
          <Drawer showSwipeHandle={isMobile} swipeDirection={swipeDirection}>
            <DrawerTrigger render={<Button variant="outline">Open Nested Drawer</Button>} />
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Nested Drawer</DrawerTitle>
                <DrawerDescription>
                  The parent drawer stays mounted behind this one.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 p-4">
                <div className="bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:aspect-video group-data-[swipe-axis=y]/drawer-popup:w-full" />
              </div>
              <DrawerFooter>
                <Drawer
                  showSwipeHandle={isMobile}
                  swipeDirection={swipeDirection}
                >
                  <DrawerTrigger render={<Button variant="outline">Open Third Drawer</Button>} />
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Third Drawer</DrawerTitle>
                      <DrawerDescription>
                        Two drawers are stacked behind this one.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex-1 p-4">
                      <div className="bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:aspect-video group-data-[swipe-axis=y]/drawer-popup:w-full" />
                    </div>
                    <DrawerFooter>
                      <Drawer
                        showSwipeHandle={isMobile}
                        swipeDirection={swipeDirection}
                      >
                        <DrawerTrigger render={<Button variant="outline">Open Fourth Drawer</Button>} />
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Fourth Drawer</DrawerTitle>
                            <DrawerDescription>
                              This is the frontmost drawer in the stack.
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="flex-1 p-4">
                            <div className="bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:aspect-video group-data-[swipe-axis=y]/drawer-popup:w-full" />
                          </div>
                          <DrawerFooter>
                            <DrawerClose render={<Button variant="outline">Close</Button>} />
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                      <DrawerClose render={<Button variant="outline">Close</Button>} />
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <DrawerClose render={<Button variant="outline">Close</Button>} />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function ResponsiveDrawer() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="outline" size="sm" className="rounded-full">Responsive Drawer</Button>} />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Drawer showSwipeHandle open={open} onOpenChange={setOpen}>
      <DrawerTrigger render={<Button variant="outline" size="sm" className="rounded-full">Responsive Drawer</Button>} />
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="p-4" />
      </DrawerContent>
    </Drawer>
  )
}
function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-6", className)}>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}


export function DrawerExample() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      <DeliveryTimeDrawer />
      <NestedDrawer />
      <ResponsiveDrawer />
      <Toaster />
    </div>
  )
}
