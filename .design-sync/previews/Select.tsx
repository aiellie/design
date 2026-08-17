// Select preview — cardMode "single" (no primaryStory), so the alphabetically
// first export is the card: Showcase renders the select OPEN (defaultOpen)
// with a selected item, alignItemWithTrigger off so the popup drops below the
// trigger. UsageDemo re-exports the repo example (sorts after Showcase).
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Airpod01Icon,
  ComputerIcon,
  HeadphonesIcon,
  LaptopIcon,
  SmartPhone01Icon,
  SpeakerIcon,
  Tablet01Icon,
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
]

const groups = [
  { label: "Computers", items: computers },
  { label: "Mobile", items: mobile },
  { label: "Audio", items: audio },
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

export function Showcase() {
  return (
    <div className="flex w-full justify-center">
      <div
        className="flex w-full flex-col gap-2"
        style={{ maxWidth: 240, paddingTop: 12 }}
      >
        <Label htmlFor="select-preview-device">Device</Label>
        <Select items={items} defaultValue="headphones" defaultOpen>
          <SelectTrigger id="select-preview-device" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            {groups.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.items.map((device) => (
                  <SelectItem key={device.value} value={device.value}>
                    <DeviceLabel device={device} />
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export { SelectExample as UsageDemo } from "@/examples/ui/select"
