// Textarea preview — the repo's feedback-form showcase from
// examples/ui/textarea.tsx, plus a filled auto-sizing cell and
// disabled/invalid states on the bare control.
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export { TextareaExample as Showcase } from "@/examples/ui/textarea"

export function Default() {
  return (
    <div className="w-full max-w-md space-y-2">
      <Label htmlFor="textarea-preview-notes">Release notes</Label>
      <Textarea
        id="textarea-preview-notes"
        defaultValue={
          "Dark-mode tokens now ship with every component.\nSlider and Switch pick up the new violet primary."
        }
      />
    </div>
  )
}

export function States() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="textarea-preview-disabled">Changelog draft</Label>
        <Textarea
          id="textarea-preview-disabled"
          disabled
          defaultValue="Editing is locked while the release is being published."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="textarea-preview-invalid">Support message</Label>
        <Textarea
          id="textarea-preview-invalid"
          placeholder="Describe the issue…"
          aria-invalid
        />
      </div>
    </div>
  )
}
