"use server"

import { highlightCode } from "@/lib/highlight-code"

/** Server action wrapper so client components can request highlighted code
 *  without shipping shiki (and its node-only deps) to the browser. */
export async function getHighlightedCode(code: string, language?: string) {
  return highlightCode(code, language)
}
