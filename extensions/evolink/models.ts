import type { ModelDefinitionConfig } from "velaclaw/plugin-sdk/provider-model-shared";

export const EVOLINK_BASE_URL = "https://direct.evolink.ai/v1";

// Evolink is an AI gateway that routes to multiple model families.
// Pricing is dynamic; zero-cost entries signal that the gateway,
// not a static vendor price list, determines the final cost.
const EVOLINK_DEFAULT_COST = {
  input: 0,
  output: 0,
  cacheRead: 0,
  cacheWrite: 0,
};

export const EVOLINK_MODEL_CATALOG: ModelDefinitionConfig[] = [
  {
    id: "gpt-5.2",
    name: "GPT-5.2",
    reasoning: false,
    input: ["text"],
    contextWindow: 200000,
    maxTokens: 16384,
    cost: EVOLINK_DEFAULT_COST,
    compat: { supportsUsageInStreaming: true },
  },
  {
    id: "gpt-5.4",
    name: "GPT-5.4",
    reasoning: false,
    input: ["text"],
    contextWindow: 200000,
    maxTokens: 16384,
    cost: EVOLINK_DEFAULT_COST,
    compat: { supportsUsageInStreaming: true },
  },
  {
    id: "gpt-5.5",
    name: "GPT-5.5",
    reasoning: true,
    input: ["text"],
    contextWindow: 200000,
    maxTokens: 32768,
    cost: EVOLINK_DEFAULT_COST,
    compat: { supportsUsageInStreaming: true },
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    reasoning: false,
    input: ["text", "image"],
    contextWindow: 1048576,
    maxTokens: 16384,
    cost: EVOLINK_DEFAULT_COST,
    compat: { supportsUsageInStreaming: true },
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    reasoning: false,
    input: ["text", "image"],
    contextWindow: 1048576,
    maxTokens: 16384,
    cost: EVOLINK_DEFAULT_COST,
    compat: { supportsUsageInStreaming: true },
  },
  {
    id: "gemini-3.0-pro",
    name: "Gemini 3.0 Pro",
    reasoning: false,
    input: ["text", "image"],
    contextWindow: 1048576,
    maxTokens: 16384,
    cost: EVOLINK_DEFAULT_COST,
    compat: { supportsUsageInStreaming: true },
  },
  {
    id: "deepseek-chat",
    name: "DeepSeek Chat",
    reasoning: false,
    input: ["text"],
    contextWindow: 131072,
    maxTokens: 8192,
    cost: EVOLINK_DEFAULT_COST,
    compat: { supportsUsageInStreaming: true },
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    reasoning: true,
    input: ["text"],
    contextWindow: 131072,
    maxTokens: 65536,
    cost: EVOLINK_DEFAULT_COST,
    compat: { supportsUsageInStreaming: true },
  },
];

export function buildEvolinkModelDefinition(
  model: (typeof EVOLINK_MODEL_CATALOG)[number],
): ModelDefinitionConfig {
  return {
    ...model,
    api: "openai-completions",
  };
}
