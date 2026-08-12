/**
 * Categories for the icon registry in icons.tsx. Every icon is assigned to
 * exactly one category via its `category` field.
 */
export const iconCategories = [
  { id: "actions", label: "Actions" },
  { id: "arrows", label: "Arrows & Navigation" },
  { id: "commerce", label: "Commerce" },
  { id: "communication", label: "Communication" },
  { id: "data", label: "Data" },
  { id: "forms", label: "Forms" },
  { id: "interface", label: "Interface" },
  { id: "layout", label: "Layout" },
  { id: "media", label: "Media & Design" },
  { id: "status", label: "Status & Feedback" },
  { id: "code", label: "Code" },
  { id: "emojis", label: "Emojis" },
] as const

export type IconCategoryId = (typeof iconCategories)[number]["id"]
