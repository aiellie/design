"use client";

import {
  Agent,
  AgentBanner,
  AgentContent,
  AgentHeader,
  AgentInstructions,
  AgentOutput,
  AgentTool,
  AgentTools,
} from "@/components/models/agent";
import { LinkIcon, SearchIcon, TextIcon } from "@hugeicons/core-free-icons";
import { z } from "zod";

const webSearchTool = {
  description: "Search the web for information",
  inputSchema: z.object({
    query: z.string().describe("The search query"),
  }),
};

const readUrlTool = {
  description: "Read and parse a URL",
  inputSchema: z.object({
    url: z.string().url().describe("The URL to read"),
  }),
};

const summarizeTool = {
  description: "Summarize text into key points",
  inputSchema: z.object({
    maxPoints: z.number().optional().describe("Maximum number of key points"),
    text: z.string().describe("The text to summarize"),
  }),
};

const outputSchema = `z.object({
  sentiment: z.enum(['positive', 'negative', 'neutral']),
  score: z.number(),
  summary: z.string(),
})`;

const AgentExample = () => (
  <Agent>
    <AgentBanner src="https://images.aiellie.app/research.png?mode=image&aspect=16%3A9&radius=0" />
    <AgentHeader model="openai/gpt-5.2-pro" name="Research Assistant" />
    <AgentContent>
      <AgentInstructions>
        You are a helpful research assistant. Your job is to search the web for
        information and summarize findings for the user. Always cite your
        sources and provide accurate, up-to-date information.
      </AgentInstructions>
      <AgentTools>
        <AgentTool icon={SearchIcon} tool={webSearchTool} value="web_search" />
        <AgentTool icon={LinkIcon} tool={readUrlTool} value="read_url" />
        <AgentTool icon={TextIcon} tool={summarizeTool} value="summarize" />
      </AgentTools>
      <AgentOutput schema={outputSchema} />
    </AgentContent>
  </Agent>
);

export default AgentExample; 