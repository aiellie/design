
"use client";

import {
  OpenIn,
  OpenInChatGPT,
  OpenInClaude,
  OpenInContent,
  OpenInCursor,
  OpenInScira,
  OpenInT3,
  OpenInTrigger,
  OpenInv0,
} from "@/components/chat/open-in-chat";

const Example = () => {
  const sampleQuery = "How can I implement authentication in Next.js?";

  return (
    <div className="flex items-center gap-4 w-full justify-center"> 
    <OpenIn query={sampleQuery}>
      <OpenInTrigger />
      <OpenInContent>
        <OpenInChatGPT />
        <OpenInClaude />
        <OpenInCursor />
        <OpenInT3 />
        <OpenInScira />
        <OpenInv0 />  
      </OpenInContent>
    </OpenIn>
    </div>
  );
};

export const OpenInChatExample = () => {
  return <Example />;
};