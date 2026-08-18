"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { highlightCode } from "@/lib/highlight-code";
import { cn } from "@/lib/utils";
import {
  type ComponentProps,
  type HTMLAttributes,
  useEffect,
  useState,
} from "react";

export type CodeCommandProps = ComponentProps<typeof Tabs>;

export const CodeCommand = ({ className, ...props }: CodeCommandProps) => (
  <Tabs
    className={cn(
      "group relative w-full gap-0 overflow-hidden rounded-3xl border",
      className,
    )}
    {...props}
  />
);

export type CodeCommandHeaderProps = HTMLAttributes<HTMLDivElement>;

export const CodeCommandHeader = ({ className, ...props }: CodeCommandHeaderProps) => (
  <div
    className={cn(
      "flex items-center gap-2 border-b border-border/50 px-3 py-0.5",
      className,
    )}
    {...props}
  />
);

export type CodeCommandTabsListProps = ComponentProps<typeof TabsList>;

export const CodeCommandTabsList = ({
  className,
  ...props
}: CodeCommandTabsListProps) => (
  <TabsList
    className={cn("rounded-none bg-transparent p-0 border-none", className)}
    {...props}
  />
);

export type CodeCommandTabsTriggerProps = ComponentProps<typeof TabsTrigger>;

export const CodeCommandTabsTrigger = ({
  className,
  ...props
}: CodeCommandTabsTriggerProps) => (
  <TabsTrigger
    className={cn(
      "h-7 gap-1.5 border-b-2 border-transparent pt-0.5 text-xs data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:underline data-[state=active]:shadow-none",
      className,
    )}
    {...props}
  />
);

export type CodeCommandTabsContentProps = ComponentProps<typeof TabsContent> & {
  language?: string;
  highlight?: boolean;
};

export const CodeCommandTabsContent = ({
  className,
  children,
  language = "bash",
  highlight = true,
  ...props
}: CodeCommandTabsContentProps) => {
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const codeString = typeof children === "string" ? children : String(children);

  useEffect(() => {
    if (!highlight) {
      return;
    }

    const highlightAsync = async () => {
      try {
        const highlighted = await highlightCode(codeString, language);
        setHighlightedCode(highlighted);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        // Fallback to plain text
        setHighlightedCode(`<pre><code>${codeString}</code></pre>`);
      }
    };

    highlightAsync();
  }, [codeString, language, highlight]);

  if (!highlight) {
    return (
      <TabsContent
        className={cn("mt-0 bg-background px-4 py-3.5 text-sm", className)}
        {...props}
      >
        <pre className="truncate">{children}</pre>
      </TabsContent>
    );
  }

  return (
    <TabsContent
      className={cn("mt-0 bg-background text-sm", className)}
      {...props}
    >
      {highlightedCode ? (
        <div
          className="[&>pre]:!bg-transparent [&>pre]:px-4! [&>pre]:py-3.5"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: "this is needed."
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      ) : (
        // Fallback while highlighting is loading
        <pre className="px-4 py-3.5">
          <code className="relative text-xs leading-none">{codeString}</code>
        </pre>
      )}
    </TabsContent>
  );
};
