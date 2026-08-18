"use client";

import {
  createRawTokens,
  highlightCode,
  TokenSpan,
} from "@/components/code/code-block";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
} from "@/components/ui/input-group";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { BundledLanguage, ThemedToken } from "shiki";

interface SnippetContextType {
  code: string;
  language: BundledLanguage;
}

const SnippetContext = createContext<SnippetContextType>({
  code: "",
  language: "bash",
});

export type SnippetProps = ComponentProps<typeof InputGroup> & {
  code: string;
  /** Shiki language the code is highlighted as — commands read best as "bash". */
  language?: BundledLanguage;
};

export const Snippet = ({
  code,
  language = "bash",
  className,
  children,
  ...props
}: SnippetProps) => {
  const contextValue = useMemo(() => ({ code, language }), [code, language]);

  return (
    <SnippetContext.Provider value={contextValue}>
      <InputGroup className={cn("font-mono text-sm! bg-background", className)} {...props}>
        {children}
      </InputGroup>
    </SnippetContext.Provider>
  );
};

export type SnippetAddonProps = ComponentProps<typeof InputGroupAddon>;

export const SnippetAddon = (props: SnippetAddonProps) => (
  <InputGroupAddon {...props} />
);

export type SnippetTextProps = ComponentProps<typeof InputGroupText>;

export const SnippetText = ({ className, ...props }: SnippetTextProps) => (
  <InputGroupText
    className={cn("ps-2 font-normal text-muted-foreground", className)}
    {...props}
  />
);

export type SnippetInputProps = ComponentProps<"div">;

export const SnippetInput = ({
  className,
  children,
  ...props
}: SnippetInputProps) => {
  const { code, language } = useContext(SnippetContext);

  // Same SSR contract as CodeBlockContent: always render raw tokens first so
  // the server HTML matches the client's first paint, then swap in the
  // highlighted tokens from the shared cache after mount.
  const rawTokens = useMemo(() => createRawTokens(code), [code]);
  const [tokenized, setTokenized] = useState(rawTokens);
  const [prevKey, setPrevKey] = useState({ code, language });

  if (prevKey.code !== code || prevKey.language !== language) {
    setPrevKey({ code, language });
    setTokenized(rawTokens);
  }

  useLayoutEffect(() => {
    let cancelled = false;

    const cached = highlightCode(code, language, (result) => {
      if (!cancelled) {
        setTokenized(result);
      }
    });

    if (cached) {
      setTokenized(cached);
    }

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  // The snippet is a one-line pattern: lines beyond the first flow inline,
  // separated by a space — the same collapse a readonly <input> applied.
  const keyedTokens = useMemo(
    () =>
      tokenized.tokens.flatMap((line, lineIdx) => [
        ...(lineIdx > 0
          ? [
              {
                key: `separator-${lineIdx}`,
                token: { content: " " } as ThemedToken,
              },
            ]
          : []),
        ...line.map((token, tokenIdx) => ({
          key: `line-${lineIdx}-token-${tokenIdx}`,
          token,
        })),
      ]),
    [tokenized.tokens]
  );

  return (
    <div
      className={cn(
        "min-w-0 flex-1 select-all overflow-x-auto px-2.5 text-foreground whitespace-nowrap",
        className
      )}
      {...props}
    >
      {children ?? (
        <code>
          {keyedTokens.map(({ key, token }) => (
            <TokenSpan key={key} token={token} />
          ))}
        </code>
      )}
    </div>
  );
};

export type SnippetCopyButtonProps = ComponentProps<typeof InputGroupButton> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const SnippetCopyButton = ({
  onCopy,
  onError,
  onClick,
  timeout = 2000,
  children,
  className,
  ...props
}: SnippetCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number>(0);
  const { code } = useContext(SnippetContext);

  const copyToClipboard = useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      toast.add({ title: "Could not copy to clipboard", type: "error" });
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      if (!isCopied) {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        toast.add({
          description: code,
          title: "Copied",
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
  }, [code, isCopied, onCopy, onError, timeout]);

  // Compose rather than replace: when this button is used as the render target
  // of a Tooltip trigger, the wrapper supplies its own `onClick`.
  const handleClick = useCallback<
    NonNullable<ComponentProps<typeof InputGroupButton>["onClick"]>
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
    <InputGroupButton
      aria-label="Copy"
      className={cn("shrink-0", className)}
      size="icon-xs"
      {...props}
      onClick={handleClick}
    >
      {children ?? (
        <HugeiconsIcon
          className="size-3.5"
          icon={isCopied ? Tick02Icon : Copy01Icon}
          strokeWidth={2}
        />
      )}
    </InputGroupButton>
  );
};
