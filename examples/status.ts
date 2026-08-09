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
  /** Tailwind background class for the status dot and bar segments. */
  color: string
}

/** Workflow states in order, first to last. */
export const exampleStatuses: ExampleStatusMeta[] = [
  {
    id: "idea",
    label: "Idea",
    description: "Captured as a concept — no draft exists yet.",
    color: "bg-muted-foreground",
  },
  {
    id: "planned",
    label: "Planned",
    description: "Has a generated draft, queued for real work.",
    color: "bg-violet-500",
  },
  {
    id: "building",
    label: "Building",
    description: "Actively being designed and edited.",
    color: "bg-amber-500",
  },
  {
    id: "reviewing",
    label: "Reviewing",
    description: "Work finished — awaiting a review pass.",
    color: "bg-blue-500",
  },
  {
    id: "shipped",
    label: "Shipped",
    description: "Reviewed and final.",
    color: "bg-emerald-500",
  },
]

export const statusMeta = Object.fromEntries(
  exampleStatuses.map((status) => [status.id, status])
) as Record<ExampleStatus, ExampleStatusMeta>
