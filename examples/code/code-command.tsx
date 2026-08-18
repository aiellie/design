"use client";

import {
  CodeCommand,
  CodeCommandHeader,
  CodeCommandTabsContent,
  CodeCommandTabsList,
  CodeCommandTabsTrigger,
} from "@/components/code/code-command";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/toast";
import { CheckIcon, Copy01Icon, TerminalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";

type Command = {
  label: string;
  icon?: HugeiconsIcon;
  code: string;
};

const commands: Command[] = [
  {
    label: "pnpm",
    code: "pnpm add @linderlabs/CodeCommand",
  },
  {
    label: "npm",
    code: "npm install @linderlabs/CodeCommand",
  },
  {
    label: "yarn",
    code: "yarn add @linderlabs/CodeCommand",
  },
  {
    label: "bun",
    code: "bun add @linderlabs/CodeCommand",
  },
];

export function CodeCommandExample() {
  const [value, setValue] = useState<string>(commands[0].label);
  const [isCopied, setIsCopied] = useState(false);
  const activeCommand = commands.find((command) => command.label === value);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="mx-auto w-full max-w-md">
      <CodeCommand onValueChange={setValue} value={value}>
        <CodeCommandHeader>
          <div className="flex size-4 items-center justify-center rounded-full bg-foreground opacity-70">
            <HugeiconsIcon icon={TerminalIcon} className="size-3 text-white" />
          </div>
          <CodeCommandTabsList>
            {commands.map((command) => (
              <CodeCommandTabsTrigger key={command.label} value={command.label}>
                {command.icon && <command.icon className="size-3.5" />}
                <span>{command.label}</span>
              </CodeCommandTabsTrigger>
            ))}
          </CodeCommandTabsList>
        </CodeCommandHeader>
        {commands.map((command) => (
          <CodeCommandTabsContent key={command.label} value={command.label}>
            {command.code}
          </CodeCommandTabsContent>
        ))}
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                data-slot="copy-button"
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
                onClick={() => {
                  navigator.clipboard.writeText(activeCommand?.code || "");
                  setIsCopied(true);
                  toast.add({ title: "Copied to clipboard", type: "success" });
                }}
              />
            }
          >
            <span className="sr-only">Copy</span>
            {isCopied ? (
              <HugeiconsIcon icon={CheckIcon} className="size-4" />
            ) : (
              <HugeiconsIcon icon={Copy01Icon} className="size-4" />
            )}
          </TooltipTrigger>
          <TooltipContent>
            {isCopied ? "Copied" : "Copy to Clipboard"}
          </TooltipContent>
        </Tooltip>
      </CodeCommand>
    </div>
  );
}
