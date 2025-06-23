---
sidebar_position: 7
---

# Dynamic Content

When working with dynamic content in Brizy, you can use the `DynamicContent` component to retrieve content dynamically. 
This component provides a convenient way to manage dynamic content within your components.

## Example Usage

```tsx
import React from 'react';
import { Brizy } from "@brizy/core";

interface Props {
  DynamicContent: ComponentType<{ placeholder: string }>;
  showTitle?: boolean;
}

const ComponentEditor = (props: Props) => {
  const { DynamicContent, showTitle = "off" } = props;
  return (
    <div className="dynamic-content">
      <DynamicContent placeholder={`{{ example_placeholder_name showTile=${showTitle} }}`} />
    </div>
  );
};

const ComponentView = (props: Props) => {
  const { DynamicContent } = props;
  return (
    <div className="dynamic-content">
      <DynamicContent placeholder={`{{ example_placeholder_name showTile=${showTitle} }}`} />
    </div>
  );
};

Brizy.registerComponent({
  id: "Brizy.ThirdParty.DynamicContent",
  component: {
    editor: ComponentEditor,
    view: ComponentView
  },
  title: "Dynamic Content",
  category: "custom",
  options: (props) => [
    {
      selector: ".dynamic-content",
      toolbar: [
        {
          id: "toolbarCurrentElement",
          type: "popover",
          config: {
            icon: "nc-pen",
            title: "Settings",
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
                  label: "Content",
                  options: [
                    {
                      id: "showTitle",
                      label: "Show Title",
                      type: "switch",
                      default: {
                        value: "off"
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
});
```

### Key Features
- **Dynamic Content Management**: Simplifies the integration of dynamic placeholders into components. More information about dynamic content management can be found in the [documentation](/api-reference/editor-config/page#dynamiccontent-parameters).
- **Customizable Toolbar**: Includes a toolbar for editing dynamic elements with a switch to toggle the title visibility. More information about the toolbar can be found in the [documentation](/docs-internals/brizy-editor/introduction).
