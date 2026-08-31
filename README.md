# dsh-model-picker-augmented

> **MIT License** — Copyright (c) 2026 **Manolo Remiddi**
> SPDX-License-Identifier: MIT — see [LICENSE](LICENSE) for the full license text.

Searchable, curated composer model picker for [DeepSeek Harness](https://deepseek.com).

This plugin replaces the model picker in the composer with a searchable version
and adds a **Model Picker** settings page so you can control exactly which
models appear in the list and which ones are pinned to the top.

## Features

- **Live model search** — a search field at the top of the model list filters
  as you type, matching the model name **and** the provider name. Groups with
  no matches disappear; an empty query restores the full list.
- **Show / hide models** — hide models you never use from the picker list via
  the settings page. Hidden models stay listed in Settings (marked *Hidden*)
  so you can bring them back without a full reset.
- **Pin to top** — pin your favorite models; they render in a *Pinned* section
  at the very top of the model list (and are removed from their provider group
  below to avoid duplicates). Order them with the up/down arrows in Settings.
- **Reset to defaults** — one button restores every model and clears all pins.
- Keeps the rest of the picker exactly as shipped: the two-level Model/Effort
  menu, effort levels, keyboard navigation, error/retry states, and full sync
  with the `/model` command (both use the same shared model directory).

## Requirements

- DeepSeek Harness (`dsh`) `>= 0.1.1-rc.1`
- The web GUI profile (`--profile web`), which ships the dependencies this
  plugin builds on (`@deepseek-ai/dsh-client-ui-conversation`,
  `@deepseek-ai/dsh-client-ui-settings`, `@deepseek-ai/dsh-client-ui-model-selection`,
  `@deepseek-ai/dsh-client-locale`, `@deepseek-ai/dsh-client-runtime`).

## Install

The plugin is a DSH bundle patch package (same pattern as other hot-pluggable
web plugins):

```bash
git clone https://github.com/ManoloRemiddi/dsh-model-picker-augmented.git
cd dsh-model-picker-augmented
dsh plugin --profile web add link:$(pwd)
```

Then restart the harness (or reload the web GUI). The composer model picker is
now the searchable one and a **Model Picker** page appears under
**Settings → Model Picker**.

To remove it:

```bash
dsh plugin --profile web remove model-picker-augmented
```

## Usage

1. Open any session and click the model picker at the right end of the
   composer tool row.
2. Enter **Model** to open the list — type in the search field at the top to
   filter (e.g. `qwen` shows only Qwen models and the providers that carry
   them; clear the field to show everything again).
3. Open **Settings → Model Picker** to curate:
   - **Visible / Hidden** toggles per model (hidden models vanish from the
     picker, stay listed here, and can be re-enabled at any time).
   - **Pin to top** per model, with up/down arrows to order the pinned section.
   - **Reset to defaults** to clear everything.

## How it works

- The browser half registers into the composer's named model seat
  (`conversation.input.model`) with a shadowing priority, and into the
  settings panel (`settings.section`).
- Model data comes from the harness itself: the picker reads the same
  per-session advisory directory the shipped picker uses (the
  `modelDirectories` service), and the settings page fetches the global
  catalog through the client wire API (`api.llm.models`). The plugin adds no
  model data of its own — if a model is missing from the picker, it is missing
  from your configured provider catalogs (see below).
- Curation (hidden models + pinned order) is kept **in memory for the lifetime
  of the plugin**: it applies instantly and resets on a page reload. This is
  the standard behavior for a hot-pluggable web plugin; make it a static
  deployment plugin if you need durable settings.

## Notes on model availability

The picker can only show models the locally installed provider catalogs know.
`zai` and `openrouter` providers fall back to the bundled pi-ai catalog unless
their `llm-pi-ai` profile in `settings.yaml` carries an explicit `models` list
(which then **replaces** the bundled catalog). New models announced by a
provider (e.g. a new GLM or Qwen tier) only appear once added to that list.

### Adding models a provider announced but your catalog lacks

Either use the shipped **Settings → Models** page (its fetch-from-endpoint
flow pulls the current catalog from the provider), or edit
`~/.dsh/settings.yaml` directly. Each entry needs `id`, `name`,
`contextWindow`, and `maxTokens` (positive integers). Because an explicit
`models` list replaces the bundled catalog, list **every** model you want to
see — entries you omit disappear from the picker:

```yaml
# ~/.dsh/settings.yaml — llm-pi-ai section (example: Z.ai)
llm-pi-ai:
  providers:
    zai:
      apiKeyEnv: ZAI_API_KEY
      models:
        - id: glm-4.5-air
          name: GLM-4.5-Air
          contextWindow: 131072
          maxTokens: 98304
        - id: glm-5.3
          name: GLM-5.3
          contextWindow: 1048576
          maxTokens: 131072
        - id: glm-5.3-flash
          name: GLM-5.3-Flash
          contextWindow: 1048576
          maxTokens: 131072
        # …plus every other zai model you want to keep
```

The same applies to `openrouter` (e.g. `qwen/qwen3.8-max`). The harness
hot-reloads `settings.yaml`, so the picker picks the new entries up on its
next open. Real specs come from the provider (Z.ai docs, OpenRouter) — or
let the fetch-from-endpoint flow fill them in.

## License

MIT — Copyright (c) 2026 Manolo Remiddi. See [LICENSE](LICENSE).

Every source file carries the MIT header; `package.json` states it via the
`license` and `author` fields.
