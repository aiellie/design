"use client"

import { getIconForLanguageExtension } from "@/icons/code-icons"
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu"
import { cn } from "@/lib/utils"
import {
  ChevronRightIcon,
  FileEmptyIcon,
  Folder01Icon,
  Folder02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { AnimatePresence, motion } from "motion/react"
import type { HTMLAttributes, ReactNode } from "react"
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

/**
 * `default` renders every file with the same neutral document icon.
 * `file-type` derives an icon from the file extension.
 */
export type FileTreeVariant = "default" | "file-type"

interface FileTreeContextType {
  expandedPaths: Set<string>
  togglePath: (path: string) => void
  selectedPath?: string
  onSelect?: (path: string) => void
  variant: FileTreeVariant
}

// Default noop for context default value
// oxlint-disable-next-line eslint(no-empty-function)
const noop = () => {}

const FileTreeContext = createContext<FileTreeContextType>({
  // oxlint-disable-next-line eslint-plugin-unicorn(no-new-builtin)
  expandedPaths: new Set(),
  togglePath: noop,
  variant: "default",
})

export type FileTreeProps = Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> & {
  expanded?: Set<string>
  defaultExpanded?: Set<string>
  selectedPath?: string
  onSelect?: (path: string) => void
  onExpandedChange?: (expanded: Set<string>) => void
  variant?: FileTreeVariant
}

export const FileTree = ({
  expanded: controlledExpanded,
  defaultExpanded = new Set(),
  selectedPath,
  onSelect,
  onExpandedChange,
  variant = "default",
  className,
  children,
  ...props
}: FileTreeProps) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
  const expandedPaths = controlledExpanded ?? internalExpanded

  const togglePath = useCallback(
    (path: string) => {
      const newExpanded = new Set(expandedPaths)
      if (newExpanded.has(path)) {
        newExpanded.delete(path)
      } else {
        newExpanded.add(path)
      }
      setInternalExpanded(newExpanded)
      onExpandedChange?.(newExpanded)
    },
    [expandedPaths, onExpandedChange]
  )

  const contextValue = useMemo(
    () => ({ expandedPaths, onSelect, selectedPath, togglePath, variant }),
    [expandedPaths, onSelect, selectedPath, togglePath, variant]
  )

  return (
    <FileTreeContext.Provider value={contextValue}>
      <div
        className={cn(
          "rounded-2xl border bg-background font-mono text-sm",
          className
        )}
        role="tree"
        {...props}
      >
        <div className="p-2">{children}</div>
      </div>
    </FileTreeContext.Provider>
  )
}

export type FileTreeIconProps = HTMLAttributes<HTMLSpanElement>

export const FileTreeIcon = ({
  className,
  children,
  ...props
}: FileTreeIconProps) => (
  <span className={cn("shrink-0", className)} {...props}>
    {children}
  </span>
)

export type FileTreeNameProps = HTMLAttributes<HTMLSpanElement>

export const FileTreeName = ({
  className,
  children,
  ...props
}: FileTreeNameProps) => (
  <span className={cn("truncate", className)} {...props}>
    {children}
  </span>
)

interface FileTreeFolderContextType {
  path: string
  name: string
  isExpanded: boolean
}

const FileTreeFolderContext = createContext<FileTreeFolderContextType>({
  isExpanded: false,
  name: "",
  path: "",
})

// `contextMenu` is omitted because React types it as the deprecated HTML
// attribute (a string), which would intersect with the prop below.
export type FileTreeFolderProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "contextMenu"
> & {
  path: string
  name: string
  /** A `<ContextMenuContent>` to open when the folder row is right-clicked. */
  contextMenu?: ReactNode
}

