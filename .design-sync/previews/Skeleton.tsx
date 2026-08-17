// Skeleton preview — repo showcase from examples/ui/skeleton.tsx, plus a
// primitive shape sweep and the repo's own card/table placeholders.
import { Skeleton } from "@/components/ui/skeleton"

export {
  SkeletonExample as Showcase,
  SkeletonCard as CardPlaceholder,
  SkeletonTable as TablePlaceholder,
} from "@/examples/ui/skeleton"

export function Shapes() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Skeleton className="size-12 rounded-full" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-8 w-24 rounded-lg" />
      <Skeleton className="h-12 w-20 rounded-xl" />
    </div>
  )
}
