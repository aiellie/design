// Kbd preview — repo shortcut-list showcase from examples/ui/kbd.tsx, plus a
// single-key sweep, combo groups, and keys living inside buttons.
import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export { KbdExample as Showcase } from "@/examples/ui/kbd"

export function Keys() {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {["⌘", "⇧", "⌥", "⌃", "↵", "⌫", "Esc", "Tab", "Space"].map((key) => (
        <Kbd key={key}>{key}</Kbd>
      ))}
    </div>
  )
}

export function Combinations() {
  return (
    <div className="flex flex-col items-start gap-2 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        Open command palette
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        Save all changes
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        Force quit
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span className="text-xs">+</span>
          <Kbd>Alt</Kbd>
          <span className="text-xs">+</span>
          <Kbd>Del</Kbd>
        </KbdGroup>
      </div>
    </div>
  )
}

export function InButtons() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm">
        Quick search
        <Kbd>⌘K</Kbd>
      </Button>
      <Button variant="secondary" size="sm">
        Submit review
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>↵</Kbd>
        </KbdGroup>
      </Button>
    </div>
  )
}
