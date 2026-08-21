"use client";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Cancel01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ToolUIPart } from "ai";
import type { ComponentProps, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";

type ToolUIPartApproval =
  | {
      id: string;
      approved?: never;
      reason?: never;
    }
  | {
      id: string;
      approved: boolean;
      reason?: string;
    }
  | undefined;

interface ConfirmationContextValue {
  approval: ToolUIPartApproval;
  state: ToolUIPart["state"];
}

const ConfirmationContext = createContext<ConfirmationContextValue | null>(
  null
);

const useConfirmation = () => {
  const context = useContext(ConfirmationContext);

  if (!context) {
    throw new Error("Confirmation components must be used within Confirmation");
  }

  return context;
};

const isResponded = (state: ToolUIPart["state"]) =>
  state === "approval-responded" ||
  state === "output-denied" ||
  state === "output-available";

/**
 * Once the user has answered, the whole alert takes on the outcome's palette
 * — the same emerald / red surfaces the alert examples use — so the result
 * reads at a glance without any extra chrome.
 */
const surface = {
  accepted:
    "border-emerald-200 bg-emerald-500/5 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/6 dark:text-emerald-400 *:data-[slot=alert-description]:text-emerald-700/80 dark:*:data-[slot=alert-description]:text-emerald-400/80",
  rejected:
    "border-red-200 bg-destructive/3 text-destructive dark:border-red-400/20 dark:bg-red-400/6 dark:text-red-400 *:data-[slot=alert-description]:text-destructive/80 dark:*:data-[slot=alert-description]:text-red-400/80",
};

export type ConfirmationProps = ComponentProps<typeof Alert> & {
  approval?: ToolUIPartApproval;
  state: ToolUIPart["state"];
};

export const Confirmation = ({
  className,
  approval,
  state,
  ...props
}: ConfirmationProps) => {
  const contextValue = useMemo(() => ({ approval, state }), [approval, state]);

  if (!approval || state === "input-streaming" || state === "input-available") {
    return null;
  }

  const responded = isResponded(state);
  const accepted = responded && approval.approved === true;
  const rejected = responded && approval.approved === false;

  return (
    <ConfirmationContext.Provider value={contextValue}>
      <Alert
        data-state={accepted ? "accepted" : rejected ? "rejected" : "requested"}
        className={cn(
          accepted && surface.accepted,
          rejected && surface.rejected,
          className
        )}
        {...props}
      />
    </ConfirmationContext.Provider>
  );
};

export type ConfirmationTitleProps = ComponentProps<typeof AlertDescription>;

export const ConfirmationTitle = (props: ConfirmationTitleProps) => (
  <AlertDescription {...props} />
);

export interface ConfirmationRequestProps {
  children?: ReactNode;
}

export const ConfirmationRequest = ({ children }: ConfirmationRequestProps) => {
  const { state } = useConfirmation();

  // Only show when approval is requested
  if (state !== "approval-requested") {
    return null;
  }

  return children;
};

export type ConfirmationAcceptedProps = ComponentProps<typeof AlertTitle>;

/**
 * Renders the outcome as a leading icon + alert title. Both land as direct
 * children of the alert, so its `has-[>svg]` grid picks them up exactly like
 * the alert examples.
 */
export const ConfirmationAccepted = ({
  children,
  ...props
}: ConfirmationAcceptedProps) => {
  const { approval, state } = useConfirmation();

  // Only show when approved and in response states
  if (!approval?.approved || !isResponded(state)) {
    return null;
  }

  return (
    <>
      <HugeiconsIcon icon={Tick02Icon} className="size-4 text-green-600 dark:text-green-400" />
      <AlertTitle {...props} className="font-normal!">
        {children ?? "You approved this tool execution"}
      </AlertTitle>
    </>
  );
};

export type ConfirmationRejectedProps = ComponentProps<typeof AlertTitle>;

export const ConfirmationRejected = ({
  children,
  ...props
}: ConfirmationRejectedProps) => {
  const { approval, state } = useConfirmation();

  // Only show when rejected and in response states
  if (approval?.approved !== false || !isResponded(state)) {
    return null;
  }

  return (
    <>
      <HugeiconsIcon icon={Cancel01Icon} className="size-4 text-destructive" />
      <AlertTitle {...props} className="font-normal!">
        {children ?? "You rejected this tool execution"}
      </AlertTitle>
    </>
  );
};

export type ConfirmationActionsProps = ComponentProps<typeof AlertAction>;

export const ConfirmationActions = ({
  className,
  ...props
}: ConfirmationActionsProps) => {
  const { state } = useConfirmation();

  // Only show when approval is requested
  if (state !== "approval-requested") {
    return null;
  }

  return (
    <AlertAction
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
};

export type ConfirmationActionProps = ComponentProps<typeof Button>;

export const ConfirmationAction = ({
  variant = "ghost",
  size = "icon-xs",
  ...props
}: ConfirmationActionProps) => (
  <Button type="button" variant={variant} size={size} {...props} />
);
