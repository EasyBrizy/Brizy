# Media Upload Integration

This Cloud Media Upload package is designed to simplify the development of third-party elements that require images set from the editor.
This package is intended for development use only.

This guide explains how to install, initialize, and use the **Media Upload** library to handle file uploads. The library is distributed as an NPM package and requires authentication using a user ID provided by Brizy.

Cloud Media Upload overview:

![Media Upload overview](/img/examples/media-upload/overview.png)

---

## 🚀 Installation

First, install the package via NPM:

```bash
npm install @brizy/cloud-media-upload
```

Or using Yarn:

```bash
yarn add @brizy/cloud-media-upload
```

## 🔐 Authentication Requirements

Before initializing the upload module, you must obtain a valid `clientId` from Brizy. This ID is used for identifying the client during media operations.

Please contact your platform administrator or integration team to request your unique userID.

## 🧩 Initialization

Once you have your `clientId`, you can initialize the media upload handler.

```ts
import { MediaUpload } from "@brizy/cloud-media-upload";

const mediaUpload = new MediaUpload({ clientId: clientID });
```

## ⚙️ Configuration

The MediaUpload instance returns an object that includes the necessary configuration to be passed into the main editor.

Example of how to set the [configuration](https://github.com/EasyBrizy/Brizy-Local-Editor/blob/master/packages/demo-nextjs/src/components/Editor/contexts/utils.ts):

```ts
// Set-up into editor configuration
const config = {
  // ... other keys
  api: {
    // ... other keys
    media: mediaUpload.mediaConfig,
  },
};
```

# 🛠️ Troubleshooting

If you encounter errors during initialization or uploading:

- Ensure your and clientId are correct.
- Check if the upload endpoint is accessible from your environment.

# 📚 API Reference

Method Description

| Getter           | Returns                                       | Description                                                                                                                         |
| ---------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `resizeUrl`      | `string`                                      | Returns the URL used to perform image resizing. Chooses between development and production values based on isDev.                   |
| `resizePatterns` | `object`                                      | Returns an object mapping named image sizes to their resizing parameters                                                            |
| `addMedia`       | `{ handler: Function }`                       | Returns an object containing the internal handler used for media upload. This is typically consumed by the editor.                  |
| `mediaConfig`    | `{ addMedia, mediaResizeUrl, imagePatterns }` | Returns the full media configuration object used for initializing the editor integration. This includes handlers and endpoint URLs. |

# 🧼 Final Notes

Always ensure you’re using the latest version of the library.

Avoid exposing your `clientId` in public environments.

Follow platform-specific guidelines for file size and type restrictions.
