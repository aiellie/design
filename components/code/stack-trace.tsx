"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import {
  Bug02Icon,
  ArrowDown01Icon,
  Copy01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Regex patterns for parsing stack traces
const STACK_FRAME_WITH_PARENS_REGEX = /^at\s+(.+?)\s+\((.+):(\d+):(\d+)\)$/;
const STACK_FRAME_WITHOUT_FN_REGEX = /^at\s+(.+):(\d+):(\d+)$/;
const ERROR_TYPE_REGEX = /^(\w+Error|Error):\s*(.*)$/;
const AT_PREFIX_REGEX = /^at\s+/;

interface StackFrame {
  raw: string;
  functionName: string | null;
  filePath: string | null;
  lineNumber: number | null;
  columnNumber: number | null;
  isInternal: boolean;
}

interface ParsedStackTrace {
  errorType: string | null;
  errorMessage: string;
  frames: StackFrame[];
  raw: string;
}

interface StackTraceContextValue {
  trace: ParsedStackTrace;
  raw: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFilePathClick?: (filePath: string, line?: number, column?: number) => void;
}

const StackTraceContext = createContext<StackTraceContextValue | null>(null);

const useStackTrace = () => {
  const context = useContext(StackTraceContext);
  if (!context) {
    throw new Error("StackTrace components must be used within StackTrace");
  }
  return context;
};

const isInternalPath = (filePath: string) =>
  filePath.includes("node_modules") ||
  filePath.startsWith("node:") ||
  filePath.includes("internal/");

const parseStackFrame = (line: string): StackFrame => {
  const trimmed = line.trim();

  // Pattern: at functionName (filePath:line:column)
  const withParensMatch = trimmed.match(STACK_FRAME_WITH_PARENS_REGEX);
  if (withParensMatch) {
    const [, functionName, filePath, lineNum, colNum] = withParensMatch;
    return {
      columnNumber: colNum ? Number.parseInt(colNum, 10) : null,
      filePath: filePath ?? null,
      functionName: functionName ?? null,
      isInternal: isInternalPath(filePath),
      lineNumber: lineNum ? Number.parseInt(lineNum, 10) : null,
      raw: trimmed,
    };
  }

  // Pattern: at filePath:line:column (no function name)
  const withoutFnMatch = trimmed.match(STACK_FRAME_WITHOUT_FN_REGEX);
  if (withoutFnMatch) {
    const [, filePath, lineNum, colNum] = withoutFnMatch;
    return {
      columnNumber: colNum ? Number.parseInt(colNum, 10) : null,
      filePath: filePath ?? null,
      functionName: null,
      isInternal: filePath ? isInternalPath(filePath) : false,
      lineNumber: lineNum ? Number.parseInt(lineNum, 10) : null,
      raw: trimmed,
    };
  }

  // Fallback: unparseable line
  return {
    columnNumber: null,
    filePath: null,
    functionName: null,
    isInternal: trimmed.includes("node_modules") || trimmed.includes("node:"),
    lineNumber: null,
    raw: trimmed,
  };
};

const parseStackTrace = (trace: string): ParsedStackTrace => {
  const lines = trace.split("\n").filter((line) => line.trim());

  if (lines.length === 0) {
    return {
      errorMessage: trace,
      errorType: null,
      frames: [],
      raw: trace,
    };
  }

  const firstLine = lines[0].trim();
  let errorType: string | null = null;
  let errorMessage = firstLine;

  // Try to extract error type from "ErrorType: message" format
  const errorMatch = firstLine.match(ERROR_TYPE_REGEX);
  if (errorMatch) {
    const [, type, msg] = errorMatch;
    errorType = type;
    errorMessage = msg || "";
  }

  // Parse stack frames (lines starting with "at")
  const frames = lines
    .slice(1)
    .filter((line) => line.trim().startsWith("at "))
    .map(parseStackFrame);

  return {
    errorMessage,
    errorType,
    frames,
    raw: trace,
  };
};

export type StackTraceProps = ComponentProps<typeof Collapsible> & {
  trace: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onFilePathClick?: (filePath: string, line?: number, column?: number) => void;
};

export const StackTrace = ({
  trace,
  className,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  onFilePathClick,
  children,
  ...props
}: StackTraceProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen ?? internalOpen;

  const setIsOpen = useCallback(
    (next: boolean) => {
      setInternalOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange]
  );

  const parsedTrace = useMemo(() => parseStackTrace(trace), [trace]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      onFilePathClick,
      raw: trace,
      setIsOpen,
      trace: parsedTrace,
    }),
    [parsedTrace, trace, isOpen, setIsOpen, onFilePathClick]
  );

  return (
    <StackTraceContext.Provider value={contextValue}>
      <Collapsible
        className={cn(
          "not-prose w-full overflow-hidden rounded-xl border bg-background font-mono text-xs",
          className
        )}
        onOpenChange={setIsOpen}
        open={isOpen}
        {...props}
      >
        {children}
      </Collapsible>
    </StackTraceContext.Provider>
  );
};

export type StackTraceHeaderProps = ComponentProps<typeof CollapsibleTrigger>;

export const StackTraceHeader = ({
  className,
  children,
  ...props
}: StackTraceHeaderProps) => (
  <CollapsibleTrigger
    nativeButton={false}
    {...props}
    render={
      <div
        className={cn(
          "bg-muted/30 group flex cursor-pointer items-center justify-between gap-4 px-3 py-1 text-start transition-colors hover:opacity-80",
          className
        )}
      />
    }
  >
    {children}
  </CollapsibleTrigger>
);

