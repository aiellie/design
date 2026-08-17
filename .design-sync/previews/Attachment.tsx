// Attachment preview — adapted from examples/ui/attachment.tsx. The example's
// image tiles point at the app's public/ dir (/brand/*.png), which doesn't
// exist in the DS context, so the Showcase reproduces the same gallery + the
// example's exact five file states with self-contained data-URI images.
import {
  CancelIcon,
  FileSpreadsheetIcon,
  FolderIcon,
  Pdf02Icon,
  Plus,
  Refresh01Icon,
  SquareMIcon,
  Zip02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"
import { Spinner } from "@/components/ui/spinner"

const tile = (a: string, b: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="160" height="160" fill="url(#g)"/></svg>`,
  )}`

const images = [
  { name: "hero-gradient.png", alt: "Hero gradient", src: tile("#7c6cf6", "#a78bfa") },
  { name: "cover-dusk.png", alt: "Dusk cover", src: tile("#6366f1", "#ec4899") },
  { name: "texture-grain.png", alt: "Grain texture", src: tile("#0ea5e9", "#8b5cf6") },
  { name: "mark.svg", alt: "Logo mark", src: tile("#111827", "#4b5563") },
]

const files = [
  { name: "design-skills.md", meta: "Markdown · 3 KB", state: "done" as const, media: "text-blue-500 bg-blue-500/5", icon: SquareMIcon, action: CancelIcon, actionLabel: "Remove" },
  { name: "projects.csv", meta: "CSV · 12 KB", state: "done" as const, media: "text-green-500 bg-green-500/5", icon: FileSpreadsheetIcon, action: CancelIcon, actionLabel: "Remove" },
  { name: "design-system.zip", meta: "Uploading · 64%", state: "uploading" as const, media: "", icon: Zip02Icon, action: CancelIcon, actionLabel: "Cancel upload" },
  { name: "aboutme.pdf", meta: "Processing document", state: "processing" as const, media: "text-red-500 bg-red-500/5", icon: Pdf02Icon, action: CancelIcon, actionLabel: "Remove" },
  { name: "aiellieui.dev", meta: "Upload failed. Please try again.", state: "error" as const, media: "text-red-500 bg-red-500/5", icon: FolderIcon, action: Refresh01Icon, actionLabel: "Retry upload" },
]

export function Showcase() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <AttachmentGroup>
        {images.map((image) => (
          <Attachment
            key={image.name}
            orientation="vertical"
            className="has-data-[slot=attachment-media]:p-0"
          >
            <AttachmentMedia variant="image">
              <img src={image.src} alt={image.alt} />
            </AttachmentMedia>
            <AttachmentActions>
              <AttachmentAction type="button" aria-label={`Remove ${image.name}`}>
                <HugeiconsIcon icon={CancelIcon} />
              </AttachmentAction>
            </AttachmentActions>
            <AttachmentTrigger aria-label={`Preview ${image.name}`} />
          </Attachment>
        ))}
      </AttachmentGroup>
      {files.map((file) => (
        <Attachment key={file.name} state={file.state} className="w-full" size="sm">
          <AttachmentMedia className={file.media}>
            {file.state === "uploading" ? <Spinner /> : <HugeiconsIcon icon={file.icon} />}
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{file.name}</AttachmentTitle>
            <AttachmentDescription>{file.meta}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction type="button" aria-label={file.actionLabel}>
              <HugeiconsIcon icon={file.action} />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </div>
  )
}

export function Sizes() {
  const sizes = [
    { size: "default" as const, name: "q3-report.pdf", meta: "PDF · 2.4 MB", icon: Pdf02Icon, media: "text-red-500 bg-red-500/5" },
    { size: "sm" as const, name: "projects.csv", meta: "CSV · 12 KB", icon: FileSpreadsheetIcon, media: "text-green-500 bg-green-500/5" },
    { size: "xs" as const, name: "design-tokens.zip", meta: "ZIP · 840 KB", icon: Zip02Icon, media: "" },
  ]
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {sizes.map((file) => (
        <Attachment key={file.size} size={file.size} className="w-full">
          <AttachmentMedia className={file.media}>
            <HugeiconsIcon icon={file.icon} />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{file.name}</AttachmentTitle>
            <AttachmentDescription>{file.meta}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction type="button" aria-label={`Remove ${file.name}`}>
              <HugeiconsIcon icon={CancelIcon} />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </div>
  )
}

export function IdleUpload() {
  return (
    <Attachment state="idle" className="w-full max-w-sm">
      <AttachmentMedia>
        <HugeiconsIcon icon={Plus} />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>Add attachment</AttachmentTitle>
        <AttachmentDescription>
          Drop a file here or click to browse
        </AttachmentDescription>
      </AttachmentContent>
      <AttachmentTrigger aria-label="Add attachment" />
    </Attachment>
  )
}
