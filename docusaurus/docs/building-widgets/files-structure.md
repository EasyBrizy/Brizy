---
sidebar_position: 2
---

# Setup Environment

Let's create a simple Brizy third-party widget that introduces two new widgets to Brizy.
The first will be a basic **Button** widget, and the second will be a more complex widget
with options contained within the toolbar.

### Installation

You can install the library using npm. Open your terminal and run the following command:

```shell
npx @brizy/create-thirdparty
cd < my-app >
```

The previous command will generate the following folder structure:

#### Generated Files Structure

```shell
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

## Files explanation

- `index.editor.ts` - houses the component's JavaScript logic executed within the editor environment.
- `index.view.ts` - houses the component's JavaScript logic executed within the preview mode.
- `config.json` - specifies the JavaScript and CSS files for both editor and preview modes.

The remaining files are part of the standard Brizy third-party package structure.
