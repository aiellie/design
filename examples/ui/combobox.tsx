"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
} from "@/components/ui/combobox"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { InputGroupAddon } from "@/components/ui/input-group"
import { Icon, Icons } from "@/icons/icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AiAudioIcon,
  AiBrain01Icon,
  AiChat02Icon,
  AiChipIcon,
  AiCloudIcon,
  AiContentGenerator01Icon,
  AiDnaIcon,
  AiEditingIcon,
  AiIdeaIcon,
  AiImageIcon,
  AiLearningIcon,
  AiMailIcon,
  AiMicIcon,
  AiNetworkIcon,
  AiProgrammingIcon,
  AiSchedulingIcon,
  AiSearchIcon,
  AiSecurity01Icon,
  AiVideoIcon,
  AiVisionRecognitionIcon,
} from "@hugeicons/core-free-icons"

type Capability = {
  value: string
  label: string
  icon: typeof AiChat02Icon
}

const groups: { value: string; items: Capability[] }[] = [
  {
    value: "Assistants",
    items: [
      { value: "chat-assistant", label: "Chat assistant", icon: AiChat02Icon },
      { value: "email-drafting", label: "Email drafting", icon: AiMailIcon },
      { value: "idea-generation", label: "Idea generation", icon: AiIdeaIcon },
      {
        value: "smart-scheduling",
        label: "Smart scheduling",
        icon: AiSchedulingIcon,
      },
    ],
  },
  {
    value: "Generation",
    items: [
      {
        value: "code-generation",
        label: "Code generation",
        icon: AiProgrammingIcon,
      },
      {
        value: "content-writing",
        label: "Content writing",
        icon: AiContentGenerator01Icon,
      },
      {
        value: "image-generation",
        label: "Image generation",
        icon: AiImageIcon,
      },
      { value: "smart-editing", label: "Smart editing", icon: AiEditingIcon },
      {
        value: "video-generation",
        label: "Video generation",
        icon: AiVideoIcon,
      },
      { value: "voice-synthesis", label: "Voice synthesis", icon: AiAudioIcon },
    ],
  },
  {
    value: "Understanding",
    items: [
      { value: "drug-discovery", label: "Drug discovery", icon: AiDnaIcon },
      { value: "reasoning", label: "Reasoning", icon: AiBrain01Icon },
      { value: "semantic-search", label: "Semantic search", icon: AiSearchIcon },
      { value: "speech-to-text", label: "Speech to text", icon: AiMicIcon },
      {
        value: "threat-detection",
        label: "Threat detection",
        icon: AiSecurity01Icon,
      },
      {
        value: "vision-recognition",
        label: "Vision recognition",
        icon: AiVisionRecognitionIcon,
      },
    ],
  },
  {
    value: "Infrastructure",
    items: [
      { value: "cloud-inference", label: "Cloud inference", icon: AiCloudIcon },
      {
        value: "machine-learning",
        label: "Machine learning",
        icon: AiLearningIcon,
      },
      {
        value: "neural-networks",
        label: "Neural networks",
        icon: AiNetworkIcon,
      },
      {
        value: "on-device-inference",
        label: "On-device inference",
        icon: AiChipIcon,
      },
    ],
  },
]

export function ComboboxExample() {
  const [capability, setCapability] = React.useState<Capability | null>(null)

  return (
    <div className="flex w-full items-center justify-center">
      <Field className="w-full max-w-sm">
        <FieldLabel htmlFor="combobox-capability">Capability</FieldLabel>
        <Combobox items={groups} value={capability} onValueChange={setCapability}>
        <ComboboxTrigger render={<Button id="combobox-capability" variant="outline" className="w-full justify-between font-normal"><span className="flex items-center gap-2">{capability && (<HugeiconsIcon icon={capability.icon} className="text-muted-foreground" />)}{capability ? capability.label : "Select capability"}</span></Button>} />
        <ComboboxContent>
          <ComboboxInput showClear={true} showTrigger={false} placeholder="Search">
            <InputGroupAddon>
              <Icon icon={Icons.search} strokeWidth={2} className="size-3.5" />
            </InputGroupAddon>
          </ComboboxInput>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(group: (typeof groups)[number], index: number) => (
              <ComboboxGroup key={group.value} items={group.items}>
                <ComboboxLabel>{group.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(item: Capability) => (
                    <ComboboxItem key={item.value} value={item}>
                      <HugeiconsIcon
                        icon={item.icon}
                      />
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
                {index < groups.length - 1 && <ComboboxSeparator />}
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
        </Combobox>
        <FieldDescription>
          Search and select an AI capability.
        </FieldDescription>
      </Field>
    </div>
  )
}
