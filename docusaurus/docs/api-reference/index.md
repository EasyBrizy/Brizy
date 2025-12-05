---
sidebar_position: 1
---

# Editor Config

Editor config is the configuration our builder starts with. The config can influence the starter page, global styles.
The full config can be seen below:

## Config Page

```ts
type config = {
  autoSaveInterval?: number;

  // L10n
  l10n?: Record<string, string>;

  // isRTL
  isRTL?: boolean;

  // API
  api?: {
    /// Media
    media?: {
      mediaResizeUrl?: string;
      imagePatterns?: ImagePatterns;

      addMedia?: {
        handler: (resolve: Response<AddMediaData>, reject: Response<string>, extra: AddMediaExtra) => void;
      };

      addMediaGallery?: {
        handler: (resolve: Response<Array<AddMediaData>>, reject: Response<string>, extra: AddMediaExtra) => void;
      };
    };

    // File
    customFile?: {
      fileUrl?: string;

      addFile?: {
        handler: (res: Response<AddFileData>, rej: Response<string>, extra: AddFileExtra) => void;
      };
    };

    // Default Blocks | Kits | Popups
    defaultKits?: DefaultKits; // More information about the type types/types.ts
    defaultLayouts?: DefaultLayouts; // More information about the type types/types.ts

    // Screebnshots
    screenshots?: {
      screenshotUrl?: string;
      create?: (res: Response<{ id: string }>, rej: Response<string>, extra: ScreenshotData) => void;
      update?: (res: Response<{ id: string }>, rej: Response<string>, extra: ScreenshotData & { id: string }) => void;
    };
  };

  // UI
  ui?: {
    theme?: Theme;

    prompts?: {
      blockAdder?: {
        activeTab?: "template" | "blocks" | "saved" | "global";
        category?: string;
      };
    };

    leftSidebar?: {
      topTabsOrder?: Array<LeftSidebarOption>;
      bottomTabsOrder?: Array<LeftSidebarOption>;

      more?: {
        options?: Array<{
          type: "link";
          label: string;
          link: string;
          linkTarget?: "_blank" | "_self" | "_parent" | "_top";
        }>;
      };
    };

    publish?: {
      handler: (res: Response<void>, rej: Response<string>, extra: Output) => void;
    };
  };

  // Urls
  urls: {
    editorIcons: string;
    worker: string;
    assets: string;
    screenshot: string;
    pagePreview?: string;
    googleFonts?: string;
  };

  // Events
  onAutoSave?: (data: AutoSave) => void;
  onLoad?: VoidFunction;
};
```

## About config

To be able to start the builder you need to send valid values in the config in the following required keys:

<ul>
  <li>`ui` - the object that let us to customize the left sidebar order, links or elements, also let us to customize popup settings and also the color variables of builder UI</li>
  <li>`urls.editorIcons` - The path to the icons used by the builder.</li>
</ul>

The other keys like `autoSaveInterval`, `api`, `l10n` etc. are not required and builder can work without them.

## Explanation

---

Config can be passed as an object when you initialize the editor from the script.

### First level parameters

