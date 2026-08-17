// Drawer preview — the repo example renders closed triggers, so the first
// cell forces the bottom delivery-time drawer open (controlled `open`).
// SideDrawer shows the right-side (desktop) presentation, TriggerDemo ships
// the example's trigger row (nested + responsive variants).
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

const deliveryTimes = [
  {
    value: "asap",
    id: "drawer-preview-asap",
    label: "Standard delivery",
    description: "25–35 min · Driver assigned now",
    badge: "Fastest",
  },
  {
    value: "5-00",
    id: "drawer-preview-5-00",
    label: "5:00 PM – 5:15 PM",
    description: "Prep starts at 4:45 PM",
  },
  {
    value: "5-30",
    id: "drawer-preview-5-30",
    label: "5:30 PM – 5:45 PM",
    description: "Good if you're heading home",
  },
  {
    value: "6-00",
    id: "drawer-preview-6-00",
    label: "6:00 PM – 6:15 PM",
    description: "Most popular · High demand",
  },
]

export function Showcase() {
  return (
    <Drawer open swipeDirection="down" showSwipeHandle>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pick a delivery time</DrawerTitle>
          <DrawerDescription>
            We&apos;ll prepare your order as soon as possible.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 scroll-fade overflow-y-auto p-4">
          <RadioGroup defaultValue="asap" className="gap-2">
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
          <Button>Confirm delivery time</Button>
          <DrawerClose render={<Button variant="outline">Cancel</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const orderItems = [
  { name: "Margherita pizza", qty: 1, price: "$14.00" },
  { name: "Burrata salad", qty: 1, price: "$11.50" },
  { name: "Sparkling water", qty: 2, price: "$6.00" },
]

export function SideDrawer() {
  return (
    <Drawer open swipeDirection="right">
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Order summary</DrawerTitle>
          <DrawerDescription>
            3 items · Arriving 5:00 PM – 5:15 PM
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-3 text-sm">
            {orderItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <span>
                  {item.qty} × {item.name}
                </span>
                <span className="text-muted-foreground">{item.price}</span>
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>$37.50</span>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button>Track delivery</Button>
          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export { DrawerExample as TriggerDemo } from "@/examples/ui/drawer"