export type StackTraceErrorProps = ComponentProps<"div">;

export const StackTraceError = ({
  className,
  children,
  ...props
}: StackTraceErrorProps) => (
  <div
    className={cn(
      "flex min-w-0 flex-1 items-center gap-2 overflow-hidden",
      className
    )}
    {...props}
  >
    <HugeiconsIcon
      className="size-3 shrink-0 text-destructive"
      icon={Bug02Icon}
      strokeWidth={2}
    />
    {children}
  </div>
);

export type StackTraceErrorTypeProps = ComponentProps<"span">;

export const StackTraceErrorType = ({
  className,
  children,
  ...props
}: StackTraceErrorTypeProps) => {
  const { trace } = useStackTrace();

  return (
    <span
      className={cn("shrink-0 font-semibold text-destructive", className)}
      {...props}
    >
      {children ?? trace.errorType}
    </span>
  );
};

export type StackTraceErrorMessageProps = ComponentProps<"span">;

export const StackTraceErrorMessage = ({
  className,
  children,
  ...props
}: StackTraceErrorMessageProps) => {
  const { trace } = useStackTrace();

  return (
    <span className={cn("truncate text-foreground", className)} {...props}>
      {children ?? trace.errorMessage}
    </span>
  );
};

export type StackTraceActionsProps = ComponentProps<"div">;

const handleActionsClick = (e: React.MouseEvent) => e.stopPropagation();
const handleActionsKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.stopPropagation();
  }
};

export const StackTraceActions = ({
  className,
  children,
  ...props
}: StackTraceActionsProps) => (
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

export type StackTraceCopyButtonProps = ComponentProps<typeof Button> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const StackTraceCopyButton = ({
  onCopy,
  onError,
  onClick,
  timeout = 2000,
  className,
  children,
  ...props
}: StackTraceCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number>(0);
  const { raw } = useStackTrace();

  const copyToClipboard = useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      toast.add({ title: "Could not copy stack trace", type: "error" });
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      if (!isCopied) {
        await navigator.clipboard.writeText(raw);
        setIsCopied(true);
        toast.add({ title: "Stack trace copied", type: "success" });
        onCopy?.();
        timeoutRef.current = window.setTimeout(
          () => setIsCopied(false),
          timeout
        );
      }
    } catch (error) {
      toast.add({ title: "Could not copy stack trace", type: "error" });
      onError?.(error as Error);
    }
  }, [raw, isCopied, onCopy, onError, timeout]);

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

export type StackTraceExpandButtonProps = ComponentProps<"div">;

export const StackTraceExpandButton = ({
  className,
  ...props
}: StackTraceExpandButtonProps) => {
  const { isOpen } = useStackTrace();

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

export type StackTraceContentProps = ComponentProps<
  typeof CollapsibleContent
> & {
  maxHeight?: number;
};

export const StackTraceContent = ({
  className,
  maxHeight = 400,
  children,
  ...props
}: StackTraceContentProps) => (
  <CollapsibleContent
    className={cn("overflow-auto border-t", className)}
    style={{ maxHeight }}
    {...props}
  >
    {children}
  </CollapsibleContent>
);

export type StackTraceFramesProps = ComponentProps<"div"> & {
  showInternalFrames?: boolean;
};

interface FilePathButtonProps {
  frame: StackFrame;
  onFilePathClick?: (
    filePath: string,
    lineNumber?: number,
    columnNumber?: number
  ) => void;
}

const FilePathButton = ({ frame, onFilePathClick }: FilePathButtonProps) => {
  const handleClick = useCallback(() => {
    if (frame.filePath) {
      onFilePathClick?.(
        frame.filePath,
        frame.lineNumber ?? undefined,
        frame.columnNumber ?? undefined
      );
    }
  }, [frame, onFilePathClick]);

  return (
    <button
      className={cn(
        "underline decoration-dotted hover:text-primary",
        onFilePathClick && "cursor-pointer"
      )}
      disabled={!onFilePathClick}
      onClick={handleClick}
      type="button"
    >
      {frame.filePath}
      {frame.lineNumber !== null && `:${frame.lineNumber}`}
      {frame.columnNumber !== null && `:${frame.columnNumber}`}
    </button>
  );
};

export const StackTraceFrames = ({
  className,
  showInternalFrames = true,
  ...props
}: StackTraceFramesProps) => {
  const { trace, onFilePathClick } = useStackTrace();

  const framesToShow = showInternalFrames
    ? trace.frames
    : trace.frames.filter((f) => !f.isInternal);

  return (
    <div className={cn("space-y-1 p-3", className)} {...props}>
      {framesToShow.map((frame) => (
        <div
          className={cn(
            "text-xs",
            frame.isInternal ? "text-muted-foreground/50" : "text-foreground/90"
          )}
          key={frame.raw}
        >
          <span className="text-muted-foreground">at </span>
          {frame.functionName && (
            <span className={frame.isInternal ? "" : "text-foreground"}>
              {frame.functionName}{" "}
            </span>
          )}
          {frame.filePath && (
            <>
              <span className="text-muted-foreground">(</span>
              <FilePathButton
                frame={frame}
                onFilePathClick={onFilePathClick}
              />
              <span className="text-muted-foreground">)</span>
            </>
          )}
          {!(frame.filePath || frame.functionName) && (
            <span>{frame.raw.replace(AT_PREFIX_REGEX, "")}</span>
          )}
        </div>
      ))}
      {framesToShow.length === 0 && (
        <div className="text-muted-foreground text-xs">No stack frames</div>
      )}
    </div>
  );
};
