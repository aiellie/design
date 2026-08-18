"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  ArrowUpDoubleIcon,
  BandageIcon,
  Copy01Icon,
  MinusSignIcon,
  PackageIcon,
  PlusSignIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps, HTMLAttributes } from "react";
import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type ChangeType = "major" | "minor" | "patch" | "added" | "removed";

interface PackageInfoContextType {
  name: string;
  currentVersion?: string;
  newVersion?: string;
  changeType?: ChangeType;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// Default noop for context default value
// oxlint-disable-next-line eslint(no-empty-function)
const noop = () => {};

const PackageInfoContext = createContext<PackageInfoContextType>({
  isOpen: false,
  name: "",
  setIsOpen: noop,
});

export type PackageInfoProps = ComponentProps<typeof Collapsible> & {
  name: string;
  currentVersion?: string;
  newVersion?: string;
  changeType?: ChangeType;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const PackageInfo = ({
  name,
  currentVersion,
  newVersion,
  changeType,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...props
}: PackageInfoProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen ?? internalOpen;

  const setIsOpen = useCallback(
    (next: boolean) => {
      setInternalOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange]
  );

  const contextValue = useMemo(
    () => ({ changeType, currentVersion, isOpen, name, newVersion, setIsOpen }),
    [changeType, currentVersion, isOpen, name, newVersion, setIsOpen]
  );

  return (
    <PackageInfoContext.Provider value={contextValue}>
      <Collapsible
        className={cn("rounded-xl border bg-background", className)}
        onOpenChange={setIsOpen}
        open={isOpen}
        {...props}
      >
        {children ?? (
          <PackageInfoHeader>
            <PackageInfoIcon />
            <PackageInfoInfo>
              <PackageInfoName />
              <PackageInfoVersion />
            </PackageInfoInfo>
            <PackageInfoChangeType />
          </PackageInfoHeader>
        )}
      </Collapsible>
    </PackageInfoContext.Provider>
  );
};

export type PackageInfoHeaderProps = ComponentProps<typeof CollapsibleTrigger>;

export const PackageInfoHeader = ({
  className,
  children,
  ...props
}: PackageInfoHeaderProps) => (
  <CollapsibleTrigger
    nativeButton={false}
    {...props}
    render={
      <div
        className={cn(
          "group flex items-center gap-3 p-3 text-start transition-colors",
          "not-data-disabled:cursor-pointer not-data-disabled:hover:opacity-80",
          // Overrides the base `[role="button"]` pointer — a div is never `:disabled`.
          "data-disabled:cursor-default",
          className
        )}
      />
    }
  >
    {children}
  </CollapsibleTrigger>
);

export type PackageInfoExpandButtonProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoExpandButton = ({
  className,
  ...props
}: PackageInfoExpandButtonProps) => {
  const { isOpen } = useContext(PackageInfoContext);

  return (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center",
        className
      )}
      {...props}
    >
      <HugeiconsIcon
        className={cn(
          "size-4 text-muted-foreground transition-transform",
          isOpen ? "rotate-180" : "rotate-0"
        )}
        icon={ArrowDown01Icon}
        strokeWidth={2}
      />
    </div>
  );
};

export type PackageInfoIconProps = HTMLAttributes<HTMLDivElement>;

/** Square tile for the package's mark; defaults to a package glyph. */
export const PackageInfoIcon = ({
  className,
  children,
  ...props
}: PackageInfoIconProps) => (
  <div
    className={cn(
      "flex size-8 shrink-0 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground [&_svg]:size-4",
      className
    )}
    {...props}
  >
    {children ?? <HugeiconsIcon icon={PackageIcon} strokeWidth={2} />}
  </div>
);

export type PackageInfoInfoProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoInfo = ({
  className,
  children,
  ...props
}: PackageInfoInfoProps) => (
  <div
    className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
    {...props}
  >
    {children}
  </div>
);

export type PackageInfoNameProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoName = ({
  className,
  children,
  ...props
}: PackageInfoNameProps) => {
  const { name } = useContext(PackageInfoContext);

  return (
    <div
      className={cn(
        "truncate font-medium font-mono text-foreground text-sm leading-tight",
        className
      )}
      {...props}
    >
      {children ?? name}
    </div>
  );
};

export type PackageInfoVersionProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoVersion = ({
  className,
  children,
  ...props
}: PackageInfoVersionProps) => {
  const { currentVersion, newVersion, changeType } =
    useContext(PackageInfoContext);

  if (!(currentVersion || newVersion)) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 font-mono text-muted-foreground text-xs",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {currentVersion && (
            <span
              className={cn(changeType === "removed" && "line-through")}
            >
              {currentVersion}
            </span>
          )}
          {currentVersion && newVersion && (
            <HugeiconsIcon
              className="size-3 shrink-0 rtl:rotate-180"
              icon={ArrowRight01Icon}
              strokeWidth={2}
            />
          )}
          {newVersion && (
            <span className="font-medium text-foreground">{newVersion}</span>
          )}
        </>
      )}
    </div>
  );
};

const changeTypeStyles: Record<ChangeType, string> = {
  added: "bg-blue-500/5 text-blue-600 dark:text-blue-400",
  major: "bg-red-500/5 text-red-600 dark:text-red-400",
  minor: "bg-yellow-500/5 text-yellow-600 dark:text-yellow-400",
  patch: "bg-green-500/5 text-green-600 dark:text-green-400",
  removed: "bg-muted text-muted-foreground",
};

