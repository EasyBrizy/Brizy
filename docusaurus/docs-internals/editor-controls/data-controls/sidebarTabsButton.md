---
toc_max_heading_level: 4
---

# Sidebar Tabs Button

The `sidebarTabsButton` is a user interface component. It functions as a clickable button allowing users to open the sidebar at a specific tab.

Example of `sidebarTabsButton` control:

![SidebarTabsButton](/img/controls/sidebarTabsButton.png)

### Parameters

| Name            | Type                                     |  Default   | Description                                                                                                                                                                                                                      |
| :-------------- | :--------------------------------------- | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`            | `string`                                 |     -      | The identifier of the key where the sidebarTabsButton will save your data                                                                                                                                                        |
| `type`          | `string`                                 |     -      | Type should be `"sidebarTabsButton"` to use this control                                                                                                                                                                         |
| `devices?`      | `"all"` \| `"desktop"` \| `"responsive"` |  `"all"`   | Define the devices where the control will be rendered. `"all"` renders the control on all devices. `"desktop"` renders the control only on desktop devices. `"responsive"` renders the control on both tablet and mobile devices |
| `disabled?`     | `boolean`                                |  `false`   | Configure the condition under which the control is disabled or enabled                                                                                                                                                           |
| `config?.tabId` | `string`                                 |     -      | Specifies the id of the tab on the sidebar that will be opened when the `sidebarTabsButton` is clicked                                                                                                                           |
| `config?.icon`  | `string`                                 |     -      | The icon name of the button                                                                                                                                                                                                      |
| `config?.align` | `"left"` \| `"center"` \| `"right"`      | `"center"` | The alignment of the button                                                                                                                                                                                                      |
| `config?.text`  | `string`                                 |     -      | The text displayed on the button                                                                                                                                                                                                 |

### Basic example

Standard definition with only the required keys. This control will be displayed on all devices.

```js
{
  id: "button",
  type: "sidebarTabsButton"
}
```

### Return value

The `sidebarTabsButton` control does not return anything.

### Usage

#### Devices examples

It will be rendered on all devices. This value can be skipped because it is set to `"all"` by default.

```js
{
  id: "button",
  type: "sidebarTabsButton",
  devices: "all"
}
```

Rendering will occur only on `desktop`.

```js
{
  id: "button",
  type: "sidebarTabsButton",
  devices: "desktop"
}
```

The display is limited to responsive modes, specifically `tablet` and `mobile`.

```js
{
  id: "button",
  type: "sidebarTabsButton",
  devices: "responsive"
}
```

#### Disabled examples

Control will be disabled. Normally, here should be your dynamic condition.

```js
{
  id: "button",
  type: "sidebarTabsButton",
  disabled: true
}
```

Control will be disabled when `videoType` variable will be `"custom"`.
`getValue` is a getter function that allows us to retrieve the value of controls by their id.
`"videoType"` is the id of the `"select"` control below.

```js
const getToolbarContols = ({ getValue }) => {
  const videoType = getValue("videoType");

  return [
    {
      id: "videoType",
      type: "select",
      choices: [
        { title: "Youtube", value: "youtube" },
        { title: "Custom", value: "custom" }
      ],
    },
    {
      id: "button",
      type: "sidebarTabsButton",
      disabled: videoType === "custom"
    },
  ];
};
```

#### Config `tabId` example

Specifies the id of the tab on the sidebar that will be opened.

```js
{
  id: "button",
  type: "sidebarTabsButton",
  config: {
    tabId: "style"
  }
}
```

#### Config `icon` example

Specifies the icon to be displayed with the control.

```js
{
  id: "button",
  type: "sidebarTabsButton",
  config: {
    icon: "nc-flash"
  }
}
```

#### Config `align` example

Sets the alignment of the control.

```js
{
  id: "button",
  type: "sidebarTabsButton",
  config: {
    align: "left"
  }
}
```

#### Config `text` example

Defines the text to be displayed with the control.

```js
{
  id: "button",
  type: "sidebarTabsButton",
  config: {
    text: "Effects"
  }
}
```

#### Usage in HTML example

```tsx
import { Brizy } from "@brizy/core";
import "./index.scss";

export const Editor = (props) => {
  const { showSecretButton } = props;

  return (
    <div className="myCustomComponent">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        scelerisque scelerisque congue. Suspendisse potenti. Quisque purus arcu,
        maximus feugiat pellentesque eget, volutpat in est. Sed elementum
        pretium porta.
      </p>
      {showSecretButton === "on" && <button>Conditional Button</button>
      }
    </div>
  );
};

export const View = (props) => {
  const { showSecretButton } = props;

  return (
    <div className="myCustomComponent viewClassName">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        scelerisque scelerisque congue. Suspendisse potenti. Quisque purus arcu,
        maximus feugiat pellentesque eget, volutpat in est. Sed elementum
        pretium porta.
      </p>
      {showSecretButton === "on" && <button>Conditional Button</button>
      }
    </div>
  );
};

Brizy.registerComponent({
  id: "Brizy.ThirdParty.Custom",
  component: {
    editor: Editor,
    view: View,
  },
  title: "Custom",
  category: "Custom",
  options: () => {
    return [
      {
        selector: ".myCustomComponent",
        toolbar: [
          {
            id: "toolbarSettings",
            type: "popover",
            config: { icon: "nc-cog", title: "Settings" },
            position: 20,
            options: [
              {
                id: "grid",
                type: "grid",
                config: {
                  separator: true,
                },
                columns: [
                  {
                    id: "grid-settings",
                    size: 1,
                    options: [
                      {
                        id: "styles",
                        type: "sidebarTabsButton",
                        config: {
                          tabId: "customTab",
                          text: "My Sidebar",
                          icon: "nc-cog",
                        },
                      },
                    ],
                  },
                  {
                    id: "grid-effects",
                    size: 1,
                    options: [
                      {
                        id: "effects",
                        type: "sidebarTabsButton",
                        config: {
                          tabId: "effects",
                          text: "Effects",
                          icon: "nc-flash",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        sidebar: [
          {
            id: "sidebarTabs",
            type: "sidebarTabs",
            tabs: [
              {
                id: "customTab",
                title: "Custom Tab",
                label: "Custom",
                options: [
                  {
                    id: "showSecretButton",
                    label: "Show Secret Button",
                    type: "switch",
                    position: 10,
                    closeTooltip: true,
                  },
                ],
              },
              {
                id: "effects",
                title: ("Effects"),
                label: ("Effects"),
                options: [
                  // Your Options
                ],
              },
              { id: "effects" },
              // Disable default styles Sidebar
              { id: "styles", disabled: true },
            ],
          },
        ],
      },
    ];
  },
});

```
