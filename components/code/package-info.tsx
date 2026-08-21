"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import {
  ArrowRight01Icon,
  Copy01Icon,
  PackageIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type ChangeType = "major" | "minor" | "patch" | "added" | "removed";

interface PackageInfoContextType {
  name: string;
  currentVersion?: string;
  newVersion?: string;
  changeType?: ChangeType;
}

const PackageInfoContext = createContext<PackageInfoContextType>({
  name: "",
});

export type PackageInfoProps = ComponentProps<typeof Item> & {
  name: string;
  currentVersion?: string;
  newVersion?: string;
  changeType?: ChangeType;
};

/** A single package row — an outlined `Item` carrying its mark, name, and version. */
export const PackageInfo = ({
  name,
  currentVersion,
  newVersion,
  changeType,
  variant = "outline",
  children,
  ...props
}: PackageInfoProps) => {
  const contextValue = useMemo(
    () => ({ changeType, currentVersion, name, newVersion }),
    [changeType, currentVersion, name, newVersion]
  );

  return (
    <PackageInfoContext.Provider value={contextValue}>
      <Item variant={variant} {...props}>
        {children ?? (
          <>
            <PackageInfoIcon />
            <PackageInfoInfo>
              <PackageInfoName />
            </PackageInfoInfo>
            <PackageInfoVersion />
          </>
        )}
      </Item>
    </PackageInfoContext.Provider>
  );
};

export type PackageInfoIconProps = ComponentProps<typeof ItemMedia>;

/** Leading media for the package's mark; defaults to a package glyph. */
export const PackageInfoIcon = ({
  className,
  children,
  ...props
}: PackageInfoIconProps) => (
  <ItemMedia
    className={cn(
      "size-8 rounded-md bg-muted/50 text-muted-foreground [&_svg]:size-4",
      className
    )}
    {...props}
  >
    {children ?? <HugeiconsIcon icon={PackageIcon} strokeWidth={1.5} />}
  </ItemMedia>
);

export type PackageInfoInfoProps = ComponentProps<typeof ItemContent>;

export const PackageInfoInfo = ({
  className,
  children,
  ...props
}: PackageInfoInfoProps) => (
  <ItemContent className={cn("min-w-0 gap-0", className)} {...props}>
    {children}
  </ItemContent>
);

export type PackageInfoNameProps = ComponentProps<typeof ItemTitle>;

export const PackageInfoName = ({
  className,
  children,
  ...props
}: PackageInfoNameProps) => {
  const { name } = useContext(PackageInfoContext);

  return (
    <ItemTitle className={cn("font-mono font-normal", className)} {...props}>
      {children ?? name}
    </ItemTitle>
  );
};

const changeTypeDots: Record<ChangeType, string> = {
  added: "bg-blue-500",
  major: "bg-red-500",
  minor: "bg-amber-500",
  patch: "bg-emerald-500",
  removed: "bg-muted-foreground/40",
};

export type PackageInfoChangeTypeProps = HTMLAttributes<HTMLSpanElement>;

/** A small status dot colored by the change type. */
export const PackageInfoChangeType = ({
  className,
  ...props
}: PackageInfoChangeTypeProps) => {
  const { changeType } = useContext(PackageInfoContext);

  if (!changeType) {
    return null;
  }

  return (
    <span
      aria-label={changeType}
      className={cn(
        "size-1.5 shrink-0 rounded-full",
        changeTypeDots[changeType],
        className
      )}
      role="img"
      {...props}
    />
  );
};

export type PackageInfoVersionProps = HTMLAttributes<HTMLDivElement>;

/** `current → new` in mono, led by the change type dot when one is set. */
export const PackageInfoVersion = ({
  className,
  children,
  ...props
}: PackageInfoVersionProps) => {
  const { currentVersion, newVersion, changeType } =
    useContext(PackageInfoContext);

  if (!(currentVersion || newVersion || changeType)) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-1.5 font-mono text-muted-foreground text-xs tabular-nums",
        className
      )}
      {...props}
    >
      <PackageInfoChangeType />
      {children ?? (
        <>
          {currentVersion && (
            <span
              className={cn(changeType === "removed" && "line-through")}
            >
              {currentVersion}
            </span>
          )}
          {currentVersion && newVersion && (
            <HugeiconsIcon
              className="size-3 shrink-0 rtl:rotate-180"
              icon={ArrowRight01Icon}
              strokeWidth={1.5}
            />
          )}
          {newVersion && <span className="text-foreground">{newVersion}</span>}
          {!(currentVersion || newVersion) && (
            <span className="capitalize">{changeType}</span>
          )}
        </>
      )}
    </div>
  );
};

export type PackageInfoActionsProps = ComponentProps<typeof ItemActions>;

export const PackageInfoActions = ({
  className,
  children,
  ...props
}: PackageInfoActionsProps) => (
  <ItemActions className={cn("shrink-0 gap-1.5", className)} {...props}>
    {children}
  </ItemActions>
);

