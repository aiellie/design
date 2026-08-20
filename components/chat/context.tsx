"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BrainIcon,
  Coins01Icon,
  Database01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type { LanguageModelUsage } from "ai";
import type { ComponentProps } from "react";
import { createContext, useContext, useMemo } from "react";
import { getUsage } from "tokenlens";

const PERCENT_MAX = 100;
const ICON_RADIUS = 10;
const ICON_VIEWBOX = 24;
const ICON_CENTER = 12;
const ICON_STROKE_WIDTH = 2;

const USAGE_KINDS = ["input", "output", "reasoning", "cache"] as const;
type UsageKind = (typeof USAGE_KINDS)[number];

const usageKindStyles: Record<
  UsageKind,
  { bar: string; stroke: string; icon: string }
> = {
  input: {
    bar: "bg-info",
    stroke: "stroke-info",
    icon: "bg-info/10 text-info",
  },
  output: {
    bar: "bg-success",
    stroke: "stroke-success",
    icon: "bg-success/10 text-success",
  },
  reasoning: {
    bar: "bg-primary",
    stroke: "stroke-primary",
    icon: "bg-primary/10 text-primary",
  },
  cache: {
    bar: "bg-warning",
    stroke: "stroke-warning",
    icon: "bg-warning/10 text-warning",
  },
};

const getUsageSegments = (
  usage: LanguageModelUsage | undefined,
  maxTokens: number
) => {
  const cache = usage?.inputTokenDetails?.cacheReadTokens ?? 0;
  const reasoning = usage?.outputTokenDetails?.reasoningTokens ?? 0;
  const input =
    usage?.inputTokenDetails?.noCacheTokens ??
    Math.max(0, (usage?.inputTokens ?? 0) - cache);
  const output =
    usage?.outputTokenDetails?.textTokens ??
    Math.max(0, (usage?.outputTokens ?? 0) - reasoning);
  const counts: Record<UsageKind, number> = {
    cache,
    input,
    output,
    reasoning,
  };

  return USAGE_KINDS.map((kind) => {
    const tokens = counts[kind];
    return {
      kind,
      tokens,
      percent: maxTokens ? (tokens / maxTokens) * PERCENT_MAX : 0,
    };
  }).filter((segment) => segment.tokens > 0);
};

const usageIconClassName =
  "flex size-4 shrink-0 items-center justify-center rounded-[4px]";

const UsageKindIcon = ({
  icon,
  className,
}: {
  icon: IconSvgElement;
  className?: string;
}) => (
  <span className={cn(usageIconClassName, className)}>
    <HugeiconsIcon
      aria-hidden="true"
      className="size-2.5"
      icon={icon}
      strokeWidth={2}
    />
  </span>
);

type ModelId = string;

interface ContextSchema {
  usedTokens: number;
  maxTokens: number;
  usage?: LanguageModelUsage;
  modelId?: ModelId;
}

const ContextContext = createContext<ContextSchema | null>(null);

const useContextValue = () => {
  const context = useContext(ContextContext);

  if (!context) {
    throw new Error("Context components must be used within Context");
  }

  return context;
};

export type ContextProps = ComponentProps<typeof Popover> & ContextSchema;

export const Context = ({
  usedTokens,
  maxTokens,
  usage,
  modelId,
  ...props
}: ContextProps) => {
  const contextValue = useMemo(
    () => ({ maxTokens, modelId, usage, usedTokens }),
    [maxTokens, modelId, usage, usedTokens]
  );

  return (
    <ContextContext.Provider value={contextValue}>
      <Popover {...props} />
    </ContextContext.Provider>
  );
};

const ContextIcon = () => {
  const { usedTokens, maxTokens, usage } = useContextValue();
  const circumference = 2 * Math.PI * ICON_RADIUS;
  const usedPercent = maxTokens ? usedTokens / maxTokens : 0;
  const usedLength = circumference * usedPercent;
  const ringSegments = (() => {
    let offset = 0;
    return getUsageSegments(usage, maxTokens).map((segment) => {
      const length = circumference * (segment.percent / PERCENT_MAX);
      const next = { kind: segment.kind, length, offset };
      offset += length;
      return next;
    });
  })();

  return (
    <svg
      aria-label="Model context usage"
      height="20"
      role="img"
      viewBox={`0 0 ${ICON_VIEWBOX} ${ICON_VIEWBOX}`}
      width="20"
    >
      <circle
        cx={ICON_CENTER}
        cy={ICON_CENTER}
        fill="none"
        opacity="0.25"
        r={ICON_RADIUS}
        stroke="currentColor"
        strokeWidth={ICON_STROKE_WIDTH}
      />
      <g
        fill="none"
        strokeWidth={ICON_STROKE_WIDTH}
        transform={`rotate(-90 ${ICON_CENTER} ${ICON_CENTER})`}
      >
        {ringSegments.length > 0 ? (
          ringSegments.map((segment) => (
            <circle
              className={usageKindStyles[segment.kind].stroke}
              cx={ICON_CENTER}
              cy={ICON_CENTER}
              key={segment.kind}
              r={ICON_RADIUS}
              strokeDasharray={`${segment.length} ${circumference}`}
              strokeDashoffset={-segment.offset}
            />
          ))
        ) : (
          <circle
            cx={ICON_CENTER}
            cy={ICON_CENTER}
            opacity="0.7"
            r={ICON_RADIUS}
            stroke="currentColor"
            strokeDasharray={`${usedLength} ${circumference}`}
            strokeLinecap="round"
          />
        )}
      </g>
    </svg>
  );
};

