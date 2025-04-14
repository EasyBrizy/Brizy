---
sidebar_position: 3
---

# Brizy Core

Brizy has matured into a robust platform that provides a foundation for third-party extensions to address niche market requirements and expand core functionalities. While some developers have focused on specialized features, others have reimagined existing components and integrated innovative capabilities.

## Registering

Third-party widgets are registered in Brizy using the `registerComponent` method of the Brizy class from the `@brizy/core` library (included by default).<br />
Component registration informs the builder of additional available widgets beyond the default set. Accurate parameter values are crucial for this process to function correctly.

Example:
```tsx
import { Brizy } from "@brizy/core";

const ButtonEditor = () => <div className="button">This button will be render in editor</div>;
const ButtonView = () => <div className="button button-view">This button will be render in View</div>;

Brizy.registerComponent({
  id: "Brizy.ThirdParty.Button",
  component: {
    editor: ButtonEditor,
    view: ButtonView
  },
  title: "My Button",
  category: "custom",
  options: () => []
});
```

## Usage

To view the new component, follow these steps:

1. Go to the Left Sidebar of the editor.
2. Look for the "Add Elements" section.
3. Click on "Add Elements" to expand the section.
4. You should see a list of available elements or components.
5. Look for the newly added component within this list.

![Image](https://cdn.discordapp.com/attachments/1074978765165297665/1361224803591127120/433239219-8db0d645-4740-4816-8684-8b7728e679f3.png?ex=67fdfae3&is=67fca963&hm=dce4b38f181995d4def61002c70c3e9d250d1f838951e3f5b6bdd59d2ecb6201&)

You've now experienced the simplicity of creating your first Brizy widget with the `registerComponent` method.

## Parameters of `registerComponent`

- `id` - the unique component ID. While invisible to the user, it's essential for the builder to distinguish this widget from others.
- `component` - an object containing editor and view keys, each specifying the React component to be rendered in the respective mode.
- `title` - the widget's display name within the user interface.
- `category` - the widget category where your custom widget will be grouped.
- `options` - specifies the toolbar controls. Read more [here](/docs-internals/editor-controls/introduction).
