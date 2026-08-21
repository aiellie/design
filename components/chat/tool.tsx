"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusIndicator } from "@/components/ellieui/status";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { DynamicToolUIPart, ToolUIPart } from "ai";
import {
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  ArrowRight01Icon,
  CircleIcon,
  Clock01Icon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps, ReactNode } from "react";
import { isValidElement } from "react";

import { CodeBlock } from "@/components/code/code-block";

export type ToolProps = ComponentProps<typeof Collapsible>;

export const Tool = ({ className, ...props }: ToolProps) => (
  <Collapsible
    className={cn("group not-prose mb-4 w-full border rounded-xl", className)}
    {...props}
  />
);

export type ToolPart = ToolUIPart | DynamicToolUIPart;

export type ToolHeaderProps = {
  title?: string;
  /** Leading icon. Defaults to a wrench. */
  icon?: ReactNode;
  /** Render the status badge with a per-state icon or a colored dot. */
  indicator?: ToolStatusIndicator;
  className?: string;
} & (
  | { type: ToolUIPart["type"]; state: ToolUIPart["state"]; toolName?: never }
  | {
      type: DynamicToolUIPart["type"];
      state: DynamicToolUIPart["state"];
      toolName: string;
    }
);

const statusLabels: Record<ToolPart["state"], string> = {
  "approval-requested": "Awaiting Approval",
  "approval-responded": "Responded",
  "input-available": "Running",
  "input-streaming": "Pending",
  "output-available": "Completed",
  "output-denied": "Denied",
  "output-error": "Error",
};

const statusIcons: Record<ToolPart["state"], ReactNode> = {
  "approval-requested": <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} />,
  "approval-responded": (
    <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
  ),
  "input-available": (
    <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} className="animate-pulse" />
  ),
  "input-streaming": <HugeiconsIcon icon={CircleIcon} className="size-3.5!" />,
  "output-available": (
    <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
  ),
  "output-denied": <HugeiconsIcon icon={CancelCircleIcon} strokeWidth={2} />,
  "output-error": <HugeiconsIcon icon={CancelCircleIcon} strokeWidth={2} />,
};

const statusStyles: Record<ToolPart["state"], string> = {
  "approval-requested":
    "border-amber-500/10 bg-amber-500/6 text-amber-700 dark:border-amber-400/10 dark:bg-amber-400/6 dark:text-amber-400",
  "approval-responded":
    "border-blue-500/10 bg-blue-500/6 text-blue-700 dark:border-blue-400/10 dark:bg-blue-400/6 dark:text-blue-400",
  "input-available":
    "border-indigo-500/10 bg-indigo-500/6 text-indigo-700 dark:border-indigo-400/10 dark:bg-indigo-400/6 dark:text-indigo-400",
  "input-streaming": "border-border bg-muted text-muted-foreground",
  "output-available":
    "border-emerald-500/10 bg-emerald-500/6 text-emerald-700 dark:border-emerald-400/10 dark:bg-emerald-400/6 dark:text-emerald-400",
  "output-denied":
    "border-orange-500/10 bg-orange-500/6 text-orange-700 dark:border-orange-400/10 dark:bg-orange-400/6 dark:text-orange-400",
  "output-error":
    "border-destructive/10 bg-destructive/6 text-destructive dark:border-destructive/10 dark:bg-destructive/10",
};

export type ToolStatusIndicator = "icon" | "dot";

export const getStatusBadge = (
  status: ToolPart["state"],
  indicator: ToolStatusIndicator = "icon"
) => (
  <Badge
    variant="outline"
    data-pulse={indicator === "dot" && status === "input-available"}
    className={cn(
      "group/status gap-1.5 rounded-4xl text-xs",
      statusStyles[status]
    )}
  >
    {indicator === "dot" ? <StatusIndicator /> : statusIcons[status]}
    {statusLabels[status]}
  </Badge>
);

export const ToolHeader = ({
  className,
  title,
  icon,
  indicator,
  type,
  state,
  toolName,
  ...props
}: ToolHeaderProps) => {
  const derivedName =
    type === "dynamic-tool" ? toolName : type.split("-").slice(1).join("-");

  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 py-2 px-3 text-muted-foreground",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className="flex text-muted-foreground [&_svg]:size-4">
          {icon ?? <HugeiconsIcon icon={Wrench01Icon} className="size-3.5!" />}
        </span>
        <span className="text-sm">{title ?? derivedName}</span>
      </div>
      <div className="ml-auto">{getStatusBadge(state, indicator)}</div>
      <CollapsibleTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground aria-expanded:bg-transparent aria-expanded:text-muted-foreground aria-expanded:hover:bg-muted aria-expanded:hover:text-foreground"
            aria-label="Toggle tool details"
          />
        }
      >
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          strokeWidth={2}
          className="size-3.5 text-muted-foreground transition-transform group-data-[open]:rotate-90"
        />
      </CollapsibleTrigger>
    </div>
  );
};

export type ToolContentProps = ComponentProps<typeof CollapsibleContent>;

export const ToolContent = ({ className, ...props }: ToolContentProps) => (
  <CollapsibleContent
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 space-y-4 p-4 text-popover-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in",
      className
    )}
    {...props}
  />
);

export type ToolInputProps = ComponentProps<"div"> & {
  input: ToolPart["input"];
};

export const ToolInput = ({ className, input, ...props }: ToolInputProps) => (
  <div className={cn("space-y-2 overflow-hidden", className)} {...props}>
    <h4 className="text-muted-foreground text-xs uppercase tracking-wide">
      Parameters
    </h4>
    <div className="rounded-md">
      <CodeBlock code={JSON.stringify(input, null, 2)} language="json" />
    </div>
  </div>
);

export type ToolOutputProps = ComponentProps<"div"> & {
  output: ToolPart["output"];
  errorText: ToolPart["errorText"];
};

export const ToolOutput = ({
  className,
  output,
  errorText,
  ...props
}: ToolOutputProps) => {
  if (!(output || errorText)) {
    return null;
  }

  let Output = <div>{output as ReactNode}</div>;

  if (typeof output === "object" && !isValidElement(output)) {
    Output = (
      <CodeBlock code={JSON.stringify(output, null, 2)} language="json" />
    );
  } else if (typeof output === "string") {
    Output = <CodeBlock code={output} language="json" />;
  }

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <h4 className="text-muted-foreground text-xs uppercase tracking-wide">
        {errorText ? "Error" : "Result"}
      </h4>
      <div
        className={cn(
          "overflow-x-auto rounded-md text-xs [&_table]:w-full p-2",
          errorText
            ? "bg-destructive/5 text-destructive"
            : "text-foreground"
        )}
      >
        {errorText && (
          <div className="flex items-start gap-2">
            <HugeiconsIcon
              icon={Alert02Icon}
              strokeWidth={1.5}
              className="size-3.5 shrink-0"
            />
            <span>{errorText}</span>
          </div>
        )}
        {Output}
      </div>
    </div>
  );
};
