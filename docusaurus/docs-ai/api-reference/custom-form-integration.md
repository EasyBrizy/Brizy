---
sidebar_position: 2
---

# Custom Form Integration

This guide explains how to build the AI intake form on your platform and call the AI Builder API to generate projects. This approach gives you full control over UX, styling, and step order while Brizy handles AI generation.

For the hosted experience (minimal integration), see [API Reference](./index.md)

## Create Custom Form and deploy anywhere

With custom form integration, you design and host the entire AI onboarding experience yourself—multi-step wizards, embedded widgets, or a single landing page—on any stack or domain you already use. Collect business name, industry, location, and page choices in the order and visual style that match your product, then call the Brizy AI Builder API from your backend (or a secure BFF) to create the project and generate pages. Nothing requires hosting the flow on Brizy’s UI; once you have a **PROJECT ID**, you continue with the session and editor steps described below. That makes this path a good fit when you need the form inside an existing app, white-label funnel, or regional deployment without changing how users sign in or navigate your platform.

**Tip:** Once your custom form is live and you have its public URL, set **`APP_CUSTOM_FORM_URL`** to that address (for example `https://your-app.com/ai-onboarding`). The AI Builder uses this value to redirect users to your form instead of the default hosted flow. Configure it in your Docker run, Compose file, or hosting config—see **`APP_CUSTOM_FORM_URL`** in the [Usage Guide environment variables](../getting-started/usage.md#environment-variables-reference)—then restart the service so the change takes effect.

## API Explorer

Interactive API documentation is available at:

```
https://[your-ai-builder-domain]/api/doc
```

Replace `[your-ai-builder-domain]` with the domain you published the AI image.

### High-level flow

1. **Your Custom Form** 
2. **AI Builder API** using API get required business data
3. **Generate an AI project** using the API steps below → receive a **PROJECT ID**.
4. **Generate Pages**
2. **Create a Session project** from the AI project and open it in the editor.

![Custom form integration flow](/img/ai/custom-form-integration-flow.svg)

## Generate company name (prompt)

Send a **prompt** describing the business. The AI uses it to suggest industries in a later step.

Use the **Generate company name by prompt** operation in the [API Explorer](#api-explorer).

## Business suggestions (Google Places)

Retrieve business suggestions from Google Places API (New) based on user input (business name, type, or keyword).

### Required header

```http
x-google-api-key: YOUR_GOOGLE_API_KEY
```

You must supply **your own** Google API key on each request to this endpoint (it is the same as keys configured in Brizy AI Docker env).

### Get a Google API key

1. Create or sign in to a [Google Cloud](https://mapsplatform.google.com) account.
2. Enable [Places API (New)](https://console.cloud.google.com/marketplace/product/google/places.googleapis.com) for your project.
3. Create or copy an API key from [Credentials](https://console.cloud.google.com/google/maps-apis/credentials).

**Warning:** Store API keys securely. Do not commit them to public repositories or expose them in client-side code unless you restrict the key (HTTP referrers, IP, etc.).

### Input behavior

- Input is typically a full or partial business name.
- Results may be biased by the user’s current location; to target another area, include location text in the same input field after the business name.

Call **Get a List of Businesses from Google Based on User Input** in the API Explorer for the exact path and body schema.

## Related documentation

- [API Reference](./index.md) — session-based integration for self-hosted Brizy AI
- [Usage Guide](../getting-started/usage.md) — Docker deployment and environment variables
- [Requirements](../getting-started/requirements.md) — API keys and system requirements
- [Blocks Creation](./blocks-creation.md) — custom block libraries for AI composition
