---
sidebar_position: 2
---

# Creating Your First Widget

Let's create a simple Brizy third-party widget that introduces two new widgets to Brizy.
The first will be a basic **Button** widget, and the second will be a more complex widget
with options contained within the toolbar.

### Basic Example

```tsx
import { Editor as BrizyEditor } from "@brizy/builder/editor";
import { JSX } from "react";

export function Button(): JSX.Element {
  return <div className="button">This button will be render in editor</div>;
}

export function ButtonView(): JSX.Element {
  return <div className="button button-view">This button will be render in View</div>;
}

const buttonModule = {
  id: "ThirdParty.Button", // Ensure this is unique across all module registrations
  component: {
    editor: Button,
    view: ButtonView
  },
  title: "My Button"
};

const thirdPartyComponents = {
  [buttonModule.id]: buttonModule
}

const pageData = {};
const projectData = {};

const Page = () => {
  return <BrizyEditor pageData={pageData} projectData={projectData} thirdPartyComponents={thirdPartyComponents} />
};
```

### Option Types in Builder  

When creating custom components, you can include various toolbar options to enhance customization.  
For detailed information about available options, refer to the [documentation](/docs-internals/brizy-editor/introduction).

#### Toolbar Placement

You can control the placement of the toolbar for each toolbar item using the `toolbarPlacement` option. This option is added at the same level as `selector` and `toolbar` in the toolbar configuration.

**Available values:**

- `"top"` - Forces the toolbar to always appear at the top of the element
- `"bottom"` - Forces the toolbar to always appear at the bottom of the element
- `undefined` (default) - Auto-positions the toolbar based on viewport space (top if it fits, bottom if not)

**Example:**

```tsx
{
  selector: ".myElement",
  toolbarPlacement: "top", // or "bottom" or undefined
  toolbar: [
    // toolbar items...
  ]
}
```

#### Example:

```tsx
import { Editor as BrizyEditor } from "@brizy/builder/editor";
import { JSX } from "react";

interface Props {
  address: string;
  zoom: number;
}

const URL = "https://www.google.com/maps/embed/v1/place";
const KEY = "AIzaSyCcywKcxXeMZiMwLDcLgyEnNglcLOyB_qw";

export function Map(props: Props): JSX.Element {
  const { address, zoom } = props;
  
  const iframeSrc = `${URL}?key=${KEY}&q=${address}&zoom=${zoom}`;
  
  return (
    <div className="mapThirdComponent" style={{ pointerEvents: "none" }}>
      <iframe src={iframeSrc} title="Map" />
    </div>
  );
}

const mapModule = {
  id: "ThirdParty.Map", // Ensure this is unique across all module registrations
  component: {
    editor: Map,
    view: Map
  },
  title: "My Map",
  options: (props) => {
    return [
      {
        selector: ".mapThirdComponent",
        toolbarPlacement: "top", // Force toolbar to always appear at the top
        toolbar: [
          {
            id: "toolbarCurrentElement",
            type: "popover",
            config: {
              icon: "nc-pin",
              title: "Map",
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
                    label: "Map",
                    options: [
                      {
                        id: "address",
                        label: "Address",
                        type: "inputText",
                        placeholder: "Enter address",
                        default: {
                          value: "Chisinau"
                        }
                      },
                      {
                        id: "zoom",
                        label: "Zoom",
                        type: "slider",
                        config: {
                          min: 1,
                          max: 21
                        },
                        default: {
                          value: 9,
                          suffix: "inch"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ];
  }
};

const thirdPartyComponents = {
  [mapModule.id]: mapModule
}

const pageData = {};
const projectData = {};

const Page = () => {
  return <BrizyEditor pageData={pageData} projectData={projectData} thirdPartyComponents={thirdPartyComponents} />
};
```
### Usage

To view the new component, follow these steps:

1. Go to the Left Sidebar of the editor.
2. Look for the "Add Elements" section.
3. Click on "Add Elements" to expand the section.
4. You should see a list of available elements or components.
5. Look for the newly added component within this list.

![image](https://github.com/EasyBrizy/Brizy-Local-Editor/assets/18303258/eb021ebd-7a61-44f7-aa3c-ddf6f1d60b18)

You've now experienced the simplicity of creating your first Brizy widget.
