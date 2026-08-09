import type * as React from "react"

import { IconsExample } from "@/examples/icons/icons"
import { ColorsExample } from "@/examples/styles/colors"
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
import { SonnerExample } from "@/examples/ui/sonner"
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

/** Review workflow state for an example. */
export type ExampleStatus = "initial" | "editing" | "reviewing" | "approved"

export interface ComponentExample {
  /** Matches the file name in components/ui and examples/ui. */
  slug: string
  name: string
  component: React.ComponentType
  icon: IconData
  status: ExampleStatus
}

export interface ExampleCategory {
  title: string
  examples: ComponentExample[]
}

export const exampleCategories: ExampleCategory[] = [
  {
    title: "Foundations",
    examples: [
      {
        slug: "colors",
        name: "Colors",
        component: ColorsExample,
        icon: Icons.paintBoard,
        status: "initial",
      },
      {
        slug: "icons",
        name: "Icons",
        component: IconsExample,
        icon: Icons.grid,
        status: "initial",
      },
    ],
  },
  {
    title: "Buttons & Actions",
    examples: [
      {
        slug: "button",
        name: "Button",
        component: ButtonExample,
        icon: Icons.cursorPointer,
        status: "initial",
      },
      {
        slug: "button-group",
        name: "Button Group",
        component: ButtonGroupExample,
        icon: Icons.layout,
        status: "initial",
      },
      {
        slug: "toggle",
        name: "Toggle",
        component: ToggleExample,
        icon: Icons.toggleOn,
        status: "initial",
      },
      {
        slug: "toggle-group",
        name: "Toggle Group",
        component: ToggleGroupExample,
        icon: Icons.tap,
        status: "initial",
      },
      {
        slug: "badge",
        name: "Badge",
        component: BadgeExample,
        icon: Icons.tag,
        status: "initial",
      },
      {
        slug: "kbd",
        name: "Kbd",
        component: KbdExample,
        icon: Icons.keyboard,
        status: "initial",
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
        status: "initial",
      },
      {
        slug: "textarea",
        name: "Textarea",
        component: TextareaExample,
        icon: Icons.textSquare,
        status: "initial",
      },
      {
        slug: "label",
        name: "Label",
        component: LabelExample,
        icon: Icons.textFont,
        status: "initial",
      },
      {
        slug: "field",
        name: "Field",
        component: FieldExample,
        icon: Icons.note,
        status: "initial",
      },
      {
        slug: "input-group",
        name: "Input Group",
        component: InputGroupExample,
        icon: Icons.rowInsert,
        status: "initial",
      },
      {
        slug: "input-otp",
        name: "Input OTP",
        component: InputOtpExample,
        icon: Icons.squareLock,
        status: "initial",
      },
      {
        slug: "native-select",
        name: "Native Select",
        component: NativeSelectExample,
        icon: Icons.sorting,
        status: "initial",
      },
      {
        slug: "select",
        name: "Select",
        component: SelectExample,
        icon: Icons.unfoldMore,
        status: "initial",
      },
      {
        slug: "combobox",
        name: "Combobox",
        component: ComboboxExample,
        icon: Icons.searchList,
        status: "initial",
      },
      {
        slug: "checkbox",
        name: "Checkbox",
        component: CheckboxExample,
        icon: Icons.checkmarkSquare,
        status: "initial",
      },
      {
        slug: "radio-group",
        name: "Radio Group",
        component: RadioGroupExample,
        icon: Icons.radioButton,
        status: "initial",
      },
      {
        slug: "switch",
        name: "Switch",
        component: SwitchExample,
        icon: Icons.toggleOff,
        status: "initial",
      },
      {
        slug: "slider",
        name: "Slider",
        component: SliderExample,
        icon: Icons.slidersHorizontal,
        status: "initial",
      },
      {
        slug: "calendar",
        name: "Calendar",
        component: CalendarExample,
        icon: Icons.calendar,
        status: "initial",
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
        status: "initial",
      },
      {
        slug: "alert-dialog",
        name: "Alert Dialog",
        component: AlertDialogExample,
        icon: Icons.helpSquare,
        status: "initial",
      },
      {
        slug: "sheet",
        name: "Sheet",
        component: SheetExample,
        icon: Icons.sidebarRight,
        status: "initial",
      },
      {
        slug: "drawer",
        name: "Drawer",
        component: DrawerExample,
        icon: Icons.sidebarBottom,
        status: "initial",
      },
      {
        slug: "popover",
        name: "Popover",
        component: PopoverExample,
        icon: Icons.comment,
        status: "initial",
      },
      {
        slug: "hover-card",
        name: "Hover Card",
        component: HoverCardExample,
        icon: Icons.helpCircle,
        status: "initial",
      },
      {
        slug: "tooltip",
        name: "Tooltip",
        component: TooltipExample,
        icon: Icons.infoCircle,
        status: "initial",
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
        status: "initial",
      },
      {
        slug: "context-menu",
        name: "Context Menu",
        component: ContextMenuExample,
        icon: Icons.mouseRightClick,
        status: "initial",
      },
      {
        slug: "menubar",
        name: "Menubar",
        component: MenubarExample,
        icon: Icons.appWindowMac,
        status: "initial",
      },
      {
        slug: "navigation-menu",
        name: "Navigation Menu",
        component: NavigationMenuExample,
        icon: Icons.navigation,
        status: "initial",
      },
      {
        slug: "command",
        name: "Command",
        component: CommandExample,
        icon: Icons.command,
        status: "initial",
      },
      {
        slug: "breadcrumb",
        name: "Breadcrumb",
        component: BreadcrumbExample,
        icon: Icons.route,
        status: "initial",
      },
      {
        slug: "pagination",
        name: "Pagination",
        component: PaginationExample,
        icon: Icons.listNumber,
        status: "initial",
      },
      {
        slug: "tabs",
        name: "Tabs",
        component: TabsExample,
        icon: Icons.browser,
        status: "initial",
      },
      {
        slug: "sidebar",
        name: "Sidebar",
        component: SidebarExample,
        icon: Icons.sidebarLeft,
        status: "initial",
      },
    ],
  },
  {
    title: "Feedback & Status",
    examples: [
      {
        slug: "alert",
        name: "Alert",
        component: AlertExample,
        icon: Icons.alert,
        status: "initial",
      },
      {
        slug: "toast",
        name: "Toast",
        component: ToastExample,
        icon: Icons.notification,
        status: "initial",
      },
      {
        slug: "sonner",
        name: "Sonner",
        component: SonnerExample,
        icon: Icons.sent,
        status: "initial",
      },
      {
        slug: "progress",
        name: "Progress",
        component: ProgressExample,
        icon: Icons.progress,
        status: "initial",
      },
      {
        slug: "skeleton",
        name: "Skeleton",
        component: SkeletonExample,
        icon: Icons.blur,
        status: "initial",
      },
      {
        slug: "spinner",
        name: "Spinner",
        component: SpinnerExample,
        icon: Icons.loading,
        status: "initial",
      },
      {
        slug: "empty",
        name: "Empty",
        component: EmptyExample,
        icon: Icons.inbox,
        status: "initial",
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
        status: "initial",
      },
      {
        slug: "chart",
        name: "Chart",
        component: ChartExample,
        icon: Icons.analytics,
        status: "initial",
      },
      {
        slug: "avatar",
        name: "Avatar",
        component: AvatarExample,
        icon: Icons.userCircle,
        status: "initial",
      },
      {
        slug: "card",
        name: "Card",
        component: CardExample,
        icon: Icons.layers,
        status: "initial",
      },
      {
        slug: "item",
        name: "Item",
        component: ItemExample,
        icon: Icons.listView,
        status: "initial",
      },
      {
        slug: "separator",
        name: "Separator",
        component: SeparatorExample,
        icon: Icons.solidLine,
        status: "initial",
      },
      {
        slug: "aspect-ratio",
        name: "Aspect Ratio",
        component: AspectRatioExample,
        icon: Icons.crop,
        status: "initial",
      },
      {
        slug: "scroll-area",
        name: "Scroll Area",
        component: ScrollAreaExample,
        icon: Icons.mouse,
        status: "initial",
      },
      {
        slug: "accordion",
        name: "Accordion",
        component: AccordionExample,
        icon: Icons.arrowExpand,
        status: "initial",
      },
      {
        slug: "collapsible",
        name: "Collapsible",
        component: CollapsibleExample,
        icon: Icons.minimize,
        status: "initial",
      },
      {
        slug: "carousel",
        name: "Carousel",
        component: CarouselExample,
        icon: Icons.carouselHorizontal,
        status: "initial",
      },
      {
        slug: "resizable",
        name: "Resizable",
        component: ResizableExample,
        icon: Icons.resize,
        status: "initial",
      },
    ],
  },
  {
    title: "Chat & AI",
    examples: [
      {
        slug: "message",
        name: "Message",
        component: MessageExample,
        icon: Icons.message,
        status: "initial",
      },
      {
        slug: "message-scroller",
        name: "Message Scroller",
        component: MessageScrollerExample,
        icon: Icons.chatting,
        status: "initial",
      },
      {
        slug: "bubble",
        name: "Bubble",
        component: BubbleExample,
        icon: Icons.bubbleChat,
        status: "initial",
      },
      {
        slug: "attachment",
        name: "Attachment",
        component: AttachmentExample,
        icon: Icons.attachment,
        status: "initial",
      },
      {
        slug: "marker",
        name: "Marker",
        component: MarkerExample,
        icon: Icons.highlighter,
        status: "initial",
      },
      {
        slug: "questionnaire",
        name: "Questionnaire",
        component: QuestionnaireExample,
        icon: Icons.checkList,
        status: "initial",
      },
      {
        slug: "direction",
        name: "Direction",
        component: DirectionExample,
        icon: Icons.arrowLeftRight,
        status: "initial",
      },
    ],
  },
]
