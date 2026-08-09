"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Label } from "@/components/ui/label"

const frameworks = ["Astro", "Next.js", "Nuxt", "Remix", "SvelteKit", "Vite"]

const editors = ["Cursor", "Neovim", "VS Code", "WebStorm", "Zed"]

export function ComboboxExample() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="combobox-framework">Framework</Label>
        <Combobox items={frameworks}>
          <ComboboxInput
            id="combobox-framework"
            placeholder="Search framework..."
            className="w-full"
          />
          <ComboboxContent>
            <ComboboxEmpty>No framework found.</ComboboxEmpty>
            <ComboboxList>
              {(framework: string) => (
                <ComboboxItem key={framework} value={framework}>
                  {framework}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="combobox-editor">Editor (clearable)</Label>
        <Combobox items={editors} defaultValue="VS Code">
          <ComboboxInput
            id="combobox-editor"
            placeholder="Search editor..."
            showClear
            className="w-full"
          />
          <ComboboxContent>
            <ComboboxEmpty>No editor found.</ComboboxEmpty>
            <ComboboxList>
              {(editor: string) => (
                <ComboboxItem key={editor} value={editor}>
                  {editor}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  )
}
