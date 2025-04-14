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


