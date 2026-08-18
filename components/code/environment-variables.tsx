"use client";

import { CodeIcons } from "@/icons/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  AlertCircleIcon,
  Copy01Icon,
  Download01Icon,
  Tick02Icon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps, HTMLAttributes } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface EnvironmentVariablesContextType {
  showValues: boolean;
  setShowValues: (show: boolean) => void;
  /** Each `EnvironmentVariable` reports itself so the file can be written. */
  registerVariable: (name: string, value: string) => () => void;
  getVariables: () => { name: string; value: string }[];
}

// Default noop for context default value
// oxlint-disable-next-line eslint(no-empty-function)
const noop = () => {};

const EnvironmentVariablesContext =
  createContext<EnvironmentVariablesContextType>({
    getVariables: () => [],
    registerVariable: () => noop,
    setShowValues: noop,
    showValues: false,
  });

export type EnvironmentVariablesProps = HTMLAttributes<HTMLDivElement> & {
  showValues?: boolean;
  defaultShowValues?: boolean;
  onShowValuesChange?: (show: boolean) => void;
};

export const EnvironmentVariables = ({
  showValues: controlledShowValues,
  defaultShowValues = false,
  onShowValuesChange,
  className,
  children,
  ...props
}: EnvironmentVariablesProps) => {
  const [internalShowValues, setInternalShowValues] =
    useState(defaultShowValues);
  const showValues = controlledShowValues ?? internalShowValues;

  const setShowValues = useCallback(
    (show: boolean) => {
      setInternalShowValues(show);
      onShowValuesChange?.(show);
    },
    [onShowValuesChange]
  );

  // A ref, not state: registration must not re-render the tree, and the
  // download button only reads the set when it is clicked.
  const variablesRef = useRef(new Map<string, string>());

  const registerVariable = useCallback((name: string, value: string) => {
    variablesRef.current.set(name, value);
    return () => {
      variablesRef.current.delete(name);
    };
  }, []);

  const getVariables = useCallback(
    () => Array.from(variablesRef.current, ([name, value]) => ({ name, value })),
    []
  );

  const contextValue = useMemo(
    () => ({ getVariables, registerVariable, setShowValues, showValues }),
    [getVariables, registerVariable, setShowValues, showValues]
  );

  return (
    <EnvironmentVariablesContext.Provider value={contextValue}>
      <div
        className={cn("rounded-2xl overflow-hidden border bg-background", className)}
        {...props}
      >
        {children}
      </div>
    </EnvironmentVariablesContext.Provider>
  );
};

export type EnvironmentVariablesHeaderProps = HTMLAttributes<HTMLDivElement>;

