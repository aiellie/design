"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Alert02Icon,
  CancelIcon,
  Copy01Icon,
  Tick02Icon,
  ChevronRightIcon,
  ChevronDownIcon,
  CircleDotIcon,
  CircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps, HTMLAttributes } from "react";
import type { RefObject } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type TestStatus = "passed" | "failed" | "skipped" | "running";

interface TestResultsSummary {
  passed: number;
  failed: number;
  skipped: number;
  total: number;
  duration?: number;
}

interface TestResultsContextType {
  summary?: TestResultsSummary;
}

const TestResultsContext = createContext<TestResultsContextType>({});

const formatDuration = (ms: number) => {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
};

export type TestResultsHeaderProps = ComponentProps<typeof CollapsibleTrigger>;

export const TestResultsHeader = ({
  className,
  children,
  ...props
}: TestResultsHeaderProps) => (
  <CollapsibleTrigger
    className={cn(
      "group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 data-[panel-open]:border-b",
      className
    )}
    {...props}
  >
    {children}
    <HugeiconsIcon
      icon={ChevronRightIcon}
      className="size-4 shrink-0 text-muted-foreground group-data-[panel-open]:hidden"
      strokeWidth={2}
    />
    <HugeiconsIcon
      icon={ChevronDownIcon}
      className="hidden size-4 shrink-0 text-muted-foreground group-data-[panel-open]:block"
      strokeWidth={2}
    />
  </CollapsibleTrigger>
);

export type TestResultsDurationProps = HTMLAttributes<HTMLSpanElement>;

export const TestResultsDuration = ({
  className,
  children,
  ...props
}: TestResultsDurationProps) => {
  const { summary } = useContext(TestResultsContext);

  if (!summary?.duration) {
    return null;
  }

  return (
    <span
      className={cn("ml-auto text-muted-foreground text-xs font-mono", className)}
      {...props}
    >
      {children ?? formatDuration(summary.duration)}
    </span>
  );
};

export type TestResultsSummaryProps = HTMLAttributes<HTMLDivElement>;

export const TestResultsSummary = ({
  className,
  children,
  ...props
}: TestResultsSummaryProps) => {
  const { summary } = useContext(TestResultsContext);

  if (!summary) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      {children ?? (
        <>
          <Badge
            className="gap-1 bg-green-500/5 text-green-500 dark:bg-green-900/30 dark:text-green-400"
            variant="secondary"
          >
            <HugeiconsIcon icon={Tick02Icon} className="size-3" strokeWidth={2} />
            {summary.passed} passed
          </Badge>
          {summary.failed > 0 && (
            <Badge
              className="gap-1 bg-red-500/5 text-red-500 dark:bg-red-900/30 dark:text-red-400"
              variant="secondary"
            >
              <HugeiconsIcon icon={CancelIcon} className="size-3" strokeWidth={2} />
              {summary.failed} failed
            </Badge>
          )}
          {summary.skipped > 0 && (
            <Badge
              className="gap-1 bg-yellow-500/5 text-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-400"
              variant="secondary"
            >
              <HugeiconsIcon icon={CircleIcon} className="size-3" strokeWidth={2} />
              {summary.skipped} skipped
            </Badge>
          )}
        </>
      )}
    </div>
  );
};

export type TestResultsProps = ComponentProps<typeof Collapsible> & {
  summary?: TestResultsSummary;
};

export const TestResults = ({
  summary,
  className,
  children,
  defaultOpen = true,
  ...props
}: TestResultsProps) => {
  const contextValue = useMemo(() => ({ summary }), [summary]);

  return (
    <TestResultsContext.Provider value={contextValue}>
      <Collapsible
        defaultOpen={defaultOpen}
        className={cn("rounded-lg border bg-background", className)}
        {...props}
      >
        {children ??
          (summary && (
            <TestResultsHeader>
              <TestResultsSummary />
              <TestResultsDuration />
            </TestResultsHeader>
          ))}
      </Collapsible>
    </TestResultsContext.Provider>
  );
};

