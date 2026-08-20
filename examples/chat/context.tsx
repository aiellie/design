"use client";

import {
  Context,
  ContextCacheUsage,
  ContextContent,
  ContextContentBody,
  ContextContentFooter,
  ContextContentHeader,
  ContextInputUsage,
  ContextOutputUsage,
  ContextReasoningUsage,
  ContextTrigger,
} from "@/components/chat/context";

const Example = () => (
  <div className="flex items-center justify-center p-8">
    <Context
      maxTokens={128_000}
      modelId="openai:gpt-5"
      usage={{
        inputTokens: 40_000,
        inputTokenDetails: {
          noCacheTokens: 28_000,
          cacheReadTokens: 12_000,
          cacheWriteTokens: 0,
        },
        outputTokens: 16_000,
        outputTokenDetails: {
          textTokens: 8_000,
          reasoningTokens: 8_000,
        },
        totalTokens: 56_000,
      }}
      usedTokens={56_000}
    >
      <ContextTrigger />
      <ContextContent>
        <ContextContentHeader />
        <ContextContentBody>
          <ContextInputUsage />
          <ContextOutputUsage />
          <ContextReasoningUsage />
          <ContextCacheUsage />
        </ContextContentBody>
        <ContextContentFooter />
      </ContextContent>
    </Context>
  </div>
);

export function ContextExample() {
  return (
    <Example />
  );
}
