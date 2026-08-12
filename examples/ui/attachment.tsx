"use client"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from '@/components/ui/attachment'
import { Spinner } from '@/components/ui/spinner'
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AlertCircleIcon,
  Cancel01Icon,
  Download02Icon,
  Pdf02Icon,
  RefreshIcon,
} from "@hugeicons/core-free-icons"

export function AttachmentExample() {
  return (
    <div className="flex justify-center flex-col gap-3">
      <Attachment className="w-full">
        <AttachmentMedia>
          <HugeiconsIcon icon={Pdf02Icon} strokeWidth={2} />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Q3-brand-guidelines.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Download attachment">
            <HugeiconsIcon icon={Download02Icon} strokeWidth={2} />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="uploading" className="w-full">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>launch-video-final.mp4</AttachmentTitle>
          <AttachmentDescription>Uploading · 48% of 128 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Cancel upload">
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="error" size="sm" className="w-full">
        <AttachmentMedia>
          <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>assets-bundle.zip</AttachmentTitle>
          <AttachmentDescription>
            Upload failed — file exceeds 100 MB
          </AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Retry upload">
            <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  )
}
