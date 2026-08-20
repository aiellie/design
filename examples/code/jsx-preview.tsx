"use client";

import { useEffect, useState } from "react";

import {
  JSXPreview,
  JSXPreviewContent,
  JSXPreviewError,
} from "@/components/code/jsx-preview";
import { Button } from "@/components/ui/button";

const STREAMED_JSX = `<div className="flex flex-col gap-3 rounded-lg border p-4">
  <div className="flex items-center gap-3">
    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
      EA
    </div>
    <div className="flex flex-col">
      <span className="font-medium text-sm">Ellie Aiono</span>
      <span className="text-muted-foreground text-xs">Product Designer</span>
    </div>
  </div>
  <p className="text-muted-foreground text-sm">
    Streaming JSX renders progressively — open tags are auto-closed so the
    preview never flashes broken markup.
  </p>
  <div className="flex gap-2">
    <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground text-xs">design</span>
    <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground text-xs">systems</span>
    <span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground text-xs">react</span>
  </div>
</div>`;

const CHARS_PER_SECOND = 250;
const TICK_MS = 40;

const StreamingDemo = () => {
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [length, setLength] = useState(0);
  const isStreaming = length < STREAMED_JSX.length;

  // Advance by elapsed time, not tick count, so throttled tabs catch up
  useEffect(() => {
    if (!isStreaming) {
      return;
    }
    const timer = setInterval(() => {
      const elapsed = (Date.now() - startedAt) / 1000;
      setLength(
        Math.min(
          Math.floor(elapsed * CHARS_PER_SECOND),
          STREAMED_JSX.length
        )
      );
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [isStreaming, startedAt]);

  return (
    <div className="flex w-full max-w-2xl mx-auto justify-center flex-col gap-3">
      <JSXPreview isStreaming={isStreaming} jsx={STREAMED_JSX.slice(0, length)}>
        <JSXPreviewContent />
        <JSXPreviewError />
      </JSXPreview>
      <Button
        disabled={isStreaming}
        onClick={() => {
          setStartedAt(Date.now());
          setLength(0);
        }}
        size="sm"
        variant="outline"
        className="w-fit mx-auto"
      >
        {isStreaming ? "Streaming…" : "Replay stream"}
      </Button>
    </div>
  );
};

export function JsxPreviewExample() {
  return <div className="w-full max-w-2xl mx-auto justify-center">
    <StreamingDemo />
  </div>;
}
