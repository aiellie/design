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
import { BadgeExample } from "@/examples/ui/badge"
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
import { SidebarExample } from "@/examples/ui/sidebar"
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
import { Icons, type IconData } from "@/icons/icons"

import type { ExampleStatus } from "./status"

export type { ExampleStatus }

export interface ComponentExample {
  /** Matches the file name in components/ui and examples/ui. */
  slug: string
  name: string
  component: React.ComponentType
  icon: IconData
}

export interface ExampleCategory {
  title: string
  examples: ComponentExample[]
}

export interface FlatExample extends ComponentExample {
  /** Title of the category this example belongs to. */
  categoryTitle: string
  /** Repo-relative path of the example's source file. */
  file: string
  /** Class name for the example container. */
  className?: string
}

/** Repo-relative source path for an example slug. */
export function exampleFilePath(slug: string): string {
  if (slug === "colors") return "examples/styles/colors.tsx"
  if (slug === "typeset") return "examples/styles/typeset.tsx"
  if (slug === "icons") return "examples/icons/icons.tsx"
  return `examples/ui/${slug}.tsx`
}

export const exampleCategories: ExampleCategory[] = [
  {
    title: "Foundations",
    examples: [
      {
        slug: "colors",
        name: "Colors",
        component: ColorsExample,
        icon: Icons.colors,
      },
      {
        slug: "typeset",
        name: "Typeset",
        component: TypesetExample,
        icon: Icons.text,
      },
      {
        slug: "icons",
        name: "Icons",
        component: IconsExample,
        icon: Icons.grid,
      },
    ],
  },
  {
    title: "Actions",
    examples: [
      {
        slug: "button",
        name: "Button",
        component: ButtonExample,
        icon: Icons.cursorPointer,
      },
      {
        slug: "button-group",
        name: "Button Group",
        component: ButtonGroupExample,
        icon: Icons.layout,
      },
      {
        slug: "toggle",
        name: "Toggle",
        component: ToggleExample,
        icon: Icons.toggleOn,
      },
      {
        slug: "toggle-group",
        name: "Toggle Group",
        component: ToggleGroupExample,
        icon: Icons.tap,
      },
      {
        slug: "badge",
        name: "Badge",
        component: BadgeExample,
        icon: Icons.tag,
      },
      {
        slug: "kbd",
        name: "Kbd",
        component: KbdExample,
        icon: Icons.keyboard,
      },
    ],
  },
  {
    title: "Forms & Input",
    examples: [
      {
        slug: "input",
        name: "Input",
        component: InputExample,
        icon: Icons.edit,
      },
      {
        slug: "textarea",
        name: "Textarea",
        component: TextareaExample,
        icon: Icons.textSquare,
      },
      {
        slug: "label",
        name: "Label",
        component: LabelExample,
        icon: Icons.textFont,
      },
      {
        slug: "field",
        name: "Field",
        component: FieldExample,
        icon: Icons.note,
      },
      {
        slug: "input-group",
        name: "Input Group",
        component: InputGroupExample,
        icon: Icons.rowInsert,
      },
      {
        slug: "input-otp",
        name: "Input OTP",
        component: InputOtpExample,
        icon: Icons.squareLock,
      },
      {
        slug: "native-select",
        name: "Native Select",
        component: NativeSelectExample,
        icon: Icons.sorting,
      },
      {
        slug: "select",
        name: "Select",
        component: SelectExample,
        icon: Icons.chevronDown,
      },
      {
        slug: "combobox",
        name: "Combobox",
        component: ComboboxExample,
        icon: Icons.searchList,
      },
      {
        slug: "checkbox",
        name: "Checkbox",
        component: CheckboxExample,
        icon: Icons.checkmarkSquare,
      },
      {
        slug: "radio-group",
        name: "Radio Group",
        component: RadioGroupExample,
        icon: Icons.radioButton,
      },
      {
        slug: "switch",
        name: "Switch",
        component: SwitchExample,
        icon: Icons.toggleOff,
      },
      {
        slug: "slider",
        name: "Slider",
        component: SliderExample,
        icon: Icons.slidersHorizontal,
      },
      {
        slug: "calendar",
        name: "Calendar",
        component: CalendarExample,
        icon: Icons.calendar,
      },
    ],
  },
  {
    title: "Overlays",
    examples: [
      {
        slug: "dialog",
        name: "Dialog",
        component: DialogExample,
        icon: Icons.appWindow,
      },
      {
        slug: "alert-dialog",
        name: "Alert Dialog",
        component: AlertDialogExample,
        icon: Icons.helpSquare,
      },
      {
        slug: "sheet",
        name: "Sheet",
        component: SheetExample,
        icon: Icons.sidebarRight,
      },
      {
        slug: "drawer",
        name: "Drawer",
        component: DrawerExample,
        icon: Icons.sidebarBottom,
      },
      {
        slug: "popover",
        name: "Popover",
        component: PopoverExample,
        icon: Icons.comment,
      },
      {
        slug: "hover-card",
        name: "Hover Card",
        component: HoverCardExample,
        icon: Icons.helpCircle,
      },
      {
        slug: "tooltip",
        name: "Tooltip",
        component: TooltipExample,
        icon: Icons.infoCircle,
      },
    ],
  },
  {
    title: "Menus & Navigation",
    examples: [
      {
        slug: "dropdown-menu",
        name: "Dropdown Menu",
        component: DropdownMenuExample,
        icon: Icons.menu,
      },
      {
        slug: "context-menu",
        name: "Context Menu",
        component: ContextMenuExample,
        icon: Icons.mouseRightClick,
      },
      {
        slug: "menubar",
        name: "Menubar",
        component: MenubarExample,
        icon: Icons.appWindowMac,
      },
      {
        slug: "navigation-menu",
        name: "Navigation Menu",
        component: NavigationMenuExample,
        icon: Icons.navigation,
      },
      {
        slug: "command",
        name: "Command",
        component: CommandExample,
        icon: Icons.command,
      },
      {
        slug: "breadcrumb",
        name: "Breadcrumb",
        component: BreadcrumbExample,
        icon: Icons.route,
      },
      {
        slug: "pagination",
        name: "Pagination",
        component: PaginationExample,
        icon: Icons.listNumber,
      },
      {
        slug: "tabs",
        name: "Tabs",
        component: TabsExample,
        icon: Icons.browser,
      },
      {
        slug: "sidebar",
        name: "Sidebar",
        component: SidebarExample,
        icon: Icons.sidebarLeft,
      },
    ],
  },
  {
    title: "Status",
    examples: [
      {
        slug: "alert",
        name: "Alert",
        component: AlertExample,
        icon: Icons.alert,
      },
      {
        slug: "toast",
        name: "Toast",
        component: ToastExample,
        icon: Icons.notification,
      },
      {
        slug: "progress",
        name: "Progress",
        component: ProgressExample,
        icon: Icons.progress,
      },
      {
        slug: "skeleton",
        name: "Skeleton",
        component: SkeletonExample,
        icon: Icons.blur,
      },
      {
        slug: "spinner",
        name: "Spinner",
        component: SpinnerExample,
        icon: Icons.loading,
      },
      {
        slug: "empty",
        name: "Empty",
        component: EmptyExample,
        icon: Icons.inbox,
      },
    ],
  },
  {
    title: "Data Display",
    examples: [
      {
        slug: "table",
        name: "Table",
        component: TableExample,
        icon: Icons.table,
      },
      {
        slug: "chart",
        name: "Chart",
        component: ChartExample,
        icon: Icons.analytics,
      },
      {
        slug: "avatar",
        name: "Avatar",
        component: AvatarExample,
        icon: Icons.userCircle,
      },
      {
        slug: "card",
        name: "Card",
        component: CardExample,
        icon: Icons.layers,
      },
      {
        slug: "item",
        name: "Item",
        component: ItemExample,
        icon: Icons.listView,
      },
      {
        slug: "separator",
        name: "Separator",
        component: SeparatorExample,
        icon: Icons.solidLine,
      },
      {
        slug: "aspect-ratio",
        name: "Aspect Ratio",
        component: AspectRatioExample,
        icon: Icons.crop,
      },
      {
        slug: "scroll-area",
        name: "Scroll Area",
        component: ScrollAreaExample,
        icon: Icons.mouse,
      },
      {
        slug: "accordion",
        name: "Accordion",
        component: AccordionExample,
        icon: Icons.arrowExpand,
      },
      {
        slug: "collapsible",
        name: "Collapsible",
        component: CollapsibleExample,
        icon: Icons.minimize,
      },
      {
        slug: "carousel",
        name: "Carousel",
        component: CarouselExample,
        icon: Icons.carouselHorizontal,
      },
      {
        slug: "resizable",
        name: "Resizable",
        component: ResizableExample,
        icon: Icons.resize,
      },
    ],
  },
  {
    title: "Chat",
    examples: [
      {
        slug: "message",
        name: "Message",
        component: MessageExample,
        icon: Icons.message,
      },
      {
        slug: "message-scroller",
        name: "Message Scroller",
        component: MessageScrollerExample,
        icon: Icons.chatting,
      },
      {
        slug: "bubble",
        name: "Bubble",
        component: BubbleExample,
        icon: Icons.bubbleChat,
      },
      {
        slug: "attachment",
        name: "Attachment",
        component: AttachmentExample,
        icon: Icons.attachment,
      },
      {
        slug: "marker",
        name: "Marker",
        component: MarkerExample,
        icon: Icons.highlighter,
      },
      {
        slug: "questionnaire",
        name: "Questionnaire",
        component: QuestionnaireExample,
        icon: Icons.checkList,
      },
      {
        slug: "direction",
        name: "Direction",
        component: DirectionExample,
        icon: Icons.arrowLeftRight,
      },
    ],
  },
]

/** Every example in display order, annotated with category and source file. */
export const allExamples: FlatExample[] = exampleCategories.flatMap(
  (category) =>
    category.examples.map((example) => ({
      ...example,
      categoryTitle: category.title,
      file: exampleFilePath(example.slug),
    }))
)