| Name               | Type      | Description                                                                                                                                                                                                                                                                                              |
| :----------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `l10n`             | `object`  | A data structure maps keys to localized strings for localization, with available keys listed [here](https://github.com/EasyBrizy/Brizy/blob/master/packages/core/docs/l10n.ts) and existing translations [here](https://github.com/EasyBrizy/Brizy-Local-Editor/tree/master/packages/core-translations). |
| `onAutoSave`       | `JSON`    | Fired after Auto Save happened in editor                                                                                                                                                                                                                                                                 |
| `onLoad`           | `JSON`    | Fired when the builder is loaded                                                                                                                                                                                                                                                                         |
| `isRTL`            | `boolean` | Enables right-to-left (RTL) layout when set to true. Default false.                                                                                                                                                                                                                                      |
| `autoSaveInterval` | `number`  | Default `2000`. Set a `ms` delay for `onAutoSave` function                                                                                                                                                                                                                                               |

### UI parameters

| Name                              | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :-------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ui.theme.colors`                 | `object`   | We can customize the color variables in builder's UI                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `ui.prompts.blockAdder.activeTab` | `string`   | Indicate the default tab that opens in the Block Adder.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `ui.prompts.blockAdder.category`  | `string`   | Indicate the category that will be displayed when the default tab opens in the Block Adder.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `ui.leftSidebar.topTabsOrder`     | `Array`    | Lets you control the order and visibility of the [icons in the left sidebar at the top](https://user-images.githubusercontent.com/10077249/206904478-d11e2fb3-addb-48c1-8dce-123868e8d8ac.png). This property accepts an array of objects in the format: `[{ id: string, type: LeftSidebarOption }]` If the type is `"addElements"`, an additional key, `elements`, must be provided. The `elements` key accepts an array that specifies the elements to display within the current tab [icons in the addElements](https://user-images.githubusercontent.com/18303258/230393691-1f0e5198-43e7-43ee-ab06-8d8d0f5f9c03.png). |
| `ui.leftSidebar.bottomTabsOrder`  | `Array`    | Lets you control the order and visibility of the [icons in the left sidebar at the top](https://user-images.githubusercontent.com/10077249/206904478-d11e2fb3-addb-48c1-8dce-123868e8d8ac.png). This property accepts an array of objects in the format: `[{ id: string, type: LeftSidebarOption }]` If the type is `"addElements"`, an additional key, `elements`, must be provided. The `elements key accepts an array that specifies the elements to display within the current tab [icons in the addElements](https://user-images.githubusercontent.com/18303258/230393691-1f0e5198-43e7-43ee-ab06-8d8d0f5f9c03.png).  |
| `ui.leftSidebar.more.options`     | `Array`    | Lets you add more links in the [More dropdown](https://user-images.githubusercontent.com/10077249/206904832-5af03a48-991a-4c90-aead-2d7dea82c9d5.png) in the left sidebar.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `ui.publish.handler`              | `function` | A function assigned to the bottom-right "Publish" save button.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

### API parameters

| Name                                | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api.media.mediaResizeUrl`          | `string`   | This is the URL for the image resizer service. There are two image resizer service options: hosted by Brizy and self hosted. If you choose to use the image resizer service hosted by Brizy, you don't have to change the media.brizylocal.com URL. For the self hosted version you need to replace the media.brizylocal.com with the URL of your image resizer service. Setup your own image resizer service like [this](https://github.com/EasyBrizy/Brizy-Local-Image-Resizer#image-resizer)                                                                                                                              |
| `api.media.imagePatterns`           | `object`   | This is an object with `full`, `original`, and `split` keys. It's used to control the final URLs for all builder resize and crop operations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `api.media.addMedia.handler`        | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor. In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.                                                                                                                             |
| `api.media.addMediaGallery.handler` | `function` | Is a function with a Promise-like signature for handling multiple image uploads (used by the gallery control). This function lets you use your own logic to retrieve multiple images. Once the images are available, you must call the resolve(value) function with an array of `AddMediaData` objects to pass them to the editor. In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.                 |
| `api.customFile.fileUrl`            | `string`   | This is the URL for your resources the final URL will be `api.customFile.fileUrl/${fileName}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `api.customFile.addFile.handler`    | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor. In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.                                                                                                                             |
| `api.defaultKits.label`             | `string`   | Defines the text displayed in the editor UI.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `api.defaultKits.getKits`           | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve([ Array of kits ])`). In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.                                                                         |
| `api.defaultKits.getMeta`           | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve([ Array of kits with blocks ])`). In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.                                                             |
| `api.defaultKits.getData`           | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve(block.json)`). In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.                                                                                |
| `api.defaultLayouts.label`          | `string`   | Defines the text displayed in the editor UI.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `api.defaultLayouts.getMeta`        | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve({ templates: [ Array of layouts with pages and every page must have screenshots and id] })`). In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor. |
| `api.defaultLayouts.getData`        | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve([ page.json ])`). In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.                                                                             |
| `api.screenshots.screenshotUrl`     | `string`   | This is the base URL used to retrieve the screenshots. The final URL will be `${api.screenshots.screenshotUrl}${id}?t=${timestamp}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `api.screenshots.create`            | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve({ id: screenshot id })`). In case you want to cancel the operation, call the reject() function.                                                                                                                                                                                                                                                                         |
| `api.screenshots.update`            | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve({ id: screenshot id })`). In case you want to cancel the operation, call the reject() function.                                                                                                                                                                                                                                                                         |

### Urls parameters

| Name               | type     | Description                                                                                                                                                                                                                                                                                                                                                    |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `urls.googleFonts` | `string` | Base URL for Google Fonts CSS loading and DNS prefetch/preconnect optimization. Used directly as the base URL when generating Google Fonts CSS links (query parameters are appended). Also used for DNS prefetch and preconnect links. Defaults to `"https://fonts.bunny.net/css"` for CSS links and `"https://fonts.bunny.net"` for prefetch if not provided. |

