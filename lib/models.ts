/** Reasoning depth scale — 5 options, ordered lowest → highest (5th is highest). */
export type ReasoningLevel = "low" | "medium" | "high" | "extra" | "max"

export const REASONING_LEVELS: ReasoningLevel[] = [
  "low",
  "medium",
  "high",
  "extra",
  "max",
]

/** Speed scale — 5 options, ordered slowest → fastest (5th is fastest). */
export type SpeedLevel = "slow" | "standard" | "fast" | "turbo" | "ultra"

export const SPEED_LEVELS: SpeedLevel[] = [
  "slow",
  "standard",
  "fast",
  "turbo",
  "ultra",
]

/**
 * Per-modality direction support.
 * `both` = input & output, `none` = not supported, `undefined` = unknown.
 */
export type ModalitySupport = "input" | "output" | "both" | "none"

export interface Modalities {
  text?: ModalitySupport
  image?: ModalitySupport
  audio?: ModalitySupport
  video?: ModalitySupport
}

/** Prices in USD per 1M tokens (except `webSearch`, per 1K requests). */
export interface ModelPricing {
  input?: number
  output?: number
  /** Cached input read (a.k.a. cachedInput). */
  cachedInput?: number
  /** Cached input write. */
  cacheWrite?: number
  /** Web search tool price, USD per 1K requests. */
  webSearch?: number
}

export type ModelEndpoint =
  | "chat"
  | "responses"
  | "messages"
  | "completions"
  | "embeddings"
  | "images"
  | "audio"
  | "batch"
  // oxlint-disable-next-line typescript-eslint(ban-types) -- autocomplete-friendly string union
  | (string & {})

export type ModelFeature =
  | "streaming"
  | "structured-output"
  | "json-mode"
  | "prompt-caching"
  | "predicted-outputs"
  | "reasoning-tokens"
  | "extended-thinking"
  | "adaptive-thinking"
  | "vision"
  | "file-input"
  | "fine-tuning"
  | "batch"
  // oxlint-disable-next-line typescript-eslint(ban-types) -- autocomplete-friendly string union
  | (string & {})

export type ModelTool =
  | "function-calling"
  | "web-search"
  | "code-interpreter"
  | "file-search"
  | "computer-use"
  | "image-generation"
  | "mcp"
  // oxlint-disable-next-line typescript-eslint(ban-types) -- autocomplete-friendly string union
  | (string & {})

/** Tailwind palette name for chef accent (see https://tailwindcss.com/docs/colors). */
export type ChefColor = "emerald" | "orange" | "sky" | "zinc" | "blue" | "stone"

export type ChefSlug =
  "openai" | "anthropic" | "google" | "xai" | "deepseek" | "v0"

export interface Chef {
  name: string
  slug: ChefSlug
  /** Tailwind color name used for accents (effort bars, etc.). */
  color: ChefColor
  /** Solid bar / filled accent. Full class so Tailwind can detect it. */
  colorClass: string
  /** Inactive / track accent. */
  colorMutedClass: string
  /** Fast-mode flash accent — same hue, different shade than the bars. */
  fastClass: string
}

