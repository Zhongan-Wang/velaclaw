import { readConfiguredProviderCatalogEntries } from "velaclaw/plugin-sdk/provider-catalog-shared";
import { defineSingleProviderPluginEntry } from "velaclaw/plugin-sdk/provider-entry";
import { applyEvolinkConfig, EVOLINK_DEFAULT_MODEL_REF } from "./onboard.js";
import { buildEvolinkProvider } from "./provider-catalog.js";

const PROVIDER_ID = "evolink";

export default defineSingleProviderPluginEntry({
  id: PROVIDER_ID,
  name: "Evolink Provider",
  description: "Bundled Evolink provider plugin",
  provider: {
    label: "Evolink",
    docsPath: "/providers/evolink",
    auth: [
      {
        methodId: "api-key",
        label: "Evolink API key",
        hint: "API key",
        optionKey: "evolinkApiKey",
        flagName: "--evolink-api-key",
        envVar: "EVOLINK_API_KEY",
        promptMessage: "Enter Evolink API key",
        defaultModel: EVOLINK_DEFAULT_MODEL_REF,
        applyConfig: (cfg) => applyEvolinkConfig(cfg),
        wizard: {
          choiceId: "evolink-api-key",
          choiceLabel: "Evolink API key",
          groupId: "evolink",
          groupLabel: "Evolink",
          groupHint: "API key",
        },
      },
    ],
    catalog: {
      buildProvider: buildEvolinkProvider,
    },
    augmentModelCatalog: ({ config }) =>
      readConfiguredProviderCatalogEntries({
        config,
        providerId: PROVIDER_ID,
      }),
    matchesContextOverflowError: ({ errorMessage }) =>
      /\b(?:context.*(?:too long|exceed)|input.*too long)\b/i.test(errorMessage),
  },
});
