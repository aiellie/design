"use client";

import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from "@/components/chat/confirmation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Cancel01Icon,
  Shield01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { nanoid } from "nanoid";

const handleReject = () => {
  // In production, call respondToConfirmationRequest with approved: false
};

const handleApprove = () => {
  // In production, call respondToConfirmationRequest with approved: true
};

/**
 * Icon buttons borrow the palette of the answer they give — the same ghost
 * recipes the alert examples use — so approve reads green and reject reads
 * red before the alert itself has changed colour.
 */

const Actions = () => (
  <ConfirmationActions>
    <Tooltip>
      <TooltipTrigger
        render={
          <ConfirmationAction onClick={handleReject} className="text-destructive">
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
            <span className="sr-only">Reject</span>
          </ConfirmationAction>
        }
      />
      <TooltipContent>Reject</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger
        render={
          <ConfirmationAction
            onClick={handleApprove}
          >
            <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
            <span className="sr-only">Approve</span>
          </ConfirmationAction>
        }
      />
      <TooltipContent>Approve</TooltipContent>
    </Tooltip>
  </ConfirmationActions>
);

const ConfirmationExample = () => (
  <div className="mx-auto grid w-full max-w-md gap-4">
    {/* Pending — a shield leads, the answer lives in the top-end corner. */}
    <Confirmation approval={{ id: nanoid() }} state="approval-requested">
      <ConfirmationRequest>
        <HugeiconsIcon icon={Shield01Icon} strokeWidth={2} />
        <ConfirmationTitle>
          This tool wants to delete the file{" "}
          <code className="rounded-md bg-muted px-1 py-0.5 font-mono text-xs">
            @/components/chat/confirmation.tsx
          </code>
        </ConfirmationTitle>
      </ConfirmationRequest>
      <Actions />
      <ConfirmationAccepted />
      <ConfirmationRejected />
    </Confirmation>
    {/* Pending — the query is the payload, so it gets a mono block. */}
    <Confirmation approval={{ id: nanoid() }} state="approval-requested">
      <ConfirmationRequest>
        <HugeiconsIcon icon={Shield01Icon} strokeWidth={2} />
        <ConfirmationTitle>
          This tool wants to execute a query on the production database:
          <code className="mt-2 block rounded-md bg-muted p-2 font-mono text-xs">
            SELECT * FROM users WHERE role = &apos;admin&apos;
          </code>
        </ConfirmationTitle>
      </ConfirmationRequest>
      <Actions />
      <ConfirmationAccepted />
      <ConfirmationRejected />
    </Confirmation>
    {/* Approved — the alert turns emerald, the way a successful payment does. */}
    <Confirmation
      approval={{ approved: true, id: nanoid() }}
      state="approval-responded"
    >
      <ConfirmationRequest>
        <HugeiconsIcon icon={Shield01Icon} strokeWidth={2} />
        <ConfirmationTitle>
          This tool wants to delete the file{" "}
          <code className="rounded-md bg-muted px-1 py-0.5 font-mono text-xs">
            /tmp/example.txt
          </code>
        </ConfirmationTitle>
      </ConfirmationRequest>
      <Actions />
      <ConfirmationAccepted />
      <ConfirmationRejected />
    </Confirmation>
    {/* Rejected — destructive surface, same as a failed payment. */}
    <Confirmation
      approval={{ approved: false, id: nanoid() }}
      state="output-denied"
    >
      <ConfirmationRequest>
        <HugeiconsIcon icon={Shield01Icon} strokeWidth={2} />
        <ConfirmationTitle>
          This tool wants to delete the file{" "}
          <code className="rounded-md bg-muted px-1 py-0.5 font-mono text-xs">
            /tmp/example.txt
          </code>
        </ConfirmationTitle>
      </ConfirmationRequest>
      <Actions />
      <ConfirmationAccepted />
      <ConfirmationRejected />
    </Confirmation>
  </div>
);

export default ConfirmationExample;
