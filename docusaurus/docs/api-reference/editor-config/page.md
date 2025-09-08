---
sidebar_position: 1
sidebar_label: "Page Mode"
---

# Page Mode

Editor config is the configuration our builder starts with. The config can influence the starter page, global styles.
The full config can be seen below:

To load `page`, use: `config.mode = "page"`
<img  class="brz-img--border" src="/img/brizy-local-page.png" /> <br/><br/>

## Config Page

```ts
type config = {
  container: HTMLElement;
  pageData: Record<string, unknown>;
  projectData: Record<string, unknown>;

  // Page: Static Page view
  mode: "page";

  // Menu
  menu?: Array<Menu>;

  // Integrations
  integrations?: {
    /// Form
    form?: {
      action?: string;
      recaptcha?: {
        siteKey: string;
      };
      fields?: {
        label?: string;
        handler: (res: Response<Array<FormFieldsOption>>, rej: Response<string>) => void;
      };
      fields2?: {
        label?: string;
        handler: (res: Response<Array<FormFieldsOption>>, rej: Response<string>) => void;
      };
    };
    /// Fonts
    fonts?: {
      upload?: {
        get(res: Response<Array<UploadedFont>>, rej: Response<string>): void;
        upload(
          res: Response<UploadFont>,
          rej: Response<string>,
          data: {
            files: FontFile;
            name: string;
            id: string;
          },
        ): void;
        delete(res: Response<string>, rej: Response<string>, fontId: string): void;
      };
    };
  };

  // L10n
  l10n?: Record<string, string>;

  // isRTL
  isRTL?: boolean;

  // Extensions
  extensions?: Array<Extension>;

  // DynamicContent
  dynamicContent?: {
    groups?: {
      [DCTypes.image]: Array<ConfigDCItem> | DCItemHandler;
      [DCTypes.link]: Array<ConfigDCItem> | DCItemHandler;
      [DCTypes.richText]: Array<ConfigDCItem> | DCItemHandler;
    };
  };

  pagePreview: string;

  // UI
  ui: {
    theme?: Theme;

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

      cms?: {
        onOpen: (onClose: VoidFunction) => void;
        onClose?: VoidFunction;
      };
    };
    
    help?: Help;

    publish?: {
      handler: (res: Response<void>, rej: Response<string>, extra: Output) => void;
    };

    features?: {
      link?: {
        internalLink?: boolean;
        linkExternal?: boolean;
        linkUpload?: boolean;
        linkAnchor?: boolean;
        linkPopup?: boolean;
      };
    };
  };

  // API
  api?: {
    /// Media
    media?: {
      mediaResizeUrl?: string;
      imagePatterns?: ImagePatterns;

      addMedia?: {
        handler: (resolve: Response<AddMediaData>, reject: Response<string>, extra: AddMediaExtra) => void;
      };
    };

    // File
    customFile?: {
      fileUrl?: string;

      addFile?: {
        handler: (res: Response<AddFileData>, rej: Response<string>, extra: AddFileExtra) => void;
      };
    };

    // Default Blocks | Kits
    defaultKits?: DefaultKits; // More information about the type https://github.com/EasyBrizy/Brizy-Local-Editor/blob/master/packages/core/src/types/types.ts
    defaultLayouts?: DefaultLayouts; // More information about the https://github.com/EasyBrizy/Brizy-Local-Editor/blob/master/packages/core/src/types/types.ts

    // Screebnshots
    screenshots?: {
      screenshotUrl?: string;
      create?: (res: Response<{ id: string }>, rej: Response<string>, extra: ScreenshotData) => void;
      update?: (res: Response<{ id: string }>, rej: Response<string>, extra: ScreenshotData & { id: string }) => void;
    };
  };

  onSave?: (data: Output) => void;
  onAutoSave?: (data: AutoSave) => void;
  autoSaveInterval?: number;
  onLoad?: VoidFunction;
  elements?: {
    menu?: {
      onOpen?: VoidFunction;
      createMenuLabel?: string;
    };
    form?: {
      inputTypes?: Array<FormInputTypes>;
    };
    video?: {
      types?: Array<VideoTypes>;
    };
    posts?: {
      includeQueryMultiOptions?: boolean;
      exclude?: boolean;
      offset?: boolean;
      orderBy?: boolean;
      order?: boolean;
      handler: (res: Response<PostsSources>, ref: Response<string>) => void;
    };
  };
};
```

## About config

To be able to start the builder you need to send valid values in the config in the following required keys:

<ul>
  <li>`container` - the HTMLElement in which the builder will be loaded</li>
  <li>`pageData` - the JSON with current page structure</li>
  <li>`projectData` - the JSON that specifies global styles [more](/api-reference/project-data)</li>
  <li>`ui` - the object that let us to customize the left sidebar order, links or elements, also let us to customize popup settings and also the color variables of builder UI</li>
  <li>`urls.editorIcons` - The path to the icons used by the builder.</li>
  <li>`mode` - the builder load mode: `"page" | "popup" | "story"`</li>
  <li>`pagePreview` - link of the preview which will be set on "preview" button in UI of the builder</li>
</ul>

The other keys like `autoSaveInterval`, `api`, `l10n` etc. are not required and builder can work without them.

## Explanation

---

Config can be passed as an object when you initialize the editor from the script.

### First level parameters

