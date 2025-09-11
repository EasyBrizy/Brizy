--- 
sidebar_position: 4
---

# Adding Options to the Sidebar

By default, when adding options to a widget in **Brizy**, you usually define them inside the **toolbar**.
However, sometimes you need to place options inside the **sidebar** of the widget.
This guide explains how to do that step by step.

---

## 1. Adding Options via Toolbar (Default Behavior)

A typical widget configuration looks like this:

```js
const mapModule = {
  id: "ThirdParty.Map",
  component: {
    editor: Map,
    view: Map,
  },
  title: "My Map",
  options: (props) => {
    return [
      {
        selector: ".mapThirdComponent",
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
                        default: { value: "Chisinau" },
                      },
                      {
                        id: "zoom",
                        label: "Zoom",
                        type: "slider",
                        config: { min: 1, max: 21 },
                        default: { value: 9, suffix: "inch" },
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
```

This will render the **Address** and **Zoom** controls in the **toolbar**.

---

## 2. Adding Options to the Sidebar

If you want options to appear in the **sidebar**, follow these steps:

1. **Add a sidebar trigger inside the toolbar.**
   Brizy provides two special controls for this:

* [`advancedSettings`](/docs-internals/editor-controls/data-controls/advancedSettings)
* [`sidebarTabsButton`](/docs-internals/editor-controls/data-controls/sidebarTabsButton)

These act as buttons that, when clicked, open the sidebar.

2. **Define the sidebar options in the `sidebar` key.**
   The sidebar must follow a specific structure with `sidebarTabs` → `settingsTabs` → `settingsStyling` | `moreSettingsAdvanced`.

---

### Sidebar Config Structure

```js
const sidebarConfig = [
  {
    id: "sidebarTabs",
    type: "sidebarTabs",
    tabs: [
      {
        id: "styles",
        title: "Styling",
        label: "Styling",
        options: [
          {
            id: "settingsTabs",
            type: "tabs",
            config: { align: "start" },
            tabs: [
              {
                id: "settingsStyling",
                label: "Basic",
                options: [
                  // Controls for the "Basic" tab
                ],
              },
              {
                id: "moreSettingsAdvanced",
                label: "Advanced",
                options: [
                  // Controls for the "Advanced" tab
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
```

---

### Default Sidebar Controls

By default, Brizy renders some controls for each tab:

* **Basic (`settingsStyling`)**

  * Show on Device
  * Padding
  * Margin

* **Advanced (`moreSettingsAdvanced`)**

  * Z-Index
  * CSS ID
  * CSS Class

You can **disable** or **override** these defaults by adding them with `disabled: true`.

#### Example: Disable Basic Controls

```js
{
  id: "settingsStyling",
  label: "Basic",
  options: [
    { id: "margin", type: "margin", disabled: true },
    { id: "padding", type: "padding", disabled: true },
    { id: "showOnDevice", type: "switch", disabled: true },
  ],
}
```

#### Example: Disable Advanced Controls

```js
{
  id: "moreSettingsAdvanced",
  label: "Advanced",
  options: [
    { id: "zIndex", type: "slider", disabled: true },
    { id: "customID", type: "inputText", disabled: true },
    { id: "customClassName", type: "inputText", disabled: true },
  ],
}
```

---

## 3. Complete Example

Here’s how to add a **Hover Transition** control inside the sidebar for the Map widget:

```js
const mapModule = {
  id: "ThirdParty.Map",
  component: {
    editor: Map,
    view: Map,
  },
  title: "My Map",
  options: (props) => {
    return [
      {
        selector: ".mapThirdComponent",
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
                        default: { value: "Chisinau" },
                      },
                      {
                        id: "zoom",
                        label: "Zoom",
                        type: "slider",
                        config: { min: 1, max: 21 },
                        default: { value: 9, suffix: "inch" },
                      },
                    ],
                  },
                ],
              },
              {
                id: "advancedSettings", // Sidebar trigger
                type: "advancedSettings",
                title: "Settings",
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
                id: "styles",
                title: "Styling",
                label: "Styling",
                options: [
                  {
                    id: "settingsTabs",
                    type: "tabs",
                    config: { align: "start" },
                    tabs: [
                      {
                        id: "settingsStyling",
                        label: "Basic",
                        options: [
                          {
                            id: "hoverTransition",
                            type: "slider",
                            label: "Hover Transition",
                            position: 100,
                          },
                        ],
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
```

---

## 4. References

* [Brizy Controls Introduction](/docs-internals/editor-controls/introduction)
* [Advanced Settings Control](/docs-internals/editor-controls/data-controls/advancedSettings)
* [Sidebar Tabs Button Control](/docs-internals/editor-controls/data-controls/sidebarTabsButton)
* [Example Map Widget](https://github.com/EasyBrizy/Brizy-Local-Editor/blob/master/plugins/cloud/widgets/src/Map/index.tsx)

![Sidebar Example](/img/controls/sidebar-option-example.png)
