"use server"

import { readFile } from "node:fs/promises"
import path from "node:path"

const styleSheets = [
  "animations.css",
  "base.css",
  "box-shadow.css",
  "colors.css",
  "globals.css",
  "icons.css",
  "radius.css",
  "sidebar.css",
  "svg.css",
  "themes.css",
  "typeset.css",
  "typography.css",
  "uishadcn.css",
  "utilities.css",
] as const

export type StyleSheetName = (typeof styleSheets)[number]

const allowed = new Set<string>(styleSheets)

/** Reads a file from `styles/` so client examples can show the live source. */
export async function getStyleSheet(filename: StyleSheetName): Promise<string> {
  if (!allowed.has(filename)) {
    throw new Error(`Unknown stylesheet: ${filename}`)
  }

  return readFile(path.join(process.cwd(), "styles", filename), "utf8")
}