export type TestResultsPanelProps = ComponentProps<typeof CollapsibleContent>;

export const TestResultsPanel = ({
  className,
  children,
  ...props
}: TestResultsPanelProps) => (
  <CollapsibleContent className={className} {...props}>
    {children}
  </CollapsibleContent>
);

export type TestResultsProgressProps = HTMLAttributes<HTMLDivElement>;

export const TestResultsProgress = ({
  className,
  children,
  ...props
}: TestResultsProgressProps) => {
  const { summary } = useContext(TestResultsContext);

  if (!summary) {
    return null;
  }

  const passedPercent = (summary.passed / summary.total) * 100;
  const failedPercent = (summary.failed / summary.total) * 100;

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children ?? (
        <>
          <div className="flex h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="bg-green-500 transition-all"
              style={{ width: `${passedPercent}%` }}
            />
            <div
              className="bg-red-500 transition-all"
              style={{ width: `${failedPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-muted-foreground text-xs">
            <span>
              <span className="font-mono">{summary.passed}/{summary.total}</span> tests passed
            </span>
            <span className="font-mono">{passedPercent.toFixed(0)}%</span>
          </div>
        </>
      )}
    </div>
  );
};

export type TestResultsContentProps = HTMLAttributes<HTMLDivElement>;

export const TestResultsContent = ({
  className,
  children,
  ...props
}: TestResultsContentProps) => (
  <div className={cn("space-y-2 p-4", className)} {...props}>
    {children}
  </div>
);

interface TestSuiteContextType {
  name: string;
  status: TestStatus;
  count?: number;
}

const TestSuiteContext = createContext<TestSuiteContextType>({
  name: "",
  status: "passed",
});

const statusStyles: Record<TestStatus, string> = {
  failed: "text-red-600 dark:text-red-400",
  passed: "text-green-500 dark:text-green-400",
  running: "text-blue-600 dark:text-blue-400",
  skipped: "text-yellow-600 dark:text-yellow-400",
};

const statusIcons: Record<TestStatus, React.ReactNode> = {
  failed: <HugeiconsIcon icon={CancelIcon} className="size-4" strokeWidth={2} />,
  passed: <HugeiconsIcon icon={Tick02Icon} className="size-4" strokeWidth={2} />,
  running: <HugeiconsIcon icon={CircleDotIcon} className="size-4 animate-pulse" strokeWidth={2} />,
  skipped: <HugeiconsIcon icon={CircleIcon} className="size-4" strokeWidth={2} />,
};

const statusBadgeStyles: Record<TestStatus, string> = {
  failed: "bg-red-500/5 text-red-500 dark:bg-red-900/30 dark:text-red-400",
  passed: "bg-green-500/5 text-green-500 dark:bg-green-900/30 dark:text-green-400",
  running: "bg-blue-500/5 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400",
  skipped:
    "bg-yellow-500/5 text-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-400",
};

const statusBadgeIcons: Record<TestStatus, React.ReactNode> = {
  failed: <HugeiconsIcon icon={CancelIcon} className="size-3" strokeWidth={2} />,
  passed: <HugeiconsIcon icon={Tick02Icon} className="size-3" strokeWidth={2} />,
  running: (
    <HugeiconsIcon
      icon={CircleDotIcon}
      className="size-3 animate-pulse"
      strokeWidth={2}
    />
  ),
  skipped: <HugeiconsIcon icon={CircleIcon} className="size-3" strokeWidth={2} />,
};

const TestStatusBadge = ({
  status,
  count,
}: {
  status: TestStatus;
  count?: number;
}) => (
  <Badge
    className={cn("shrink-0 rounded-full p-1", statusBadgeStyles[status])}
  >
    {statusBadgeIcons[status]}
    {count !== undefined && count}
  </Badge>
);

export type TestSuiteProps = ComponentProps<typeof Collapsible> & {
  name: string;
  status: TestStatus;
  count?: number;
};

export const TestSuite = ({
  name,
  status,
  count,
  className,
  children,
  ...props
}: TestSuiteProps) => {
  const contextValue = useMemo(
    () => ({ count, name, status }),
    [count, name, status]
  );

  return (
    <TestSuiteContext.Provider value={contextValue}>
      <Collapsible className={cn("rounded-lg border", className)} {...props}>
        {children}
      </Collapsible>
    </TestSuiteContext.Provider>
  );
};

export type TestSuiteNameProps = ComponentProps<typeof CollapsibleTrigger>;

export const TestSuiteName = ({
  className,
  children,
  ...props
}: TestSuiteNameProps) => {
  const { count, name, status } = useContext(TestSuiteContext);

  return (
    <CollapsibleTrigger
      className={cn(
        "group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50",
        className
      )}
      {...props}
    >
      <TestStatusBadge status={status} />
      <span className="font-medium text-sm">{children ?? name}</span>
      <HugeiconsIcon
        icon={ChevronRightIcon}
        className="ml-auto size-4 shrink-0 text-muted-foreground group-data-[panel-open]:hidden"
        strokeWidth={2}
      />
      <HugeiconsIcon
        icon={ChevronDownIcon}
        className="ml-auto hidden size-4 shrink-0 text-muted-foreground group-data-[panel-open]:block"
        strokeWidth={2}
      />
    </CollapsibleTrigger>
  );
};

export type TestSuiteStatsProps = HTMLAttributes<HTMLDivElement> & {
  passed?: number;
  failed?: number;
  skipped?: number;
};

export const TestSuiteStats = ({
  passed = 0,
  failed = 0,
  skipped = 0,
  className,
  children,
  ...props
}: TestSuiteStatsProps) => (
  <div
    className={cn("ml-auto flex items-center gap-2 text-xs", className)}
    {...props}
  >
    {children ?? (
      <>
        {passed > 0 && (
          <span className="text-green-600 dark:text-green-400">
            {passed} passed
          </span>
        )}
        {failed > 0 && (
          <span className="text-red-600 dark:text-red-400">
            {failed} failed
          </span>
        )}
        {skipped > 0 && (
          <span className="text-yellow-600 dark:text-yellow-400">
            {skipped} skipped
          </span>
        )}
      </>
    )}
  </div>
);

export type TestSuiteContentProps = ComponentProps<typeof CollapsibleContent>;

export const TestSuiteContent = ({
  className,
  children,
  ...props
}: TestSuiteContentProps) => (
  <CollapsibleContent className={cn("border-t", className)} {...props}>
    <div className="divide-y">{children}</div>
  </CollapsibleContent>
);

interface TestContextType {
  name: string;
  status: TestStatus;
  duration?: number;
}

const TestContext = createContext<TestContextType>({
  name: "",
  status: "passed",
});

export type TestNameProps = HTMLAttributes<HTMLSpanElement>;

export const TestName = ({ className, children, ...props }: TestNameProps) => {
  const { name } = useContext(TestContext);

  return (
    <span className={cn("flex-1", className)} {...props}>
      {children ?? name}
    </span>
  );
};

export type TestDurationProps = HTMLAttributes<HTMLSpanElement>;

export const TestDuration = ({
  className,
  children,
  ...props
}: TestDurationProps) => {
  const { duration } = useContext(TestContext);

  if (duration === undefined) {
    return null;
  }

  return (
    <span
      className={cn("ml-auto text-muted-foreground text-xs font-mono", className)}
      {...props}
    >
      {children ?? `${duration}ms`}
    </span>
  );
};

export type TestStatusProps = HTMLAttributes<HTMLSpanElement>;

export const TestStatus = ({
  className,
  children,
  ...props
}: TestStatusProps) => {
  const { status } = useContext(TestContext);

  return (
    <span
      className={cn("shrink-0", statusStyles[status], className)}
      {...props}
    >
      {children ?? statusIcons[status]}
    </span>
  );
};

export type TestMessageCopyButtonProps = ComponentProps<typeof Button> & {
  /** Text to copy. Falls back to the rendered message when omitted. */
  value?: string;
  targetRef?: RefObject<HTMLDivElement | null>;
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const TestMessageCopyButton = ({
  value,
  targetRef,
  onCopy,
  onError,
  onClick,
  timeout = 2000,
  children,
  className,
  ...props
}: TestMessageCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number>(0);

  const copyToClipboard = useCallback(async () => {
    const message = value ?? targetRef?.current?.innerText.trim();

    if (
      typeof window === "undefined" ||
      !navigator?.clipboard?.writeText ||
      !message
    ) {
      toast.add({ title: "Could not copy message", type: "error" });
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      if (!isCopied) {
        await navigator.clipboard.writeText(message);
        setIsCopied(true);
        toast.add({ title: "Message copied", type: "success" });
        onCopy?.();
        timeoutRef.current = window.setTimeout(
          () => setIsCopied(false),
          timeout
        );
      }
    } catch (error) {
      toast.add({ title: "Could not copy message", type: "error" });
      onError?.(error as Error);
    }
  }, [isCopied, onCopy, onError, targetRef, timeout, value]);

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current);
    },
    []
  );

  // Compose rather than replace: as a Tooltip trigger the wrapper supplies its
  // own `onClick`.
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
      aria-label="Copy message"
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

export type TestMessageProps = ComponentProps<typeof PopoverTrigger>;

export const TestMessage = ({
  className,
  children,
  ...props
}: TestMessageProps) => {
  const { name, status } = useContext(TestContext);
  const messageRef = useRef<HTMLDivElement>(null);

  return (
    <Popover>
      <PopoverTrigger
        aria-label={`Show details for ${name}`}
        className={cn(
          "shrink-0 rounded-sm text-muted-foreground transition-colors hover:text-foreground",
          statusStyles[status],
          className
        )}
        {...props}
      >
        <HugeiconsIcon icon={Alert02Icon} className="size-4" strokeWidth={2} />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-full p-0.5">
        <div className="relative">
          <div ref={messageRef}>{children}</div>
          <Tooltip>
            <TooltipTrigger
              render={
                <TestMessageCopyButton
                  className="absolute top-1.5 right-1.5 text-red-700 hover:bg-red-100 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/40 dark:hover:text-red-400"
                  targetRef={messageRef}
                />
              }
            />
            <TooltipContent>Copy message</TooltipContent>
          </Tooltip>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export type TestProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  status: TestStatus;
  duration?: number;
};

export const Test = ({
  name,
  status,
  duration,
  className,
  children,
  ...props
}: TestProps) => {
  const contextValue = useMemo(
    () => ({ duration, name, status }),
    [duration, name, status]
  );

  return (
    <TestContext.Provider value={contextValue}>
      <div
        className={cn("flex items-center gap-2 px-4 py-2 text-sm", className)}
        {...props}
      >
        <TestStatusBadge status={status} />
        <TestName />
        {children && <TestMessage>{children}</TestMessage>}
        {duration !== undefined && <TestDuration />}
      </div>
    </TestContext.Provider>
  );
};

export type TestErrorProps = HTMLAttributes<HTMLDivElement>;

export const TestError = ({
  className,
  children,
  ...props
}: TestErrorProps) => (
  <div
    className={cn(
      "rounded-md bg-red-50 p-3 pr-10 dark:bg-red-900/20",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export type TestErrorMessageProps = HTMLAttributes<HTMLParagraphElement>;

export const TestErrorMessage = ({
  className,
  children,
  ...props
}: TestErrorMessageProps) => (
  <p
    className={cn(
      "font-medium text-red-700 text-sm dark:text-red-400",
      className
    )}
    {...props}
  >
    {children}
  </p>
);

export type TestErrorStackProps = HTMLAttributes<HTMLPreElement>;

export const TestErrorStack = ({
  className,
  children,
  ...props
}: TestErrorStackProps) => (
  <pre
    className={cn(
      "mt-2 overflow-auto font-mono text-red-600 text-xs dark:text-red-400",
      className
    )}
    {...props}
  >
    {children}
  </pre>
);