export type PackageInfoCopyButtonProps = ComponentProps<typeof Button> & {
  /** Text to copy — defaults to the package's install command. */
  command?: string;
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const PackageInfoCopyButton = ({
  command,
  onCopy,
  onError,
  onClick,
  timeout = 2000,
  children,
  className,
  ...props
}: PackageInfoCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number>(0);
  const { name, currentVersion, newVersion } = useContext(PackageInfoContext);

  const textToCopy =
    command ?? `npm i ${name}@${newVersion ?? currentVersion ?? "latest"}`;

  const copyToClipboard = useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      toast.add({ title: "Could not copy to clipboard", type: "error" });
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      if (!isCopied) {
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        toast.add({
          description: textToCopy,
          title: "Copied to clipboard",
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
  }, [isCopied, onCopy, onError, textToCopy, timeout]);

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
      aria-label="Copy install command"
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
        />
      )}
    </Button>
  );
};

export type PackageInfoDescriptionProps = ComponentProps<typeof ItemDescription>;

/** Belongs in the header's `PackageInfoInfo` column, or in `PackageInfoContent`. */
export const PackageInfoDescription = ({
  className,
  children,
  ...props
}: PackageInfoDescriptionProps) => (
  <ItemDescription className={cn("text-xs", className)} {...props}>
    {children}
  </ItemDescription>
);

export type PackageDependency = {
  name: string;
  version?: string;
  /** Avatar image for the dependency's mark. */
  src?: string;
  /** Inline mark (e.g. an icon component) shown instead of the initial. */
  icon?: ReactNode;
};

const dependencyInitial = (name: string) =>
  name.replace(/^@/, "").charAt(0).toUpperCase();

export type PackageInfoDependencyAvatarProps = ComponentProps<typeof Avatar> & {
  dependency: PackageDependency;
};

/** Small avatar for a dependency: image, inline mark, or its initial. */
export const PackageInfoDependencyAvatar = ({
  dependency,
  className,
  size = "sm",
  ...props
}: PackageInfoDependencyAvatarProps) => (
  <Avatar className={className} size={size} {...props}>
    {dependency.src && (
      <AvatarImage alt={dependency.name} src={dependency.src} />
    )}
    <AvatarFallback className="font-medium text-[10px] [&_svg]:size-3">
      {dependency.icon ?? dependencyInitial(dependency.name)}
    </AvatarFallback>
  </Avatar>
);

export type PackageInfoDependenciesProps = Omit<
  ComponentProps<typeof PopoverTrigger>,
  "children"
> & {
  dependencies: PackageDependency[];
  /** Avatars shown before collapsing the rest into a count. */
  max?: number;
  /** Popover placement. */
  align?: ComponentProps<typeof PopoverContent>["align"];
  /** Replaces the default dependency list inside the popover. */
  children?: ReactNode;
};

/**
 * Dependencies as an avatar (or avatar group) that opens a popover listing
 * them. Renders nothing when there are no dependencies.
 */
export const PackageInfoDependencies = ({
  dependencies,
  max = 3,
  align = "end",
  className,
  children,
  ...props
}: PackageInfoDependenciesProps) => {
  const count = dependencies.length;

  if (count === 0) {
    return null;
  }

  const visible = dependencies.slice(0, max);
  const hidden = count - visible.length;
  const label = `${count} ${count === 1 ? "dependency" : "dependencies"}`;

  return (
    <Popover>
      <PopoverTrigger
        aria-label={label}
        className={cn(
          "flex shrink-0 cursor-pointer rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:ring-[3px] focus-visible:ring-ring/50",
          className
        )}
        {...props}
      >
        {count === 1 ? (
          <PackageInfoDependencyAvatar dependency={dependencies[0]} />
        ) : (
          <AvatarGroup>
            {visible.map((dependency) => (
              <PackageInfoDependencyAvatar
                dependency={dependency}
                key={dependency.name}
              />
            ))}
            {hidden > 0 && (
              <AvatarGroupCount className="font-mono text-xs">
                +{hidden}
              </AvatarGroupCount>
            )}
          </AvatarGroup>
        )}
      </PopoverTrigger>
      <PopoverContent align={align} className="w-64 gap-1 p-1.5">
        <div className="flex items-center gap-1.5 px-2 py-1">
          <span className="font-medium text-muted-foreground text-xs">
            Dependencies
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/70">
            {count}
          </span>
        </div>
        {children ?? (
          <div className="flex flex-col gap-0.5">
            {dependencies.map((dependency) => (
              <PackageInfoDependency
                dependency={dependency}
                key={dependency.name}
              />
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export type PackageInfoDependencyProps = HTMLAttributes<HTMLDivElement> & {
  dependency: PackageDependency;
};

/** One row in the dependencies popover. */
export const PackageInfoDependency = ({
  dependency,
  className,
  children,
  ...props
}: PackageInfoDependencyProps) => (
  <div
    className={cn(
      "flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-muted/50",
      className
    )}
    {...props}
  >
    {children ?? (
      <>
        <PackageInfoDependencyAvatar dependency={dependency} />
        <span className="min-w-0 flex-1 truncate font-mono text-muted-foreground text-xs">
          {dependency.name}
        </span>
        {dependency.version && (
          <span className="shrink-0 rounded-md bg-muted/50 px-1.5 py-0.5 font-mono text-xs">
            {dependency.version}
          </span>
        )}
      </>
    )}
  </div>
);
