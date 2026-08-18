"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
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
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { InputGroupAddon } from "@/components/ui/input-group"
import { Icon } from "@/icons/icons"
import { Search01Icon } from "@/icons/huge-icons"
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
  DiscordIcon,
  DropboxIcon,
  FigmaIcon,
  GithubIcon,
  GitlabIcon,
  GoogleDriveIcon,
  Notion01Icon,
  SlackIcon,
  TelegramIcon,
  TrelloIcon,
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

type Integration = {
  value: string
  label: string
  icon: typeof SlackIcon
}

const integrations: Integration[] = [
  { value: "slack", label: "Slack", icon: SlackIcon },
  { value: "github", label: "GitHub", icon: GithubIcon },
  { value: "notion", label: "Notion", icon: Notion01Icon },
  { value: "figma", label: "Figma", icon: FigmaIcon },
  { value: "google-drive", label: "Google Drive", icon: GoogleDriveIcon },
  { value: "dropbox", label: "Dropbox", icon: DropboxIcon },
  { value: "gitlab", label: "GitLab", icon: GitlabIcon },
  { value: "trello", label: "Trello", icon: TrelloIcon },
  { value: "discord", label: "Discord", icon: DiscordIcon },
  { value: "telegram", label: "Telegram", icon: TelegramIcon },
]

function renderCapabilityGroup(
  group: (typeof groups)[number],
  index: number
) {
  return (
    <ComboboxGroup key={group.value} items={group.items}>
      <ComboboxLabel>{group.value}</ComboboxLabel>
      <ComboboxCollection>
        {(item: Capability) => (
          <ComboboxItem key={item.value} value={item}>
            <HugeiconsIcon icon={item.icon} />
            {item.label}
          </ComboboxItem>
        )}
      </ComboboxCollection>
      {index < groups.length - 1 && <ComboboxSeparator />}
    </ComboboxGroup>
  )
}

export function ComboboxExample() {
  const [capability, setCapability] = React.useState<Capability | null>(null)
  const [capabilities, setCapabilities] = React.useState<Capability[]>([])
  const [selected, setSelected] = React.useState<Integration[]>([
    integrations[0],
    integrations[1],
  ])
  const anchorRef = useComboboxAnchor()

  return (
    <div className="flex w-full items-center justify-center">
      <FieldGroup className="w-full max-w-sm">
        <Field>
        <FieldLabel htmlFor="combobox-capability">Capability</FieldLabel>
        <Combobox items={groups} value={capability} onValueChange={setCapability}>
        <ComboboxTrigger render={<Button id="combobox-capability" variant="outline" className="w-full justify-between font-normal"><span className="flex items-center gap-2">{capability && (<HugeiconsIcon icon={capability.icon} className="text-muted-foreground" />)}{capability ? capability.label : "Select capability"}</span></Button>} />
        <ComboboxContent>
          <ComboboxInput showClear={true} showTrigger={false} placeholder="Search">
            <InputGroupAddon>
              <Icon icon={Search01Icon} strokeWidth={2} className="size-3.5" />
            </InputGroupAddon>
          </ComboboxInput>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>{renderCapabilityGroup}</ComboboxList>
        </ComboboxContent>
        </Combobox>
        <FieldDescription>
          Search and select an AI capability.
        </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="combobox-capabilities">Capabilities</FieldLabel>
          <Combobox
            multiple
            items={groups}
            value={capabilities}
            onValueChange={setCapabilities}
          >
            <ComboboxTrigger
              render={
                <Button
                  id="combobox-capabilities"
                  variant="outline"
                  className="w-full justify-between font-normal"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    {capabilities.length > 0 && (
                      <span className="flex shrink-0 items-center gap-1">
                        {capabilities.slice(0, 3).map((item) => (
                          <HugeiconsIcon
                            key={item.value}
                            icon={item.icon}
                            className="text-muted-foreground"
                          />
                        ))}
                      </span>
                    )}
                    <span className="truncate">
                      {capabilities.length === 0
                        ? "Select capabilities"
                        : capabilities.length === 1
                          ? capabilities[0].label
                          : `${capabilities.length} selected`}
                    </span>
                  </span>
                </Button>
              }
            />
            <ComboboxContent>
              <ComboboxInput
                showClear={true}
                showTrigger={false}
                placeholder="Search"
              >
                <InputGroupAddon>
                  <Icon
                    icon={Search01Icon}
                    strokeWidth={2}
                    className="size-3.5"
                  />
                </InputGroupAddon>
              </ComboboxInput>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>{renderCapabilityGroup}</ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldDescription>
            Search and select one or more AI capabilities.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="combobox-integrations">Integrations</FieldLabel>
          <Combobox
            multiple
            items={integrations}
            value={selected}
            onValueChange={setSelected}
          >
            <ComboboxChips ref={anchorRef}>
              <ComboboxValue>
                {(value: Integration[]) => (
                  <>
                    {value.map((integration) => (
                      <ComboboxChip
                        key={integration.value}
                        aria-label={integration.label}
                      >
                        <HugeiconsIcon
                          icon={integration.icon}
                          className="size-3 text-muted-foreground"
                        />
                        {integration.label}
                      </ComboboxChip>
                    ))}
                    <ComboboxChipsInput
                      id="combobox-integrations"
                      placeholder={value.length > 0 ? "" : "e.g. Slack"}
                    />
                  </>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchorRef}>
              <ComboboxEmpty>No integrations found.</ComboboxEmpty>
              <ComboboxList>
                {(integration: Integration) => (
                  <ComboboxItem key={integration.value} value={integration}>
                    <HugeiconsIcon icon={integration.icon} />
                    {integration.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldDescription>
            Select one or more tools the assistant can access.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}
