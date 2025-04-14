---
sidebar_position: 5
---

# Option Types in Builder
When creating custom components, you can include various toolbar/sidebar options to enhance customization.
For detailed information about available options, refer to the [documentation](/docs-internals/brizy-editor/introduction).

#### Example
```tsx {25-64} showLineNumbers
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
  options: (props) => [
    {
      selector: ".button",
      toolbar: [
        {
          id: "toolbarCurrentElement",
          type: "popover",
          config: {
            icon: "nc-pen",
            title: "Button Settings",
          },
          devices: "desktop",
          position: 10,
          options: [
            {
              id: "tabsCurrentElement",
              type: "tabs",
              tabs: [
                {
                  id: "tabCurrentElement",
                  label: "Button Content",
                  options: [
                    {
                      id: "text",
                      label: "Text",
                      type: "inputText",
                      placeholder: "Enter button Text",
                      default: {
                        value: "Click Me"
                      }
                    },
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
```
