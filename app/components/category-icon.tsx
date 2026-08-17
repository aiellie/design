import type { ExampleCategory } from "@/examples"
import { Icon } from "@/icons/icons"
import { cn } from "@/lib/utils"

/** Tinted chip carrying a category's icon and hue. */
export function CategoryIcon({
  category,
  className,
}: {
  category: ExampleCategory
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-md border",
        category.iconBg,
        category.textColor,
        category.borderColor,
        className
      )}
      aria-hidden
    >
      <Icon
        icon={category.icon}
        className="size-3.5 text-current hover:text-current"
      />
    </span>
  )
}