| Name               | Type                               | Description                                                                                                                                                                                                                                                                                                           |
| :----------------- | :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `container`        | `HTMLElement`                      | Brizy Plugin will load into HTML element.                                                                                                                                                                                                                                                                             |
| `mode`             | `"page"` \| `"popup"` \| `"story"` | Default `"page"`                                                                                                                                                                                                                                                                                                      |
| `pageData`         | `object`                           | Loads the JSON page specified in the pageData parameter.                                                                                                                                                                                                                                                              |
| `projectData`      | `object`                           | Loads the JSON project specified in the projectData parameter. [more](/api-reference/project-data)                                                                                                                                                                                                                    |
| `l10n`             | `object`                           | A data structure maps keys to localized strings for localization, with available keys listed [here](https://github.com/EasyBrizy/Brizy-Local-Editor/blob/master/packages/core/docs/l10n.ts) and existing translations [here](https://github.com/EasyBrizy/Brizy-Local-Editor/tree/master/packages/core-translations). |
| `onAutoSave`       | `JSON`                             | Fired after Auto Save happened in editor                                                                                                                                                                                                                                                                              |
| `onLoad`           | `JSON`                             | Fired when the builder is loaded                                                                                                                                                                                                                                                                                      |
| `isRTL`            | `boolean`                          | Enables right-to-left (RTL) layout when set to true. Default false.                                                                                                                                                                                                                                                   |
| `autoSaveInterval` | `number`                           | Default `2000`. Set a `ms` delay for `onAutoSave` function                                                                                                                                                                                                                                                            |
| `menu`             | `array`                            | Load the array of menu                                                                                                                                                                                                                                                                                                |
| `extension`        | `array`                            | Load the array of extension scripts and styles                                                                                                                                                                                                                                                                        |
| `pagePreview`      | `string`                           | Link of the preview which will be set on "preview" button in UI of the builder                                                                                                                                                                                                                                        |

### UI parameters

| Name                                               | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|:---------------------------------------------------|:-----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ui.theme.colors`                                  | `object`   | We can customize the color variables in builder's UI                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `ui.prompts.blockAdder.activeTab`                  | `string`   | Indicate the default tab that opens in the Block Adder.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `ui.prompts.blockAdder.category`                   | `string`   | Indicate the category that will be displayed when the default tab opens in the Block Adder.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `ui.leftSidebar.topTabsOrder`                      | `Array`    | Lets you control the order and visibility of the [icons in the left sidebar at the top](https://user-images.githubusercontent.com/10077249/206904478-d11e2fb3-addb-48c1-8dce-123868e8d8ac.png). This property accepts an array of objects in the format: `[{ id: string, type: LeftSidebarOption }]` If the type is `"addElements"`, an additional key, `elements`, must be provided. The `elements` key accepts an array that specifies the elements to display within the current tab [icons in the addElements](https://user-images.githubusercontent.com/18303258/230393691-1f0e5198-43e7-43ee-ab06-8d8d0f5f9c03.png). |
| `ui.leftSidebar.bottomTabsOrder`                   | `Array`    | Lets you control the order and visibility of the [icons in the left sidebar at the top](https://user-images.githubusercontent.com/10077249/206904478-d11e2fb3-addb-48c1-8dce-123868e8d8ac.png). This property accepts an array of objects in the format: `[{ id: string, type: LeftSidebarOption }]` If the type is `"addElements"`, an additional key, `elements`, must be provided. The `elements key accepts an array that specifies the elements to display within the current tab [icons in the addElements](https://user-images.githubusercontent.com/18303258/230393691-1f0e5198-43e7-43ee-ab06-8d8d0f5f9c03.png).  |
| `ui.leftSidebar.more.options`                      | `Array`    | Lets you add more links in the [More dropdown](https://user-images.githubusercontent.com/10077249/206904832-5af03a48-991a-4c90-aead-2d7dea82c9d5.png) in the left sidebar.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `ui.leftSidebar.cms.onOpen`                        | `function` | Is a function for Opening External Modals with onClose Callback for CMS Icon Deactivation you can see [here](https://github.com/EasyBrizy/Brizy-Local-Editor/assets/18303258/bd0e52df-9143-4986-9152-6397324bc2ff).                                                                                                                                                                                                                                                                                                                                                                                                        |
| `ui.leftSidebar.cms.onClose`                       | `function` | Is a function for Closing External Modals                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `ui.publish.handler`                               | `function` | A function assigned to the bottom-right "Publish" save button.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `ui.features.link`                                 | `object`   | Allows you to control which link options are enabled in the toolbar. It accepts the following keys: `internalLink`, `linkExternal`, `linkUpload`, `linkAnchor`, and `linkPopup`. Any key set to `true` will be enabled in the toolbar for elements. If this object is null, all link options will be enabled by default.                                                                                                                                                                                                                                                                                                   |
| `ui.features.link.linkUpload`                      | `boolean`  | Allows you to enable or disable the [LinkUpload option](https://github.com/user-attachments/assets/5c1b0a88-9638-42f4-8ae6-1d6481a03fb8) in the toolbar for all link elements. By default, this option is turned off.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `ui.features.link.internalLink`                    | `boolean`  | Allows you to enable or disable the [InternalLink option](https://github.com/user-attachments/assets/af3fcfda-701c-4cae-ba3c-3734da625cd4) in the toolbar for all link elements. By default, this option is turned off.                                                                                                                                                                                                                                                                                                                                                                                                    |
| `ui.features.link.linkExtenal`                     | `boolean`  | Allows you to enable or disable the [LinkExternal option](https://github.com/user-attachments/assets/394e9f13-8fe3-434a-8323-1c4d3a29f6e1) in the toolbar for all link elements. By default, this option is turned off.                                                                                                                                                                                                                                                                                                                                                                                                    |
| `ui.features.link.linkAnchor`                      | `boolean`  | Allows you to enable or disable the [LinkAnchor option](https://github.com/user-attachments/assets/5f7c9188-0605-4427-8740-50b56ca849a3) in the toolbar for all link elements. By default, this option is turned off.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `ui.features.link.linkPopup`                       | `boolean`  | Allows you to enable or disable the [LinkPopup option](https://github.com/user-attachments/assets/dabe41bb-358f-4304-a0c6-522db1ded999) in the toolbar for all link elements. By default, this option is turned off.                                                                                                                                                                                                                                                                                                                                                                                                       |
| `ui.help.showIcon`                                 | `boolean`  | Allow you to enable or disable the Help videos icon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `ui.help.header.src`                               | `string`   | Allows you to control the source of the header "Getting Started" video preview Thumbnail URL.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `ui.help.header.url`                               | `string`   | Allows you to control the source of the header "Getting Started" video URL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `ui.help.video`                                    | `array`    | Allows you to control the source of the help videos. properties.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ui.help.idHelpVideosIcons.addElementsHelpVideo`   | `string`   | Allows you to control the id of the help videos which are used to left sidebar add elements. properties.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `ui.help.idHelpVideosIcons.blocksLayoutsHelpVideo` | `string`   | Allows you to control the id of the help videos which are inside blocks prompt.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `ui.help.idHelpVideosIcons.fontsHelpVideo`         | `string`   | Allows you to control the id of the help videos which are used inside fonts prompt. properties.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `ui.help.idHelpVideosIcons.formHelpVideo`          | `string`   | Allows you to control the id of the help videos which are used inside form prompt. properties.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |


### DynamicContent parameters

Builder wrapped all outside placeholder inside builder placeholder 

`{{ placeholder content='Base64(SOME EXTERNAL PLACEHOLDER)' }}`

#### Builder added extra attributes for `placeholder`

- Featured Image added **cW(Container Width)** **cH(Container Height)** if external service want to crop the image

Example: `{{ placeholder content='Base64( {{ featured_image }} )' cW='200' cH='200' }}`

- Extra Context if dynamicContent.groups is an Array

Example: `{{ placeholder content='Base64( {{ post_title }} )' entityType='pages' entityId='page1' }}`

For more information about DynamicContent and how to replace it, please refer to the [Dynamic Content](/api-reference/dynamic-content) documentation.

#### Dynamic content can be configured in 2 ways

1. Send an array of placeholder in config via:

##### DynamicContent array of choices

| Name                                      | Type    | Description                                                          |
| :---------------------------------------- | :------ | :------------------------------------------------------------------- |
| `dynamicContent.groups[DCTypes.image]`    | `array` | Takes array of ConfigDCItem for all Element what persis ImageUpload  |
| `dynamicContent.groups[DCTypes.link]`     | `array` | Takes array of ConfigDCItem for all Element what persis Link         |
| `dynamicContent.groups[DCTypes.richText]` | `array` | Takes array of ConfigDCItem for all Element what persis Content html |

2. Send a handler function that sends the placeholder over the response function

##### DynamicContent option parameters

| Name                                              | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :------------------------------------------------ | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dynamicContent.groups[DCTypes.image].handler`    | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve({ label:"My_Placeholder", placeholder:"{{ my_placeholder }}" })` ). In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor. |
| `dynamicContent.groups[DCTypes.link].handler`     | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve({ label:"My_Placeholder", placeholder:"{{ my_placeholder }}" })` ). In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor. |
| `dynamicContent.groups[DCTypes.richText].handler` | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve({ label:"My_Placeholder", placeholder:"{{ my_placeholder }}" })` ). In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor. |

### Integrations parameters

| Name                                  | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :------------------------------------ | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `integrations.form.action`            | `string`   | Replace the URL with your own. This is the link where we send the information from the contact form element when the end user submits the form.                                                                                                                                                                                                                                                                                                                                                          |
| `integrations.form.recaptcha.siteKey` | `string`   | ReCaptcha Site Key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `integrations.form.fields.label`      | `string`   | Defines the text displayed in the editor UI.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `integrations.form.fields.handler`    | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the `resolve(value)` function to pass it to the editor. In case you want to cancel the operation, call the `reject()` function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.     |
| `integrations.form.fields2.label`      | `string`   | Defines the text displayed in the editor UI.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `integrations.form.fields2.handler`    | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the `resolve(value)` function to pass it to the editor. In case you want to cancel the operation, call the `reject()` function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.     |
| `integrations.fonts.upload`           | `object`   | This object provides the `upload`, `get`, and `delete` functions for managing custom fonts.For more details, see the [API reference](/api-reference/custom-fonts).                                                                                                                                                                                                                                                                                                                                       |
| `integrations.fonts.upload.get`       | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor. In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.         |
| `integrations.fonts.upload.upload`    | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor. In case you want to cancel the operation, you can call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor. |
| `integrations.fonts.upload.delete`    | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor. In case you want to cancel the operation, you can call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor. |

### API parameters

| Name                             | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api.media.mediaResizeUrl`       | `string`   | This is the URL for the image resizer service. There are two image resizer service options: hosted by Brizy and self hosted. If you choose to use the image resizer service hosted by Brizy, you don't have to change the media.brizylocal.com URL. For the self hosted version you need to replace the media.brizylocal.com with the URL of your image resizer service. Setup your own image resizer service like [this](https://github.com/EasyBrizy/Brizy-Local-Image-Resizer#image-resizer)                                                                                                                              |
| `api.media.imagePatterns`        | `object`   | This is an object with `full`, `original`, and `split` keys. It's used to control the final URLs for all builder resize and crop operations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `api.media.addMedia.handler`     | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor. In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.                                                                                                                             |
| `api.customFile.fileUrl`         | `string`   | This is the URL for your resources the final URL will be `api.customFile.fileUrl/${fileName}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `api.customFile.addFile.handler` | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor. In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.                                                                                                                             |
| `api.defaultKits.label`          | `string`   | Defines the text displayed in the editor UI.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `api.defaultKits.getKits`        | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve([ Array of kits ])`). In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.                                                                         |
| `api.defaultKits.getMeta`        | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve([ Array of kits with blocks ])`). In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.                                                             |
| `api.defaultKits.getData`        | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve(block.json)`). In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.                                                                                |
| `api.defaultLayouts.label`       | `string`   | Defines the text displayed in the editor UI.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `api.defaultLayouts.getMeta`     | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve({ templates: [ Array of layouts with pages and every page must have screenshots and id] })`). In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor. |
| `api.defaultLayouts.getData`     | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve([ page.json ])`). In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor.                                                                             |
| `api.screenshots.screenshotUrl`  | `string`   | This is the base URL used to retrieve the screenshots. The final URL will be `${api.screenshots.screenshotUrl}${id}?t=${timestamp}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `api.screenshots.create`         | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve({ id: screenshot id })`). In case you want to cancel the operation, call the reject() function.                                                                                                                                                                                                                                                                         |
| `api.screenshots.update`         | `function` | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor ( example of resolve: `resolve({ id: screenshot id })`). In case you want to cancel the operation, call the reject() function.                                                                                                                                                                                                                                                                         |

### Urls parameters

| Name               | type     | Description                                                                                                       |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `urls.editorIcons` | `string` | These URLs are used for the editor's internal icons, such as those in the toolbar, sidebar, and other components. |
| `pagePreview`      | `string` | This is the link for the preview, which will be set on the "Preview" button in the builder's UI.                  |

### Elements parameters

| Name                            | Type                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------------------------------ | :---------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `elements.menu.createMenuLabel` | `string`                | Allows you to customize the placeholder text shown in the editor when no menu has been created. If left unspecified, the editor will default to displaying `'Create a menu'`.                                                                                                                                                                                                                                                                                                                    |
| `elements.menu.onOpen`          | `function`              | This function is triggered when the placeholder labeled `createMenuLabel` is clicked for a menu that hasn't been created yet. It should contain the main logic for creating the menu, which will then be passed into the editor configuration to display the newly created menu.                                                                                                                                                                                                                 |
| `elements.form.inputTypes`      | `Array<FormInputTypes>` | Defines the input types available in the `Form` toolbar. If no value is specified, all input types will be displayed by default.                                                                                                                                                                                                                                                                                                                                                                 |
| `elements.video.types`          | `Array<VideoTypes>`     | Specifies the video type options available in the `Video` toolbar.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| elements.posts.handler          | function                | Is a function with a Promise-like signature. This function lets you use your own logic to retrieve the desired value. Once the value is available, you must call the resolve(value) function to pass it to the editor. In case you want to cancel the operation, call the reject() function. A resolve or reject call is mandatory. If you miss this step, the editor will remain in waiting mode. Error management on the host application must call the reject function to unblock the editor. |
| elements.posts.exclude          | boolean                 | Takes true or false values and lets you turn on or off the `Exclude by` option from toolbar.                                                                                                                                                                                                                                                                                                                                                                                                     |
| elements.posts.offset           | boolean                 | Takes true or false values and lets you turn on or off the `Offset` option from toolbar.                                                                                                                                                                                                                                                                                                                                                                                                         |
| elements.posts.orderBy          | boolean                 | Takes true or false values and lets you turn on or off the `Order by` option from toolbar.                                                                                                                                                                                                                                                                                                                                                                                                       |
| elements.posts.order            | boolean                 | Takes true or false values and lets you turn on or off the `Order` option from toolbar.                                                                                                                                                                                                                                                                                                                                                                                                          |
| elements.posts.querySource      | boolean                 | Takes true or false values and lets you turn on or off the `Source` option from toolbar.                                                                                                                                                                                                                                                                                                                                                                                                         |

## Examples

---

### Help Videos

Builder accepted help videos to display in the editor to help users understand how to use the editor. 
These videos are used to provide step-by-step instructions on how to use the editor's features and functionalities.

:::tip
We provide a default predefined video used within **Brizy.io**. While these videos are not representative of **Brizy.local**, they are offered as examples to help you understand how to implement this functionality.
In **Brizy.local**, you will need to create your own custom videos with your specific interfaces and configuration options.
:::


```ts
{
  ui: {
    help: {
      showIcon: true, // enable functionality
      header: {
        src: "https://b-cloud.b-cdn.net/WordPress+Editor+Help+Videos/Getting-started-video-thumb.jpg",
        url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/1.+GET+STARTED/1.+Builder+Overview.mp4",
      },
      video: [
        {
          id: "0c",
          category: "Get Started",
          items: [
            {
              title: "Builder Overview",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/1.+GET+STARTED/1.+Builder+Overview.mp4",
              id: "0",
            },
            {
              title: "How to Build a Page",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/1.+GET+STARTED/2.+How+to+Build+a+Page.mp4",
              id: "1",
            },
            {
              title: "Preview Publish Update",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/1.+GET+STARTED/3.+Preview+Publish+Update.mp4",
              id: "2",
            },
          ],
        },
        {
          id: "1c",
          category: "The Basics",
          items: [
            {
              title: "Blocks",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/1.+Blocks.mp4",
              id: "3",
            },
            {
              title: "Saved Blocks & Layouts",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/2.+Saved+Blocks+&+Layouts.mp4",
              id: "4",
            },
            {
              title: "Premade Layouts",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/3.+Premade+Layouts.mp4",
              id: "5",
            },
            {
              title: "The Elements",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/4.+The+Elements.mp4",
              id: "6",
            },
            {
              title: "Reorder Blocks",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/5.+Reorder+Blocks.mp4",
              id: "7",
            },
            {
              title: "Global Styling",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/6.+Global+Styling.mp4",
              id: "8",
            },
            {
              title: "Links",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/7.+Links.mp4",
              id: "9",
            },
            {
              title: "Fonts",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/8.+Fonts.mp4",
              id: "10",
            },
            {
              title: "Paddings & Margins",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/9.+Padding+&+Margins.mp4",
              id: "11",
            },
            {
              title: "Responsive Design",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/10.+Responsive+Design.mp4",
              id: "12",
            },
            {
              title: "Headers & Footers",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/11.+Headers+&+Footers.mp4",
              id: "13",
            },
            {
              title: "Menus & Navigation",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/12.+Menus+&+Navigation.mp4",
              id: "14",
            },
            {
              title: "Global Blocks",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/13.+Global+Blocks.mp4",
              id: "15",
            },
            {
              title: "Animations",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/14.+Animations.mp4",
              id: "16",
            },
            {
              title: "Multilingual",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/2.+THE+BASICS/15.+Multilingual.mp4",
              id: "17",
            },
          ],
        },
        {
          id: "2c",
          category: "Dynamic Content",
          items: [
            {
              title: "Blogging",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/3.+DYNAMIC+CONTENT/1.+Blogging.mp4",
              id: "18",
            },
            {
              title: "Dynamic Elements",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/3.+DYNAMIC+CONTENT/2.+Dynamic+Elements.mp4",
              id: "19",
            },
            {
              title: "Dynamic Templates",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/3.+DYNAMIC+CONTENT/3.+Dynamic+Templates.mp4",
              id: "20",
            },
            {
              title: "Advanced Custom Fields & Assets",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/3.+DYNAMIC+CONTENT/4.+Advanced+Custom+Fields+&+Assets.mp4",
              id: "21",
            },
          ],
        },
        {
          id: "3c",
          category: "Users & Membership",
          items: [
            {
              title: "Users & Roles",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/4.+USERS+&+MEMBERSHIP/1.+Users+&+Roles.mp4",
              id: "22",
            },
            {
              title: "Membership Blocks",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/4.+USERS+&+MEMBERSHIP/2.+Membership+Blocks.mp4",
              id: "23",
            },
          ],
        },
        {
          id: "4c",
          category: "Marketing Tools",
          items: [
            {
              title: "Popup Builder",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/5.+MARKETING+TOOLS/1.+Popup+Builder.mp4",
              id: "24",
            },
            {
              title: "Global Popups & Triggers",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/5.+MARKETING+TOOLS/2.+Global+Popups+&+Triggers.mp4",
              id: "25",
            },
            {
              title: "Contact Form & Integrations",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/5.+MARKETING+TOOLS/3.+Contact+Form+&+Integrations.mp4",
              id: "26",
            },
            {
              title: "Web Stories",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/5.+MARKETING+TOOLS/4.+Web+Stories.mp4",
              id: "27",
            },
          ],
        },
        {
          id: "5c",
          category: "Global Settings",
          items: [
            {
              title: "SEO",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/6.+GLOBAL+SETTINGS/1.+SEO.mp4",
              id: "28",
            },
            {
              title: "Social Sharing",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/6.+GLOBAL+SETTINGS/2.+Social+Sharing.mp4",
              id: "29",
            },
            {
              title: "Custom CSS",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/6.+GLOBAL+SETTINGS/3.+Custom+CSS.mp4",
              id: "30",
            },
            {
              title: "Code Inject",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/6.+GLOBAL+SETTINGS/4.+Code+Inject.mp4",
              id: "31",
            },
            {
              title: "Redirects",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/6.+GLOBAL+SETTINGS/5.+Redirects.mp4",
              id: "32",
            },
            {
              title: "System Pages",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/6.+GLOBAL+SETTINGS/6.+System+Pages.mp4",
              id: "33",
            },
          ],
        },
        {
          id: "6c",
          category: "Cool Features",
          items: [
            {
              title: "Shortcuts",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/7.+COOL+FEATURES/1.+Shortcuts.mp4",
              id: "34",
            },
            {
              title: "Webhooks",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/7.+COOL+FEATURES/2.+Webhooks.mp4",
              id: "35",
            },
            {
              title: "Export & Import",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/7.+COOL+FEATURES/3.+Export+&+Import.mp4",
              id: "36",
            },
            {
              title: "Collaborate",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/7.+COOL+FEATURES/4.+Collaborate.mp4",
              id: "37",
            },
          ],
        },
        {
          id: "7c",
          category: "The Elements",
          items: [
            {
              title: "Rows & Columns",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/1.+Rows+&+Columns.mp4",
              id: "38",
            },
            {
              title: "Text",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/2.+Text.mp4",
              id: "39",
            },
            {
              title: "Button",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/3.+Button.mp4",
              id: "40",
            },
            {
              title: "Icon",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/4.+Icon.mp4",
              id: "41",
            },
            {
              title: "Image",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/5.+Image.mp4",
              id: "42",
            },
            {
              title: "Audio",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/6.+Audio.mp4",
              id: "43",
            },
            {
              title: "Video",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/7.+Video.mp4",
              id: "44",
            },
            {
              title: "Spacer",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/8.+Spacer.mp4",
              id: "45",
            },
            {
              title: "Line",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/9.+Line.mp4",
              id: "46",
            },
            {
              title: "Map",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/10.+Map.mp4",
              id: "47",
            },
            {
              title: "Embed",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/11.+Embed.mp4",
              id: "48",
            },
            {
              title: "Icon Box",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/12.+Icon+Box.mp4",
              id: "49",
            },
            {
              title: "Counter",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/13.+Counter.mp4",
              id: "50",
            },
            {
              title: "Countdown",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/14.+Countdown.mp4",
              id: "51",
            },
            {
              title: "Tabs",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/15.+Tabs.mp4",
              id: "52",
            },
            {
              title: "Progress",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/16.+Progress.mp4",
              id: "53",
            },
            {
              title: "Accordion",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/17.+Accordion.mp4",
              id: "54",
            },
            {
              title: "Menu",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/18.+Menu.mp4",
              id: "55",
            },
            {
              title: "Gallery",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/19.+Gallery.mp4",
              id: "56",
            },
            {
              title: "Carousel",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/20.+Carousel.mp4",
              id: "57",
            },
            {
              title: "Rating",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/21.+Rating.mp4",
              id: "58",
            },
            {
              title: "Playlist",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/22.+Playlist.mp4",
              id: "59",
            },
            {
              title: "Table",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/23.+Table.mp4",
              id: "60",
            },
            {
              title: "Timeline",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/24.+Timeline.mp4",
              id: "61",
            },
            {
              title: "Switcher",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/25.+Switcher.mp4",
              id: "62",
            },
            {
              title: "Lottie",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/26.+Lottie.mp4",
              id: "63",
            },
            {
              title: "Login/register",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/27.+Login+register.mp4",
              id: "64",
            },
            {
              title: "Translation",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/28.+Translation.mp4",
              id: "65",
            },
            {
              title: "Alert",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/29.+Alert.mp4",
              id: "66",
            },
            {
              title: "Facebook",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/30.+Facebook.mp4",
              id: "67",
            },
            {
              title: "Twitter",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/31.+Twitter.mp4",
              id: "68",
            },
            {
              title: "Calendly",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/32.+Calendly.mp4",
              id: "69",
            },
            {
              title: "Comments",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/33.+Comments.mp4",
              id: "70",
            },
            {
              title: "Posts",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/34.+Posts.mp4",
              id: "71",
            },
            {
              title: "Assets",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/35.+Assets.mp4",
              id: "72",
            },
            {
              title: "User Elements",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/36.+User+Elements.mp4",
              id: "73",
            },
            {
              title: "Breadcrumbs",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/Breadcrumbs.mp4",
              id: "74",
            },
            {
              title: "Post Navigation",
              url: "https://b-cloud.b-cdn.net/Cloud+Editor+Help+Videos/8.+THE+ELEMENTS/Post+Navigation.mp4",
              id: "75",
            },
          ],
        },
      ],
      idHelpVideosIcons: {
        addElementsHelpVideo: "6",
        blocksLayoutsHelpVideo: "4",
        fontsHelpVideo: "11",
        formHelpVideo: "26",
      },
    }
  }
}
```

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

:::tip
For third-party element development, you can use the **`@brizy/cloud-media-upload`** library to easily set up the editor configuration.
For more details, see the [section](/api-reference/media-upload).
:::

### Example Media Handler with Brizy Image Resizer & AWS S3

The builder uses two keys: `uid` and `fileName`, or only `uid` (with file extensions).
The main idea is to resolve problems with the duplication of images.
If the duplication was resolved by some media upload gallery, then send only `fileName` to `uid`.
For example: `resolve({uid: "picture.png"})`.

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

### [ImageKit](https://imagekit.io) example:

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

#### Configuring Brizy Predefined Blocks with ImageKit

If you need to use Brizy's predefined blocks with the ImageKit platform, follow the steps below to configure ImageKit to fetch images from Brizy's CDN.

---

#### Step 1: Connect an External Storage

Create an external storage configuration in ImageKit.

1. Go to **Storage Settings** in your ImageKit dashboard.
2. Select the storage type:
   **`Web Folder - HTTP(S) server and Magento, Shopify, WordPress, etc.`**
3. Follow the official [ImageKit documentation](https://imagekit.io/docs/integration/connect-external-storage) for more details.

<img class="brz-img--border" src="/img/imagekit.jpg" alt="ImageKit Configuration" />

---

#### Step 2: Configure Brizy Integration

Use the following configuration object to integrate Brizy with ImageKit:

```ts
const config = {
  api: {
    media: {
      mediaResizeUrl: "https://ik.imagekit.io/demo", // ImageKit Host URL
      imagePatterns: {
        full: "{{ [baseUrl] }}/tr:{{ w-[cW] }},{{ h-[cH] }},c-maintain-ratio/{{ [uid] }}/{{ [fileName] }}", // Requires [uid] & [fileName]
        split: "{{ [baseUrl] }}/tr:{{ w-[iW] }},c-at_max/{{ [uid] }}/{{ [fileName] }}", // Requires [uid] & [fileName]
        original: "{{ [baseUrl] }}/tr:orig-true/{{ [uid] }}/{{ [fileName] }}", // Requires [uid] & [fileName]
      },
    },
  },
};
```

**Full**: Used inside the Image element where cropping or resizing of the image is needed.<br/>
**Original**: Used when the builder tries to access the original URL of the image, for example, as a background for Section, Column, or Row.<br/>
**Split**: Used when the builder tries to access the resized URL for the image, for example, as a background.

### Default LeftSidebar TabsOrder

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
              moduleNames: ["Columns", "Row"],
            },
            {
              label: "essentials",
              moduleNames: ["Text", "Image", "Button", "Icon", "Spacer", "Map", "Form2", "Line", "Menu"],
            },
            {
              label: "media",
              moduleNames: ["ImageGallery", "Video", "Audio", "VideoPlaylist"],
            },
            {
              label: "content",
              moduleNames: [
                "IconText",
                "Embed",
                "StarRating",
                "Alert",
                "Counter",
                "Countdown2",
                "ProgressBar",
                "Calendly",
                "Carousel",
                "Tabs",
                "Accordion",
                "Switcher",
                "Table",
                "Timeline",
              ],
            },
            {
              label: "social",
              moduleNames: ["Facebook", "Twitter", "FacebookComments"],
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

To use localization, import one of the files from [/packages/core-translations](https://github.com/EasyBrizy/Brizy-Local-Editor/tree/master/packages/core-translations) and include it in the Editor configuration:

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

### Video Types

```ts
export enum VideoTypes {
  Youtube = "youtube",
  Vimeo = "vimeo",
  Custom = "custom",
  URL = "url",
}
```

### Form Input Types

```ts
export type FormInputTypes =
  | "Text"
  | "Email"
  | "Number"
  | "Paragraph"
  | "Select"
  | "Radio"
  | "Checkbox"
  | "Date"
  | "Url"
  | "Time"
  | "FileUpload"
  | "Hidden"
  | "Tel"
  | "Password";
```

### Using Output data from `onSave` and `publish` functions

The `onSave` and `publish` functions retrieve the editor's output data. This data has the following structure:

```typescript
interface Output {
  pageData: PageDataOutput;
  projectData: ProjectDataOutput;
  error?: string;
  popupSettings?: {
    verticalAlign: "top" | "bottom" | "center";
    horizontalAlign: "left" | "right" | "center";
  };
}

interface Style {
  type: "style";
  attr: Record<string, string>;
  html: string;
}

interface Link {
  type: "link";
  attr: Record<string, string>;
}

interface StylesFree {
  main: Asset;
  generic: Asset[];
  libsMap: AssetLibsMap[];
  libsSelectors: string[];
  pageFonts: AssetFonts[];
  pageStyles: Asset[];
}

interface StylesPro {
  main: Asset;
  generic: Asset[];
  libsMap: AssetLibsMap[];
  libsSelectors: string[];
}

interface ScriptsFree {
  main: Asset;
  generic: Asset[];
  libsMap: AssetLibsMap[];
  libsSelectors: string[];
}

interface ScriptsPro {
  main: Asset;
  generic: Asset[];
  libsMap: AssetLibsMap[];
  libsSelectors: string[];
}

type PageDataOutput = {
  [k: string]: unknown;
  compiled?: {
    html: string;
    assets: {
      freeStyles: StylesFree;
      freeScripts: ScriptsFree;
      proStyles?: StylesPro;
      proScripts?: ScriptsPro;
    };
  };
};

type ProjectDataOutput = {
  [k: string]: unknown;
  compiled?: {
    styles: Array<Style | Link>;
  };
};
```

For more information about the `Assets` types see [here](https://github.com/EasyBrizy/Brizy-Local-Editor/blob/master/packages/core/src/types/common.ts#L3)

#### Normalizing `pageData` and `projectData`

To normalize and aggregate pageData and projectData, use the @brizy/merge-page-assets library. Here is the process:

```ts
import { AssetAggregator, AssetGroup } from "@brizy/merge-page-assets";

const { freeStyles, freeScripts, proStyles, proScripts } = pageData.compiled.assets;
const { styles } = projectData.compiled;

// Merge project styles into free page styles
freeStyles.pageStyles = [...freeStyles.pageStyles, ...styles];

// Create asset groups for scripts and styles
const scriptsAssets = [AssetGroup.instanceFromJsonData(freeScripts)];
const stylesAssets = [AssetGroup.instanceFromJsonData(freeStyles)];

if (proStyles) stylesAssets.push(AssetGroup.instanceFromJsonData(proStyles));
if (proScripts) scriptsAssets.push(AssetGroup.instanceFromJsonData(proScripts));

// Function to aggregate asset lists
const getAggregatedAssetList = (assets: AssetGroup[]) => {
  const assetAggregator = new AssetAggregator(assets);
  return assetAggregator.getAssetList();
};

// Aggregated lists
const scriptAssetList = getAggregatedAssetList(scriptsAssets);
const styleAssetList = getAggregatedAssetList(stylesAssets);
```

#### Output: Aggregated Asset Lists

The `scriptAssetList` and `styleAssetList` now contain normalized, unique, and prioritized assets ready for use.

`Example`: Style AssetsList:

```json
[
  {
    "uid": "a42ab5f9-b53e-4cea-b06d-2c7ee87aaa44",
    "name": "metaViewport",
    "score": 10,
    "type": "code",
    "content": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
    "url": null,
    "attrs": {},
    "pro": false
  },
  {
    "uid": "e4427079-483f-41e3-9d8c-d5d0baa27a96",
    "name": "projectPrefetchFonts",
    "score": 10,
    "type": "code",
    "content": "<link class=\"brz-link brz-link-bunny-fonts-prefetch\" rel=\"dns-prefetch\" href=\"//fonts.bunny.net\"> <link class=\"brz-link brz-link-bunny-fonts-preconnect\" rel=\"preconnect\" href=\"https://fonts.bunny.net/\" crossorigin>",
    "url": null,
    "attrs": {},
    "pro": false
  },
  {
    "uid": "c980d743-4b43-4ece-adf6-7e16074e0c67",
    "name": "google",
    "score": 10,
    "type": "file",
    "content": null,
    "url": "https://fonts.bunny.net/css?family=Inter:100,200,300,regular,500,600,700,800,900|Lato:100,100italic,300,300italic,regular,italic,700,700italic,900,900italic&subset=arabic,bengali,cyrillic,cyrillic-ext,devanagari,greek,greek-ext,gujarati,hebrew,khmer,korean,latin-ext,tamil,telugu,thai,vietnamese&display=swap",
    "attrs": {
      "class": "brz-link brz-link-google",
      "type": "text/css",
      "rel": "stylesheet"
    },
    "pro": false,
    "fontType": "google-font"
  },
  {
    "uid": "b993c0db-3a69-43a6-8ed1-ca872814acfd",
    "name": "main",
    "score": 30,
    "type": "file",
    "content": null,
    "url": "http://localhost:8001/dist/pro/css/preview.pro.min.css",
    "attrs": {
      "class": "brz-link brz-link-preview-pro",
      "rel": "stylesheet"
    },
    "pro": true
  },
  {
    "uid": "30c7ed46-b666-4f83-b8ae-86fd24d2cc67",
    "name": "132799660",
    "score": 50,
    "type": "inline",
    "content": ".brz .brz-css-u5nxF{z-index: auto;margin:0;}.brz .brz-css-u5nxF.brz-section .brz-section__content{min-height: auto;display:flex;}",
    "url": null,
    "attrs": {
      "class": "brz-style"
    },
    "pro": false
  },
  {
    "uid": "23158f61-9713-4ff9-8a3c-43f25b0851c5",
    "name": "thirdPartyStyle",
    "score": 60,
    "type": "file",
    "content": null,
    "url": "http://localhost:3000/widgets/index.view.css",
    "attrs": {
      "class": "brz-link brz-link-thirdparty",
      "rel": "stylesheet"
    },
    "pro": false
  }
]
```

#### Usage in HTML Document:

Iterate over these lists to create script and style tags in the HTML document:

`Example` : Generating Scripts Tags using React:

```tsx
import { AssetContent, AssetType, BaseAsset } from "@brizy/merge-page-assets";
import { DomUtils, parseDocument } from "htmlparser2";

const getAssetElement = (asset: BaseAsset) => {
  const content = asset.getContent() ?? "";
  const assetType = asset.getType();
  const attr = asset.getAttrs();
  const url = asset.getUrl() ?? "";

  return makeStyle({ content, type: assetType, attr, url });
};

const makeScript = (data: AssetContent) => {
  const { type } = data;
  switch (type) {
    case AssetType.Inline: {
      const { content, attr } = data;
      const { class: _class, ..._attr } = attr ?? {};
      const className = _class ? `${_class}` : undefined;

      return <script {..._attr} className={className} dangerouslySetInnerHTML={{ __html: content }} />;
    }
    case AssetType.File: {
      const { url, attr } = data;
      const { class: _class, ..._attr } = attr ?? {};
      const className = _class ? `${_class}` : undefined;

      return <script {..._attr} src={url} className={className} />;
    }
    case AssetType.Code: {
      const { content } = data;

      const doc = parseDocument(content);

      const scriptElements = DomUtils.findAll((elem) => elem.name === "script", doc.children);

      const scriptComponents = scriptElements.map((scriptElem, index) => {
        const { attribs } = scriptElem;
        const innerHTML = DomUtils.textContent(scriptElem);

        if ("src" in attribs) {
          return <script key={`script-${index}`} {...attribs} />;
        }

        return (
          <script key={`script-${index}`} {...attribs}>
            {innerHTML}
          </script>
        );
      });

      return <>{scriptComponents}</>;
    }
  }
};
```

Now, you can use the `getAssetElement` function to generate the script and style tags in the HTML document.
