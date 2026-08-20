"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { BrandIcons } from "@/icons/icons";
import {
  ChevronDownIcon,
  LinkSquare02Icon,
  Message01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import { createContext, useContext, useMemo } from "react";

const ExternalLink = (
  <HugeiconsIcon
    className="size-4 shrink-0"
    icon={LinkSquare02Icon}
    strokeWidth={2}
  />
);

const providers = {
  chatgpt: {
    createUrl: (prompt: string) =>
      `https://chatgpt.com/?${new URLSearchParams({
        hints: "search",
        prompt,
      })}`,
    icon: <BrandIcons.openai />,
    title: "Open in ChatGPT",
  },
  claude: {
    createUrl: (q: string) =>
      `https://claude.ai/new?${new URLSearchParams({
        q,
      })}`,
    icon: <BrandIcons.claude />,
    title: "Open in Claude",
  },
  cursor: {
    createUrl: (text: string) => {
      const url = new URL("https://cursor.com/link/prompt");
      url.searchParams.set("text", text);
      return url.toString();
    },
    icon: <BrandIcons.cursor />,
    title: "Open in Cursor",
  },
  github: {
    createUrl: (url: string) => url,
    icon: <BrandIcons.github />,
    title: "Open in GitHub",
  },
  scira: {
    createUrl: (q: string) =>
      `https://scira.ai/?${new URLSearchParams({
        q,
      })}`,
    icon: <BrandIcons.scira />,
    title: "Open in Scira",
  },
  t3: {
    createUrl: (q: string) =>
      `https://t3.chat/new?${new URLSearchParams({
        q,
      })}`,
    icon: <HugeiconsIcon icon={Message01Icon} strokeWidth={2} />,
    title: "Open in T3 Chat",
  },
  v0: {
    createUrl: (q: string) =>
      `https://v0.app?${new URLSearchParams({
        q,
      })}`,
    icon: <BrandIcons.v0 />,
    title: "Open in v0",
  },
};

const OpenInContext = createContext<{ query: string } | undefined>(undefined);

const useOpenInContext = () => {
  const context = useContext(OpenInContext);
  if (!context) {
    throw new Error("OpenIn components must be used within an OpenIn provider");
  }
  return context;
};

export type OpenInProps = ComponentProps<typeof DropdownMenu> & {
  query: string;
};

export const OpenIn = ({ query, ...props }: OpenInProps) => {
  const contextValue = useMemo(() => ({ query }), [query]);

  return (
    <OpenInContext.Provider value={contextValue}>
      <DropdownMenu {...props} />
    </OpenInContext.Provider>
  );
};

export type OpenInContentProps = ComponentProps<typeof DropdownMenuContent>;

export const OpenInContent = ({ className, ...props }: OpenInContentProps) => (
  <DropdownMenuContent
    align="start"
    className={cn("w-[240px]", className)}
    {...props}
  />
);

export type OpenInItemProps = ComponentProps<typeof DropdownMenuItem>;

export const OpenInItem = (props: OpenInItemProps) => (
  <DropdownMenuItem {...props} />
);

export type OpenInLabelProps = ComponentProps<typeof DropdownMenuLabel>;

export const OpenInLabel = (props: OpenInLabelProps) => (
  <DropdownMenuLabel {...props} />
);

export type OpenInSeparatorProps = ComponentProps<typeof DropdownMenuSeparator>;

export const OpenInSeparator = (props: OpenInSeparatorProps) => (
  <DropdownMenuSeparator {...props} />
);

export type OpenInTriggerProps = ComponentProps<typeof DropdownMenuTrigger>;

export const OpenInTrigger = ({ children, ...props }: OpenInTriggerProps) => (
  <DropdownMenuTrigger
    render={
      <Button type="button" variant="outline">
        {children ?? (
          <>
            Open in chat
            <HugeiconsIcon
              className="size-4"
              icon={ChevronDownIcon}
              strokeWidth={2}
            />
          </>
        )}
      </Button>
    }
    {...props}
  />
);

export type OpenInChatGPTProps = ComponentProps<typeof DropdownMenuItem>;

export const OpenInChatGPT = (props: OpenInChatGPTProps) => {
  const { query } = useOpenInContext();
  return (
    <DropdownMenuItem {...props} render={<a className="flex items-center gap-2" href={providers.chatgpt.createUrl(query)} rel="noopener" target="_blank" />}><span className="shrink-0">{providers.chatgpt.icon}</span><span className="flex-1">{providers.chatgpt.title}</span>{ExternalLink}</DropdownMenuItem>
  );
};

export type OpenInClaudeProps = ComponentProps<typeof DropdownMenuItem>;

export const OpenInClaude = (props: OpenInClaudeProps) => {
  const { query } = useOpenInContext();
  return (
    <DropdownMenuItem {...props} render={<a className="flex items-center gap-2" href={providers.claude.createUrl(query)} rel="noopener" target="_blank" />}><span className="shrink-0">{providers.claude.icon}</span><span className="flex-1">{providers.claude.title}</span>{ExternalLink}</DropdownMenuItem>
  );
};

export type OpenInT3Props = ComponentProps<typeof DropdownMenuItem>;

export const OpenInT3 = (props: OpenInT3Props) => {
  const { query } = useOpenInContext();
  return (
    <DropdownMenuItem {...props} render={<a className="flex items-center gap-2" href={providers.t3.createUrl(query)} rel="noopener" target="_blank" />}><span className="shrink-0">{providers.t3.icon}</span><span className="flex-1">{providers.t3.title}</span>{ExternalLink}</DropdownMenuItem>
  );
};

export type OpenInSciraProps = ComponentProps<typeof DropdownMenuItem>;

export const OpenInScira = (props: OpenInSciraProps) => {
  const { query } = useOpenInContext();
  return (
    <DropdownMenuItem {...props} render={<a className="flex items-center gap-2" href={providers.scira.createUrl(query)} rel="noopener" target="_blank" />}><span className="shrink-0">{providers.scira.icon}</span><span className="flex-1">{providers.scira.title}</span>{ExternalLink}</DropdownMenuItem>
  );
};

export type OpenInv0Props = ComponentProps<typeof DropdownMenuItem>;

export const OpenInv0 = (props: OpenInv0Props) => {
  const { query } = useOpenInContext();
  return (
    <DropdownMenuItem {...props} render={<a className="flex items-center gap-2" href={providers.v0.createUrl(query)} rel="noopener" target="_blank" />}><span className="shrink-0">{providers.v0.icon}</span><span className="flex-1">{providers.v0.title}</span>{ExternalLink}</DropdownMenuItem>
  );
};

export type OpenInCursorProps = ComponentProps<typeof DropdownMenuItem>;

export const OpenInCursor = (props: OpenInCursorProps) => {
  const { query } = useOpenInContext();
  return (
    <DropdownMenuItem {...props} render={<a className="flex items-center gap-2" href={providers.cursor.createUrl(query)} rel="noopener" target="_blank" />}><span className="shrink-0">{providers.cursor.icon}</span><span className="flex-1">{providers.cursor.title}</span>{ExternalLink}</DropdownMenuItem>
  );
};