/** Canonical chef list — colors from the Tailwind default palette. */
export const chefs: Record<ChefSlug, Chef> = {
  openai: {
    name: "OpenAI",
    slug: "openai",
    color: "emerald",
    colorClass: "bg-emerald-500",
    colorMutedClass: "bg-emerald-500/25",
    fastClass:
      "fill-emerald-600 text-emerald-600 dark:fill-emerald-400 dark:text-emerald-400",
  },
  anthropic: {
    name: "Anthropic",
    slug: "anthropic",
    color: "orange",
    colorClass: "bg-orange-500",
    colorMutedClass: "bg-orange-500/25",
    fastClass:
      "fill-orange-600 text-orange-600 dark:fill-orange-400 dark:text-orange-400",
  },
  google: {
    name: "Google",
    slug: "google",
    color: "sky",
    colorClass: "bg-sky-500",
    colorMutedClass: "bg-sky-500/25",
    fastClass: "fill-sky-600 text-sky-600 dark:fill-sky-400 dark:text-sky-400",
  },
  xai: {
    name: "xAI",
    slug: "xai",
    color: "zinc",
    colorClass: "bg-zinc-500",
    colorMutedClass: "bg-zinc-500/25",
    fastClass:
      "fill-zinc-600 text-zinc-600 dark:fill-zinc-400 dark:text-zinc-400",
  },
  deepseek: {
    name: "DeepSeek",
    slug: "deepseek",
    color: "blue",
    colorClass: "bg-blue-500",
    colorMutedClass: "bg-blue-500/25",
    fastClass:
      "fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400",
  },
  v0: {
    name: "Vercel",
    slug: "v0",
    color: "stone",
    colorClass: "bg-stone-500",
    colorMutedClass: "bg-stone-500/25",
    fastClass:
      "fill-stone-600 text-stone-600 dark:fill-stone-400 dark:text-stone-400",
  },
}

export function getChef(slug: string | undefined | null): Chef | undefined {
  if (!slug) return undefined
  return chefs[slug as ChefSlug]
}

export interface Model {
  chef: string
  chefSlug: ChefSlug | (string & {})
  id: string
  name: string
  description?: string
  providers: string[]
  intelligence?: string[]
  reasoning?: ReasoningLevel[]
  speed?: SpeedLevel[]
  fastmode?: boolean
  effort?: string[]
  price?: ModelPricing
  /** Total context window, in tokens. */
  contextWindow?: number
  /** Max output tokens per response. */
  maxOutput?: number
  /** Whether the model produces separate reasoning tokens. */
  reasoningTokens?: boolean
  /** Training knowledge cutoff, ISO date e.g. "2026-02-16". */
  knowledgeCutoff?: string
  modalities?: Modalities
  endpoints?: ModelEndpoint[]
  features?: ModelFeature[]
  tools?: ModelTool[]
  /** Raw capability tags from the AI Gateway. */
  tags?: string[]
  /** Model release date, ISO e.g. "2026-04-23". */
  released?: string
}

