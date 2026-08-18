"use client"

import {
  WebPreview,
  WebPreviewAnnotateToggle,
  WebPreviewBody,
  WebPreviewConsole,
  WebPreviewMenu,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
} from "@/components/web/web-preview"
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  RefreshIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"

const HOME_URL = "https://designellie.ai"

const sampleLogs: {
  level: "log" | "warn" | "error"
  message: string
  timestamp: Date
}[] = [
  {
    level: "log",
    message: "[vite] connected.",
    timestamp: new Date(),
  },
  {
    level: "warn",
    message: "Third-party cookie will be blocked in a future release.",
    timestamp: new Date(),
  },
  {
    level: "error",
    message: "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT",
    timestamp: new Date(),
  },
]

/**
 * Generates the framed document locally so the demo needs no network access.
 * The current URL and zoom are baked in — reloading or navigating swaps the
 * whole document, which is exactly how a real preview behaves.
 */
function demoDocument(url: string, zoom: number): string {
  let host = url
  let path = ""
  try {
    const parsed = new URL(url)
    host = parsed.host
    path = parsed.pathname === "/" ? "" : parsed.pathname
  } catch {
    // Half-typed URLs render as-is.
  }

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body {
        margin: 0;
        zoom: ${zoom}%;
        display: grid;
        place-items: center;
        min-height: 100vh;
        font-family: ui-sans-serif, system-ui, sans-serif;
        background: #fafafa;
        color: #171717;
      }
      main { text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { margin: 0; color: #737373; font-size: 0.875rem; }
      code {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        background: #f5f5f5;
        border: 1px solid #e5e5e5;
        font-size: 0.75rem;
        color: #525252;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${host}</h1>
      <p>Rendered inside the preview iframe.</p>
      <code>${host}${path || "/"}</code>
    </main>
  </body>
</html>`
}

export function WebPreviewExample() {
  const [history, setHistory] = useState<string[]>([HOME_URL])
  const [index, setIndex] = useState(0)
  const [reloadCount, setReloadCount] = useState(0)
  const [zoom, setZoom] = useState(100)
  const [deviceToolbar, setDeviceToolbar] = useState(false)
  const [annotating, setAnnotating] = useState(false)

  const url = history[index]

  const navigate = (nextUrl: string) => {
    if (nextUrl === url) return
    setHistory((prev) => [...prev.slice(0, index + 1), nextUrl])
    setIndex(index + 1)
  }

  return (
    <div className="h-[28rem] w-full">
      <WebPreview
        onReload={() => setReloadCount((count) => count + 1)}
        onUrlChange={navigate}
        url={url}
      >
        <WebPreviewNavigation>
          <WebPreviewNavigationButton
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
            tooltip="Go back"
          >
            <HugeiconsIcon
              className="size-4.5"
              icon={ArrowLeft02Icon}
              strokeWidth={2}
            />
          </WebPreviewNavigationButton>
          <WebPreviewNavigationButton
            disabled={index === history.length - 1}
            onClick={() => setIndex(index + 1)}
            tooltip="Go forward"
          >
            <HugeiconsIcon
              className="size-4.5"
              icon={ArrowRight02Icon}
              strokeWidth={2}
            />
          </WebPreviewNavigationButton>
          <WebPreviewNavigationButton
            onClick={() => setReloadCount((count) => count + 1)}
            tooltip="Reload"
          >
            <HugeiconsIcon
              className="size-4.5"
              icon={RefreshIcon}
              strokeWidth={2}
            />
          </WebPreviewNavigationButton>

          <WebPreviewUrl />

          <WebPreviewAnnotateToggle
            active={annotating}
            onActiveChange={setAnnotating}
          />
          <WebPreviewMenu
            deviceToolbar={deviceToolbar}
            onDeviceToolbarChange={setDeviceToolbar}
            onScreenshot={() => console.log("Screenshot captured")}
            onZoomChange={setZoom}
            zoom={zoom}
          />
        </WebPreviewNavigation>

        <WebPreviewBody
          className={deviceToolbar ? "mx-auto max-w-sm border-x" : undefined}
          key={`${url}-${reloadCount}`}
          srcDoc={demoDocument(url, zoom)}
        />

        <WebPreviewConsole logs={sampleLogs} />
      </WebPreview>
    </div>
  )
}
