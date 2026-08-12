import { Icons, type IconData } from "@/icons/icons"

/** Workflow state of an example, from concept to final. */
export type ExampleStatus =
  | "idea"
  | "planned"
  | "building"
  | "reviewing"
  | "shipped"

export interface ExampleStatusMeta {
  id: ExampleStatus
  label: string
  description: string
  /** Hugeicons glyph for menus, badges, and status indicators. */
  icon: IconData
  /** Solid Tailwind background for bar segments and plain dots. */
  color: string
  /** Soft tinted background for icon chips (`bg-*-500/5`). */
  iconBg: string
  /** Tailwind text class so the status dot/icon can render via currentColor. */
  textColor: string
}

/** Workflow states in order, first to last. */
export const exampleStatuses: ExampleStatusMeta[] = [
  {
    id: "idea",
    label: "Idea",
    description: "Captured as a concept — no draft exists yet.",
    icon: Icons.note,
    color: "bg-muted-foreground",
    iconBg: "bg-muted-foreground/5",
    textColor: "text-muted-foreground",
  },
  {
    id: "planned",
    label: "Planned",
    description: "Has a generated draft, queued for real work.",
    icon: Icons.checkList,
    color: "bg-amber-500",
    iconBg: "bg-amber-500/5",
    textColor: "text-amber-500",
  },
  {
    id: "building",
    label: "Building",
    description: "Actively being designed and edited.",
    icon: Icons.edit,
    color: "bg-violet-500",
    iconBg: "bg-violet-500/5",
    textColor: "text-violet-500",
  },
  {
    id: "reviewing",
    label: "Reviewing",
    description: "Work finished — awaiting a review pass.",
    icon: Icons.searchList,
    color: "bg-blue-500",
    iconBg: "bg-blue-500/5",
    textColor: "text-blue-500",
  },
  {
    id: "shipped",
    label: "Shipped",
    description: "Reviewed and final.",
    icon: Icons.check,
    color: "bg-emerald-500",
    iconBg: "bg-emerald-500/5",
    textColor: "text-emerald-500",
  },
]

export const statusMeta = Object.fromEntries(
  exampleStatuses.map((status) => [status.id, status])
) as Record<ExampleStatus, ExampleStatusMeta>
