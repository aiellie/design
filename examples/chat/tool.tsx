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
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/chat/tool";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ToolUIPart } from "ai";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon, Cancel01Icon, DatabaseIcon } from "@hugeicons/core-free-icons";
import { nanoid } from "nanoid";

const handleReject = () => {
  // In production, call addConfirmationResponse
};

const handleAccept = () => {
  // In production, call addConfirmationResponse
};

const toolCall: ToolUIPart = {
  errorText: undefined,
  input: {
    database: "analytics",
    params: ["2024-01-01"],
    query: "SELECT COUNT(*) FROM users WHERE created_at >= ?",
  },
  output: `| User ID | Name | Email | Created At |
|---------|------|-------|------------|
| 1 | John Doe | john@example.com | 2024-01-15 |
| 2 | Jane Smith | jane@example.com | 2024-01-20 |
| 3 | Bob Wilson | bob@example.com | 2024-02-01 |
| 4 | Alice Brown | alice@example.com | 2024-02-10 |
| 5 | Charlie Davis | charlie@example.com | 2024-02-15 |`,
  state: "output-available" as const,
  toolCallId: nanoid(),
  type: "tool-database_query" as const,
};

const ToolExample = () => (
  <div className="space-y-4 mx-auto w-full max-w-lg">
    {/* 1. input-streaming: Pending */}
    <Tool >
      <ToolHeader
        indicator="dot"
        className="text-muted-foreground"
        state="input-streaming"
        title="database_query"
        type="tool-database_query"
        icon={<HugeiconsIcon icon={DatabaseIcon} className="size-3.5!" />}
      />
      <ToolContent>
        <ToolInput input={{}} />
      </ToolContent>
    </Tool>

    {/* 2. approval-requested: Awaiting Approval */}
    <Tool>
      <ToolHeader
        indicator="dot"
        state={"approval-requested" as ToolUIPart["state"]}
        title="database_query"
        type="tool-database_query"
      />
      <ToolContent>
        <ToolInput input={toolCall.input} />
        <Confirmation approval={{ id: nanoid() }} state="approval-requested">
          <ConfirmationAccepted />
          <ConfirmationRejected>Rejected</ConfirmationRejected>
          <ConfirmationTitle>
            <ConfirmationRequest>
              This tool will execute a query on the production database.
            </ConfirmationRequest>
          </ConfirmationTitle>
          <ConfirmationActions>
            <Tooltip>
              <TooltipTrigger
                render={
                  <ConfirmationAction
                    onClick={handleReject}
                    variant="outline"
                    aria-label="Reject"
                  />
                }
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  className="size-4 text-destructive"
                />
              </TooltipTrigger>
              <TooltipContent>Reject</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <ConfirmationAction
                    onClick={handleAccept}
                    variant="outline"
                    aria-label="Accept"
                  />
                }
              >
                <HugeiconsIcon
                  icon={Tick02Icon}
                  className="size-4 text-green-600 dark:text-green-400"
                />
              </TooltipTrigger>
              <TooltipContent>Accept</TooltipContent>
            </Tooltip>
          </ConfirmationActions>
        </Confirmation>
      </ToolContent>
    </Tool>

    {/* 3. approval-responded: Responded */}
    <Tool>
      <ToolHeader
        indicator="dot"
        state={"approval-responded" as ToolUIPart["state"]}
        title="database_query"
        type="tool-database_query"
      />
      <ToolContent>
        <ToolInput input={toolCall.input} />
        <Confirmation
          approval={{ approved: true, id: nanoid() }}
          state="approval-responded"
        >
          <ConfirmationAccepted>Accepted</ConfirmationAccepted>
          <ConfirmationRejected>Rejected</ConfirmationRejected>
          <ConfirmationTitle>
            <ConfirmationRequest>
              This tool will execute a query on the production database.
            </ConfirmationRequest>
          </ConfirmationTitle>
        </Confirmation>
      </ToolContent>
    </Tool>

    {/* 4. input-available: Running */}
    <Tool>
      <ToolHeader
        indicator="dot"
        state="input-available"
        title="database_query"
        type="tool-database_query"
      />
      <ToolContent>
        <ToolInput input={toolCall.input} />
      </ToolContent>
    </Tool>

    {/* 5. output-available: Completed */}
    <Tool>
      <ToolHeader indicator="dot" state={toolCall.state} type={toolCall.type} />
      <ToolContent>
        <ToolInput input={toolCall.input} />
        <Confirmation
          approval={{ approved: true, id: nanoid() }}
          state="output-available"
        >
          <ConfirmationAccepted>Accepted</ConfirmationAccepted>
          <ConfirmationRejected>Rejected</ConfirmationRejected>
          <ConfirmationTitle>
            <ConfirmationRequest>
              This tool will execute a query on the production database.
            </ConfirmationRequest>
          </ConfirmationTitle>
        </Confirmation>
        {toolCall.state === "output-available" && (
          <ToolOutput errorText={toolCall.errorText} output={toolCall.output} />
        )}
      </ToolContent>
    </Tool>

    {/* 6. output-error: Error */}
    <Tool>
      <ToolHeader
        indicator="dot"
        state="output-error"
        title="database_query"
        type="tool-database_query"
      />
      <ToolContent>
        <ToolInput input={toolCall.input} />
        <ToolOutput
          errorText="Connection timeout: Unable to reach database server"
          output={undefined}
        />
      </ToolContent>
    </Tool>

    {/* 7. output-denied: Denied */}
    <Tool>
      <ToolHeader
        indicator="dot"
        state={"output-denied" as ToolUIPart["state"]}
        title="database_query"
        type="tool-database_query"
      />
      <ToolContent>
        <ToolInput input={toolCall.input} />
        <Confirmation
          approval={{
            approved: false,
            id: nanoid(),
            reason: "Query could impact production performance",
          }}
          state="output-denied"
        >
          <ConfirmationAccepted>Accepted</ConfirmationAccepted>
          <ConfirmationRejected>Rejected: Query could impact production performance</ConfirmationRejected>
          <ConfirmationTitle>
            <ConfirmationRequest>
              This tool will execute a query on the production database.
            </ConfirmationRequest>
          </ConfirmationTitle>
        </Confirmation>
      </ToolContent>
    </Tool>
  </div>
);

export default ToolExample;