export const EnvironmentVariablesHeader = ({
  className,
  children,
  ...props
}: EnvironmentVariablesHeaderProps) => (
  <div
    className={cn(
      "flex items-center justify-between gap-4 border-b py-2 px-4 bg-muted/20",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export type EnvironmentVariablesTitleProps = HTMLAttributes<HTMLHeadingElement>;

export const EnvironmentVariablesTitle = ({
  className,
  children,
  ...props
}: EnvironmentVariablesTitleProps) => (
  <div
    className={cn("flex items-center gap-2 font-medium text-sm", className)}
    {...props}
  >
    <CodeIcons.env className="size-4 shrink-0 text-muted-foreground" />
    {children ?? ".env"}
  </div>
);

export type EnvironmentVariablesToggleProps = ComponentProps<typeof Button> & {
  /** Overrides the tooltip label — defaults to the action the toggle performs. */
  tooltip?: string;
  /**
   * Warns with a toast the first time values are revealed. Secrets on screen
   * are worth a nudge; set to `false` for non-sensitive values.
   */
  warnOnReveal?: boolean;
};

export const EnvironmentVariablesToggle = ({
  className,
  tooltip,
  warnOnReveal = true,
  onClick,
  children,
  ...props
}: EnvironmentVariablesToggleProps) => {
  const { showValues, setShowValues } = useContext(EnvironmentVariablesContext);
  const label = showValues ? "Hide values" : "Show values";

  // Compose rather than replace: when this button is used as the render target
  // of a Tooltip trigger, the wrapper supplies its own `onClick`.
  const handleClick = useCallback<
    NonNullable<ComponentProps<typeof Button>["onClick"]>
  >(
    (event) => {
      onClick?.(event);
      const next = !showValues;
      setShowValues(next);
      if (next && warnOnReveal) {
        toast.add({
          description: "Anyone looking at your screen can read them.",
          title: "Values are visible",
          type: "warning",
        });
      }
    },
    [onClick, setShowValues, showValues, warnOnReveal]
  );

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label={label}
            aria-pressed={showValues}
            className={cn("shrink-0", className)}
            size="icon-sm"
            variant="ghost"
            {...props}
            onClick={handleClick}
          >
            {children ?? (
              <HugeiconsIcon
                icon={showValues ? ViewOffSlashIcon : ViewIcon}
                strokeWidth={1.5}
                className="text-muted-foreground"
              />
            )}
          </Button>
        }
      />
      <TooltipContent>{tooltip ?? label}</TooltipContent>
    </Tooltip>
  );
};

// Anything that would not survive a round trip through a dotenv parser bare —
// whitespace, comment markers, quotes — gets quoted and escaped.
const unquotedEnvValue = /^[\w./:@-]*$/;

const formatEnvValue = (value: string) => {
  if (unquotedEnvValue.test(value)) {
    return value;
  }
  const escaped = value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");
  return `"${escaped}"`;
};

export type EnvironmentVariablesDownloadButtonProps = ComponentProps<
  typeof Button
> & {
  /** Name the downloaded file gets on disk. */
  filename?: string;
  /** Overrides the tooltip label — defaults to "Download <filename>". */
  tooltip?: string;
  onDownload?: () => void;
  onError?: (error: Error) => void;
};

export const EnvironmentVariablesDownloadButton = ({
  filename = ".env",
  tooltip,
  onDownload,
  onError,
  onClick,
  children,
  className,
  ...props
}: EnvironmentVariablesDownloadButtonProps) => {
  const { getVariables } = useContext(EnvironmentVariablesContext);

  const download = useCallback(() => {
    const variables = getVariables();

    if (variables.length === 0) {
      toast.add({ title: "Nothing to download", type: "error" });
      onError?.(new Error("No environment variables to download"));
      return;
    }

    try {
      const contents = `${variables
        .map(({ name, value }) => `${name}=${formatEnvValue(value)}`)
        .join("\n")}\n`;

      const url = URL.createObjectURL(
        new Blob([contents], { type: "text/plain;charset=utf-8" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      // The download starts synchronously; free the blob once this task ends.
      window.setTimeout(() => URL.revokeObjectURL(url), 0);

      toast.add({
        description: `${variables.length} variable${
          variables.length === 1 ? "" : "s"
        } written to ${filename}`,
        title: "Downloaded",
        type: "success",
      });
      onDownload?.();
    } catch (error) {
      toast.add({ title: "Could not download the file", type: "error" });
      onError?.(error as Error);
    }
  }, [filename, getVariables, onDownload, onError]);

  // Compose rather than replace: when this button is used as the render target
  // of a Tooltip trigger, the wrapper supplies its own `onClick`.
  const handleClick = useCallback<
    NonNullable<ComponentProps<typeof Button>["onClick"]>
  >(
    (event) => {
      onClick?.(event);
      download();
    },
    [onClick, download]
  );

  const label = tooltip ?? `Download ${filename}`;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label={label}
            className={cn("shrink-0", className)}
            size="icon-sm"
            variant="ghost"
            {...props}
            onClick={handleClick}
          >
            {children ?? (
              <HugeiconsIcon icon={Download01Icon} strokeWidth={1.5} className="text-muted-foreground" />
            )}
          </Button>
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};

export type EnvironmentVariablesContentProps = HTMLAttributes<HTMLDivElement>;

export const EnvironmentVariablesContent = ({
  className,
  children,
  ...props
}: EnvironmentVariablesContentProps) => (
  <div className={cn("space-y-1 divide-y", className)} {...props}>
    {children}
  </div>
);

interface EnvironmentVariableContextType {
  name: string;
  value: string;
}

const EnvironmentVariableContext =
  createContext<EnvironmentVariableContextType>({
    name: "",
    value: "",
  });

export type EnvironmentVariableGroupProps = HTMLAttributes<HTMLDivElement>;

export const EnvironmentVariableGroup = ({
  className,
  children,
  ...props
}: EnvironmentVariableGroupProps) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>
    {children}
  </div>
);

export type EnvironmentVariableNameProps = HTMLAttributes<HTMLSpanElement>;

export const EnvironmentVariableName = ({
  className,
  children,
  ...props
}: EnvironmentVariableNameProps) => {
  const { name } = useContext(EnvironmentVariableContext);

  return (
    <span
      className={cn(
        "flex min-w-0 items-center gap-1 font-mono text-xs font-medium text-sky-600 dark:text-sky-400",
        className
      )}
      {...props}
    >
      <span className="truncate">{children ?? name}</span>
      <span className="shrink-0 text-muted-foreground">=</span>
    </span>
  );
};

export type EnvironmentVariableValueProps = HTMLAttributes<HTMLSpanElement>;

export const EnvironmentVariableValue = ({
  className,
  children,
  ...props
}: EnvironmentVariableValueProps) => {
  const { value } = useContext(EnvironmentVariableContext);
  const { showValues } = useContext(EnvironmentVariablesContext);

  const displayValue = showValues
    ? value
    : "•".repeat(Math.min(value.length, 20));

  return (
    <span
      className={cn(
        "truncate font-mono text-muted-foreground text-xs",
        !showValues && "select-none",
        className
      )}
      {...props}
    >
      {children ?? displayValue}
    </span>
  );
};

export type EnvironmentVariableProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  value: string;
};

export const EnvironmentVariable = ({
  name,
  value,
  className,
  children,
  ...props
}: EnvironmentVariableProps) => {
  const envVarContextValue = useMemo(() => ({ name, value }), [name, value]);
  const { registerVariable } = useContext(EnvironmentVariablesContext);

  useEffect(
    () => registerVariable(name, value),
    [registerVariable, name, value]
  );

  return (
    <EnvironmentVariableContext.Provider value={envVarContextValue}>
      <div
        className={cn(
          "flex items-center justify-between gap-4 px-4 py-2",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <EnvironmentVariableGroup className="min-w-0">
              <EnvironmentVariableName />
            </EnvironmentVariableGroup>
            <EnvironmentVariableValue />
          </>
        )}
      </div>
    </EnvironmentVariableContext.Provider>
  );
};

export type EnvironmentVariableCopyButtonProps = ComponentProps<
  typeof Button
> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
  copyFormat?: "name" | "value" | "export";
  /** Overrides the tooltip label — defaults to the copy format. */
  tooltip?: string;
};

const copyFormatLabels = {
  export: "Copy export statement",
  name: "Copy variable name",
  value: "Copy value",
};

export const EnvironmentVariableCopyButton = ({
  onCopy,
  onError,
  onClick,
  timeout = 2000,
  copyFormat = "value",
  tooltip,
  children,
  className,
  ...props
}: EnvironmentVariableCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number>(0);
  const { name, value } = useContext(EnvironmentVariableContext);

  const getTextToCopy = useCallback((): string => {
    const formatMap = {
      export: () => `export ${name}="${value}"`,
      name: () => name,
      value: () => value,
    };
    return formatMap[copyFormat]();
  }, [name, value, copyFormat]);

  const copyToClipboard = useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      toast.add({ title: "Could not copy to clipboard", type: "error" });
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      if (!isCopied) {
        await navigator.clipboard.writeText(getTextToCopy());
        setIsCopied(true);
        toast.add({
          title: `${name} copied`,
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
  }, [getTextToCopy, isCopied, name, onCopy, onError, timeout]);

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

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current);
    },
    []
  );

  const label = tooltip ?? copyFormatLabels[copyFormat];

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label={label}
            className={cn("shrink-0", className)}
            size="icon-sm"
            variant="ghost"
            {...props}
            onClick={handleClick}
          >
            {children ?? (
              <HugeiconsIcon
                icon={isCopied ? Tick02Icon : Copy01Icon}
                strokeWidth={1.5}
                className="text-muted-foreground"
              />
            )}
          </Button>
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};
export type EnvironmentVariableRequiredProps = ComponentProps<typeof Badge>;

export const EnvironmentVariableRequired = ({
  className,
  children,
  ...props
}: EnvironmentVariableRequiredProps) => {
  const label = typeof children === "string" ? children : "Required";

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Badge
            variant="outline"
            className={cn(
              "size-5 cursor-pointer rounded-full border-amber-200 bg-amber-50 p-0 text-amber-600 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400",
              className
            )}
            aria-label={label}
            {...props}
          >
            <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
          </Badge>
        }
      />
      <TooltipContent>{children ?? "Required"}</TooltipContent>
    </Tooltip>
  );
};
