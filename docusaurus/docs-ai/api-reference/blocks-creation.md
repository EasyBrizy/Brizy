---
sidebar_position: 3
---

# Blocks Creation

This guide explains how to create, export, and publish **custom blocks** for Brizy AI. The AI loads blocks from your storage (typically S3 or a CDN) using the folder layout below.

## Overview

Brizy AI uses client input (site name, industry, info, pages) to pick blocks per page, generate content, and output Brizy Editor–ready JSON and HTML.

You can:

1. **Use Brizy blocks** — pre-built blocks from the Brizy ecosystem (default kit).
2. **Create personal blocks** — design sections in **Brizy Local Editor**, export them, and upload to your own `blocks/` tree.

**Important:** JSON blocks must be created in the **Brizy Editor** (Brizy Local Editor). Do not hand-write block JSON.

**Warning:** Export **one section per page**. Each block = one page in the editor, one section only.

## Block creation workflow

### Step 1 — Set up Brizy Local Editor

1. Install and run [Brizy Local Editor](https://github.com/EasyBrizy/Brizy-Local-Editor).
2. Create a project (blank or from a template).
3. Design a single section on its own page.
4. Style and preview the layout.

### Step 2 — Export and upload

1. Export **JSON** and **HTML** from the editor.
2. Upload files into the [folder structure](#blocks-folder-structure) on S3 (or your CDN).
3. Ensure files are **publicly readable**

## Blocks folder structure

All block assets live under a single root folder named `blocks/`.

![Blocks storage folder structure](/img/ai/blocks-storage-structure.svg)

### Directory reference

| Path | Purpose |
|------|---------|
| `blocks/kits/default/` | Kit **catalog** — JSON array listing every block the AI can choose |
| `blocks/html/{kit_slug}/{collection_item_id}` | **Compiled HTML** for a collection item (preview / rendering) |
| `blocks/assets/{kit_slug}/{collection_item_id}` | **Asset manifest** — scripts, styles, and per-section HTML snippets |
| `blocks/json/{kit_slug}/{block_slug}` | **Editor JSON** — `pageData` |
| `blocks/styles/{kit_slug}.json` | **Kit global styles** — colors, typography, and shared design tokens for the kit |

### Path placeholders

| Placeholder | Where it comes from |
|-------------|---------------------|
| `{kit_slug}` | `kit_slug` field in the catalog entry (e.g. `19562563`) |
| `{collection_item_id}` | Numeric id from catalog `id` (e.g. `/collection_items/8969182`) |
| `{block_slug}` | `slug` field in the catalog (e.g. `block5170dark`) |

### Kit catalog (`blocks/kits/default`)

The catalog is a **JSON array**. Each object describes one block variant (light/dark, category, thumbnail, etc.).

| Field | Description |
|-------|-------------|
| `id` | Collection item path (e.g. `/collection_items/8969182`) |
| `slug` | Unique block slug; used in `blocks/json/{kit_slug}/{slug}` |
| `categories` | Section type for AI matching (e.g. `Hero`, `Footer`) |
| `theme` | `Light` or `Dark` |
| `pro` | License flag (e.g. `PRO`) |
| `thumbnail` | Preview image filename |
| `thumbnailWidth` / `thumbnailHeight` | Thumbnail dimensions |
| `keywords` | Search / filter keywords |
| `order` | Sort order in the kit |
| `kit_slug` | Kit identifier |
| `url` | Source Brizy site URL used when exporting |

**Example:** [kit-catalog.json](/examples/blocks-creation/kit-catalog.json) (two entries; production catalogs contain many blocks).

### HTML export (`blocks/html/...`)

Compiled page HTML for the collection item. Used when the AI needs rendered markup.

**Example:** [block-html.sample.txt](/examples/blocks-creation/block-html.sample.txt) (abbreviated HTML; full exports are much larger).

### Assets manifest (`blocks/assets/...`)

JSON describing root CSS classes and per-block HTML plus bundled scripts/styles.

| Top-level key | Description |
|---------------|-------------|
| `rootClassNames` | Wrapper classes for the page root |
| `rootAttributes` | Extra root attributes |
| `blocks[]` | One entry per section: `id`, `html`, `assets` (scripts/styles) |

**Example:** [block-assets.json](/examples/blocks-creation/block-assets.json).

### Editor JSON (`blocks/json/...`)

Brizy Editor export: a `collection` array with `pageData` (stringified editor state). The AI replaces text/media inside this structure.

**Example:** [block-json.json](/examples/blocks-creation/block-json.json) (`pageData` truncated).

### Kit styles (`blocks/styles/{kit_slug}.json`)

One JSON file per kit at `blocks/styles/{kit_slug}.json` (filename is the kit id, e.g. `19562563.json`). It holds default **global styles** for that kit—color palette, typography, and other tokens the AI will generate his own color palette and Typography this is default one for all projects

**Example:** [kit-styles.json](/examples/blocks-creation/kit-styles.json) (structure only; shape matches your export).

## End-to-end checklist

1. Design **one section** per editor page → export JSON + HTML.
2. Add a catalog row under `blocks/kits/default` (or your kit file).
3. Upload HTML to `blocks/html/{kit_slug}/{collection_item_id}`.
4. Upload assets JSON to `blocks/assets/{kit_slug}/{collection_item_id}`.
5. Upload editor JSON to `blocks/json/{kit_slug}/{block_slug}`.
6. Upload kit styles to `blocks/styles/{kit_slug}.json`.
7. Upload thumbnail images referenced by the catalog.

## Storage requirements

- **JSON** — editor `pageData` per block slug.
- **HTML** — compiled output (required by the AI pipeline).
- **Catalog** — index so the AI can discover and filter blocks.
- **Kit styles** — one `{kit_slug}.json` per kit under `blocks/styles/`.
- **Public URLs** — every path must be reachable from the Brizy AI container.

## Best practices

### Block design

- Design for **responsive** breakpoints.
- Use clear heading hierarchy and image alt text.
- Keep sections focused (one layout idea per block).

### Quality assurance

- Preview on desktop, tablet, and mobile.
- Confirm JSON and HTML exports are complete.
- Open catalog URLs in a browser to verify CDN/S3 permissions.

## Related documentation

- [API Reference](./index.md) — session workflow and fetching generated pages
- [Custom Form Integration](./custom-form-integration.md) — custom intake + AI Builder API
- [Usage Guide](../getting-started/usage.md) — Docker
- [Requirements](../getting-started/requirements.md) — API keys and infrastructure

### Example files

| File | Description |
|------|-------------|
| [kit-catalog.json](/examples/blocks-creation/kit-catalog.json) | Catalog array (sample entries) |
| [block-html.sample.txt](/examples/blocks-creation/block-html.sample.txt) | Compiled HTML (abbreviated) |
| [block-assets.json](/examples/blocks-creation/block-assets.json) | Assets manifest structure |
| [block-json.json](/examples/blocks-creation/block-json.json) | Editor `pageData` shape (truncated) |
| [kit-styles.json](/examples/blocks-creation/kit-styles.json) | Kit global styles (sample structure) |
