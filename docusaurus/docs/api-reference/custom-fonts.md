---
title: Custom Fonts
sidebar_label: Custom Fonts
---

## Custom Fonts API Overview

The **Custom Fonts API** in the Brizy Editor allows developers to upload, manage, and delete custom fonts used in their projects. It supports full control over user-uploaded 
fonts—letting you define font names, weights, styles, and categories.

With this API, you can:

- Upload and register custom fonts in the editor.
- Update or overwrite existing custom font entries.
- Delete fonts no longer in use.
- Retrieve font metadata (name, weights, styles, category).

This feature is accessible in the editor via the “Add New Font” popup:  
![Image](/img/prompts/add-fonts.png)


## API Integration

To enable font management features in the Brizy Editor, you need to add a `fonts` integration to the `config` object
during editor initialization.

```ts
const config = {
  // Other configuration properties
  integrations: {
    // Other integrations
    fonts: {
      upload: {
        get: (res: Response<Array<UploadedFont>>, rej: Response<string>) => {
          // Fetch all custom fonts uploaded by the user
          // Call res(fonts) with the list or rej(error) on failure
          res();
        },
        upload: (
          res: Response<UploadFont>,
          rej: Response<string>,
          extra: {
            name: string;
            id: string;
            files: FontFile;
          }
        ) => {
          // Upload a new custom font
          // 'extra' contains the font's name, ID, and file(s)
          // Call res(uploadedFont) on success or rej(error) on failure
          res();
        },
        delete: (
          res: Response<string>,
          rej: Response<string>,
          fontId: string
        ) => {
          // Delete a custom font by ID
          // Call res() on success or rej(error) on failure
          res();
        }
      }
    }
  },
  urls: {
    // Other URLs
    editorFonts: "https://example.com/fonts" // Base URL for custom font assets
  }
};
```

### Getting Fonts

The `get` method in the `upload` object retrieves the list of custom fonts available in the editor.  
Call the `res` callback with an array of font objects. Each object should have:

- `id`: Unique font identifier.
- `family`: Font family name.
- `type`: Always `uploaded`.
- `weights`: Array of available font weights (e.g., `[400, 700]`).
- `deleted`: *(optional)* Boolean indicating if the font is deleted.

---

### Uploading Fonts

The `upload` method adds a new custom font.  
Call the `res` callback with the uploaded font object, which should include:

- `id`: Unique font identifier.
- `family`: Font family name.
- `type`: Always `uploaded`.
- `weights`: Array of available font weights (e.g., `[400, 700]`).

The `extra` parameter provides upload data:

- `name`: Font name.
- `id`: Font ID.
- `files`: Font file structure:

```ts
export interface FontFile {
  [weight: string]: {
    [fileType: string]: File | null;
  };
}
```

Example:
```ts
{
  "400": {
    "woff2": File,
    "woff": File,
    "ttf": File
  },
  "700": {
    "woff2": File,
    "woff": File,
    "ttf": File
  }
}
```