## Examples

---

### Example Media Handler

```ts
const config = {
  api: {
    media: {
      handler(resolve, reject, extra) {
        // extra: { acceptedExtensions: Array<string> }
        resolve({
          uid: "1234",
          fileName: "picture.png",
        });
      },
    },
  },
};
```

### Example Media Handler with Brizy Image Resizer & AWS S3

The builder uses two keys: `uid` and `fileName`, or only `uid` (with file extensions).
The main idea is to resolve problems with the duplication of images.
If the duplication was resolved by some media upload gallery, then send only `fileName` to `uid`.
For example: `resolve({uid: "picture.png"})`.

### Example Media Gallery Handler

The `addMediaGallery` handler is used when users upload multiple images through the gallery control. It should resolve with an array of `AddMediaData` objects.

**Note:** You can provide either:

- Both `uid` and `fileName`
- Only `uid` (with file extension)
- Only `fileName` (the `uid` will automatically be set to the `fileName`)

```ts
const config = {
  api: {
    media: {
      addMediaGallery: {
        handler(resolve, reject, extra) {
          // extra: { acceptedExtensions: Array<string> }
          const input = document.createElement("input");
          input.type = "file";
          input.multiple = true; // Allow multiple file selection
          input.accept = extra.acceptedExtensions.join(",");

          input.addEventListener("change", function (e) {
            const { files } = e.target;

            if (files && files.length) {
              const uploadPromises = Array.from(files).map((file) => {
                return new Promise((res, rej) => {
                  // Upload logic here (e.g., to your server or S3)
                  const fileName = file.name;
                  const uid = crypto.randomUUID();

                  // Simulate upload
                  setTimeout(() => {
                    // Option 1: Provide both uid and fileName
                    res({
                      uid: uid,
                      fileName: fileName,
                    });

                    // Option 2: Provide only fileName (uid will automatically become fileName)
                    // res({
                    //   fileName: fileName,
                    // });

                    // Option 3: Provide only uid (with file extension)
                    // res({
                    //   uid: fileName,
                    // });
                  }, 100);
                });
              });

              Promise.all(uploadPromises)
                .then((results) => {
                  resolve(results);
                })
                .catch((error) => {
                  reject(`Failed to upload images: ${error.message}`);
                });
            } else {
              resolve([]);
            }
          });

          // Open Upload Window
          input.click();
        },
      },
    },
  },
};
```

### Image Patterns

Used to specify where the crop params from the builder need to be included in the URL.
The `imagePatterns` object contains 3 keys: `full`, `original`, `split`.
The value of every key must be send the placeholders
The placeholder has syntax: `{{ oY=[oY] }}`

Support placeholders:

- `[baseUrl]`: the base URL sent via `api.media.mediaResizeUrl`
- `[iW]`: the original image width (`number` or `any`)
- `[iH]`: the original image height (`number` or `any`)
- `[oX]`: the pointer X (`number`)
- `[oY]`: the pointer Y (`number`)
- `[cW]`: the container width, used to crop image (`number`)
- `[cH]`: the container height, used to crop image (`number`)
- `[uid]`: the UID of the image
- `[fileName]`: optional placeholder; it would be used if `resolve({uid: "1234", fileName: "picture.png"})`

Example:

```ts
const config = {
  api: {
    media: {
      mediaResizeUrl: "http://localhost:7788/media", // HOST
      imagePatterns: {
        full: "{{ [baseUrl] }}/{{ iW=[iW] }}&{{ iH=[iH] }}&{{ oX=[oX] }}&{{ oY=[oY] }}&{{ cW=[cW] }}&{{ cH=[cH] }}/{{ [uid] }}/{{ [fileName] }}",
        original: "{{ [baseUrl] }}/{{ [sizeType] }}/{{ [uid] }}/{{ [fileName] }}",
        split: "{{ [baseUrl] }}/{{ iW=[iW] }}&{{ iH=[iH] }}/{{ [uid] }}/{{ [fileName] }}",
      },
    },
  },
};
```

Full:

```html
<img src="http://localhost:7788/media/iW=1808&iH=1017&oX=448&oY=53&cW=515&cH=605/1234/picture.jpg" />
```

Original:

```html
<img src="http://localhost:7788/media/original/1234/picture.jpg" />
```

