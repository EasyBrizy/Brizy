---
sidebar_position: 4
---

# Registering Your Widgets 

Third-party widgets are registered in Brizy using the registerComponent method of the Brizy class from the @brizy/core library (included by default).
Component registration informs the builder of additional available widgets beyond the default set. Accurate parameter values are crucial for this process to function correctly.

```tsx {1,17-26} showLineNumbers
import { Brizy } from "@brizy/core";

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

Brizy.registerComponent({
  id: "Brizy.ThirdParty.Button",
  component: {
    editor: Button,
    view: ButtonView
  },
  title: "Button",
  category: "custom",
  options: () => []
})
```
### Parameters of `registerComponent`

- `id` - the unique component ID. While invisible to the user, it's essential for the builder to distinguish this widget from others.
- `component` - an object containing editor and view keys, each specifying the React component to be rendered in the respective mode.
- `title` - the widget's display name within the user interface.
- `category` - the widget category where your custom widget will be grouped.
- `options` - specifies the toolbar controls. Read more [here](/docs-internals/editor-controls/introduction).

