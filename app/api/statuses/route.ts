import { promises as fs } from "fs"
import path from "path"

import { NextResponse } from "next/server"

import { statusMeta } from "@/examples/status"

const STATUSES_PATH = path.join(process.cwd(), "examples", "statuses.json")

/**
 * Persists a status change back into examples/statuses.json. Only available
 * while running the dev server — the deployed site serves the committed
 * statuses read-only.
 */
export async function PATCH(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Status changes only persist in development." },
      { status: 405 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const { slug, status } = (body ?? {}) as { slug?: string; status?: string }
  if (typeof slug !== "string" || typeof status !== "string") {
    return NextResponse.json(
      { error: "Expected { slug, status }." },
      { status: 400 }
    )
  }
  if (!(status in statusMeta)) {
    return NextResponse.json(
      { error: `Unknown status "${status}".` },
      { status: 400 }
    )
  }

  const statuses = JSON.parse(await fs.readFile(STATUSES_PATH, "utf8")) as
    Record<string, string>
  if (!(slug in statuses)) {
    return NextResponse.json(
      { error: `Unknown example "${slug}".` },
      { status: 404 }
    )
  }

  statuses[slug] = status
  await fs.writeFile(
    STATUSES_PATH,
    JSON.stringify(statuses, null, 2) + "\n",
    "utf8"
  )

  return NextResponse.json({ ok: true, slug, status })
}