For more details about the CustomFont types, refer to the [Custom Font types](https://github.com/EasyBrizy/Brizy-Local-Editor/blob/master/packages/core/src/types/font.ts) section.

### Deleting Fonts
The `delete` method removes a custom font by ID. Call `res()` on success or rej(error) on failure. The `fontId` parameter is the ID of the font to delete.


### Editor Fonts URL
The urls.editorFonts property defines the base URL for font resources. The builder will automatically construct the full URL for each font by appending the font ID to this base URL.

In `Editor Mode`, fonts are loaded individually using:
```ts 
`${urls.editorFonts}${fontId}:${fontWeights}`
```

Example:
```ts
const baseEditorFonts = "https://example.com/fonts/";
const fontId = "12345";
const fontWeights = [400, 700];
const fontUrl = `${baseEditorFonts}${fontId}:${fontWeights.join(",")}`;
// Result: "https://example.com/fonts/12345:400,700"
```

In `preview mode`, all used fonts are loaded in one request:
```ts
`${urls.editorFonts}${font1Id}:${font1Weights}|${font2Id}:${font2Weights}|...`
```

Example:
```ts
const baseEditorFonts = "https://example.com/fonts/";
const font1Id = "12345";
const font1Weights = [400, 700];
const font2Id = "67890";
const font2Weights = [400, 500];
const fontUrl = `${baseEditorFonts}${font1Id}:${font1Weights.join(",")}|${font2Id}:${font2Weights.join(",")}`;
// Result: "https://example.com/fonts/12345:400,700|67890:400,500"
```

The content of the font file should be a CSS file that includes the `@font-face` rule for each font weight and style.
Note that the font face should be following the format:

For example if your url is `https://example.com/fonts/12345:400,700`, the content of the file should look like this:
```css
@font-face {
  font-family: '12345';
  src: local('12345'), url('https://example.com/fonts/uploaded-12345font.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: '12345';
  src: local('12345'), url('https://example.com/fonts/uploaded-12345font-bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}
```

For the preview mode example, if your url is `https://example.com/fonts/12345:400,700|67890:400,500`, the content of the file should look like this:
```css
@font-face {
  font-family: '12345';
  src: local('12345'), url('https://example.com/fonts/uploaded-12345font.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: '12345';
  src: local('12345'), url('https://example.com/fonts/uploaded-12345font-bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: '67890';
  src: local('67890'), url('https://example.com/fonts/uploaded-67890font.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: '67890';
  src: local('67890'), url('https://example.com/fonts/uploaded-67890font-bold.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}
```

The Brizy Editor supports the following font formats:
- `woff2`
- `woff`
- `ttf`
- `eot`

## Basic Usage

The following example demonstrates how to integrate custom font support into the Brizy Editor using the Fonts API.  
It includes fetching available fonts, uploading new fonts, and deleting existing ones.

```ts
const config = {
  integrations: {
    fonts: {
      upload: {
        get: (res, rej) => {
          try {
            // Fetch the list of available custom fonts
            res([
              {
                id: "font1",
                family: "Custom Font 1",
                type: "uploaded",
                weights: [400, 700],
              },
              {
                id: "font2",
                family: "Custom Font 2",
                type: "uploaded",
                weights: [400, 500],
              }
            ]);
          } catch (error) {
            rej("Error fetching fonts");
          }
        },
        upload: (res, rej, extra) => {
          const { name, id, files } = extra;

          // Process and store the uploaded font files
          // Example assumes successful storage and returns the new font object
          const uploadedFont = {
            id,
            family: name,
            type: "uploaded",
            weights: Object.keys(files).map(weight => parseInt(weight)),
          };

          res(uploadedFont);
        },
        delete: (res, rej, fontId) => {
          try {
            // Delete the font by ID from your storage/server
            res(fontId);
          } catch (error) {
            rej("Error deleting font");
          }
        }
      }
    }
  }
};
```

<h2>Full Example (Next.js)</h2>
For a complete working example using **Next.js**, refer to the official **Brizy Local Editor** demo repository:

<h3>🔧 Client-side</h3>

- [**Editor Config Initialization**](https://github.com/EasyBrizy/Brizy-Local-Editor/blob/master/packages/demo-nextjs/src/components/Editor/contexts/index.tsx#L25)
- [**Upload Utility Logic**](https://github.com/EasyBrizy/Brizy-Local-Editor/blob/master/packages/demo-nextjs/src/components/Editor/contexts/utils.ts#L439)

<h3>🗄️ Server-side</h3>

- [**Font Upload & Management API**](https://github.com/EasyBrizy/Brizy-Local-Editor/tree/master/packages/demo-nextjs/src/app/api/fonts)
- [**Individual Font API Handling**](https://github.com/EasyBrizy/Brizy-Local-Editor/blob/master/packages/demo-nextjs/src/app/api/font/%5Bid%5D/route.ts)