export const models: Model[] = [
  {
    chef: "OpenAI",
    chefSlug: "openai",
    id: "gpt-5.6-sol",
    name: "GPT-5.6-Sol",
    description: "Frontier model for complex professional work",
    providers: ["openai", "azure"],
    reasoning: ["low", "medium", "high", "extra", "max"],
    speed: ["slow", "standard", "fast", "turbo"],
    price: { input: 5, output: 30, cachedInput: 0.5 },
    contextWindow: 1_050_000,
    maxOutput: 128_000,
    reasoningTokens: true,
    knowledgeCutoff: "2026-02-16",
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat", "responses", "batch"],
    features: ["streaming", "structured-output", "reasoning-tokens"],
    tools: ["function-calling"],
  },
  {
    chef: "OpenAI",
    chefSlug: "openai",
    id: "gpt-5.6-terra",
    name: "GPT-5.6-Terra",
    description: "GPT-5.6 model that balances intelligence and cost",
    providers: ["openai", "azure"],
    reasoning: ["low", "medium", "high", "extra"],
    speed: ["slow", "standard", "fast", "turbo"],
    price: { input: 2.5, output: 15, cachedInput: 0.25 },
    contextWindow: 1_050_000,
    maxOutput: 128_000,
    reasoningTokens: true,
    knowledgeCutoff: "2026-02-16",
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat", "responses", "batch"],
    features: ["streaming", "structured-output", "reasoning-tokens"],
    tools: ["function-calling"],
  },
  {
    chef: "OpenAI",
    chefSlug: "openai",
    id: "gpt-5.6-luna",
    name: "GPT-5.6-Luna",
    description: "GPT-5.6 model optimized for cost-sensitive workloads",
    providers: ["openai", "azure"],
    reasoning: ["low", "medium", "high"],
    speed: ["slow", "standard", "fast", "turbo"],
    price: { input: 1, output: 5, cachedInput: 0.1 },
    contextWindow: 1_050_000,
    maxOutput: 128_000,
    reasoningTokens: true,
    knowledgeCutoff: "2026-02-16",
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat", "responses", "batch"],
    features: ["streaming", "structured-output", "reasoning-tokens"],
    tools: ["function-calling"],
  },
  {
    chef: "OpenAI",
    chefSlug: "openai",
    id: "gpt-5.5",
    name: "GPT-5.5",
    description:
      "A new class of intelligence for coding and professional work.",
    providers: ["openai", "azure"],
    reasoning: ["low", "medium", "high", "extra", "max"],
    speed: ["slow", "standard", "fast", "turbo"],
    price: { input: 5, output: 30, cachedInput: 0.5 },
    contextWindow: 1_050_000,
    maxOutput: 128_000,
    reasoningTokens: true,
    knowledgeCutoff: "2025-12-01",
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat", "responses", "batch"],
    features: ["streaming", "structured-output", "reasoning-tokens"],
    tools: ["function-calling"],
  },
  {
    chef: "OpenAI",
    chefSlug: "openai",
    id: "o3",
    name: "o3",
    description: "Reasoning model for complex tasks, succeeded by GPT-5",
    providers: ["openai", "azure"],
    reasoning: ["low", "medium", "high", "extra", "max"],
    speed: ["slow"],
    price: { input: 2, output: 8, cachedInput: 0.5 },
    contextWindow: 200_000,
    maxOutput: 100_000,
    reasoningTokens: true,
    knowledgeCutoff: "2024-06-01",
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat", "responses", "batch"],
    features: ["streaming", "structured-output", "reasoning-tokens"],
    tools: ["function-calling"],
  },
  {
    chef: "Anthropic",
    chefSlug: "anthropic",
    id: "claude-fable-5",
    name: "Claude Fable 5",
    description:
      "Claude Fable 5 is a Mythos-class model with robust safeguards. It can handle long-running, complex, and asynchronous tasks where previous models would have needed more frequent check-ins.",
    providers: ["anthropic", "amazon-bedrock", "google-vertex", "azure"],
    reasoning: ["low", "medium", "high", "extra", "max"],
    speed: ["slow", "standard"],
    effort: ["low", "medium", "high", "xhigh"],
    price: {
      input: 10,
      output: 50,
      cachedInput: 1,
      cacheWrite: 12.5,
      webSearch: 10,
    },
    contextWindow: 1_000_000,
    maxOutput: 128_000,
    reasoningTokens: true,
    knowledgeCutoff: "2026-01-31",
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat", "responses"],
    features: [
      "streaming",
      "reasoning-tokens",
      "vision",
      "file-input",
      "prompt-caching",
    ],
    tools: ["function-calling"],
    tags: ["reasoning", "tool-use", "explicit-caching", "file-input", "vision"],
    released: "2026-07-01",
  },
  {
    chef: "Anthropic",
    chefSlug: "anthropic",
    id: "claude-opus-5",
    name: "Claude Opus 5",
    description:
      "Opus 5 is a focused upgrade to Opus 4.8 and is Anthropic's best generally available model for coding, agentic tasks, and enterprise workflows. It builds on the strengths of previous Opus models with stronger performance on complex, multi-step coding tasks. Anthropic recommends using it on long-horizon coding and agentic tasks. It is also stronger on professional work, including document drafting, data analysis, and presentations.",
    providers: ["anthropic", "amazon-bedrock", "google-vertex", "azure"],
    reasoning: ["low", "medium", "high", "extra", "max"],
    speed: ["slow", "standard", "fast", "turbo"],
    effort: ["low", "medium", "high", "xhigh"],
    price: {
      input: 5,
      output: 25,
      cachedInput: 0.5,
      cacheWrite: 6.25,
      webSearch: 10,
    },
    contextWindow: 1_000_000,
    maxOutput: 128_000,
    reasoningTokens: true,
    knowledgeCutoff: "2026-01",
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat", "responses"],
    features: [
      "streaming",
      "reasoning-tokens",
      "vision",
      "file-input",
      "prompt-caching",
    ],
    tools: ["function-calling", "web-search"],
    tags: [
      "tool-use",
      "reasoning",
      "vision",
      "file-input",
      "explicit-caching",
      "web-search",
      "fast",
    ],
    released: "2026-05-28",
  },
  {
    chef: "Anthropic",
    chefSlug: "anthropic",
    id: "claude-sonnet-5",
    name: "Claude Sonnet 5",
    description:
      "Sonnet 5 is an upgrade to Sonnet 4.6, with gains across agentic coding and professional work. It builds on the strengths of previous Sonnet models, bringing top-tier intelligence at Sonnet pricing for coding, agents, and everyday professional work at scale.",
    providers: ["anthropic", "amazon-bedrock", "google-vertex", "azure"],
    reasoning: ["low", "medium", "high", "extra", "max"],
    speed: ["slow", "standard", "fast", "turbo"],
    effort: ["low", "medium", "high", "xhigh"],
    price: {
      input: 2,
      output: 10,
      cachedInput: 0.2,
      cacheWrite: 2.5,
      webSearch: 10,
    },
    contextWindow: 1_000_000,
    maxOutput: 128_000,
    reasoningTokens: true,
    knowledgeCutoff: "2026-01-31",
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat", "responses"],
    features: [
      "streaming",
      "reasoning-tokens",
      "vision",
      "file-input",
      "prompt-caching",
    ],
    tools: ["function-calling", "web-search"],
    tags: [
      "reasoning",
      "tool-use",
      "explicit-caching",
      "file-input",
      "vision",
      "web-search",
    ],
    released: "2026-06-29",
  },
  {
    chef: "Anthropic",
    chefSlug: "anthropic",
    id: "claude-haiku-4.5",
    name: "Claude Haiku 4.5",
    description:
      "Claude Haiku 4.5 matches Sonnet 4's performance on coding, computer use, and agent tasks at substantially lower cost and faster speeds. It delivers near-frontier performance and Claude’s unique character at a price point that works for scaled sub-agent deployments, free tier products, and intelligence-sensitive applications with budget constraints.",
    providers: ["anthropic", "amazon-bedrock", "google-vertex", "azure"],
    reasoning: ["low", "medium", "high"],
    speed: ["slow", "standard", "fast", "turbo", "ultra"],
    price: {
      input: 1,
      output: 5,
      cachedInput: 0.1,
      cacheWrite: 1.25,
      webSearch: 10,
    },
    contextWindow: 200_000,
    maxOutput: 64_000,
    reasoningTokens: true,
    knowledgeCutoff: "2025-02-28",
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat", "responses"],
    features: [
      "streaming",
      "reasoning-tokens",
      "vision",
      "file-input",
      "prompt-caching",
    ],
    tools: ["function-calling", "web-search"],
    tags: [
      "explicit-caching",
      "file-input",
      "reasoning",
      "tool-use",
      "vision",
      "web-search",
    ],
    released: "2025-10-15",
  },
  {
    chef: "Google",
    chefSlug: "google",
    id: "gemini-3.6-flash",
    name: "Gemini 3.6 Flash",
    description:
      "Gemini 3.6 Flash delivers higher quality across coding, agentic workflows, and web development with reduced token consumption and fewer model calls compared to previous model iterations.",
    providers: ["google", "google-vertex"],
    reasoning: ["low", "medium", "high", "extra", "max"],
    speed: ["slow", "standard", "fast", "turbo"],
    price: { input: 1.5, output: 7.5, cachedInput: 0.15, webSearch: 14 },
    contextWindow: 1_000_000,
    maxOutput: 64_000,
    reasoningTokens: true,
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat", "responses"],
    features: [
      "streaming",
      "reasoning-tokens",
      "vision",
      "file-input",
      "prompt-caching",
    ],
    tools: ["function-calling", "web-search"],
    tags: [
      "reasoning",
      "file-input",
      "tool-use",
      "vision",
      "implicit-caching",
      "web-search",
    ],
    released: "2026-07-21",
  },
  {
    chef: "Google",
    chefSlug: "google",
    id: "gemini-3.5-flash",
    name: "Gemini 3.5 Flash",
    description:
      "Google's latest model, highly optimized for coding proficiency and parallel agentic execution loops. Defaults to medium thinking effort for faster and more cost-efficient responses.",
    providers: ["google", "google-vertex"],
    reasoning: ["low", "medium", "high", "extra"],
    speed: ["slow", "standard", "fast", "turbo"],
    effort: ["minimal", "low", "medium", "high"],
    price: { input: 1.5, output: 9, cachedInput: 0.15, webSearch: 14 },
    contextWindow: 1_000_000,
    maxOutput: 64_000,
    reasoningTokens: true,
    knowledgeCutoff: "2025-01",
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat", "responses"],
    features: [
      "streaming",
      "reasoning-tokens",
      "vision",
      "file-input",
      "prompt-caching",
    ],
    tools: ["function-calling", "web-search"],
    tags: [
      "reasoning",
      "file-input",
      "vision",
      "tool-use",
      "web-search",
      "implicit-caching",
    ],
    released: "2026-05-19",
  },
  {
    chef: "Google",
    chefSlug: "google",
    id: "gemini-3.1-pro-preview",
    name: "Gemini 3.1 Pro Preview",
    description:
      "This model improves upon Gemini 2.5 Pro and is catered towards challenging tasks, especially those involving complex reasoning or agentic workflows. Improvements highlighted include use cases for coding, multi-step function calling, planning, reasoning, deep knowledge tasks, and instruction following.",
    providers: ["google", "google-vertex"],
    reasoning: ["low", "medium", "high", "extra", "max"],
    speed: ["slow", "standard", "fast"],
    effort: ["low", "medium", "high"],
    price: { input: 2, output: 12, cachedInput: 0.2, webSearch: 14 },
    contextWindow: 1_000_000,
    maxOutput: 64_000,
    reasoningTokens: true,
    knowledgeCutoff: "2025-01",
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat", "responses"],
    features: [
      "streaming",
      "reasoning-tokens",
      "vision",
      "file-input",
      "prompt-caching",
    ],
    tools: ["function-calling", "web-search"],
    tags: [
      "file-input",
      "tool-use",
      "reasoning",
      "vision",
      "web-search",
      "implicit-caching",
    ],
    released: "2025-11-18",
  },
  {
    chef: "Google",
    chefSlug: "google",
    id: "gemini-3.5-flash-lite",
    name: "Gemini 3.5 Flash Lite",
    description:
      "Gemini 3.5 Flash Lite features upgraded agentic capabilities, making the model ideal for subagents in complex workflows.",
    providers: ["google", "google-vertex"],
    reasoning: ["low", "medium", "high"],
    speed: ["slow", "standard", "fast", "turbo", "ultra"],
    price: { input: 0.3, output: 2.5, cachedInput: 0.03, webSearch: 14 },
    contextWindow: 1_000_000,
    maxOutput: 65_000,
    reasoningTokens: true,
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat", "responses"],
    features: [
      "streaming",
      "reasoning-tokens",
      "vision",
      "file-input",
      "prompt-caching",
    ],
    tools: ["function-calling", "web-search"],
    tags: [
      "reasoning",
      "tool-use",
      "implicit-caching",
      "file-input",
      "vision",
      "web-search",
    ],
    released: "2026-07-21",
  },
  {
    chef: "xAI",
    chefSlug: "xai",
    id: "grok-4.5",
    name: "Grok 4.5",
    description:
      "SpaceXAI's smartest model with frontier performance on coding, knowledge work, and STEM.",
    providers: ["xai"],
    reasoning: ["low", "medium", "high", "extra", "max"],
    speed: ["slow", "standard", "fast"],
    effort: ["low", "medium", "high"],
    price: { input: 2, output: 6, cachedInput: 0.3, webSearch: 5 },
    contextWindow: 500_000,
    maxOutput: 500_000,
    reasoningTokens: true,
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat", "responses"],
    features: [
      "streaming",
      "reasoning-tokens",
      "vision",
      "file-input",
      "prompt-caching",
    ],
    tools: ["function-calling", "web-search"],
    tags: [
      "reasoning",
      "tool-use",
      "implicit-caching",
      "file-input",
      "vision",
      "web-search",
    ],
    released: "2026-07-08",
  },
  {
    chef: "DeepSeek",
    chefSlug: "deepseek",
    id: "deepseek-v4-flash",
    name: "DeepSeek V4 Flash",
    description:
      "DeepSeek-V4 series incorporate several key upgrades in architecture and optimization: (1) a hybrid attention architecture that combines Compressed Sparse Attention (CSA) and Heavily Compressed Attention (HCA) to improve long-context efficiency; (2) ManifoldConstrained Hyper-Connections (mHC) that enhance conventional residual connections; (3) and the Muon optimizer for faster convergence and greater training stability",
    providers: ["deepseek", "fireworks-ai", "deepinfra", "azure"],
    reasoning: ["low", "medium", "high", "extra"],
    speed: ["slow", "standard", "fast", "turbo"],
    effort: ["high", "xhigh"],
    price: { input: 0.14, output: 0.28, cachedInput: 0.028 },
    contextWindow: 1_000_000,
    maxOutput: 384_000,
    reasoningTokens: true,
    knowledgeCutoff: "2025-05",
    modalities: { text: "both", image: "none", audio: "none", video: "none" },
    endpoints: ["chat", "responses"],
    features: ["streaming", "reasoning-tokens", "prompt-caching"],
    tools: ["function-calling"],
    tags: ["reasoning", "tool-use", "implicit-caching"],
    released: "2026-04-23",
  },
  {
    chef: "DeepSeek",
    chefSlug: "deepseek",
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    description:
      "DeepSeek-V4 series incorporate several key upgrades in architecture and optimization: (1) a hybrid attention architecture that combines Compressed Sparse Attention (CSA) and Heavily Compressed Attention (HCA) to improve long-context efficiency; (2) ManifoldConstrained Hyper-Connections (mHC) that enhance conventional residual connections; (3) and the Muon optimizer for faster convergence and greater training stability",
    providers: ["deepseek", "fireworks-ai", "deepinfra", "azure"],
    reasoning: ["low", "medium", "high", "extra", "max"],
    speed: ["slow", "standard", "fast"],
    effort: ["high", "xhigh"],
    price: { input: 0.435, output: 0.87, cachedInput: 0.0036 },
    contextWindow: 1_000_000,
    maxOutput: 384_000,
    reasoningTokens: true,
    knowledgeCutoff: "2025-05",
    modalities: { text: "both", image: "none", audio: "none", video: "none" },
    endpoints: ["chat", "responses"],
    features: ["streaming", "reasoning-tokens", "prompt-caching"],
    tools: ["function-calling"],
    tags: ["reasoning", "tool-use", "implicit-caching"],
    released: "2026-04-23",
  },
  {
    chef: "Vercel",
    chefSlug: "v0",
    id: "v0-chat",
    name: "v0 Chat",
    description:
      "Vercel's web-development model for generating and iterating on UI and app code.",
    providers: ["vercel"],
    reasoning: ["medium", "high"],
    speed: ["standard", "fast"],
    price: { input: 3, output: 15 },
    contextWindow: 128_000,
    maxOutput: 32_000,
    knowledgeCutoff: "2025-04",
    modalities: { text: "both", image: "input", audio: "none", video: "none" },
    endpoints: ["chat"],
    features: ["streaming", "structured-output"],
    tools: ["function-calling", "web-search", "mcp"],
  },
]
