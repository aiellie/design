"use client";

import {
  MessageInput,
  MessageInputField,
  MessageInputSubmit,
} from "@/components/chat/message-input";
import type { ChatStatus } from "ai";
import { useEffect, useRef, useState } from "react";

const Example = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [status, setStatus] = useState<ChatStatus>("ready");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (message: string) => {
    setMessages((prev) => [...prev, message]);
    setStatus("streaming");
    timeoutRef.current = setTimeout(() => {
      setStatus("ready");
    }, 3000);
  };

  const handleStop = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setStatus("ready");
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <MessageInput onSubmit={handleSubmit}>
        <MessageInputField />
        <MessageInputSubmit status={status} onStop={handleStop} />
      </MessageInput>
      {messages.length > 0 && (
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export const MessageInputExample = () => {
  return <Example />;
};
