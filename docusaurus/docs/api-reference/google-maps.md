---
title: Google Maps
sidebar_label: Google Maps
---

## Google Maps API Overview

The **Map** element and map backgrounds (on sections, rows and columns) show an address with the
[Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started).
This API needs a key, and the editor reads it from the `config`.

The key is used:

- In the editor, when the map is shown on the page you edit.
- On the published page, because the compiled HTML uses the same key.

Without a key, the map is still added to the page, but Google shows an error instead of the map.

## API Integration

Add your key as `googleMapApiKey` in the `integrations` object of the `config` during editor initialization.

```ts
const config = {
  // Other configuration properties
  integrations: {
    // Other integrations
    googleMapApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  },
};
```

| Name                           | Type     | Description                                                                         |
| :----------------------------- | :------- | :---------------------------------------------------------------------------------- |
| `integrations.googleMapApiKey` | `string` | Your Google Maps Embed API key, used by the **Map** element and by map backgrounds. |

## How it works

The editor builds the map iframe URL from the key, the address and the zoom set on the element:

```
https://www.google.com/maps/embed/v1/place?key={googleMapApiKey}&q={address}&zoom={zoom}
```

## Getting a key

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Maps Embed API** for the project.
3. Create an API key in **APIs & Services → Credentials**.

**Note:** The key is visible in the page HTML. Restrict it in the Google Cloud Console to the **Maps Embed API**
and to your website domains (HTTP referrers), so it cannot be used on other sites.

<h2>Full Example (Next.js)</h2>
For a complete working example using **Next.js**, refer to the official **Brizy Local Editor** demo repository:

- [**Integrations config**](https://github.com/EasyBrizy/Brizy-Local-Editor/blob/master/packages/demo-nextjs/src/components/Editor/contexts/utils.ts) (`getIntegrations`)
