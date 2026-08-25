"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Tool } from "ai";
import { HugeiconsIcon } from "@hugeicons/react";
import { BotIcon } from "@hugeicons/core-free-icons";
import type { ComponentProps } from "react";
import { memo } from "react";

import { CodeBlock } from "@/components/code/code-block";
import { type IconData, ProviderIcons } from "@/icons/icons";

export type AgentProps = ComponentProps<"div">;

export const Agent = memo(({ className, ...props }: AgentProps) => (
  <div
    className={cn("not-prose w-full overflow-hidden rounded-xl border", className)}
    {...props}
  />
));

export type AgentBannerProps = ComponentProps<"img">;

export const AgentBanner = memo(
  ({ alt = "", className, ...props }: AgentBannerProps) => (
    <img
      alt={alt}
      className={cn("h-24 w-full object-cover", className)}
      {...props}
    />
  )
);

export type AgentHeaderProps = ComponentProps<"div"> & {
  name: string;
  model?: string;
};

const getProviderIcon = (model: string) => {
  const provider = model
    .split("/")[0]
    ?.toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  if (!provider) {
    return undefined;
  }

  return Object.entries(ProviderIcons).find(
    ([name]) => name.toLowerCase() === provider
  )?.[1];
};

export const AgentHeader = memo(
  ({ className, name, model, ...props }: AgentHeaderProps) => {
    const ProviderIcon = model ? getProviderIcon(model) : undefined;

    return (
      <div
        className={cn(
          "flex w-full items-center justify-between gap-4 p-3",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={BotIcon} className="size-4 text-muted-foreground" />
          <span className="font-medium text-sm">{name}</span>
        </div>
        {model && (
          <Badge className="font-mono text-xs" title={model} variant="secondary">
            {ProviderIcon ? (
              <>
                <ProviderIcon />
                <span className="sr-only">{model}</span>
              </>
            ) : (
              model
            )}
          </Badge>
        )}
      </div>
    );
  }
);

export type AgentContentProps = ComponentProps<"div">;

export const AgentContent = memo(
  ({ className, ...props }: AgentContentProps) => (
    <div className={cn("space-y-4 p-4 pt-0", className)} {...props} />
  )
);

export type AgentInstructionsProps = ComponentProps<"div"> & {
  children: string;
};

export const AgentInstructions = memo(
  ({ className, children, ...props }: AgentInstructionsProps) => (
    <div className={cn("space-y-2", className)} {...props}>
      <span className="font-medium text-muted-foreground text-sm">
        Instructions
      </span>
      <Input readOnly value={children} />
    </div>
  )
);

export type AgentToolsProps = ComponentProps<typeof Accordion>;

export const AgentTools = memo(({ className, ...props }: AgentToolsProps) => (
  <div className={cn("space-y-2", className)}>
    <span className="font-medium text-muted-foreground text-sm">Tools</span>
    <Accordion className="rounded-lg border" {...props} />
  </div>
));

export type AgentToolProps = ComponentProps<typeof AccordionItem> & {
  tool: Tool;
  icon?: IconData;
};

export const AgentTool = memo(
  ({ className, icon, tool, value, ...props }: AgentToolProps) => {
    const schema =
      "jsonSchema" in tool && tool.jsonSchema
        ? tool.jsonSchema
        : tool.inputSchema;

    return (
      <AccordionItem
        className={cn("border-b last:border-b-0", className)}
        value={value}
        {...props}
      >
        <AccordionTrigger className="px-3 py-2 text-sm hover:no-underline">
          <span className="flex items-center gap-2">
            {icon && (
              <HugeiconsIcon
                icon={icon}
                className="size-4 shrink-0 text-muted-foreground"
              />
            )}
            {typeof tool.description === "function" ? tool.description({ context: {}, experimental_sandbox: undefined }) : tool.description ?? "No description"}
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-3 pb-3">
          <div className="rounded-md">
            <CodeBlock code={JSON.stringify(schema, null, 2)} language="json" />
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }
);

export type AgentOutputProps = ComponentProps<"div"> & {
  schema: string;
};

export const AgentOutput = memo(
  ({ className, schema, ...props }: AgentOutputProps) => (
    <div className={cn("space-y-2", className)} {...props}>
      <span className="font-medium text-muted-foreground text-sm">
        Output Schema
      </span>
      <div className="rounded-md">
        <CodeBlock code={schema} language="typescript" />
      </div>
    </div>
  )
);

Agent.displayName = "Agent";
AgentBanner.displayName = "AgentBanner";
AgentHeader.displayName = "AgentHeader";
AgentContent.displayName = "AgentContent";
AgentInstructions.displayName = "AgentInstructions";
AgentTools.displayName = "AgentTools";
AgentTool.displayName = "AgentTool";
AgentOutput.displayName = "AgentOutput";
