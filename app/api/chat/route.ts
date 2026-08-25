import { convertToModelMessages, streamText, type UIMessage } from "ai"

/** Opus thinks before its first token — give slow starts room on Vercel. */
export const maxDuration = 60

const SYSTEM_PROMPT = `You are the assistant inside a design-system chat demo.
Keep replies short and conversational. Markdown renders in the chat — use
lists, bold, and fenced code blocks when they help.`

/**
 * Streams Claude replies for the chat example. A bare string model id routes
 * through the Vercel AI Gateway — authenticated by AI_GATEWAY_API_KEY locally
 * or OIDC on Vercel. Pre-flight failures return plain text because
 * DefaultChatTransport surfaces the response body verbatim as `error.message`
 * in useChat.
 */
export async function POST(request: Request) {
  if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN) {
    return new Response(
      "Missing AI_GATEWAY_API_KEY — add it to .env.local (or run `vercel env pull`) and restart the dev server.",
      { status: 500 }
    )
  }

  const { messages }: { messages: UIMessage[] } = await request.json()

  const result = streamText({
    model: "anthropic/claude-opus-4.8",
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse({
    onError: (error) =>
      error instanceof Error ? error.message : "Something went wrong.",
  })
}
