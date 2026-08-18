import { Icons } from "./icons"

/**
 * Categories for the icon registry in icons.tsx. Every icon is assigned to
 * exactly one category via its `category` field.
 */
export const iconCategories = [
  { id: "actions", label: "Actions", icon: Icons.plus },
  { id: "arrows", label: "Arrows & Navigation", icon: Icons.navigation },
  { id: "commerce", label: "Commerce", icon: Icons.shoppingBag },
  { id: "communication", label: "Communication", icon: Icons.message },
  { id: "data", label: "Data", icon: Icons.analytics },
  { id: "forms", label: "Forms", icon: Icons.edit },
  { id: "interface", label: "Interface", icon: Icons.cursorPointer },
  { id: "layout", label: "Layout", icon: Icons.layout },
  { id: "media", label: "Media & Design", icon: Icons.colors },
  { id: "status", label: "Status & Feedback", icon: Icons.alert },
  { id: "code", label: "Code", icon: Icons.code },
  { id: "emojis", label: "Emojis", icon: Icons.smile },
  { id: "files", label: "Files", icon: Icons.fileX },
  { id: "users", label: "Users", icon: Icons.user },
  { id: "editor", label: "Editor", icon: Icons.editor },
  { id: "development", label: "Development", icon: Icons.development },
  
] as const

export type IconCategoryId = (typeof iconCategories)[number]["id"]
