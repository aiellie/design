"use client";

import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  Download01Icon,
  InformationCircleIcon,
  SlidersHorizontalIcon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type { ComponentProps, HTMLAttributes } from "react";
import { createContext, useContext, useMemo } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface SchemaParameter {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  location?: "path" | "query" | "header";
}

interface SchemaProperty {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  properties?: SchemaProperty[];
  items?: SchemaProperty;
}

interface SchemaDisplayContextType {
  method: HttpMethod;
  path: string;
  description?: string;
  parameters?: SchemaParameter[];
  requestBody?: SchemaProperty[];
  responseBody?: SchemaProperty[];
}

const SchemaDisplayContext = createContext<SchemaDisplayContextType>({
  method: "GET",
  path: "",
});

const methodStyles: Record<HttpMethod, string> = {
  DELETE: "bg-red-500/5 text-red-500 dark:bg-red-900/30 dark:text-red-400",
  GET: "bg-green-500/5 text-green-500 dark:bg-green-900/30 dark:text-green-400",
  PATCH:
    "bg-yellow-500/5 text-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-400",
  POST: "bg-blue-500/5 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400",
  PUT: "bg-orange-500/5 text-orange-500 dark:bg-orange-900/30 dark:text-orange-400",
};

export type SchemaDisplayHeaderProps = HTMLAttributes<HTMLDivElement>;

export const SchemaDisplayHeader = ({
  className,
  children,
  ...props
}: SchemaDisplayHeaderProps) => (
  <div
    className={cn("flex items-center gap-3 border-b px-4 py-3", className)}
    {...props}
  >
    {children}
  </div>
);

export type SchemaDisplayMethodProps = ComponentProps<typeof Badge>;

export const SchemaDisplayMethod = ({
  className,
  children,
  ...props
}: SchemaDisplayMethodProps) => {
  const { method } = useContext(SchemaDisplayContext);

  return (
    <Badge
      className={cn("font-mono text-xs", methodStyles[method], className)}
      variant="secondary"
      {...props}
    >
      {children ?? method}
    </Badge>
  );
};

export type SchemaDisplayPathProps = HTMLAttributes<HTMLSpanElement>;

export const SchemaDisplayPath = ({
  className,
  children,
  ...props
}: SchemaDisplayPathProps) => {
  const { path } = useContext(SchemaDisplayContext);

  // Highlight path parameters
  const highlightedPath = path.replaceAll(
    /\{([^}]+)\}/g,
    '<span class="text-blue-600 dark:text-blue-400">{$1}</span>'
  );

  return (
    <span
      className={cn("font-mono text-sm", className)}
      // oxlint-disable-next-line eslint-plugin-react(no-danger)
      dangerouslySetInnerHTML={{ __html: children ?? highlightedPath }}
      {...props}
    />
  );
};

export type SchemaDisplayDescriptionProps =
  HTMLAttributes<HTMLParagraphElement>;

export const SchemaDisplayDescription = ({
  className,
  children,
  ...props
}: SchemaDisplayDescriptionProps) => {
  const { description } = useContext(SchemaDisplayContext);

  return (
    <p
      className={cn("text-muted-foreground text-xs pl-1", className)}
      {...props}
    >
      {children ?? description}
    </p>
  );
};

export type SchemaDisplayMessageProps = ComponentProps<
  typeof PopoverTrigger
> & {
  icon?: IconSvgElement;
};

export const SchemaDisplayMessage = ({
  icon = InformationCircleIcon,
  className,
  children,
  ...props
}: SchemaDisplayMessageProps) => (
  <Popover>
    <PopoverTrigger
      className={cn(
        "ml-auto flex size-5 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground transition-opacity hover:opacity-80",
        className
      )}
      {...props}
    >
      <HugeiconsIcon icon={icon} className="size-3.5" />
    </PopoverTrigger>
    <PopoverContent align="end" className="w-auto max-w-72">
      {children}
    </PopoverContent>
  </Popover>
);

export type SchemaDisplayContentProps = HTMLAttributes<HTMLDivElement>;

export const SchemaDisplayContent = ({
  className,
  children,
  ...props
}: SchemaDisplayContentProps) => (
  <div className={cn("divide-y", className)} {...props}>
    {children}
  </div>
);

export type SchemaDisplayParameterProps = HTMLAttributes<HTMLDivElement> &
  SchemaParameter;

