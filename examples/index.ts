import type * as React from "react"

import { IconsExample } from "@/examples/icons/icons"
import { ColorsExample } from "@/examples/styles/colors"
import { TypesetExample } from "@/examples/styles/typeset"
import { AccordionExample } from "@/examples/ui/accordion"
import { AlertExample } from "@/examples/ui/alert"
import { AlertDialogExample } from "@/examples/ui/alert-dialog"
import { AspectRatioExample } from "@/examples/ui/aspect-ratio"
import { AttachmentExample } from "@/examples/ui/attachment"
import { AvatarExample } from "@/examples/ui/avatar"
import { BadgeColorsDemo, BadgeExample } from "@/examples/ui/badge"
import { BreadcrumbExample } from "@/examples/ui/breadcrumb"
import { BubbleExample } from "@/examples/ui/bubble"
import { ButtonExample } from "@/examples/ui/button"
import { ButtonGroupExample } from "@/examples/ui/button-group"
import { CalendarExample } from "@/examples/ui/calendar"
import { CardExample } from "@/examples/ui/card"
import { CarouselExample } from "@/examples/ui/carousel"
import { ChartExample } from "@/examples/ui/chart"
import { CheckboxExample } from "@/examples/ui/checkbox"
import { CollapsibleExample } from "@/examples/ui/collapsible"
import { ComboboxExample } from "@/examples/ui/combobox"
import { CommandExample } from "@/examples/ui/command"
import { ContextMenuExample } from "@/examples/ui/context-menu"
import { DialogExample } from "@/examples/ui/dialog"
import { DirectionExample } from "@/examples/ui/direction"
import { DrawerExample } from "@/examples/ui/drawer"
import { DropdownMenuExample } from "@/examples/ui/dropdown-menu"
import { EmptyExample } from "@/examples/ui/empty"
import { FieldExample } from "@/examples/ui/field"
import { HoverCardExample } from "@/examples/ui/hover-card"
import { InputExample } from "@/examples/ui/input"
import { InputGroupExample } from "@/examples/ui/input-group"
import { InputOtpExample } from "@/examples/ui/input-otp"
import { ItemExample } from "@/examples/ui/item"
import { KbdExample } from "@/examples/ui/kbd"
import { LabelExample } from "@/examples/ui/label"
import { MarkerExample } from "@/examples/ui/marker"
import { MenubarExample } from "@/examples/ui/menubar"
import { MessageExample } from "@/examples/ui/message"
import { MessageScrollerExample } from "@/examples/ui/message-scroller"
import { NativeSelectExample } from "@/examples/ui/native-select"
import { NavigationMenuExample } from "@/examples/ui/navigation-menu"
import { PaginationExample } from "@/examples/ui/pagination"
import { PopoverExample } from "@/examples/ui/popover"
import { ProgressExample } from "@/examples/ui/progress"
import { QuestionnaireExample } from "@/examples/ui/questionnaire"
import { RadioGroupExample } from "@/examples/ui/radio-group"
import { ResizableExample } from "@/examples/ui/resizable"
import { ScrollAreaExample } from "@/examples/ui/scroll-area"
import { SelectExample } from "@/examples/ui/select"
import { SeparatorExample } from "@/examples/ui/separator"
import { SheetExample } from "@/examples/ui/sheet"
import { SidebarExample } from "@/examples/ui/sidebar/sidebar"
import { SkeletonExample } from "@/examples/ui/skeleton"
import { SliderExample } from "@/examples/ui/slider"
import { SpinnerExample } from "@/examples/ui/spinner"
import { SwitchExample } from "@/examples/ui/switch"
import { TableExample } from "@/examples/ui/table"
import { TabsExample } from "@/examples/ui/tabs"
import { TextareaExample } from "@/examples/ui/textarea"
import { ToastExample } from "@/examples/ui/toast"
import { ToggleExample } from "@/examples/ui/toggle"
import { ToggleGroupExample } from "@/examples/ui/toggle-group"
import { TooltipExample } from "@/examples/ui/tooltip"
import type { IconData } from "@/icons/icons"
import {
  AlertCircleIcon,
  Analytics01Icon,
  AudioLinesIcon,
  PauseIcon,
  AppWindowIcon,
  AppWindowMacIcon,
  ArrowExpand01Icon,
  ArrowLeftRightIcon,
  Attachment01Icon,
  BotIcon,
  BlurIcon,
  BrowserIcon,
  BubbleChatIcon,
  Bug01Icon,
  Calendar03Icon,
  CarouselHorizontalIcon,
  Chatting01Icon,
  CheckListIcon,
  CheckmarkSquare02Icon,
  ChevronDownIcon,
  Clock01Icon,
  CodeSquareIcon,
  ColorsIcon,
  CommandIcon,
  Comment01Icon,
  CircleLock01Icon,
  CropIcon,
  CursorPointer01Icon,
  DarkModeIcon,
  Doc01Icon,
  DropperIcon,
  Edit02Icon,
  Folder01Icon,
  GitBranchIcon,
  GlobalIcon,
  HandIcon,
  HelpCircleIcon,
  HelpSquareIcon,
  HighlighterIcon,
  InboxIcon,
  InformationCircleIcon,
  Key01Icon,
  KeyboardIcon,
  Layers01Icon,
  Layout01Icon,
  LeftToRightListNumberIcon,
  ListViewIcon,
  Loading03Icon,
  LoginIcon,
  Menu01Icon,
  Message01Icon,
  Mic02Icon,
  Minimize01Icon,
  Mouse01Icon,
  MouseRightClick01Icon,
  Navigation03Icon,
  NoteIcon,
  Notification03Icon,
  PlusSignIcon,
  Progress01Icon,
  Progress02Icon,
  RadioButtonIcon,
  Resize01Icon,
  Route01Icon,
  RowInsertIcon,
  SearchList01Icon,
  SentIcon,
  SidebarBottomIcon,
  SidebarLeft01Icon,
  SidebarRight01Icon,
  SlidersHorizontalIcon,
  SwipeDown01Icon,
  SmileIcon,
  SolidLine01Icon,
  SparklesIcon,
  Sorting01Icon,
  SquareLock01Icon,
  Table01Icon,
  Tag01Icon,
  Tap01Icon,
  TerminalIcon,
  TestTubeIcon,
  TextFontIcon,
  TextIcon,
  TextSquareIcon,
  ThirdBracketIcon,
  ToggleOffIcon,
  ToggleOnIcon,
  TranslateIcon,
  UserCircleIcon,
  QueueIcon,
  AddIcon,
  CheckmarkCircle02Icon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons"
import { ArtifactExample } from "@/examples/code/artifact"
import { CodeBlockExample } from "@/examples/code/code-block"
import { CodeLanguageSelectorExample } from "@/examples/code/code-language-selector"
import { EnvironmentVariablesExample } from "@/examples/code/environment-variables"
import { FileTreeExample } from "@/examples/code/file-tree"
import { StackTraceExample } from "@/examples/code/stack-trace"
import { TerminalExample } from "@/examples/code/terminal"
import { SnippetExample } from "@/examples/code/snippet"
import { ColorFormatSelectorExample } from "@/examples/color/color-format-selector"
import { ColorPickerExample } from "@/examples/color/color-picker"
import { TailwindColorPickerExample } from "@/examples/color/tailwind-color-picker"
import { CountriesSelectExample } from "@/examples/locale/countries-select"
import { LanguageSelectorExample } from "@/examples/locale/language-selector"
import { TimePickerExample } from "@/examples/locale/time-picker"
import { WebPreviewExample } from "@/examples/web/web-preview"
import type { ExampleStatus } from "./status"
import { MicSelectorExample } from "@/examples/audio/mic-selector"
import { LoginFormExample } from "@/examples/auth/login-form"
import { CommitExample } from "@/examples/code/commit"
import { JsxPreviewExample } from "@/examples/code/jsx-preview"
import { PackageInfoExample } from "@/examples/code/package-info"
import { SchemaDisplayExample } from "@/examples/code/schema-display"
import { TestResultsExample } from "@/examples/code/test-results"
import { AudioPlayerExample } from "@/examples/audio/audio-player"
import { DatePickerExample } from "./locale/date-picker"
import { OpenInChatExample } from "./chat/open-in-chat"
import { Brain01Icon, Orbit01Icon } from "@hugeicons/core-free-icons"
import { RateLimitsExample } from "./models/rate-limits"
import { LimitationIcon } from "@hugeicons/core-free-icons"
import { OrbExample } from "@/examples/audio/orb"
import { ModelPickerExample } from "./models/model-picker"
import { ModelSelectorExample } from "./models/model-selector"
import { CpuIcon } from "@hugeicons/core-free-icons"
import { AddMenuExample } from "@/examples/chat/add-menu"
import { AutocompleteExample } from "@/examples/ellieui/autocomplete"
import { ContextExample } from "./chat/context"
import { ApprovalMenuExample } from "./chat/approval-menu"
import { MessageInputExample } from "./chat/message-input"
import { PromptInputExample } from "./chat/prompt-input"
import { QueueExample } from "./chat/queue"
import ConfirmationExample from "./chat/confirmation"
import ToolExample from "./chat/tool"
import StatusExample from "./ellieui/status"
export type { ExampleStatus }

/** One demo inside an example — a tab in the viewer when there's more than one. */
export interface ExampleDemo {
  /** Tab value; unique within the example. */
  value: string
  label: string
  icon: IconData
  component: React.ComponentType
}

export interface ComponentExample {
  /** Matches the file name in components/ui and examples/ui. */
  slug: string
  name: string
  component: React.ComponentType
  icon: IconData
  /**
   * Extra demos from the same file, shown as icon tabs next to the main one.
   * Leave unset for examples with a single demo — the viewer renders those bare.
   */
  demos?: ExampleDemo[]
  /** Pinned example — the header marks it with a heart badge. */
  favorite?: boolean
}

export interface ExampleCategory {
  title: string
  /** Hugeicons glyph for the category in menus, headers, and nav. */
  icon: IconData
  /** Soft tinted background for the category icon chip (`bg-*-500/5`). */
  iconBg: string
  /** Tailwind text class so the icon renders via currentColor. */
  textColor: string
  /** Faint border that matches the tint. */
  borderColor: string
  examples: ComponentExample[]
  /** Type of the category. */
  type: "ui" | "component" | "block" | "style" | "icon"
}

export interface FlatExample extends ComponentExample {
  /** Title of the category this example belongs to. */
  categoryTitle: string
  /** Repo-relative path of the example's source file. */
  file: string
  /** Class name for the example container. */
  className?: string
}

/**
 * Every demo for an example in tab order — the main one first, then extras.
 * A single-entry result means the example has nothing to tab between.
 */
export function exampleDemos(example: ComponentExample): ExampleDemo[] {
  return [
    {
      value: example.slug,
      label: example.name,
      icon: example.icon,
      component: example.component,
    },
    ...(example.demos ?? []),
  ]
}

/** Repo-relative source path for an example slug. */
export function exampleFilePath(slug: string): string {
  if (slug === "colors") return "examples/styles/colors.tsx"
  if (slug === "typeset") return "examples/styles/typeset.tsx"
  if (slug === "icons") return "examples/icons/icons.tsx"
  if (slug === "audio-player" || slug === "mic-selector" || slug === "orb")
    return `examples/audio/${slug}.tsx`
  if (slug === "login-form") return `examples/auth/${slug}.tsx`
  if (
    slug === "artifact" ||
    slug === "code-block" ||
    slug === "code-language-selector" ||
    slug === "commit" ||
    slug === "environment-variables" ||
    slug === "file-tree" ||
    slug === "jsx-preview" ||
    slug === "package-info" ||
    slug === "schema-display" ||
    slug === "snippet" ||
    slug === "stack-trace" ||
    slug === "terminal" ||
    slug === "test-results"
  )
    return `examples/code/${slug}.tsx`
  if (
    slug === "color-picker" ||
    slug === "color-format-selector" ||
    slug === "tailwind-color-picker"
  )
    return `examples/color/${slug}.tsx`
  if (
    slug === "countries-select" ||
    slug === "date-picker" ||
    slug === "language-selector" ||
    slug === "time-picker"
  )
    return `examples/locale/${slug}.tsx`
  if (slug === "web-preview") return `examples/web/${slug}.tsx`
  if (slug === "autocomplete") return `examples/ellieui/${slug}.tsx`
  if (
    slug === "rate-limits" ||
    slug === "model-selector" ||
    slug === "model-picker"
  )
    return `examples/models/${slug}.tsx`
  if (
    slug === "open-in-chat" ||
    slug === "context" ||
    slug === "prompt-input" ||
    slug === "message-input" ||
    slug === "approval-menu" ||
    slug === "queue" ||
    slug === "add-menu"
  )
    return `examples/chat/${slug}.tsx`
  return `examples/ui/${slug}.tsx`
}

export const exampleCategories: ExampleCategory[] = [
  {
    title: "Styles",
    icon: DarkModeIcon,
    iconBg: "bg-violet-500/5",
    textColor: "text-violet-500",
    borderColor: "border-violet-200/10",
    type: "style",
    examples: [
      {
        slug: "colors",
        name: "Colors",
        component: ColorsExample,
        icon: ColorsIcon,
      },
      {
        slug: "color-picker",
        name: "Color Picker",
        component: ColorPickerExample,
        icon: DropperIcon,
      },
      {
        slug: "color-format-selector",
        name: "Color Format Selector",
        component: ColorFormatSelectorExample,
        icon: Sorting01Icon,
      },
      {
        slug: "tailwind-color-picker",
        name: "Tailwind Color Picker",
        component: TailwindColorPickerExample,
        icon: DropperIcon,
      },
      {
        slug: "typeset",
        name: "Typeset",
        component: TypesetExample,
        icon: TextIcon,
      },
    ],
  },
  {
    title: "Icons",
    icon: SmileIcon,
    iconBg: "bg-yellow-500/5",
    textColor: "text-yellow-500",
    borderColor: "border-yellow-200/10",
    type: "icon",
    examples: [
      {
        slug: "icons",
        name: "Icons",
        component: IconsExample,
        icon: SmileIcon,
      },
    ],
  },
  {
    title: "Actions",
    icon: CursorPointer01Icon,
    iconBg: "bg-blue-500/5",
    textColor: "text-blue-500",
    borderColor: "border-blue-200/10",
    type: "ui",
    examples: [
      {
        slug: "button",
        name: "Button",
        component: ButtonExample,
        icon: CursorPointer01Icon,
      },
      {
        slug: "button-group",
        name: "Button Group",
        component: ButtonGroupExample,
        icon: Layout01Icon,
      },
      {
        slug: "toggle",
        name: "Toggle",
        component: ToggleExample,
        icon: ToggleOnIcon,
      },
      {
        slug: "toggle-group",
        name: "Toggle Group",
        component: ToggleGroupExample,
        icon: Tap01Icon,
      },
      {
        slug: "badge",
        name: "Badge",
        component: BadgeExample,
        icon: Tag01Icon,
        favorite: true,
        demos: [
          {
            value: "badge-colors",
            label: "Colors",
            icon: ColorsIcon,
            component: BadgeColorsDemo,
          },
        ],
      },
      {
        slug: "kbd",
        name: "Kbd",
        component: KbdExample,
        icon: KeyboardIcon,
      },
    ],
  },
  {
    title: "Forms",
    icon: CheckListIcon,
    iconBg: "bg-cyan-500/5",
    textColor: "text-cyan-500",
    borderColor: "border-cyan-200/10",
    type: "ui",
    examples: [
      {
        slug: "label",
        name: "Label",
        component: LabelExample,
        icon: TextFontIcon,
      },
      {
        slug: "field",
        name: "Field",
        component: FieldExample,
        icon: NoteIcon,
      },
      {
        slug: "checkbox",
        name: "Checkbox",
        component: CheckboxExample,
        icon: CheckmarkSquare02Icon,
      },
      {
        slug: "radio-group",
        name: "Radio Group",
        component: RadioGroupExample,
        icon: RadioButtonIcon,
      },
      {
        slug: "switch",
        name: "Switch",
        component: SwitchExample,
        icon: ToggleOffIcon,
      },
      {
        slug: "slider",
        name: "Slider",
        component: SliderExample,
        icon: SlidersHorizontalIcon,
      },
    ],
  },
  {
    title: "Input",
    icon: Edit02Icon,
    iconBg: "bg-sky-500/5",
    textColor: "text-sky-500",
    borderColor: "border-sky-200/10",
    type: "ui",
    examples: [
      {
        slug: "input",
        name: "Input",
        component: InputExample,
        icon: Edit02Icon,
      },
      {
        slug: "textarea",
        name: "Textarea",
        component: TextareaExample,
        icon: TextSquareIcon,
      },
      {
        slug: "input-group",
        name: "Input Group",
        component: InputGroupExample,
        icon: RowInsertIcon,
      },
      {
        slug: "input-otp",
        name: "Input OTP",
        component: InputOtpExample,
        icon: SquareLock01Icon,
      },
    ],
  },
  {
    title: "Overlays",
    icon: AppWindowIcon,
    iconBg: "bg-indigo-500/5",
    textColor: "text-indigo-500",
    borderColor: "border-indigo-200/10",
    type: "ui",
    examples: [
      {
        slug: "dialog",
        name: "Dialog",
        component: DialogExample,
        icon: AppWindowIcon,
      },
      {
        slug: "alert-dialog",
        name: "Alert Dialog",
        component: AlertDialogExample,
        icon: HelpSquareIcon,
      },
      {
        slug: "sheet",
        name: "Sheet",
        component: SheetExample,
        icon: SidebarRight01Icon,
      },
      {
        slug: "drawer",
        name: "Drawer",
        component: DrawerExample,
        icon: SidebarBottomIcon,
      },
      {
        slug: "popover",
        name: "Popover",
        component: PopoverExample,
        icon: Comment01Icon,
      },
      {
        slug: "hover-card",
        name: "Hover Card",
        component: HoverCardExample,
        icon: HelpCircleIcon,
      },
      {
        slug: "tooltip",
        name: "Tooltip",
        component: TooltipExample,
        icon: InformationCircleIcon,
      },
    ],
  },
  {
    title: "Menus",
    icon: Menu01Icon,
    iconBg: "bg-teal-500/5",
    textColor: "text-teal-500",
    borderColor: "border-teal-200/10",
    type: "ui",
    examples: [
      {
        slug: "autocomplete",
        name: "Autocomplete",
        component: AutocompleteExample,
        icon: SearchList01Icon,
      },
      {
        slug: "dropdown-menu",
        name: "Dropdown Menu",
        component: DropdownMenuExample,
        icon: Menu01Icon,
        favorite: true,
      },
      {
        slug: "context-menu",
        name: "Context Menu",
        component: ContextMenuExample,
        icon: MouseRightClick01Icon,
      },
      {
        slug: "native-select",
        name: "Native Select",
        component: NativeSelectExample,
        icon: Sorting01Icon,
      },
      {
        slug: "select",
        name: "Select",
        component: SelectExample,
        icon: ChevronDownIcon,
      },
      {
        slug: "combobox",
        name: "Combobox",
        component: ComboboxExample,
        icon: SearchList01Icon,
      },
      {
        slug: "menubar",
        name: "Menubar",
        component: MenubarExample,
        icon: AppWindowMacIcon,
      },
    ],
  },
  {
    title: "Navigation",
    icon: Navigation03Icon,
    iconBg: "bg-lime-500/5",
    textColor: "text-lime-500",
    borderColor: "border-lime-200/10",
    type: "ui",
    examples: [
      {
        slug: "navigation-menu",
        name: "Navigation Menu",
        component: NavigationMenuExample,
        icon: Navigation03Icon,
      },
      {
        slug: "command",
        name: "Command",
        component: CommandExample,
        icon: CommandIcon,
      },
      {
        slug: "breadcrumb",
        name: "Breadcrumb",
        component: BreadcrumbExample,
        icon: Route01Icon,
      },
      {
        slug: "pagination",
        name: "Pagination",
        component: PaginationExample,
        icon: LeftToRightListNumberIcon,
      },
      {
        slug: "tabs",
        name: "Tabs",
        component: TabsExample,
        icon: BrowserIcon,
        favorite: true,
      },
      {
        slug: "sidebar",
        name: "Sidebar",
        component: SidebarExample,
        icon: SidebarLeft01Icon,
      },
    ],
  },
  {
    title: "Status",
    icon: AlertCircleIcon,
    iconBg: "bg-amber-500/5",
    textColor: "text-amber-500",
    borderColor: "border-amber-200/10",
    type: "ui",
    examples: [
      {
        slug: "status",
        name: "Status",
        component: StatusExample,
        icon: AlertCircleIcon,
      },
      {
        slug: "alert",
        name: "Alert",
        component: AlertExample,
        icon: AlertCircleIcon,
      },
      {
        slug: "toast",
        name: "Toast",
        component: ToastExample,
        icon: Notification03Icon,
      },
      {
        slug: "progress",
        name: "Progress",
        component: ProgressExample,
        icon: Progress01Icon,
      },
      {
        slug: "skeleton",
        name: "Skeleton",
        component: SkeletonExample,
        icon: BlurIcon,
      },
      {
        slug: "spinner",
        name: "Spinner",
        component: SpinnerExample,
        icon: Loading03Icon,
      },
      {
        slug: "empty",
        name: "Empty",
        component: EmptyExample,
        icon: InboxIcon,
      },
    ],
  },
  {
    title: "Data",
    icon: Analytics01Icon,
    iconBg: "bg-emerald-500/5",
    textColor: "text-emerald-500",
    borderColor: "border-emerald-200/10",
    type: "ui",
    examples: [
      {
        slug: "table",
        name: "Table",
        component: TableExample,
        icon: Table01Icon,
      },
      {
        slug: "chart",
        name: "Chart",
        component: ChartExample,
        icon: Analytics01Icon,
      },
      {
        slug: "calendar",
        name: "Calendar",
        component: CalendarExample,
        icon: Calendar03Icon,
      },
      {
        slug: "avatar",
        name: "Avatar",
        component: AvatarExample,
        icon: UserCircleIcon,
      },
      {
        slug: "card",
        name: "Card",
        component: CardExample,
        icon: Layers01Icon,
      },
      {
        slug: "item",
        name: "Item",
        component: ItemExample,
        icon: ListViewIcon,
        favorite: true,
      },
    ],
  },
  {
    title: "Display",
    icon: Layout01Icon,
    iconBg: "bg-orange-500/5",
    textColor: "text-orange-500",
    borderColor: "border-orange-200/10",
    type: "ui",
    examples: [
      {
        slug: "separator",
        name: "Separator",
        component: SeparatorExample,
        icon: SolidLine01Icon,
      },
      {
        slug: "aspect-ratio",
        name: "Aspect Ratio",
        component: AspectRatioExample,
        icon: CropIcon,
      },
      {
        slug: "scroll-area",
        name: "Scroll Area",
        component: ScrollAreaExample,
        icon: Mouse01Icon,
      },
      {
        slug: "accordion",
        name: "Accordion",
        component: AccordionExample,
        icon: ArrowExpand01Icon,
      },
      {
        slug: "collapsible",
        name: "Collapsible",
        component: CollapsibleExample,
        icon: Minimize01Icon,
      },
      {
        slug: "carousel",
        name: "Carousel",
        component: CarouselExample,
        icon: CarouselHorizontalIcon,
      },
      {
        slug: "resizable",
        name: "Resizable",
        component: ResizableExample,
        icon: Resize01Icon,
      },
      {
        slug: "direction",
        name: "Direction",
        component: DirectionExample,
        icon: ArrowLeftRightIcon,
      },
    ],
  },
  {
    title: "Chat",
    icon: Chatting01Icon,
    iconBg: "bg-pink-500/5",
    textColor: "text-pink-500",
    borderColor: "border-pink-200/10",
    type: "ui",
        examples: [
      {
        slug: "attachment",
        name: "Attachment",
        component: AttachmentExample,
        icon: Attachment01Icon,
        favorite: true,
      },
      {
        slug: "message",
        name: "Message",
        component: MessageExample,
        icon: Message01Icon,
        favorite: true,
      },
      {
        slug: "message-scroller",
        name: "Message Scroller",
        component: MessageScrollerExample,
        icon: SwipeDown01Icon,
      },
      {
        slug: "bubble",
        name: "Bubble",
        component: BubbleExample,
        icon: BubbleChatIcon,
      },
      {
        slug: "marker",
        name: "Marker",
        component: MarkerExample,
        icon: HighlighterIcon,
        favorite: true,
      },
      {
        slug: "questionnaire",
        name: "Questionnaire",
        component: QuestionnaireExample,
        icon: CheckListIcon,
      },
      {
        slug: "open-in-chat",
        name: "Open in Chat",
        component: OpenInChatExample,
        icon: Chatting01Icon,
      },
      {
        slug: "context",
        name: "Context",
        component: ContextExample,
        icon: Progress02Icon,
      },
      {
        slug: "message-input",
        name: "Message Input",
        component: MessageInputExample,
        icon: SentIcon,
      },
      {
        slug: "approval-menu",
        name: "Approval Menu",
        component: ApprovalMenuExample,
        icon: HandIcon,
      },
      {
        slug: "confirmation",
        name: "Confirmation",
        component: ConfirmationExample,
        icon: CheckmarkCircle02Icon,
      },
      {
        slug: "queue",
        name: "Queue",
        component: QueueExample,
        icon: QueueIcon,
      },
      {
        slug: "add-menu",
        name: "Add Menu",
        component: AddMenuExample,
        icon: AddIcon,
      },
      {
        slug: "tool", 
        name: "Tool",
        component: ToolExample,
        icon: Wrench01Icon,
      },
          /*   {
        slug: "prompt-input",
        name: "Prompt Input",
        component: PromptInputExample,
        icon: Chatting01Icon,
      },*/
    ],
  },
  {
    title: "Code",
    icon: CodeSquareIcon,
    iconBg: "bg-purple-500/5",
    textColor: "text-purple-500",
    borderColor: "border-purple-200/10",
    type: "component",
    examples: [
      {
        slug: "code-block",
        name: "Code Block",
        component: CodeBlockExample,
        icon: CodeSquareIcon,
      },
      {
        slug: "code-language-selector",
        name: "Code Language Selector",
        component: CodeLanguageSelectorExample,
        icon: Sorting01Icon,
      },
      {
        slug: "file-tree",
        name: "File Tree",
        component: FileTreeExample,
        icon: Folder01Icon,
      },
      {
        slug: "environment-variables",
        name: "Environment Variables",
        component: EnvironmentVariablesExample,
        icon: Key01Icon,
      },
      {
        slug: "terminal",
        name: "Terminal",
        component: TerminalExample,
        icon: TerminalIcon,
      },
      {
        slug: "stack-trace",
        name: "Stack Trace",
        component: StackTraceExample,
        icon: Bug01Icon,
      },
      {
        slug: "snippet",
        name: "Snippet",
        component: SnippetExample,
        icon: CodeSquareIcon,
      },
      {
        slug: "artifact",
        name: "Artifact",
        component: ArtifactExample,
        icon: Doc01Icon,
      },
      {
        slug: "commit",
        name: "Commit",
        component: CommitExample,
        icon: GitBranchIcon,
      },
      {
        slug: "jsx-preview",
        name: "JSX Preview",
        component: JsxPreviewExample,
        icon: AppWindowIcon,
      },
      {
        slug: "package-info",
        name: "Package Info",
        component: PackageInfoExample,
        icon: Layers01Icon,
      },
      {
        slug: "schema-display",
        name: "Schema Display",
        component: SchemaDisplayExample,
        icon: ThirdBracketIcon,
      },
      {
        slug: "test-results",
        name: "Test Results",
        component: TestResultsExample,
        icon: TestTubeIcon,
      },
    ],
  },
  {
    title: "Locale",
    icon: GlobalIcon,
    iconBg: "bg-green-500/5",
    textColor: "text-green-500",
    borderColor: "border-green-200/10",
    type: "component",
    examples: [
      {
        slug: "countries-select",
        name: "Countries Select",
        component: CountriesSelectExample,
        icon: GlobalIcon,
      },
      {
        slug: "language-selector",
        name: "Language Selector",
        component: LanguageSelectorExample,
        icon: TranslateIcon,
      },
      {
        slug: "date-picker",
        name: "Date Picker",
        component: DatePickerExample,
        icon: Calendar03Icon,
      },
      {
        slug: "time-picker",
        name: "Time Picker",
        component: TimePickerExample,
        icon: Clock01Icon,
      },
    ],
  },
  {
    title: "Web",
    icon: BrowserIcon,
    iconBg: "bg-fuchsia-500/5",
    textColor: "text-fuchsia-500",
    borderColor: "border-fuchsia-200/10",
    type: "component",
    examples: [
      {
        slug: "web-preview",
        name: "Web Preview",
        component: WebPreviewExample,
        icon: BrowserIcon,
      },
    ],
  },
  {
    title: "Audio",
    icon: AudioLinesIcon,
    iconBg: "bg-rose-500/5",
    textColor: "text-rose-500",
    borderColor: "border-rose-200/10",
    type: "component",
    examples: [
      {
        slug: "mic-selector",
        name: "Mic Selector",
        component: MicSelectorExample,
        icon: Mic02Icon,
      },
      {
        slug: "audio-player",
        name: "Audio Player",
        component: AudioPlayerExample,
        icon: PauseIcon,
      },
      {
        slug: "orb",
        name: "Orb",
        component: OrbExample,
        icon: Orbit01Icon,
      },
    ],
  },
  {
    title: "Auth",
    icon: CircleLock01Icon,
    iconBg: "bg-indigo-500/5",
    textColor: "text-indigo-500",
    borderColor: "border-indigo-200/10",
    type: "component",
    examples: [
      {
        slug: "login-form",
        name: "Login Form",
        component: LoginFormExample,
        icon: LoginIcon,
      },
    ],
  },
  {
    title: "Models",
    icon: Brain01Icon,
    iconBg: "bg-orange-500/5",
    textColor: "text-orange-500",
    borderColor: "border-orange-200/10",
    type: "component",
    examples: [
      {
        slug: "rate-limits",
        name: "Rate Limits",
        component: RateLimitsExample,
        icon: LimitationIcon,
      },
      {
        slug: "model-selector",
        name: "Model Selector",
        component: ModelSelectorExample,
        icon: BotIcon,
      },
      {
        slug: "model-picker",
        name: "Model Picker",
        component: ModelPickerExample,
        icon: CpuIcon,
      },
    ],
  },
]

/** Category metadata keyed by title, for looking up from a flat example. */
export const categoryByTitle: Record<string, ExampleCategory> =
  Object.fromEntries(
    exampleCategories.map((category) => [category.title, category])
  )

/** Every example in display order, annotated with category and source file. */
export const allExamples: FlatExample[] = exampleCategories.flatMap(
  (category) =>
    category.examples.map((example) => ({
      ...example,
      categoryTitle: category.title,
      file: exampleFilePath(example.slug),
    }))
)