Split:

```html
<img src="http://localhost:7788/media/iW=5000&iH=any/1234/picture.jpg" />
```

[ImageKit](https://imagekit.io) example:

```ts
const config = {
  api: {
    media: {
      mediaResizeUrl: "https://ik.imagekit.io/demo", // ImageKit HOST
      imagePatterns: {
        full: "{{ [baseUrl] }}/tr:{{ w-[cW] }},{{ h-[cH] }},c-maintain-ratio/{{ [fileName] }}",
        split: "{{ [baseUrl] }}/tr:{{ w-[iW] }},c-at_max/{{ [fileName] }}",
        original: "{{ [baseUrl] }}/tr:orig-true/{{ [fileName] }}",
      },
    },
  },
};
```

**Full**: Used inside the Image element where cropping or resizing of the image is needed.
**Original**: Used when the builder tries to access the original URL of the image, for example, as a background for Section, Column, or Row.
**Split**: Used when the builder tries to access the resized URL for the image, for example, as a background.

> This case(split) is usually used when the client uploads very large images (e.g., 10MB), and we need to resize them to a smaller size (e.g., 1MB). In this case iH=any

```ts
// In HTML
// <script src="https://sdk.amazonaws.com/js/aws-sdk-2.1.24.min.js"></script>

const bucketName = "AWS_BUCKET_NAME";
const bucketRegion = "AWS_REGION";
const identityPoolId = "AWS_IDENTITY_POOL_ID";
const AWS = window.AWS;

// More details about AWS you can see here https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html
AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
  }),
});
const s3 = new AWS.S3({
  params: {
    Bucket: bucketName,
  },
});

const config = {
  api: {
    media: {
      // You need to start a Brizy Image Resize
      /// for more information on how you can do that see here https://github.com/EasyBrizy/Brizy-Local-Image-Resizer#readme
      /// ORIGIN_MEDIA_URL=https://${AWS_BUKET_NAME}/media
      mediaResizeUrl: "http://localhost:7788/media", // HOST [Brizy Image Resizer]
      handler(resolve, reject, extra) {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.addEventListener("change", function (e) {
          const { files } = e.target;

          if (files && files.length) {
            const file = files[0];
            const fileName = file.name;
            const uid = crypto.randomUUID();
            const filePath = `media/${uid}/${fileName}`;
            const s3Config = {
              Key: filePath,
              Body: file,
            };

            // Upload to S3
            s3.upload(s3Config, (err) => {
              if (err) {
                reject(`Wrong Upload to S3 ${err.message}`);
              } else {
                resolve({ uid, fileName });
              }
            });
          }
        });

        // Open Upload Window
        input.click();
      },
    },
  },
};
```

#### Default LeftSidebar TabsOrder

```ts
const defaultConfigModulesGroup = {
  ui: {
    leftSidebar: {
      topTabsOrder: [
        {
          id: "addElements",
          type: "addElements",
          elements: [
            {
              label: "grid",
              moduleNames: ["Columns2", "Row2"],
            },
          ],
        },
        {
          id: "reorderBlock",
          type: "reorderBlock",
        },
        {
          id: "globalStyle",
          type: "globalStyle",
        },
      ],
      bottomTabsOrder: [
        {
          id: "deviceMode",
          type: "deviceMode",
        },
        {
          id: "more",
          type: "more",
        },
      ],
    },
  },
};
```

### Example API Default Kits

```ts
export type KitItem = {
  id: string;
  title: string;
};

const config = {
  api: {
    defaultKits: {
      async getKits(res, rej) {
        try {
          const kits = await fetch("https://example.com/kits").then((r) => r.json());

          res([
            {
              id: "kit001",
              title: "Kit #1",
            },
            {
              id: "kit002",
              title: "Kit #2",
            },
          ]);
        } catch (e) {
          rej("Failed to load Kits");
        }
      },
      async getMeta(res, rej, kit) {
        try {
          const meta = await fetch(`https://example.com/kits/${id}`).then((r) => r.json());
          res({
            blocks: [
              {
                id: "Kit2Starter",
                cat: [0],
                title: "Kit2Starter0Dark",
                type: 1,
                keywords: "start",
                thumbnailHeight: 311,
                thumbnailWidth: 600,
                thumbnailSrc: "https://example.com/kits/images/thumb_1.jpg",
                pro: false,
                kitId: "kit001",
                blank: "blank",
              },
              {
                id: "block2kit9081",
                cat: [2, 16],
                title: "block2kit9081",
                type: 1,
                keywords: "forms,hero,image",
                thumbnailHeight: 327,
                thumbnailWidth: 600,
                thumbnailSrc: "https://example.com/kits/images/thumb_2.jpg",
                pro: false,
                kitId: "kit001",
              },
            ],
            categories: [
              {
                id: 0,
                slug: "blank",
                title: "Blank",
                hidden: true,
              },
              {
                id: 16,
                slug: "hero",
                title: "Hero",
              },
            ],
            id: "kit001",
            name: "Kit #2",
            styles: [
              {
                id: "style042",
                title: "Overpass",
                colorPalette: [
                  {
                    id: "color1",
                    hex: "#A170D9",
                  },
                  {
                    id: "color2",
                    hex: "#1C1C1C",
                  },
                ],
                fontStyles: [
                  {
                    id: "paragraph",
                    title: "Paragraph",
                    fontFamily: "overpass",
                    fontFamilyType: "google",
                    fontSize: 16,
                    fontSizeSuffix: "px",
                    fontWeight: 400,
                    lineHeight: 1.9,
                  },
                ],
              },
            ],
            types: [
              {
                id: 1,
                name: "dark",
                title: "Dark",
                icon: "nc-dark",
              },
            ],
          });
        } catch (e) {
          rej("Failed to get json");
        }
      },
      async getData(res, rej, kit) {
        try {
          const data = await fetch(`https://example.com/blocks/${kit.id}.json`).then((r) => r.json());
          res(data);
        } catch (e) {
          rej("Failed to load resolves for selected DefaultKits");
        }
      },
    },
  },
};
```

### Example API Default Layouts

```ts
const config = {
  api: {
    defaultLayouts: {
      async getMeta(res, rej) {
        try {
          const meta = await fetch("https://example.com/layouts").then((r) => r.json());

          const page = {
            id: "page1",
            thumbnailWidth: 680,
            thumbnailHeight: 1282,
            thumbnailSrc: "https://example/com/page1/picture.png",
            title: "Homepage",
            keywords: "home, details, menu, reservation, food, lunch",
            cat: [100],
          };
          const layout = {
            name: "Template Name",
            color: "#FF7102",
            cat: [100],
            pages: [page],
            styles: [], // Global Style JSON
          };
          const data = {
            templates: [layout],
            categories: [
              {
                id: 100,
                title: "Business",
              },
              {
                id: 200,
                title: "Travel",
              },
            ],
          };

          res(data);
        } catch (e) {
          rej("Failed to get json");
        }
      },
      async getData(res, rej, id) {
        try {
          const data = await fetch(`https://example.com/layouts/${id}.json`).then((r) => r.json());
          res(data);
        } catch (e) {
          rej("Failed to load resolves for selected DefaultLayouts");
        }
      },
    },
  },
};
```

### Example API Screenshots

```ts
export interface ScreenshotData {
  base64: string;
  blockType: "normal" | "global" | "saved" | "layout";
}