export const SchemaDisplayParameter = ({
  name,
  type,
  required,
  description,
  location,
  className,
  ...props
}: SchemaDisplayParameterProps) => (
  <div
    className={cn("flex min-w-0 items-center gap-2 px-4 py-3 pl-10", className)}
    {...props}
  >
    <span className="shrink-0 font-mono text-sm">{name}</span>
    {description && (
      <span className="min-w-0 truncate text-muted-foreground text-sm">
        {description}
      </span>
    )}
    <span className="ml-auto flex shrink-0 items-center gap-2">
      <Badge className="text-xs" variant="outline">
        {type}
      </Badge>
      {location && (
        <Badge className="text-xs" variant="secondary">
          {location}
        </Badge>
      )}
      {required && (
        <Badge
          className="bg-red-500/5 text-red-500 text-xs dark:bg-red-900/30 dark:text-red-400"
          variant="secondary"
        >
          required
        </Badge>
      )}
    </span>
  </div>
);

export type SchemaDisplayParametersProps = ComponentProps<typeof Collapsible>;

export const SchemaDisplayParameters = ({
  className,
  children,
  ...props
}: SchemaDisplayParametersProps) => {
  const { parameters } = useContext(SchemaDisplayContext);

  return (
    <Collapsible className={cn(className)} /*defaultOpen*/ {...props}>
      <CollapsibleTrigger className="group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50">
        <HugeiconsIcon
          icon={SlidersHorizontalIcon}
          className="size-4 shrink-0 text-muted-foreground"
        />
        <span className="font-normal text-sm">Parameters</span>
        <Badge className="ml-auto text-xs" variant="secondary">
          {parameters?.length}
        </Badge>
        <HugeiconsIcon
          icon={ChevronRightIcon}
          className="size-4 shrink-0 text-muted-foreground group-data-[panel-open]:hidden"
        />
        <HugeiconsIcon
          icon={ChevronDownIcon}
          className="hidden size-4 shrink-0 text-muted-foreground group-data-[panel-open]:block"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="divide-y border-t">
          {children ??
            parameters?.map((param) => (
              <SchemaDisplayParameter key={param.name} {...param} />
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export type SchemaDisplayPropertyProps = HTMLAttributes<HTMLDivElement> &
  SchemaProperty & {
    depth?: number;
  };

export const SchemaDisplayProperty = ({
  name,
  type,
  required,
  description,
  properties,
  items,
  depth = 0,
  className,
  ...props
}: SchemaDisplayPropertyProps) => {
  const hasChildren = properties || items;
  const paddingLeft = 40 + depth * 16;

  if (hasChildren) {
    return (
      <Collapsible /*defaultOpen={depth < 2}*/>
        <CollapsibleTrigger
          className={cn(
            "group flex min-w-0 w-full items-center gap-2 py-3 pr-4 text-left transition-colors hover:bg-muted/50",
            className
          )}
          style={{ paddingLeft }}
        >
          <HugeiconsIcon
            icon={ChevronRightIcon}
            className="size-4 shrink-0 text-muted-foreground group-data-[panel-open]:hidden"
          />
          <HugeiconsIcon
            icon={ChevronDownIcon}
            className="hidden size-4 shrink-0 text-muted-foreground group-data-[panel-open]:block"
          />
          <span className="shrink-0 font-mono text-sm">{name}</span>
          {description && (
            <span className="min-w-0 truncate text-muted-foreground text-sm">
              {description}
            </span>
          )}
          <span className="ml-auto flex shrink-0 items-center gap-2">
            <Badge className="text-xs" variant="outline">
              {type}
            </Badge>
            {required && (
              <Badge
                className="bg-red-500/5 text-red-500 text-xs dark:bg-red-900/30 dark:text-red-400"
                variant="secondary"
              >
                required
              </Badge>
            )}
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="divide-y border-t">
            {properties?.map((prop) => (
              <SchemaDisplayProperty
                key={prop.name}
                {...prop}
                depth={depth + 1}
              />
            ))}
            {items && (
              <SchemaDisplayProperty
                {...items}
                depth={depth + 1}
                name={`${name}[]`}
              />
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <div
      className={cn("flex min-w-0 items-center gap-2 py-3 pr-4", className)}
      style={{ paddingLeft }}
      {...props}
    >
      {/* Spacer for alignment */}
      <span className="size-4 shrink-0" />
      <span className="shrink-0 font-mono text-sm">{name}</span>
      {description && (
        <span className="min-w-0 truncate text-muted-foreground text-sm">
          {description}
        </span>
      )}
      <span className="ml-auto flex shrink-0 items-center gap-2">
        <Badge className="text-xs" variant="outline">
          {type}
        </Badge>
        {required && (
          <Badge
            className="bg-red-500/5 text-red-500 text-xs dark:bg-red-900/30 dark:text-red-400"
            variant="secondary"
          >
            required
          </Badge>
        )}
      </span>
    </div>
  );
};

export type SchemaDisplayRequestProps = ComponentProps<typeof Collapsible>;

export const SchemaDisplayRequest = ({
  className,
  children,
  ...props
}: SchemaDisplayRequestProps) => {
  const { requestBody } = useContext(SchemaDisplayContext);

  return (
    <Collapsible className={cn(className)} /*defaultOpen*/ {...props}>
      <CollapsibleTrigger className="group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50">
        <HugeiconsIcon
          icon={Upload01Icon}
          className="size-4 shrink-0 text-muted-foreground"
        />
        <span className="font-normal text-sm">Request Body</span>
        <Badge className="ml-auto text-xs" variant="secondary">
          {requestBody?.length}
        </Badge>
        <HugeiconsIcon
          icon={ChevronRightIcon}
          className="size-4 shrink-0 text-muted-foreground group-data-[panel-open]:hidden"
        />
        <HugeiconsIcon
          icon={ChevronDownIcon}
          className="hidden size-4 shrink-0 text-muted-foreground group-data-[panel-open]:block"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="border-t">
          {children ??
            requestBody?.map((prop) => (
              <SchemaDisplayProperty key={prop.name} {...prop} depth={0} />
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export type SchemaDisplayResponseProps = ComponentProps<typeof Collapsible>;

export const SchemaDisplayResponse = ({
  className,
  children,
  ...props
}: SchemaDisplayResponseProps) => {
  const { responseBody } = useContext(SchemaDisplayContext);

  return (
    <Collapsible className={cn(className)} /*defaultOpen*/ {...props}>
      <CollapsibleTrigger className="group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50">
        <HugeiconsIcon
          icon={Download01Icon}
          className="size-4 shrink-0 text-muted-foreground"
        />
        <span className="font-normal text-sm">Response</span>
        <Badge className="ml-auto text-xs" variant="secondary">
          {responseBody?.length}
        </Badge>
        <HugeiconsIcon
          icon={ChevronRightIcon}
          className="size-4 shrink-0 text-muted-foreground group-data-[panel-open]:hidden"
        />
        <HugeiconsIcon
          icon={ChevronDownIcon}
          className="hidden size-4 shrink-0 text-muted-foreground group-data-[panel-open]:block"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="border-t">
          {children ??
            responseBody?.map((prop) => (
              <SchemaDisplayProperty key={prop.name} {...prop} depth={0} />
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export type SchemaDisplayProps = HTMLAttributes<HTMLDivElement> & {
  method: HttpMethod;
  path: string;
  description?: string;
  parameters?: SchemaParameter[];
  requestBody?: SchemaProperty[];
  responseBody?: SchemaProperty[];
};

export const SchemaDisplay = ({
  method,
  path,
  description,
  parameters,
  requestBody,
  responseBody,
  className,
  children,
  ...props
}: SchemaDisplayProps) => {
  const contextValue = useMemo(
    () => ({
      description,
      method,
      parameters,
      path,
      requestBody,
      responseBody,
    }),
    [description, method, parameters, path, requestBody, responseBody]
  );

  return (
    <SchemaDisplayContext.Provider value={contextValue}>
      <div
        className={cn(
          "overflow-hidden rounded-lg border bg-background",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <SchemaDisplayHeader>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-3">
                  <SchemaDisplayMethod />
                  <SchemaDisplayPath />
                </div>
                {description && <SchemaDisplayDescription />}
              </div>
            </SchemaDisplayHeader>
            <SchemaDisplayContent>
              {parameters && parameters.length > 0 && (
                <SchemaDisplayParameters />
              )}
              {requestBody && requestBody.length > 0 && (
                <SchemaDisplayRequest />
              )}
              {responseBody && responseBody.length > 0 && (
                <SchemaDisplayResponse />
              )}
            </SchemaDisplayContent>
          </>
        )}
      </div>
    </SchemaDisplayContext.Provider>
  );
};

export type SchemaDisplayBodyProps = HTMLAttributes<HTMLDivElement>;

export const SchemaDisplayBody = ({
  className,
  children,
  ...props
}: SchemaDisplayBodyProps) => (
  <div className={cn("divide-y", className)} {...props}>
    {children}
  </div>
);

export type SchemaDisplayExampleProps = HTMLAttributes<HTMLPreElement>;

export const SchemaDisplayExample = ({
  className,
  children,
  ...props
}: SchemaDisplayExampleProps) => (
  <pre
    className={cn(
      "mx-4 mb-4 overflow-auto rounded-md bg-muted p-4 font-mono text-sm",
      className
    )}
    {...props}
  >
    {children}
  </pre>
);
