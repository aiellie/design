// design-sync bundle entry: the full runtime surface of the design system.
// Star-exports every component file (primaries + subcomponents + helpers),
// the icon registry, and the cn utility. Unlike ../index.ts (the curated
// types/discovery entry), this is what lands on window.DesignEllieAI.

// Actions
export * from "../components/ui/badge"
export * from "../components/ui/button"
export * from "../components/ui/button-group"
export * from "../components/ui/kbd"
export * from "../components/ui/toggle"
export * from "../components/ui/toggle-group"

// Forms & Input
export * from "../components/ui/checkbox"
export * from "../components/ui/combobox"
export * from "../components/countries-select"
export * from "../components/ui/field"
export * from "../components/ui/input"
export * from "../components/ui/input-group"
export * from "../components/ui/input-otp"
export * from "../components/ui/label"
export * from "../components/language-selector"
export * from "../components/ui/native-select"
export * from "../components/ui/radio-group"
export * from "../components/ui/select"
export * from "../components/ui/slider"
export * from "../components/ui/switch"
export * from "../components/ui/textarea"

// Overlays
export * from "../components/ui/alert-dialog"
export * from "../components/ui/dialog"
export * from "../components/ui/drawer"
export * from "../components/ui/hover-card"
export * from "../components/ui/popover"
export * from "../components/ui/sheet"
export * from "../components/ui/tooltip"

// Menus & Navigation
export * from "../components/ui/breadcrumb"
export * from "../components/ui/command"
export * from "../components/ui/context-menu"
export * from "../components/ui/dropdown-menu"
export * from "../components/ui/expandable-tabs"
export * from "../components/ui/menubar"
export * from "../components/ui/navigation-menu"
export * from "../components/ui/pagination"
export * from "../components/ui/sidebar"
export * from "../components/ui/tabs"

// Status
export * from "../components/ui/alert"
export * from "../components/ui/empty"
export * from "../components/ui/progress"
export * from "../components/ui/skeleton"
export * from "../components/ui/spinner"
export * from "../components/ui/toast"

// Data
export * from "../components/ui/avatar"
export * from "../components/ui/calendar"
export * from "../components/ui/card"
export * from "../components/ui/chart"
export * from "../components/ui/item"
export * from "../components/ui/table"

// Display
export * from "../components/ui/accordion"
export * from "../components/ui/aspect-ratio"
export * from "../components/ui/carousel"
export * from "../components/ui/collapsible"
export * from "../components/ui/direction"
export * from "../components/ui/resizable"
export * from "../components/ui/scroll-area"
export * from "../components/ui/separator"

// Chat
export * from "../components/ui/attachment"
export * from "../components/ui/bubble"
export * from "../components/markdown"
export * from "../components/ui/marker"
export * from "../components/ui/message"
export * from "../components/message-animated"
export * from "../components/ui/message-scroller"
export * from "../components/ui/questionnaire"

// Code
export * from "../components/code/code-block"
export * from "../components/code/code-language-selector"

// Color
export * from "../components/color/color-format-selector"
export * from "../components/color/color-picker"

// Icons & utilities
export * from "../icons/icons"
export * from "../icons/brand-icons"
export { HugeiconsIcon } from "@hugeicons/react"
export { cn } from "../lib/utils"