const config = {
  api: {
    screenshots: {
      screenshotUrl: "https://example.com/screenshots",
      async create(res, rej, data: ScreenshotData) {
        try {
          const screenshot = await fetch("https://example.com/api/screenshot", {
            method: "POST",
            body: JSON.stringify({ image: data.base64 }),
          }).then((r) => r.json());

          res({ id: screenshot.id });
        } catch (e) {
          rej("Failed create the screenshot");
        }
      },
      async update(res, rej, data: ScreenshotData & { id: string }) {
        try {
          const data = await fetch(`https://example.com/api/screenshot/${data.id}`, {
            method: "PUT",
            body: JSON.stringify({ image: data.base64 }),
          }).then((r) => r.json());

          res(data);
        } catch (e) {
          rej("Failed to update screenshot");
        }
      },
    },
  },
};
```

##### How to Use Screenshots:

1. In your configuration, add `api.screenshots.screenshotUrl` with the base URL for storing screenshots.
2. Add `api.screenshots.create` and `api.screenshots.update` in the configuration to specify the handlers for managing screenshots.
3. Each handler will receive an extra parameter, `base64`, which contains the screenshot in `base64` format. In these handlers:

- Save the screenshot on your server at the specified `api.screenshots.screenshotUrl` location.
- Return the `id` of the saved screenshot.
- The `update` handler will also receive an additional `id` parameter, which identifies the screenshot to be updated.

4. The editor will generate the screenshot URL by concatenating `api.screenshots.screenshotUrl` with the screenshot’s `id` and appending a query parameter with the current timestamp to bypass caching.
5. The resulting URL format will be: `${api.screenshots.screenshotUrl}${id}?t=${timestamp}`.

### Example: Localization (`l10n`)

To use localization, import one of the files from [/packages/core-translations](https://github.com/EasyBrizy/Brizy/tree/master/packages/core-translations) and include it in the Editor configuration:

```ts
import l10nUK from "/path/to/editor.uk.json";

