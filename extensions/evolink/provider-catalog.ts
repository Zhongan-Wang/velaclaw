import type { ModelProviderConfig } from "velaclaw/plugin-sdk/provider-model-shared";
import { buildEvolinkModelDefinition, EVOLINK_BASE_URL, EVOLINK_MODEL_CATALOG } from "./models.js";

export function buildEvolinkProvider(): ModelProviderConfig {
  return {
    baseUrl: EVOLINK_BASE_URL,
    api: "openai-completions",
    models: EVOLINK_MODEL_CATALOG.map(buildEvolinkModelDefinition),
  };
}
