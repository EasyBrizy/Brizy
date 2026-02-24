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
    view: ButtonView,
  },
  title: "My Button",
};

const thirdPartyComponents = {
  [buttonModule.id]: buttonModule,
};

const pageData = {};
const projectData = {};

const Page = () => {
  return <BrizyEditor pageData={pageData} projectData={projectData} thirdPartyComponents={thirdPartyComponents} />;
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
    view: Map,
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
                          value: "Chisinau",
                        },
                      },
                      {
                        id: "zoom",
                        label: "Zoom",
                        type: "slider",
                        config: {
                          min: 1,
                          max: 21,
                        },
                        default: {
                          value: 9,
                          suffix: "inch",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
  },
};

const thirdPartyComponents = {
  [mapModule.id]: mapModule,
};

const pageData = {};
const projectData = {};

const Page = () => {
  return <BrizyEditor pageData={pageData} projectData={projectData} thirdPartyComponents={thirdPartyComponents} />;
};
```

## Component Props

When creating third-party widgets, your components receive several important props that enable interaction with the Brizy editor:

### Value Props

Your component receives all the values from the toolbar controls as props. These values correspond to the `id` fields defined in your toolbar options.

### Widget State (Model/Context)

Each widget has its own state, also called **model** or **context**, which is a JSON object that stores all the widget's data. This state is:

- **Accessible in both editor and view components** - The same data is available in both the editor component (for editing) and the view component (for rendering)
- **Persistent** - The state is saved and maintained across editor sessions
- **Serializable** - The state is stored as JSON and can be exported/imported

The widget state contains:

- All values from toolbar controls (defined by their `id` fields)
- Any additional custom data you add programmatically
- Default values specified in your toolbar options

### `dynamicClassName` prop

The `dynamicClassName` prop is the runtime value of the `{{WRAPPER}}` placeholder: the unique CSS class (e.g. `.brz-css-gpVzg`) that scopes your widget's styles and avoids conflicts with other elements. See [`{{WRAPPER}}`](/docs-internals/control-arguments/css#wrapper-placeholder) placeholder for how it is used in control selectors.

### onChange Callback

Along with the value props, your component receives an `onChange` callback function that allows you to update the widget's state. This callback accepts a partial object containing only the fields you want to update.

**Key capabilities:**

- **Update toolbar values** - Modify any field that corresponds to a toolbar control's `id`
- **Add custom data** - Store additional properties that aren't tied to toolbar controls
- **Data persistence** - All changes are automatically saved to the widget's state
- **Cross-component access** - Data added in the editor component becomes available in the view component

**Important constraints:**

- Only `string`, `boolean`, and `number` values are accepted in the update object
- Other data types will be automatically filtered out
- You can pass partial data - only the fields you want to update need to be included
- The callback will merge the new values with the existing widget data
- You can pass also custom data, not only the ones from the toolbar

**Example:**

```tsx
import { Editor as BrizyEditor } from "@brizy/builder/editor";
import { JSX } from "react";

interface Props {
  title: string;
  isVisible: "on" | "off";
  count: number;
  lastUpdated?: string; // Custom data not from toolbar
  clickCount?: number; // Custom data not from toolbar
  onChange: (patch: Partial<Props>) => void;
}

// Editor Component - Used for editing the widget
export function Counter(props: Props): JSX.Element {
  const { title, isVisible, count, lastUpdated, clickCount, onChange } = props;

  const handleIncrement = () => {
    // Update multiple fields including custom data
    onChange({
      count: count + 1,
      lastUpdated: new Date().toISOString(),
      clickCount: (clickCount || 0) + 1,
    });
  };

  const handleToggleVisibility = () => {
    // Update only the isVisible field
    onChange({ isVisible: isVisible === "on" ? "off" : "on" });
  };

  const handleTitleChange = (newTitle: string) => {
    // Update only the title field
    onChange({ title: newTitle });
  };

  if (isVisible === "off") {
    return <div>Counter is hidden</div>;
  }

  return (
    <div className="counter-widget">
      <h3>{title}</h3>
      <p>Count: {count}</p>
      <p>Total clicks: {clickCount || 0}</p>
      {lastUpdated && <p>Last updated: {new Date(lastUpdated).toLocaleString()}</p>}
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleToggleVisibility}>Hide</button>
      <input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Enter title" />
    </div>
  );
}

// View Component - Used for rendering the widget on the frontend
export function CounterView(props: Props): JSX.Element {
  const { title, isVisible, count, lastUpdated, clickCount } = props;

  if (isVisible === "off") {
    return <div>Counter is hidden</div>;
  }

  return (
    <div className="counter-widget-view">
      <h3>{title}</h3>
      <p>Count: {count}</p>
      <p>Total clicks: {clickCount || 0}</p>
      {lastUpdated && <p>Last updated: {new Date(lastUpdated).toLocaleString()}</p>}
    </div>
  );
}

const counterModule = {
  id: "ThirdParty.Counter",
  component: {
    editor: Counter,
    view: CounterView,
  },
  title: "Counter Widget",
  options: () => [
    {
      selector: ".counter-widget",
      toolbar: [
        {
          id: "counterSettings",
          type: "popover",
          config: {
            icon: "nc-settings",
            title: "Counter Settings",
          },
          options: [
            {
              id: "title",
              label: "Title",
              type: "inputText",
              default: { value: "My Counter" },
            },
            {
              id: "isVisible",
              label: "Visible",
              type: "switch",
              default: { value: "on" },
            },
            {
              id: "count",
              label: "Initial Count",
              type: "number",
              default: { value: 0 },
            },
          ],
        },
      ],
    },
  ],
};
```

**Key Points:**

- The `onChange` callback is automatically provided by the Brizy editor
- Use it to update widget state in response to user interactions
- Only primitive values (string, boolean, number) are persisted
- Complex objects, functions, or other data types are automatically filtered out
- Updates are merged with existing data, so you only need to specify changed fields
- **Custom data added via `onChange` becomes part of the widget's state and is accessible in both editor and view components**
- **The widget state acts as a bridge between editor and view components, ensuring data consistency**
- **You can store additional properties beyond what's defined in toolbar controls**

### Data Flow Example

Here's how the widget state flows between components:

1. **Initial State**: Widget starts with default values from toolbar options
2. **Editor Interaction**: User interacts with the editor component, triggering `onChange` calls
3. **State Update**: The widget's state is updated with new values (including custom data)
4. **View Rendering**: The view component receives the updated state and renders accordingly

**Example State Object:**

```json
{
  "title": "My Counter",
  "isVisible": "on",
  "count": 5,
  "lastUpdated": "2024-01-15T10:30:00.000Z",
  "clickCount": 12
}
```

In this example:

- `title`, `isVisible`, and `count` come from toolbar controls
- `lastUpdated` and `clickCount` are custom data added programmatically
- All data is accessible in both editor and view components

### Usage

To view the new component, follow these steps:

1. Go to the Left Sidebar of the editor.
2. Look for the "Add Elements" section.
3. Click on "Add Elements" to expand the section.
4. You should see a list of available elements or components.
5. Look for the newly added component within this list.

![image](https://github.com/EasyBrizy/Brizy-Local-Editor/assets/18303258/eb021ebd-7a61-44f7-aa3c-ddf6f1d60b18)

You've now experienced the simplicity of creating your first Brizy widget.