// One glyph per change type: the jump size for version bumps, +/− for
// presence changes, a bandage for patches.
const changeTypeIcons = {
  added: PlusSignIcon,
  major: ArrowUpDoubleIcon,
  minor: ArrowUp01Icon,
  patch: BandageIcon,
  removed: MinusSignIcon,
} satisfies Record<ChangeType, typeof PackageIcon>;

export type PackageInfoChangeTypeProps = HTMLAttributes<HTMLDivElement>;

export const PackageInfoChangeType = ({
  className,
  children,
  ...props
}: PackageInfoChangeTypeProps) => {
  const { changeType } = useContext(PackageInfoContext);

  if (!changeType) {
    return null;
  }

  return (
    <Badge
      className={cn(
        "shrink-0 capitalize",
        changeTypeStyles[changeType],
        className
      )}
      variant="secondary"
      {...props}
    >
      {/* `inline-start` tightens the badge's leading padding around the icon. */}
      <HugeiconsIcon
        data-icon="inline-start"
        icon={changeTypeIcons[changeType]}
        strokeWidth={2}
      />
      {children ?? changeType}
    </Badge>
  );
};

export type PackageInfoActionsProps = HTMLAttributes<HTMLDivElement>;

const handleActionsClick = (e: React.MouseEvent) => e.stopPropagation();
const handleActionsKeyDown = (e: React.KeyboardEvent) => e.stopPropagation();

export const PackageInfoActions = ({
  className,
  children,
  ...props
}: PackageInfoActionsProps) => (
  <div
    className={cn("flex shrink-0 items-center gap-1", className)}
    onClick={handleActionsClick}
    onKeyDown={handleActionsKeyDown}
    role="group"
    {...props}
  >
    {children}
  </div>
);

export type PackageInfoCopyButtonProps = ComponentProps<typeof Button> & {
  /** Text to copy — defaults to the package's install command. */
  command?: string;
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const PackageInfoCopyButton = ({
  command,
  onCopy,
  onError,
  onClick,
  timeout = 2000,
  children,
  className,
  ...props
}: PackageInfoCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number>(0);
  const { name, currentVersion, newVersion } = useContext(PackageInfoContext);

  const textToCopy =
    command ?? `npm i ${name}@${newVersion ?? currentVersion ?? "latest"}`;

  const copyToClipboard = useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      toast.add({ title: "Could not copy to clipboard", type: "error" });
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      if (!isCopied) {
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        toast.add({
          description: textToCopy,
          title: "Copied to clipboard",
          type: "success",
        });
        onCopy?.();
        timeoutRef.current = window.setTimeout(
          () => setIsCopied(false),
          timeout
        );
      }
    } catch (error) {
      toast.add({ title: "Could not copy to clipboard", type: "error" });
      onError?.(error as Error);
    }
  }, [isCopied, onCopy, onError, textToCopy, timeout]);

  // Compose rather than replace: when this button is used as the render target
  // of a Tooltip trigger, the wrapper supplies its own `onClick`.
  const handleClick = useCallback<
    NonNullable<ComponentProps<typeof Button>["onClick"]>
  >(
    (event) => {
      onClick?.(event);
      void copyToClipboard();
    },
    [onClick, copyToClipboard]
  );

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current);
    },
    []
  );

  return (
    <Button
      aria-label="Copy install command"
      className={cn("shrink-0", className)}
      size="icon-sm"
      variant="ghost"
      {...props}
      onClick={handleClick}
    >
      {children ?? (
        <HugeiconsIcon
          icon={isCopied ? Tick02Icon : Copy01Icon}
          strokeWidth={2}
        />
      )}
    </Button>
  );
};

/** Belongs in the header's `PackageInfoInfo` column, or in `PackageInfoContent`. */
export type PackageInfoDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const PackageInfoDescription = ({
  className,
  children,
  ...props
}: PackageInfoDescriptionProps) => (
  <p className={cn("text-muted-foreground text-xs", className)} {...props}>
    {children}
  </p>
);

export type PackageInfoContentProps = ComponentProps<typeof CollapsibleContent>;

export const PackageInfoContent = ({
  className,
  children,
  ...props
}: PackageInfoContentProps) => (
  <CollapsibleContent className={cn("border-t p-3", className)} {...props}>
    {children}
  </CollapsibleContent>
);

export type PackageInfoDependenciesProps = HTMLAttributes<HTMLDivElement> & {
  /** Overrides the row count shown next to the label. */
  count?: number;
};

export const PackageInfoDependencies = ({
  count,
  className,
  children,
  ...props
}: PackageInfoDependenciesProps) => {
  const dependencyCount = count ?? Children.count(children);

  return (
    <div className={cn("space-y-1", className)} {...props}>
      <div className="flex items-center gap-1.5 px-2">
        <span className="font-medium text-muted-foreground text-xs">
          Dependencies
        </span>
        {dependencyCount > 0 && (
          <span className="font-mono text-[10px] text-muted-foreground/70">
            {dependencyCount}
          </span>
        )}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
};

export type PackageInfoDependencyProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  version?: string;
};

export const PackageInfoDependency = ({
  name,
  version,
  className,
  children,
  ...props
}: PackageInfoDependencyProps) => (
  <div
    className={cn(
      "flex items-center justify-between gap-2 rounded-lg px-2 py-1 hover:bg-muted/50",
      className
    )}
    {...props}
  >
    {children ?? (
      <>
        <span className="truncate font-mono text-muted-foreground text-xs">
          {name}
        </span>
        {version && (
          <span className="shrink-0 rounded-md bg-muted/50 px-1.5 py-0.5 font-mono text-xs">
            {version}
          </span>
        )}
      </>
    )}
  </div>
);
