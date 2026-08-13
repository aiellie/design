"use client"

import {
  CancelIcon,
  FileSpreadsheetIcon,
  Refresh01Icon,
  Zip02Icon,
  Pdf02Icon,
  SquareMIcon,
  FolderIcon,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const actions = {
  remove: {
    label: "Remove",
    icon: CancelIcon,
  },
  cancel: {
    label: "Cancel upload",
    icon: CancelIcon,
  },
  retry: {
    label: "Retry upload",
    icon: Refresh01Icon,
  },
} as const

type ActionKey = keyof typeof actions

const images = [
  {
    name: "grain.png",
    meta: "PNG · 2.5 MB",
    src: "/brand/grain.png",
    alt: "Grain texture",
    actions: ["remove"] satisfies ActionKey[],
  },
  {
    name: "aiellie.png",
    meta: "PNG · 1.9 MB",
    src: "/brand/aiellie.png",
    alt: "Ellie avatar",
    actions: ["remove"] satisfies ActionKey[],
  },
  {
    name: "ellie-transparent-bg.png",
    meta: "PNG · 289 KB",
    src: "/brand/ellie-transparent-bg.png",
    alt: "Ellie",
    actions: ["remove"] satisfies ActionKey[],
  },
  {
    name: "favion.svg",
    meta: "PNG · 289 KB",
    src: "/brand/favicon.svg",
    alt: "Favicon",
    actions: ["remove"] satisfies ActionKey[],
  },
]

const files = [
  {
    name: "design-skills.md",
    meta: "Markdown · 3 KB",
    state: "done" as const,
    actions: ["remove"] satisfies ActionKey[],
    attachmentMediaClassName: "text-blue-500 bg-blue-500/5",
    icon: SquareMIcon,
  },
  {
    name: "projects.csv",
    meta: "CSV · 12 KB",
    state: "done" as const,
    actions: ["remove"] satisfies ActionKey[],
    attachmentMediaClassName: "text-green-500 bg-green-500/5",
    icon: FileSpreadsheetIcon,
  },
  {
    name: "design-system.zip",
    meta: "Uploading · 64%",
    state: "uploading" as const,
    actions: ["cancel"] satisfies ActionKey[],
    icon: Zip02Icon,
  },
  {
    name: "aboutme.pdf",
    meta: "Processing document",
    state: "processing" as const,
    actions: ["remove"] satisfies ActionKey[],
    attachmentMediaClassName: "text-red-500 bg-red-500/5",
    icon: Pdf02Icon,
  },
  {
    name: "aiellieui.dev",
    meta: "Upload failed. Please try again.",
    state: "error" as const,
    actions: ["retry", "remove"] satisfies ActionKey[],
    attachmentMediaClassName: "text-red-500 bg-red-500/5",
    icon: FolderIcon,
  },
]

function ItemActions({
  keys,
}: {
  keys: ActionKey[]
}) {
  return (
    <AttachmentActions>
      {keys.map((key) => {
        const action = actions[key]
        return (
          <Tooltip key={key}>
            <TooltipTrigger
              render={
                <AttachmentAction type="button" aria-label={action.label}>
                  <HugeiconsIcon icon={action.icon} />
                </AttachmentAction>
              }
            />
            <TooltipContent>{action.label}</TooltipContent>
          </Tooltip>
        )
      })}
    </AttachmentActions>
  )
}

export function AttachmentExample() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
      <AttachmentGroup>
        {images.map((image) => (
          <Dialog key={image.name}>
            <Attachment
              orientation="vertical"
              className="has-data-[slot=attachment-media]:p-0"
            >
              <AttachmentMedia variant="image">
                <img src={image.src} alt={image.alt} />
              </AttachmentMedia>
              <ItemActions keys={image.actions} />
              <DialogTrigger
                render={
                  <AttachmentTrigger aria-label={`Preview ${image.name}`} />
                }
              />
            </Attachment>
            <DialogContent className="overflow-hidden sm:max-w-md">
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-square w-full rounded-lg object-cover"
              />
              <DialogHeader>
                <DialogTitle>{image.name}</DialogTitle>
                <DialogDescription>{image.meta}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </AttachmentGroup>
      {files.map((file) => (
        <Dialog key={file.name}>
          <Attachment state={file.state} className="w-full" size="sm">
            <AttachmentMedia className={file.attachmentMediaClassName}>
              {file.state === "uploading" ? (
                <Spinner />
              ) : (
                <HugeiconsIcon icon={file.icon} />
              )}
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{file.name}</AttachmentTitle>
              <AttachmentDescription>{file.meta}</AttachmentDescription>
            </AttachmentContent>
            <ItemActions keys={file.actions} />
            <DialogTrigger
              render={
                <AttachmentTrigger aria-label={`Preview ${file.name}`} />
              }
            />
          </Attachment>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{file.name}</DialogTitle>
              <DialogDescription>{file.meta}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
