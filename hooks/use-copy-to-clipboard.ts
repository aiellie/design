"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function useCopyToClipboard({
  timeout = 2000,
}: {
  timeout?: number
} = {}) {
  const [isCopied, setIsCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  /** Resolves to whether the value actually reached the clipboard. */
  const copyToClipboard = useCallback(
    async (value: string) => {
      if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
        return false
      }

      if (!value) {
        return false
      }

      try {
        await navigator.clipboard.writeText(value)
      } catch {
        // Denied by permissions policy, an insecure context, or an unfocused document.
        return false
      }

      setIsCopied(true)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false)
      }, timeout)

      return true
    },
    [timeout]
  )

  return { isCopied, copyToClipboard }
}