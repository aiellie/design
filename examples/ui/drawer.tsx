"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
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
import { HugeiconsIcon } from "@hugeicons/react"
import { MinusSignIcon, PlusSignIcon } from "@hugeicons/core-free-icons"

export function DrawerExample() {
  const [goal, setGoal] = React.useState(350)

  return (
    <div className="flex w-full items-center justify-center">
      <Drawer showSwipeHandle>
        <DrawerTrigger render={<Button variant="outline">Open drawer</Button>} />
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move goal</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex items-center justify-center gap-6 p-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                disabled={goal <= 200}
                onClick={() => setGoal((value) => Math.max(200, value - 10))}
              >
                <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} />
                <span className="sr-only">Decrease goal</span>
              </Button>
              <div className="text-center">
                <div className="font-heading text-5xl font-semibold tracking-tight tabular-nums">
                  {goal}
                </div>
                <div className="mt-1 text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                  Calories / day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                disabled={goal >= 500}
                onClick={() => setGoal((value) => Math.min(500, value + 10))}
              >
                <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
                <span className="sr-only">Increase goal</span>
              </Button>
            </div>
            <DrawerFooter>
              <Button>Set goal</Button>
              <DrawerClose render={<Button variant="outline">Cancel</Button>} />
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
