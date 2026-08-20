"use client"

import {
  TERMINAL_TAB_OPTIONS,
  Terminal,
  TerminalActions,
  TerminalClearButton,
  TerminalContent,
  TerminalCopyButton,
  TerminalInput,
  TerminalStatus,
  TerminalTab,
  TerminalTabAdd,
  TerminalTabs,
  type TerminalTabType,
} from "@/components/code/terminal"
import { useEffect, useRef, useState } from "react"

const STARTUP_LINES = [
  "$ pnpm dev",
  "",
  "> designellie@0.1.0 dev",
  "> next dev --turbopack --port 3010",
  "",
  "   ▲ Next.js 15.3 (Turbopack)",
  "   - Local:    http://localhost:3010",
  "",
  " ✓ Ready in 1.2s",
]

/** Canned body a fresh tab starts with, per tab type. */
const TAB_SEED: Record<TerminalTabType, string> = {
  console: "[HMR] connected.\n[HMR] update /examples/code/terminal.tsx",
  output: "> Build completed in 3.4s\n> 0 errors, 0 warnings",
  problems: "No problems have been detected in the workspace.",
  terminal: "",
}

const COMMANDS: Record<string, string> = {
  help: "Available commands: help, ls, whoami, clear",
  ls: "app  components  examples  icons  lib  public",
  whoami: "ellie",
}

function tabIcon(type: TerminalTabType) {
  return TERMINAL_TAB_OPTIONS.find((option) => option.type === type)!.icon
}

interface DemoTab {
  id: number
  type: TerminalTabType
  label: string
}

export function TerminalExample() {
  const [tabs, setTabs] = useState<DemoTab[]>([
    { id: 1, label: "zsh", type: "terminal" },
  ])
  const [activeId, setActiveId] = useState(1)
  const [outputs, setOutputs] = useState<Record<number, string>>({ 1: "" })
  const [isStreaming, setIsStreaming] = useState(true)
  const nextIdRef = useRef(2)

  // Stream the dev-server startup into the first tab, one line at a time.
  useEffect(() => {
    setOutputs((prev) => ({ ...prev, 1: "" }))
    setIsStreaming(true)
    let line = 0
    const interval = window.setInterval(() => {
      line += 1
      setOutputs((prev) => ({
        ...prev,
        1: STARTUP_LINES.slice(0, line).join("\n"),
      }))
      if (line >= STARTUP_LINES.length) {
        window.clearInterval(interval)
        setIsStreaming(false)
      }
    }, 250)
    return () => window.clearInterval(interval)
  }, [])

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0]
  const streaming = isStreaming && activeTab.id === 1

  const appendOutput = (id: number, text: string) => {
    setOutputs((prev) => ({
      ...prev,
      [id]: prev[id] ? `${prev[id]}\n${text}` : text,
    }))
  }

  const runCommand = (command: string) => {
    const cmd = command.trim()
    if (cmd === "clear") {
      setOutputs((prev) => ({ ...prev, [activeTab.id]: "" }))
      return
    }
    appendOutput(activeTab.id, `$ ${command}`)
    if (!cmd) return
    appendOutput(
      activeTab.id,
      COMMANDS[cmd] ?? `zsh: command not found: ${cmd}`
    )
  }

  const addTab = (type: TerminalTabType) => {
    const id = nextIdRef.current++
    const option = TERMINAL_TAB_OPTIONS.find((entry) => entry.type === type)!
    setTabs((prev) => [
      ...prev,
      { id, label: type === "terminal" ? "zsh" : option.label, type },
    ])
    setOutputs((prev) => ({ ...prev, [id]: TAB_SEED[type] }))
    setActiveId(id)
  }

  const closeTab = (id: number) => {
    setTabs((prev) => {
      const remaining = prev.filter((tab) => tab.id !== id)
      if (id === activeId && remaining.length > 0) {
        setActiveId(remaining[remaining.length - 1].id)
      }
      return remaining
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto justify-center">
      <Terminal
        isStreaming={streaming}
        onClear={() =>
          setOutputs((prev) => ({ ...prev, [activeTab.id]: "" }))
        }
        output={outputs[activeTab.id] ?? ""}
      >
        <TerminalTabs>
          {tabs.map((tab) => (
            <TerminalTab
              active={tab.id === activeTab.id}
              icon={tabIcon(tab.type)}
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              onClose={tabs.length > 1 ? () => closeTab(tab.id) : undefined}
            >
              {tab.label}
            </TerminalTab>
          ))}
          <TerminalTabAdd onSelect={addTab} />
          <div className="ms-auto flex items-center gap-1">
            <TerminalStatus>Running</TerminalStatus>
            <TerminalActions>
              <TerminalCopyButton />
              <TerminalClearButton />
            </TerminalActions>
          </div>
        </TerminalTabs>
        <TerminalContent className="h-72">
          {activeTab.type === "terminal" && !streaming && (
            <TerminalInput onSubmit={runCommand} prompt="$" />
          )}
        </TerminalContent>
      </Terminal>
    </div>
  )
}
