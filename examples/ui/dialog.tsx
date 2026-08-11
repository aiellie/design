"use client"

import * as React from "react"
import { Copy01Icon, Edit01Icon, Share08Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster, toast } from "@/components/ui/toast"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SHARE_LINK = "https://designellie.ai/dialog"

const DEFAULT_PROFILE = { name: "Alex Rivera", username: "@alexr" }

function ShareLinkCopyButton() {
  const [copied, setCopied] = React.useState(false)
  const label = copied ? "Copied" : "Copy"

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <InputGroupButton
            size="icon-xs"
            aria-label={label}
            onClick={() => {
              void navigator.clipboard.writeText(SHARE_LINK)
              setCopied(true)
              toast.add({
                type: "success",
                title: "Copied to clipboard",
              })
              window.setTimeout(() => setCopied(false), 2000)
            }}
          >
            <HugeiconsIcon
              icon={copied ? Tick02Icon : Copy01Icon}
              strokeWidth={2}
            />
          </InputGroupButton>
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function EditProfileDialog() {
  const [open, setOpen] = React.useState(false)
  const [profile, setProfile] = React.useState(DEFAULT_PROFILE)
  const [draft, setDraft] = React.useState(DEFAULT_PROFILE)

  const isDirty =
    draft.name !== profile.name || draft.username !== profile.username

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        // Discard unsaved edits when the dialog closes.
        if (!nextOpen) setDraft(profile)
      }}
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <DialogTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Edit profile"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} />
                </Button>
              }
            />
          }
        />
        <TooltipContent>Edit profile</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your public profile here. Click save when you are
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="dialog-example-name">Name</Label>
            <Input
              id="dialog-example-name"
              value={draft.name}
              onChange={(event) =>
                setDraft((current) => ({ ...current, name: event.target.value }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label className="font-normal" htmlFor="dialog-example-username">Username</Label>
            <Input
              id="dialog-example-username"
              value={draft.username}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  username: event.target.value,
                }))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            disabled={!isDirty}
            onClick={() => {
              setProfile(draft)
              setOpen(false)
              toast.add({
                type: "success",
                title: "Profile updated",
              })
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogExample() {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <EditProfileDialog />
      <Dialog>
        <Tooltip>
          <TooltipTrigger
            render={
              <DialogTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Share"
                    className="bg-blue-500/5 border-blue-50 text-blue-500 hover:bg-blue-500/10 hover:text-blue-500"
                  >
                    <HugeiconsIcon icon={Share08Icon} strokeWidth={2} />
                  </Button>
                }
              />
            }
          />
          <TooltipContent>Share link</TooltipContent>
        </Tooltip>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <InputGroup>
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <InputGroupInput
              id="link"
              defaultValue={SHARE_LINK}
              readOnly
            />
            <InputGroupAddon align="inline-end">
              <ShareLinkCopyButton />
            </InputGroupAddon>
          </InputGroup>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  )
}
