"use client";

import { getIconForLanguageExtension } from "@/icons/code-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Copy01Icon,
  GitCommitIcon,
  MinusSignIcon,
  PlusSignIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps, HTMLAttributes } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export type CommitProps = ComponentProps<typeof Collapsible>;

export const Commit = ({ className, children, ...props }: CommitProps) => (
  <Collapsible
    className={cn("rounded-xl border bg-background", className)}
    {...props}
  >
    {children}
  </Collapsible>
);

export type CommitHeaderProps = ComponentProps<typeof CollapsibleTrigger>;

export const CommitHeader = ({
  className,
  children,
  ...props
}: CommitHeaderProps) => (
  <CollapsibleTrigger
    nativeButton={false}
    {...props}
    render={
      <div
        className={cn(
          "group flex cursor-pointer items-center justify-between gap-4 p-3 text-start transition-colors hover:opacity-80",
          className
        )}
      />
    }
  >
    {children}
  </CollapsibleTrigger>
);

export type CommitHashProps = HTMLAttributes<HTMLSpanElement>;

export const CommitHash = ({
  className,
  children,
  ...props
}: CommitHashProps) => (
  <span className={cn("font-mono text-xs", className)} {...props}>
    <HugeiconsIcon
      className="me-1 inline-block size-3"
      icon={GitCommitIcon}
      strokeWidth={2}
    />
    {children}
  </span>
);

export type CommitMessageProps = HTMLAttributes<HTMLSpanElement>;

export const CommitMessage = ({
  className,
  children,
  ...props
}: CommitMessageProps) => (
  <span className={cn("font-medium text-sm", className)} {...props}>
    {children}
  </span>
);

export type CommitMetadataProps = HTMLAttributes<HTMLDivElement>;