export const FileTreeFolder = ({
  path,
  name,
  contextMenu,
  className,
  children,
  ...props
}: FileTreeFolderProps) => {
  const { expandedPaths, togglePath, selectedPath, onSelect } =
    useContext(FileTreeContext)
  const isExpanded = expandedPaths.has(path)
  const isSelected = selectedPath === path

  const handleOpenChange = useCallback(() => {
    togglePath(path)
  }, [togglePath, path])

  const handleSelect = useCallback(() => {
    togglePath(path)
    onSelect?.(path)
  }, [togglePath, onSelect, path])

  const folderContextValue = useMemo(
    () => ({ isExpanded, name, path }),
    [isExpanded, name, path]
  )

  const row = (
    <motion.div transition={{ duration: 0.1 }} whileTap={{ scale: 0.98 }}>
      <div
        className={cn(
          "flex w-full items-center gap-1 rounded-lg px-2 py-1 text-start transition-colors hover:bg-muted/50",
          isSelected && "bg-muted"
        )}
      >
        <button
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${name}`}
          className="group/folder-toggle relative flex size-4 shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0 rtl:-scale-x-100"
          onClick={handleOpenChange}
          type="button"
        >
          <HugeiconsIcon
            icon={isExpanded ? Folder02Icon : Folder01Icon}
            className="size-4 text-muted-foreground transition-opacity group-hover/folder-toggle:opacity-0"
          />
          <motion.span
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute flex size-4 items-center justify-center text-muted-foreground opacity-0 transition-opacity group-hover/folder-toggle:opacity-100"
          >
            <HugeiconsIcon icon={ChevronRightIcon} className="size-4" />
          </motion.span>
        </button>
        <button
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-start"
          onClick={handleSelect}
          type="button"
        >
          <FileTreeName>{name}</FileTreeName>
        </button>
      </div>
    </motion.div>
  )

  return (
    <FileTreeFolderContext.Provider value={folderContextValue}>
      <div
        aria-expanded={isExpanded}
        aria-selected={isSelected}
        className={cn("", className)}
        role="treeitem"
        tabIndex={0}
        {...props}
      >
        {contextMenu ? (
          <ContextMenu>
            <ContextMenuTrigger render={row} />
            {contextMenu}
          </ContextMenu>
        ) : (
          row
        )}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <div className="ms-4 border-s ps-2">{children}</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FileTreeFolderContext.Provider>
  )
}

interface FileTreeFileContextType {
  path: string
  name: string
}

const FileTreeFileContext = createContext<FileTreeFileContextType>({
  name: "",
  path: "",
})

/** `.gitignore` -> `gitignore`, `button.tsx` -> `tsx`, `Dockerfile` -> `dockerfile`. */
const extensionOf = (name: string) => {
  const withoutLeadingDot = name.startsWith(".") ? name.slice(1) : name
  const lastDot = withoutLeadingDot.lastIndexOf(".")
  const extension =
    lastDot === -1 ? withoutLeadingDot : withoutLeadingDot.slice(lastDot + 1)

  return extension.toLowerCase()
}

export type FileTreeFileProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "contextMenu"
> & {
  path: string
  name: string
  icon?: ReactNode
  variant?: FileTreeVariant
  /** A `<ContextMenuContent>` to open when the file row is right-clicked. */
  contextMenu?: ReactNode
}

export const FileTreeFile = ({
  path,
  name,
  icon,
  variant,
  contextMenu,
  className,
  children,
  ...props
}: FileTreeFileProps) => {
  const {
    selectedPath,
    onSelect,
    variant: treeVariant,
  } = useContext(FileTreeContext)
  const isSelected = selectedPath === path
  const resolvedVariant = variant ?? treeVariant

  const handleClick = useCallback(() => {
    onSelect?.(path)
  }, [onSelect, path])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        onSelect?.(path)
      }
    },
    [onSelect, path]
  )

  const fileContextValue = useMemo(() => ({ name, path }), [name, path])

  const row = (
    <motion.div transition={{ duration: 0.1 }} whileTap={{ scale: 0.98 }}>
      <div
        aria-selected={isSelected}
        className={cn(
          "flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 transition-colors hover:bg-muted/50",
          isSelected && "bg-muted",
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="treeitem"
        tabIndex={0}
        {...props}
      >
        {children ?? (
          <>
            <FileTreeIcon className="flex size-4 items-center justify-center [&_svg]:size-4">
              {icon ??
                (resolvedVariant === "file-type" ? (
                  getIconForLanguageExtension(extensionOf(name))
                ) : (
                  <HugeiconsIcon
                    icon={FileEmptyIcon}
                    className="size-4 text-muted-foreground"
                  />
                ))}
            </FileTreeIcon>
            <FileTreeName>{name}</FileTreeName>
          </>
        )}
      </div>
    </motion.div>
  )

  return (
    <FileTreeFileContext.Provider value={fileContextValue}>
      {contextMenu ? (
        <ContextMenu>
          <ContextMenuTrigger render={row} />
          {contextMenu}
        </ContextMenu>
      ) : (
        row
      )}
    </FileTreeFileContext.Provider>
  )
}
