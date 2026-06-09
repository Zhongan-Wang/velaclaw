import {
  applyAgentDefaultModelPrimary,
  applyProviderConfigWithModelCatalog,
  type VelaclawConfig,
} from "velaclaw/plugin-sdk/provider-onboard";
import { buildEvolinkModelDefinition, EVOLINK_BASE_URL, EVOLINK_MODEL_CATALOG } from "./api.js";

export const EVOLINK_DEFAULT_MODEL_REF = "evolink/gpt-5.2";

export function applyEvolinkProviderConfig(cfg: VelaclawConfig): VelaclawConfig {
  const models = { ...cfg.agents?.defaults?.models };
  models[EVOLINK_DEFAULT_MODEL_REF] = {
    ...models[EVOLINK_DEFAULT_MODEL_REF],
    alias: models[EVOLINK_DEFAULT_MODEL_REF]?.alias ?? "Evolink",
  };

  return applyProviderConfigWithModelCatalog(cfg, {
    agentModels: models,
    providerId: "evolink",
    api: "openai-completions",
    baseUrl: EVOLINK_BASE_URL,
    catalogModels: EVOLINK_MODEL_CATALOG.map(buildEvolinkModelDefinition),
  });
}

export function applyEvolinkConfig(cfg: VelaclawConfig): VelaclawConfig {
  return applyAgentDefaultModelPrimary(applyEvolinkProviderConfig(cfg), EVOLINK_DEFAULT_MODEL_REF);
}