export const CommitMetadata = ({
  className,
  children,
  ...props
}: CommitMetadataProps) => (
  <div
    className={cn(
      "flex items-center gap-2 text-muted-foreground text-xs",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export type CommitSeparatorProps = HTMLAttributes<HTMLSpanElement>;

export const CommitSeparator = ({
  className,
  children,
  ...props
}: CommitSeparatorProps) => (
  <span className={className} {...props}>
    {children ?? "•"}
  </span>
);

export type CommitInfoProps = HTMLAttributes<HTMLDivElement>;

export const CommitInfo = ({
  className,
  children,
  ...props
}: CommitInfoProps) => (
  <div className={cn("flex flex-1 flex-col", className)} {...props}>
    {children}
  </div>
);

export type CommitAuthorProps = HTMLAttributes<HTMLDivElement>;

export const CommitAuthor = ({
  className,
  children,
  ...props
}: CommitAuthorProps) => (
  <div className={cn("flex items-center", className)} {...props}>
    {children}
  </div>
);

export type CommitAuthorAvatarProps = ComponentProps<typeof Avatar> & {
  initials: string;
  /** Author image. Falls back to the initials while it loads or if it fails. */
  src?: string;
  alt?: string;
};

export const CommitAuthorAvatar = ({
  initials,
  src,
  alt,
  className,
  ...props
}: CommitAuthorAvatarProps) => (
  <Avatar className={className} {...props}>
    {src ? <AvatarImage alt={alt ?? initials} src={src} /> : null}
    <AvatarFallback>{initials}</AvatarFallback>
  </Avatar>
);

export type CommitTimestampProps = HTMLAttributes<HTMLTimeElement> & {
  date: Date;
};

const relativeTimeFormat = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

const formatRelativeDate = (date: Date) => {
  const days = Math.round(
    (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  return relativeTimeFormat.format(days, "day");
};

export const CommitTimestamp = ({
  date,
  className,
  children,
  ...props
}: CommitTimestampProps) => {
  const [formatted, setFormatted] = useState("");

  const updateFormatted = useCallback(() => {
    setFormatted(formatRelativeDate(date));
  }, [date]);

  useEffect(() => {
    updateFormatted();
  }, [updateFormatted]);

  return (
    <time
      className={cn("text-xs", className)}
      dateTime={date.toISOString()}
      {...props}
    >
      {children ?? formatted}
    </time>
  );
};

export type CommitActionsProps = HTMLAttributes<HTMLDivElement>;

const handleActionsClick = (e: React.MouseEvent) => e.stopPropagation();
const handleActionsKeyDown = (e: React.KeyboardEvent) => e.stopPropagation();

export const CommitActions = ({
  className,
  children,
  ...props
}: CommitActionsProps) => (
  <div
    className={cn("flex items-center gap-1", className)}
    onClick={handleActionsClick}
    onKeyDown={handleActionsKeyDown}
    role="group"
    {...props}
  >
    {children}
  </div>
);

export type CommitCopyButtonProps = ComponentProps<typeof Button> & {
  hash: string;
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const CommitCopyButton = ({
  hash,
  onCopy,
  onError,
  onClick,
  timeout = 2000,
  children,
  className,
  ...props
}: CommitCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number>(0);

  const copyToClipboard = useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      toast.add({ title: "Could not copy commit hash", type: "error" });
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      if (!isCopied) {
        await navigator.clipboard.writeText(hash);
        setIsCopied(true);
        toast.add({ title: "Commit hash copied", type: "success" });
        onCopy?.();
        timeoutRef.current = window.setTimeout(
          () => setIsCopied(false),
          timeout
        );
      }
    } catch (error) {
      toast.add({ title: "Could not copy commit hash", type: "error" });
      onError?.(error as Error);
    }
  }, [hash, onCopy, onError, timeout, isCopied]);

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current);
    },
    []
  );

  // Compose rather than replace: when this button is used as the render target
  // of a Tooltip/Popover trigger, the wrapper supplies its own `onClick`.
  const handleClick = useCallback<
    NonNullable<ComponentProps<typeof Button>["onClick"]>
  >(
    (event) => {
      onClick?.(event);
      void copyToClipboard();
    },
    [onClick, copyToClipboard]
  );

  return (
    <Button
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

export type CommitContentProps = ComponentProps<typeof CollapsibleContent>;

export const CommitContent = ({
  className,
  children,
  ...props
}: CommitContentProps) => (
  <CollapsibleContent className={cn("border-t p-3", className)} {...props}>
    {children}
  </CollapsibleContent>
);

export type CommitFilesProps = HTMLAttributes<HTMLDivElement>;

export const CommitFiles = ({
  className,
  children,
  ...props
}: CommitFilesProps) => (
  <div className={cn("space-y-1", className)} {...props}>
    {children}
  </div>
);

export type CommitFileProps = HTMLAttributes<HTMLDivElement>;

export const CommitFile = ({
  className,
  children,
  ...props
}: CommitFileProps) => (
  <div
    className={cn(
      "flex items-center justify-between gap-2 rounded-xl px-2 py-1 text-sm hover:bg-muted/50",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export type CommitFileInfoProps = HTMLAttributes<HTMLDivElement>;

export const CommitFileInfo = ({
  className,
  children,
  ...props
}: CommitFileInfoProps) => (
  <div className={cn("flex min-w-0 items-center gap-2", className)} {...props}>
    {children}
  </div>
);

const fileStatusStyles = {
  added: "bg-green-500/5 text-green-600 dark:text-green-400",
  deleted: "bg-red-500/5 text-red-600 dark:text-red-400",
  modified: "bg-yellow-500/5 text-yellow-600 dark:text-yellow-400",
  renamed: "bg-blue-500/5 text-blue-600 dark:text-blue-400",
};

const fileStatusLabels = {
  added: "A",
  deleted: "D",
  modified: "M",
  renamed: "R",
};

const fileStatusTooltips = {
  added: "Added",
  deleted: "Deleted",
  modified: "Modified",
  renamed: "Renamed",
};

export type CommitFileStatusProps = HTMLAttributes<HTMLSpanElement> & {
  status: "added" | "modified" | "deleted" | "renamed";
  /** Overrides the tooltip label — defaults to the status name. */
  tooltip?: string;
};

export const CommitFileStatus = ({
  status,
  tooltip,
  className,
  children,
  ...props
}: CommitFileStatusProps) => (
  <Tooltip>
    <TooltipTrigger
      render={
        <span
          className={cn(
            "cursor-pointer inline-flex size-5 shrink-0 items-center justify-center rounded-md font-medium font-mono text-[10px]",
            fileStatusStyles[status],
            className
          )}
          {...props}
        />
      }
    >
      {children ?? fileStatusLabels[status]}
    </TooltipTrigger>
    <TooltipContent>{tooltip ?? fileStatusTooltips[status]}</TooltipContent>
  </Tooltip>
);

export type CommitFileIconProps = HTMLAttributes<HTMLSpanElement> & {
  /** File path — its extension picks the language icon. */
  path?: string;
};

const fileExtension = (path: string) =>
  path.split("/").pop()?.split(".").pop()?.toLowerCase() ?? "";

export const CommitFileIcon = ({
  path,
  className,
  children,
  ...props
}: CommitFileIconProps) => (
  <span
    className={cn(
      "flex size-3.5 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-3.5",
      className
    )}
    {...props}
  >
    {children ?? getIconForLanguageExtension(path ? fileExtension(path) : "")}
  </span>
);

export type CommitFilePathProps = HTMLAttributes<HTMLSpanElement>;

export const CommitFilePath = ({
  className,
  children,
  ...props
}: CommitFilePathProps) => (
  <span className={cn("truncate font-mono text-xs", className)} {...props}>
    {children}
  </span>
);

export type CommitFileChangesProps = HTMLAttributes<HTMLDivElement>;

export const CommitFileChanges = ({
  className,
  children,
  ...props
}: CommitFileChangesProps) => (
  <div
    className={cn(
      "flex shrink-0 items-center gap-1 font-mono text-xs",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export type CommitFileAdditionsProps = HTMLAttributes<HTMLSpanElement> & {
  count: number;
};

export const CommitFileAdditions = ({
  count,
  className,
  children,
  ...props
}: CommitFileAdditionsProps) => {
  if (count <= 0) {
    return null;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md bg-green-500/5 px-1.5 py-0.5 text-green-600 dark:text-green-400",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <HugeiconsIcon
            className="inline-block size-3"
            icon={PlusSignIcon}
            strokeWidth={2}
          />
          {count}
        </>
      )}
    </span>
  );
};

export type CommitFileDeletionsProps = HTMLAttributes<HTMLSpanElement> & {
  count: number;
};

export const CommitFileDeletions = ({
  count,
  className,
  children,
  ...props
}: CommitFileDeletionsProps) => {
  if (count <= 0) {
    return null;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md bg-red-500/5 px-1.5 py-0.5 text-red-600 dark:text-red-400",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <HugeiconsIcon
            className="inline-block size-3"
            icon={MinusSignIcon}
            strokeWidth={2}
          />
          {count}
        </>
      )}
    </span>
  );
};