export type ContextTriggerProps = ComponentProps<typeof Button>;

export const ContextTrigger = ({ children, ...props }: ContextTriggerProps) => {
  const { usedTokens, maxTokens } = useContextValue();
  const usedPercent = usedTokens / maxTokens;
  const renderedPercent = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    style: "percent",
  }).format(usedPercent);

  return (
    <PopoverTrigger
      render={
        <Button
          className="rounded-full"
          size="icon-sm"
          variant="outline"
          {...props}
        >
          {children ?? <ContextIcon />}
        </Button>
      }
    />
  );
};

export type ContextContentProps = ComponentProps<typeof PopoverContent>;

export const ContextContent = ({
  className,
  ...props
}: ContextContentProps) => (
  <PopoverContent
    className={cn("min-w-60 gap-0 divide-y overflow-hidden p-0", className)}
    {...props}
  />
);

export type ContextContentHeaderProps = ComponentProps<"div">;

export const ContextContentHeader = ({
  children,
  className,
  ...props
}: ContextContentHeaderProps) => {
  const { usedTokens, maxTokens, usage } = useContextValue();
  const usedPercent = usedTokens / maxTokens;
  const segments = getUsageSegments(usage, maxTokens);
  const displayPct = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    style: "percent",
  }).format(usedPercent);
  const used = new Intl.NumberFormat("en-US", {
    notation: "compact",
  }).format(usedTokens);
  const total = new Intl.NumberFormat("en-US", {
    notation: "compact",
  }).format(maxTokens);

  return (
    <div className={cn("w-full space-y-2 p-3", className)} {...props}>
      {children ?? (
        <>
          <div className="flex items-center justify-between gap-3 text-xs">
            <p>{displayPct}</p>
            <p className="font-mono text-muted-foreground">
              {used} / {total}
            </p>
          </div>
          <div
            aria-label="Model context usage"
            aria-valuemax={PERCENT_MAX}
            aria-valuemin={0}
            aria-valuenow={usedPercent * PERCENT_MAX}
            className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted"
            role="meter"
          >
            {segments.length > 0 ? (
              segments.map((segment) => (
                <div
                  className={cn("h-full", usageKindStyles[segment.kind].bar)}
                  key={segment.kind}
                  style={{ width: `${segment.percent}%` }}
                />
              ))
            ) : (
              <div
                className="h-full bg-primary"
                style={{ width: `${usedPercent * PERCENT_MAX}%` }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export type ContextContentBodyProps = ComponentProps<"div">;

export const ContextContentBody = ({
  children,
  className,
  ...props
}: ContextContentBodyProps) => (
  <div className={cn("w-full space-y-2 p-3", className)} {...props}>
    {children}
  </div>
);

export type ContextContentFooterProps = ComponentProps<"div">;

export const ContextContentFooter = ({
  children,
  className,
  ...props
}: ContextContentFooterProps) => {
  const { modelId, usage } = useContextValue();
  const costUSD = modelId
    ? getUsage({
        modelId,
        usage: {
          input: usage?.inputTokens ?? 0,
          output: usage?.outputTokens ?? 0,
          reasoningTokens: usage?.outputTokenDetails?.reasoningTokens ?? 0,
          cacheReads: usage?.inputTokenDetails?.cacheReadTokens ?? 0,
        },
      }).costUSD?.totalUSD
    : undefined;
  const totalCost = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(costUSD ?? 0);

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-3 bg-secondary/50 p-2 text-xs",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <HugeiconsIcon
              aria-hidden="true"
              className="size-3"
              icon={Coins01Icon}
              strokeWidth={2}
            />
            Total cost
          </span>
          <span>{totalCost}</span>
        </>
      )}
    </div>
  );
};

const TokensWithCost = ({
  tokens,
  costText,
}: {
  tokens?: number;
  costText?: string;
}) => (
  <span>
    {tokens === undefined
      ? "—"
      : new Intl.NumberFormat("en-US", {
          notation: "compact",
        }).format(tokens)}
    {costText ? (
      <span className="ml-2 text-muted-foreground">• {costText}</span>
    ) : null}
  </span>
);

export type ContextInputUsageProps = ComponentProps<"div">;

export const ContextInputUsage = ({
  className,
  children,
  ...props
}: ContextInputUsageProps) => {
  const { usage, modelId } = useContextValue();
  const inputTokens = usage?.inputTokens ?? 0;

  if (children) {
    return children;
  }

  if (!inputTokens) {
    return null;
  }

  const inputCost = modelId
    ? getUsage({
        modelId,
        usage: { input: inputTokens, output: 0 },
      }).costUSD?.totalUSD
    : undefined;
  const inputCostText = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(inputCost ?? 0);

  return (
    <div
      className={cn("flex items-center justify-between text-xs", className)}
      {...props}
    >
      <span className="flex items-center gap-1.5 text-muted-foreground">
        <UsageKindIcon
          className={usageKindStyles.input.icon}
          icon={ArrowDownIcon}
        />
        Input
      </span>
      <TokensWithCost costText={inputCostText} tokens={inputTokens} />
    </div>
  );
};

export type ContextOutputUsageProps = ComponentProps<"div">;

export const ContextOutputUsage = ({
  className,
  children,
  ...props
}: ContextOutputUsageProps) => {
  const { usage, modelId } = useContextValue();
  const outputTokens = usage?.outputTokens ?? 0;

  if (children) {
    return children;
  }

  if (!outputTokens) {
    return null;
  }

  const outputCost = modelId
    ? getUsage({
        modelId,
        usage: { input: 0, output: outputTokens },
      }).costUSD?.totalUSD
    : undefined;
  const outputCostText = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(outputCost ?? 0);

  return (
    <div
      className={cn("flex items-center justify-between text-xs", className)}
      {...props}
    >
      <span className="flex items-center gap-1.5 text-muted-foreground">
        <UsageKindIcon
          className={usageKindStyles.output.icon}
          icon={ArrowUpIcon}
        />
        Output
      </span>
      <TokensWithCost costText={outputCostText} tokens={outputTokens} />
    </div>
  );
};

export type ContextReasoningUsageProps = ComponentProps<"div">;

export const ContextReasoningUsage = ({
  className,
  children,
  ...props
}: ContextReasoningUsageProps) => {
  const { usage, modelId } = useContextValue();
  const reasoningTokens = usage?.outputTokenDetails?.reasoningTokens ?? 0;

  if (children) {
    return children;
  }

  if (!reasoningTokens) {
    return null;
  }

  const reasoningCost = modelId
    ? getUsage({
        modelId,
        usage: { reasoningTokens },
      }).costUSD?.totalUSD
    : undefined;
  const reasoningCostText = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(reasoningCost ?? 0);

  return (
    <div
      className={cn("flex items-center justify-between text-xs", className)}
      {...props}
    >
      <span className="flex items-center gap-1.5 text-muted-foreground">
        <UsageKindIcon
          className={usageKindStyles.reasoning.icon}
          icon={BrainIcon}
        />
        Reasoning
      </span>
      <TokensWithCost costText={reasoningCostText} tokens={reasoningTokens} />
    </div>
  );
};

export type ContextCacheUsageProps = ComponentProps<"div">;

export const ContextCacheUsage = ({
  className,
  children,
  ...props
}: ContextCacheUsageProps) => {
  const { usage, modelId } = useContextValue();
  const cacheTokens = usage?.inputTokenDetails?.cacheReadTokens ?? 0;

  if (children) {
    return children;
  }

  if (!cacheTokens) {
    return null;
  }

  const cacheCost = modelId
    ? getUsage({
        modelId,
        usage: { cacheReads: cacheTokens, input: 0, output: 0 },
      }).costUSD?.totalUSD
    : undefined;
  const cacheCostText = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(cacheCost ?? 0);

  return (
    <div
      className={cn("flex items-center justify-between text-xs", className)}
      {...props}
    >
      <span className="flex items-center gap-1.5 text-muted-foreground">
        <UsageKindIcon
          className={usageKindStyles.cache.icon}
          icon={Database01Icon}
        />
        Cache
      </span>
      <TokensWithCost costText={cacheCostText} tokens={cacheTokens} />
    </div>
  );
};