const config = {
  l10n: l10nUK,
};
```

### Example: Right to left (`isRTL`)

To enable RTL mode set the `isRTL` key in config

```ts
const config = {
  isRTL: true,
};
```

### Example: Google Fonts URL (`urls.googleFonts`)

The `googleFonts` URL is used for two purposes:

1. **DNS Prefetch/Preconnect Optimization**: Adds performance optimization links to prefetch and preconnect to the Google Fonts domain
2. **Google Fonts CSS Loading**: Used directly as the base URL when generating Google Fonts CSS links (query parameters are appended)

**How it works:**

- When generating font CSS links, the editor uses `urls.googleFonts` directly and appends query parameters (defaults to `"https://fonts.bunny.net/css"` if not provided)
- DNS prefetch and preconnect links use the domain from `urls.googleFonts` (defaults to `"https://fonts.bunny.net"` if not provided)

**Example configuration:**

```ts
const config = {
  urls: {
    googleFonts: "https://fonts.bunny.net/css", // Full URL including /css path
  },
};
```

**Example with Google Fonts API:**

If you're using Google Fonts API, include the `/css` path:

```ts
const config = {
  urls: {
    googleFonts: "https://fonts.googleapis.com/css", // Full URL with /css path
  },
};
```

**Example with custom CDN:**

If you're using a custom CDN that supports the Google Fonts API format:

```ts
const config = {
  urls: {
    googleFonts: "https://cdn.example.com/fonts/css", // Custom CDN endpoint
  },
};
```

**Expected format:**

The custom CDN endpoint must support the same format as Google Fonts API. The editor will append query parameters in this format:

```
{baseUrl}?family={fontFamily1}:{weights1}|{fontFamily2}:{weights2}&subset={subsets}&display=swap
```

Where:

- `family`: Font families separated by `|`, each with format `FontName:weight1,weight2` (e.g., `Roboto:400,700|Open+Sans:300,400,600`)
- `subset`: Comma-separated list of character subsets (e.g., `arabic,bengali,cyrillic,latin-ext`)
- `display`: Always set to `swap` for font-display optimization

**Response format:**

The CDN endpoint must return CSS text with `@font-face` declarations in the same format as Google Fonts API. The response should be valid CSS containing `@font-face` rules for each requested font variant.

Example response format:

```css
/* latin */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://cdn.example.com/fonts/roboto/v30/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format("woff2");
  unicode-range:
    U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
    U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://cdn.example.com/fonts/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2) format("woff2");
  unicode-range:
    U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
    U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* Additional subsets and font families... */
```

The response should:

- Be a CSS file response with `Content-Type: text/css` header
- Contain `@font-face` declarations for all requested font variants
- Include proper `unicode-range` declarations for each subset
- Use `font-display: swap` as specified in the query parameter
- Provide font file URLs (woff2, woff, or other web font formats)

**Supported fonts:**

The editor supports all Google Fonts available through the Google Fonts API. For a complete list of available fonts, font families, weights, and subsets, refer to the [Google Fonts API documentation](https://developers.google.com/fonts/docs/developer_api).

**Example generated URLs:**

When fonts are used, the editor will generate:

- CSS link: `https://fonts.googleapis.com/css?family=Roboto:400,700|Open+Sans:300,400&subset=arabic,bengali,cyrillic,cyrillic-ext,devanagari,greek,greek-ext,gujarati,hebrew,khmer,korean,latin-ext,tamil,telugu,thai,vietnamese&display=swap`
- Prefetch link: `<link rel="dns-prefetch" href="https://fonts.googleapis.com">`
- Preconnect link: `<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>`

**Note:** If `googleFonts` is not provided, the editor defaults to `"https://fonts.bunny.net/css"` for CSS links. This option is useful when you need to:

- Use a different font service (e.g., Google Fonts API, custom CDN)
- Implement custom caching strategies
- Comply with specific data privacy requirements
- Optimize font loading performance
