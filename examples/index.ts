import type * as React from "react"

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

export interface ComponentExample {
  /** Matches the file name in components/ui and examples/ui. */
  slug: string
  name: string
  component: React.ComponentType
}

export interface ExampleCategory {
  title: string
  examples: ComponentExample[]
}

export const exampleCategories: ExampleCategory[] = [
  {
    title: "Buttons & Actions",
    examples: [
      { slug: "button", name: "Button", component: ButtonExample },
      {
        slug: "button-group",
        name: "Button Group",
        component: ButtonGroupExample,
      },
      { slug: "toggle", name: "Toggle", component: ToggleExample },
      {
        slug: "toggle-group",
        name: "Toggle Group",
        component: ToggleGroupExample,
      },
      { slug: "badge", name: "Badge", component: BadgeExample },
      { slug: "kbd", name: "Kbd", component: KbdExample },
    ],
  },
  {
    title: "Forms & Input",
    examples: [
      { slug: "input", name: "Input", component: InputExample },
      { slug: "textarea", name: "Textarea", component: TextareaExample },
      { slug: "label", name: "Label", component: LabelExample },
      { slug: "field", name: "Field", component: FieldExample },
      { slug: "input-group", name: "Input Group", component: InputGroupExample },
      { slug: "input-otp", name: "Input OTP", component: InputOtpExample },
      {
        slug: "native-select",
        name: "Native Select",
        component: NativeSelectExample,
      },
      { slug: "select", name: "Select", component: SelectExample },
      { slug: "combobox", name: "Combobox", component: ComboboxExample },
      { slug: "checkbox", name: "Checkbox", component: CheckboxExample },
      { slug: "radio-group", name: "Radio Group", component: RadioGroupExample },
      { slug: "switch", name: "Switch", component: SwitchExample },
      { slug: "slider", name: "Slider", component: SliderExample },
      { slug: "calendar", name: "Calendar", component: CalendarExample },
    ],
  },
  {
    title: "Overlays",
    examples: [
      { slug: "dialog", name: "Dialog", component: DialogExample },
      {
        slug: "alert-dialog",
        name: "Alert Dialog",
        component: AlertDialogExample,
      },
      { slug: "sheet", name: "Sheet", component: SheetExample },
      { slug: "drawer", name: "Drawer", component: DrawerExample },
      { slug: "popover", name: "Popover", component: PopoverExample },
      { slug: "hover-card", name: "Hover Card", component: HoverCardExample },
      { slug: "tooltip", name: "Tooltip", component: TooltipExample },
    ],
  },
  {
    title: "Menus & Navigation",
    examples: [
      {
        slug: "dropdown-menu",
        name: "Dropdown Menu",
        component: DropdownMenuExample,
      },
      {
        slug: "context-menu",
        name: "Context Menu",
        component: ContextMenuExample,
      },
      { slug: "menubar", name: "Menubar", component: MenubarExample },
      {
        slug: "navigation-menu",
        name: "Navigation Menu",
        component: NavigationMenuExample,
      },
      { slug: "command", name: "Command", component: CommandExample },
      { slug: "breadcrumb", name: "Breadcrumb", component: BreadcrumbExample },
      { slug: "pagination", name: "Pagination", component: PaginationExample },
      { slug: "tabs", name: "Tabs", component: TabsExample },
      { slug: "sidebar", name: "Sidebar", component: SidebarExample },
    ],
  },
  {
    title: "Feedback & Status",
    examples: [
      { slug: "alert", name: "Alert", component: AlertExample },
      { slug: "toast", name: "Toast", component: ToastExample },
      { slug: "sonner", name: "Sonner", component: SonnerExample },
      { slug: "progress", name: "Progress", component: ProgressExample },
      { slug: "skeleton", name: "Skeleton", component: SkeletonExample },
      { slug: "spinner", name: "Spinner", component: SpinnerExample },
      { slug: "empty", name: "Empty", component: EmptyExample },
    ],
  },
  {
    title: "Data Display",
    examples: [
      { slug: "table", name: "Table", component: TableExample },
      { slug: "chart", name: "Chart", component: ChartExample },
      { slug: "avatar", name: "Avatar", component: AvatarExample },
      { slug: "card", name: "Card", component: CardExample },
      { slug: "item", name: "Item", component: ItemExample },
      { slug: "separator", name: "Separator", component: SeparatorExample },
      {
        slug: "aspect-ratio",
        name: "Aspect Ratio",
        component: AspectRatioExample,
      },
      { slug: "scroll-area", name: "Scroll Area", component: ScrollAreaExample },
      { slug: "accordion", name: "Accordion", component: AccordionExample },
      { slug: "collapsible", name: "Collapsible", component: CollapsibleExample },
      { slug: "carousel", name: "Carousel", component: CarouselExample },
      { slug: "resizable", name: "Resizable", component: ResizableExample },
    ],
  },
  {
    title: "Chat & AI",
    examples: [
      { slug: "message", name: "Message", component: MessageExample },
      {
        slug: "message-scroller",
        name: "Message Scroller",
        component: MessageScrollerExample,
      },
      { slug: "bubble", name: "Bubble", component: BubbleExample },
      { slug: "attachment", name: "Attachment", component: AttachmentExample },
      { slug: "marker", name: "Marker", component: MarkerExample },
      {
        slug: "questionnaire",
        name: "Questionnaire",
        component: QuestionnaireExample,
      },
      { slug: "direction", name: "Direction", component: DirectionExample },
    ],
  },
]
