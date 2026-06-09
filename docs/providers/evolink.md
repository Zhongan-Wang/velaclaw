---
title: "Evolink"
summary: "Evolink setup (auth + model selection)"
read_when:
  - You want to use Evolink with Velaclaw
  - You need the API key env var or CLI auth choice
---

# Evolink

[Evolink](https://evolink.ai) is an AI gateway that provides unified access to
models from OpenAI (GPT-5), Google (Gemini), DeepSeek, and more through a single
OpenAI-compatible API.

| Property | Value                          |
| -------- | ------------------------------ |
| Provider | `evolink`                      |
| Auth     | `EVOLINK_API_KEY`              |
| API      | OpenAI-compatible              |
| Base URL | `https://direct.evolink.ai/v1` |

## Getting started

<Steps>
  <Step title="Get your API key">
    Create an API key at [evolink.ai/dashboard/keys](https://evolink.ai/dashboard/keys).

  </Step>
  <Step title="Run onboarding">
    ```bash
    velaclaw onboard --auth-choice evolink-api-key
    ```

    This will prompt for your API key and set `evolink/gpt-5.2` as the default model.

  </Step>
  <Step title="Verify models are available">
    ```bash
    velaclaw models list --provider evolink
    ```

  </Step>
</Steps>

<AccordionGroup>
  <Accordion title="Non-interactive setup">
    For scripted or headless installations, pass all flags directly:

    ```bash
    velaclaw onboard --non-interactive \
      --mode local \
      --auth-choice evolink-api-key \
      --evolink-api-key "$EVOLINK_API_KEY" \
      --skip-health \
      --accept-risk
    ```

  </Accordion>
</AccordionGroup>

<Warning>
If the Gateway runs as a daemon (launchd/systemd), make sure `EVOLINK_API_KEY`
is available to that process (for example, in `~/.velaclaw/.env` or via
`env.shellEnv`).
</Warning>

## Built-in catalog

Evolink routes to multiple model families. The built-in catalog includes
well-known models from each family:

| Model ref                  | Name             | Input       | Context   | Max output | Notes                         |
| -------------------------- | ---------------- | ----------- | --------- | ---------- | ----------------------------- |
| `evolink/gpt-5.2`          | GPT-5.2          | text        | 200,000   | 16,384     | Default model                 |
| `evolink/gpt-5.4`          | GPT-5.4          | text        | 200,000   | 16,384     | GPT-5 non-reasoning surface   |
| `evolink/gpt-5.5`          | GPT-5.5          | text        | 200,000   | 32,768     | Reasoning-enabled GPT-5       |
| `evolink/gemini-2.5-pro`   | Gemini 2.5 Pro   | text, image | 1,048,576 | 16,384     | Gemini 2.5 Pro                |
| `evolink/gemini-2.5-flash` | Gemini 2.5 Flash | text, image | 1,048,576 | 16,384     | Gemini 2.5 Flash              |
| `evolink/gemini-3.0-pro`   | Gemini 3.0 Pro   | text, image | 1,048,576 | 16,384     | Gemini 3.0 Pro                |
| `evolink/deepseek-chat`    | DeepSeek Chat    | text        | 131,072   | 8,192      | DeepSeek V3 non-reasoning     |
| `evolink/deepseek-v4-pro`  | DeepSeek V4 Pro  | text        | 131,072   | 65,536     | DeepSeek V4 reasoning surface |

<Tip>
Evolink pricing is dynamic (determined by the upstream model and routing).
The built-in catalog advertises zero-cost entries; actual billing follows your
Evolink plan.
</Tip>

## Config example

```json5
{
  env: { EVOLINK_API_KEY: "elk-..." },
  agents: {
    defaults: {
      model: { primary: "evolink/gpt-5.2" },
    },
  },
}
```

## Related

<CardGroup cols={2}>
  <Card title="Model selection" href="/concepts/model-providers" icon="layers">
    Choosing providers, model refs, and failover behavior.

  </Card>
  <Card title="Configuration reference" href="/gateway/configuration-reference" icon="gear">
    Full config reference for agents, models, and providers.

  </Card>
</CardGroup>
