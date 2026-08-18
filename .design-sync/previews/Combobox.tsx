// Combobox preview — cardMode "single" (no primaryStory): alphabetically
// first export is the card. Showcase renders the popup OPEN (defaultOpen)
// with the in-popup search seeded ("gi" filters to GitHub/GitLab) and GitHub
// selected. UsageDemo re-exports the repo example (single, multi, chips).
import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox"
import { InputGroupAddon } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Icon } from "@/icons/icons"
import { Search01Icon } from "@/icons/huge-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DiscordIcon,
  DropboxIcon,
  FigmaIcon,
  GithubIcon,
  GitlabIcon,
  GoogleDriveIcon,
  Notion01Icon,
  SlackIcon,
} from "@hugeicons/core-free-icons"

type Integration = { value: string; label: string; icon: typeof SlackIcon }

const integrations: Integration[] = [
  { value: "slack", label: "Slack", icon: SlackIcon },
  { value: "github", label: "GitHub", icon: GithubIcon },
  { value: "gitlab", label: "GitLab", icon: GitlabIcon },
  { value: "google-drive", label: "Google Drive", icon: GoogleDriveIcon },
  { value: "notion", label: "Notion", icon: Notion01Icon },
  { value: "figma", label: "Figma", icon: FigmaIcon },
  { value: "dropbox", label: "Dropbox", icon: DropboxIcon },
  { value: "discord", label: "Discord", icon: DiscordIcon },
]

export function Showcase() {
  return (
    <div className="flex w-full justify-center">
      <div
        className="flex w-full flex-col gap-2"
        style={{ maxWidth: 280, paddingTop: 12 }}
      >
        <Label htmlFor="combobox-preview-integration">Integration</Label>
        <Combobox
          items={integrations}
          defaultValue={integrations[1]}
          defaultOpen
          defaultInputValue="gi"
        >
          <ComboboxTrigger
            render={
              <Button
                id="combobox-preview-integration"
                variant="outline"
                className="w-full justify-between font-normal"
              >
                <span className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={GithubIcon}
                    className="text-muted-foreground"
                  />
                  GitHub
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
                <Icon icon={Search01Icon} strokeWidth={2} className="size-3.5" />
              </InputGroupAddon>
            </ComboboxInput>
            <ComboboxEmpty>No integrations found.</ComboboxEmpty>
            <ComboboxList>
              {(item: Integration) => (
                <ComboboxItem key={item.value} value={item}>
                  <HugeiconsIcon icon={item.icon} />
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  )
}

export { ComboboxExample as UsageDemo } from "@/examples/ui/combobox"
