---
sidebar_position: 3
---

# Creating Your First Widget
### Creating a directory for widget
The `<YOUR_WIDGET>` directory will contains all necessary files for your custom-built widget.
```shell {15-16} 
├── node_modules/
├── package.json 
├── package-lock.json
├── prettier.config.js
├── tsconfig.json
├── README.md
├── .editorconfig
└── src/
    ├── Map/
    │    └── /* will contain all widget logic and style files */
    ├── Counter/
    │    └── /* will contain all widget logic and style files */
    ├── types/
    │    └── files.d.ts
    ├── <YOUR_WIDGET>/
    │    └── index.tsx
    └── config.json
    └── index.editor.ts
    └── index.view.ts
```

To start the build, run the following command in your terminal:

```shell
npm run build
```

> For more information about the available scripts, check the [`README`](https://github.com/EasyBrizy/Brizy-Local-Editor/blob/master/packages/scripts/Readme.md).

### Usage

After building the third-party library, you can send it to the editor configuration via HTTP URLs.
Here's how you can do it:

1. Host the built library files on a server accessible via HTTP.
2. Obtain the HTTP URLs for the built JavaScript files (e.g., `index.editor.js`).
3. In the editor configuration, specify these URLs to load the library:

```typescript
const config = {
  // Other keys of the config...

  extensions: [
    {
      host: "https://<the-build-host-of-library>",
      path: "",
    },
  ],
};
```

> For more information about the config of the Editor, check the [`README`](https://github.com/EasyBrizy/Brizy-Local-Editor/blob/master/packages/core/docs/self-hosted.MD#config).
> Replace `"http://<the-build-host-of-library>"` with the actual HTTP URL of your built library file.
> By adding this URL to the `extensions` array in your editor configuration, the library will be loaded and available for use within the editor environment. <br />
> The `host` specifies the server's URL, while `path` indicates the server directory containing the bundles.

To view the new component, follow these steps:

1. Go to the Left Sidebar of the editor.
2. Look for the "Add Elements" section.
3. Click on "Add Elements" to expand the section.
4. You should see a list of available elements or components.
5. Look for the newly added component within this list.
   ![image](/img/use-widget.png)

### Basic Example of Button Component
Creating third-party widgets requires implementing two separate components: one for the editor view (used to manage editing behavior and interactions) and another for the preview view, which displays how the component will appear on the final, compiled page as seen by end users.

Create the widget inside `<YOUR_WIDGET>` folder.

```tsx showLineNumbers
export function Button() {
  return (
    <div className="button">
      This button will be render in editor
    </div>);
}

export function ButtonView() {
  return (
    <div className="button button-view">
      This button will be render in View
    </div>);
}
```


