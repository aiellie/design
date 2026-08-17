"use client"

import * as React from "react"

import { CountriesSelect } from "@/components/locale/countries-select"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Airpod01Icon,
  CameraIcon,
  ComputerIcon,
  GameControllerIcon,
  HardDriveIcon,
  HeadphonesIcon,
  KeyboardIcon,
  LaptopIcon,
  Mic01Icon,
  MouseIcon,
  PrinterIcon,
  Router01Icon,
  SmartPhone01Icon,
  SpeakerIcon,
  Tablet01Icon,
  TvSmartIcon,
  WatchIcon,
} from "@hugeicons/core-free-icons"

const computers = [
  { label: "Laptop", value: "laptop", icon: LaptopIcon },
  { label: "Desktop", value: "desktop", icon: ComputerIcon },
  { label: "Tablet", value: "tablet", icon: Tablet01Icon },
]

const mobile = [
  { label: "Smartphone", value: "smartphone", icon: SmartPhone01Icon },
  { label: "Smartwatch", value: "smartwatch", icon: WatchIcon },
]

const audio = [
  { label: "Headphones", value: "headphones", icon: HeadphonesIcon },
  { label: "Earbuds", value: "earbuds", icon: Airpod01Icon },
  { label: "Speaker", value: "speaker", icon: SpeakerIcon },
  { label: "Microphone", value: "microphone", icon: Mic01Icon },
]

const peripherals = [
  { label: "Keyboard", value: "keyboard", icon: KeyboardIcon },
  { label: "Mouse", value: "mouse", icon: MouseIcon },
  { label: "Webcam", value: "webcam", icon: CameraIcon },
  { label: "Game controller", value: "controller", icon: GameControllerIcon },
]

const homeOffice = [
  { label: "Smart TV", value: "smart-tv", icon: TvSmartIcon },
  { label: "Router", value: "router", icon: Router01Icon },
  { label: "Printer", value: "printer", icon: PrinterIcon },
  { label: "External drive", value: "external-drive", icon: HardDriveIcon },
]

const groups = [
  { label: "Computers", items: computers },
  { label: "Mobile & Wearables", items: mobile },
  { label: "Audio", items: audio },
  { label: "Peripherals", items: peripherals },
  { label: "Home & Office", items: homeOffice },
]

type Device = (typeof computers)[number]

function DeviceLabel({ device }: { device: Device }) {
  return (
    <>
      <HugeiconsIcon
        icon={device.icon}
        strokeWidth={2}
        className="self-center text-muted-foreground"
      />
      {device.label}
    </>
  )
}

const items = [
  { label: "Select a device", value: null },
  ...groups.flatMap((group) =>
    group.items.map((device) => ({
      value: device.value,
      label: <DeviceLabel device={device} />,
    }))
  ),
]

export function SelectExample() {
  const [alignItemWithTrigger, setAlignItemWithTrigger] = React.useState(false)

  return (
    <div className="flex w-full items-center justify-center">
    <FieldGroup className="w-full max-w-sm">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="align-item">Align Item</FieldLabel>
          <FieldDescription>
            Toggle to align the item with the trigger.
          </FieldDescription>
        </FieldContent>
        <Switch
          id="align-item"
          checked={alignItemWithTrigger}
          onCheckedChange={setAlignItemWithTrigger}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="select-device">Device</FieldLabel>
        <Select items={items}>
          <SelectTrigger id="select-device">
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={alignItemWithTrigger}>
            {groups.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.items.map((device) => (
                  <SelectItem
                    className="cursor-pointer"
                    key={device.value}
                    value={device.value}
                  >
                    <DeviceLabel device={device} />
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
        <FieldDescription>
          Pick the device you want to register.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="select-country">Country</FieldLabel>
        <CountriesSelect id="select-country" />
        <FieldDescription>Grouped by continent.</FieldDescription>
      </Field>
    </FieldGroup>
    </div>
  )
}
