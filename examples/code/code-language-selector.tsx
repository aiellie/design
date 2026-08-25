"use client"

import { CodeLanguageSelector, getCodeLanguage } from "@/components/code/code-language-selector"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/components/ui/toast"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"

export function CodeLanguageSelectorExample() {
  const [language, setLanguage] = useState<string | null>("typescript")
  const selected = language ? getCodeLanguage(language) : undefined
  const { isCopied, copyToClipboard } = useCopyToClipboard()
  const copyLabel = isCopied ? "Copied" : "Copy"

  return (
    <div className="flex w-full items-center justify-center">
      <InputGroup className="max-w-sm">
        <InputGroupAddon>
          <CodeLanguageSelector onValueChange={setLanguage} value={language} />
        </InputGroupAddon>
        <InputGroupInput
          readOnly
          value={selected?.value ?? ""}
          placeholder="Pick a language"
          className="font-mono text-xs"
        />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger
              render={
                <InputGroupButton
                  size="icon-xs"
                  aria-label={copyLabel}
                  disabled={!selected}
                  onClick={() => {
                    if (!selected) return
                    void (async () => {
                      const copied = await copyToClipboard(selected.value)
                      toast.add(
                        copied
                          ? {
                              title: "Copied",
                              description: selected.value,
                              type: "success",
                            }
                          : {
                              title: "Could not copy",
                              type: "error",
                            }
                      )
                    })()
                  }}
                >
                  <HugeiconsIcon
                    icon={isCopied ? Tick02Icon : Copy01Icon}
                    strokeWidth={2}
                  />
                </InputGroupButton>
              }
            />
            <TooltipContent>{copyLabel}</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
