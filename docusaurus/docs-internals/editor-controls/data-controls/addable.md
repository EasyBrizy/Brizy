---
toc_max_heading_level: 4
---

# Addable

The `addable` Control is a highly configurable UI component designed for dynamic management of structured data. It
allows users to:

- Define a specific shape (structure) for items.
- Dynamically add new items based on the defined shape.
- Remove existing items.
- Reorder items as needed.

This control is particularly useful for creating dynamic lists or collections of items with consistent attributes, such
as forms, tables, or task management interfaces.

![Addable Option](/img/controls/addable-overview-min.png)

### Parameters

| Name                       | Type                                     |           Default            | Description                                                                                                                                                                                                                      |
| :------------------------- | :--------------------------------------- | :--------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                       | `string`                                 |              -               | The identifier of the key where the addable save data                                                                                                                                                                            |
| `type`                     | `string`                                 |              -               | The type should be `"addable"` to use this control                                                                                                                                                                               |
| `shape`                    | `Array<ControlItem>`                     |              -               | An Array of [**data controls**](/docs-internals/editor-controls/data-controls/inputText) ex: `"inputText"`, `"number"`, `"textarea"`,`"backgroundColor"` . . .                                                                   |
| `roles?`                   | `Array<Role>`                            |              -               | Render the control only if the current user's role matches one of the roles in the provided array <br /> <br /> **`type Role = "admin" \| "viewer" \| "editor" \| "designer" \| "manager"`**                                     |
| `devices?`                 | `"all"` \| `"desktop"` \| `"responsive"` |           `"all"`            | Define the devices where the control will be rendered. `"all"` renders the control on all devices. `"desktop"` renders the control only on desktop devices. `"responsive"` renders the control on both tablet and mobile devices |
| `disabled?`                | `boolean`                                |           `false`            | Configure the condition under which the control is disabled or enabled                                                                                                                                                           |
| `config?.title`            | `string`                                 |          option id           | Setup title                                                                                                                                                                                                                      |
| `config?.icon`             | `string`                                 |         `nc-iframe`          | Setup icon                                                                                                                                                                                                                       |
| `config?.showCount`        | `boolean`                                |            false             | Enable / Disable Message of the number of items                                                                                                                                                                                  |
| `config?.optionGroupTitle` | `string`                                 |           "Widget"           | Customize the title prefix for newly created groups. The title format will be `{optionGroupTitle} {index}` (e.g., "Widget 0", "Widget 1")                                                                                        |
| `config?.sidebarHeadTitle` | `string`                                 |      "Addable Widgets"       | Customize the title displayed in the sidebar header                                                                                                                                                                              |
| `config?.addNewGroupTitle` | `string`                                 |       "Add New Widget"       | Customize the text displayed on the button that adds new groups                                                                                                                                                                  |
| `config?.emptyMessage`     | `string`                                 | "You do not have any option" | Customize the message displayed when there are no items in the addable control                                                                                                                                                   |
| `config?.className`        | `string`                                 |              -               | Add custom CSS class name to the sidebar container                                                                                                                                                                               |
| `config?.extraLabel`       | `string`                                 |              -               | Display additional text label next to the icon button                                                                                                                                                                            |

### Example of control definition: {#shape-definition}

```js
{
  id: "myAddable",
  type: "addable",
  config: {
    title: "MyAddableTitle",
    icon: "nc-hover-move",
    showCount: true,
    optionGroupTitle: "Item",
    sidebarHeadTitle: "My Items",
    addNewGroupTitle: "Add New Item",
    emptyMessage: "No items available",
    className: "custom-sidebar",
    extraLabel: "Manage"
  },
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText",
    },
    {
      id: "score",
      label: "score label",
      type: "number",
    },
  ],
}
```

### Return Value

The Addable returns an array of Groups, with the Following structure:

```ts
Array<{
  id: string;
  title: string;
}>;
```

Using the group IDs, we can collect data based on this predefined structure [(shape)](#shape-definition), ensuring
accurate identification and processing of each group.

The array of group's also represents the order in which they will be displayed in Sidebar.

Example of returned value :

```js
[
  {
    id: "zTLVWZ",
    title: "Widget 0",
  },
  {
    id: "ellf5q",
    title: "Widget 1",
  },
  {
    id: "rp7YOA",
    title: "Widget 2",
  },
  {
    id: "zmYmSn",
    title: "Widget 3",
  },
];
```

### Key Generation

Each control within the group returns its respective value based on its type and configuration, as described in the "
Return Value" section of each control's documentation.
The keys for the returned values are generated using the id's of **addable id**, **group id** and the **option id**:

- AddableID: The id of the Addable Control (e.g., "myAddable").
- optionIDFromShape: The id of the individual control in the shape. For example: ("score", "description", ...).
- groupID: A unique identifier for each item added to the collection. For example ("zTLVWZ", "e32QiR", ...).

#### Example of resulted key

```js
// addableID = "myAddable"
// groupID = "zTLVWZ" //(for example the id of firstGroup)
// optionIDFromShape = "description"

camelCase([addableId, groupId, controlID]); // myAddableZTLVWZDescription
```

![Addable item key generate](/img/controls/addable-keys-min.png)

### Usage

#### Roles example

Show the control only to users with admin and designer privileges.

```js
{
  id: "myAddable",
  type: "addable",
    // highlight-next-line
  roles: ["admin", "designer"],
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText"
    }
    // ...
  ]
}
```

#### Config `title` example

Displays the title set to the left of control

```js
{
  id: "myAddable",
  type: "addable",
  config: {
    // highlight-next-line
    title: "MyAddableTitle",
  },
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText"
    }
    // ...
  ]
}
```

#### Config `icon` example

Set-up a "menu" icon for the open button

```js
{
  id: "myAddable",
  type: "addable",
  config: {
    // highlight-next-line
    icon: "nc-menu-3",
  },
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText"
    },
    // ...
  ]
}
```

#### Config `showCount` example

Show number of groups

```js
{
  id: "myAddable",
  type: "addable",
  config: {
    // highlight-next-line
    showCount: true
  },
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText"
    },
    // ...
  ]
}
```

#### Config `optionGroupTitle` example

Customize the title prefix for newly created groups

```js
{
  id: "myAddable",
  type: "addable",
  config: {
    // highlight-next-line
    optionGroupTitle: "Item"
  },
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText"
    },
    // ...
  ]
}
```

#### Config `sidebarHeadTitle` example

Customize the title displayed in the sidebar header

```js
{
  id: "myAddable",
  type: "addable",
  config: {
    // highlight-next-line
    sidebarHeadTitle: "My Custom Items"
  },
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText"
    },
    // ...
  ]
}
```

#### Config `addNewGroupTitle` example

Customize the text displayed on the button that adds new groups

```js
{
  id: "myAddable",
  type: "addable",
  config: {
    // highlight-next-line
    addNewGroupTitle: "Add New Item"
  },
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText"
    },
    // ...
  ]
}
```

#### Config `emptyMessage` example

Customize the message displayed when there are no items

```js
{
  id: "myAddable",
  type: "addable",
  config: {
    // highlight-next-line
    emptyMessage: "No items available. Click to add one."
  },
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText"
    },
    // ...
  ]
}
```

#### Config `className` example

Add custom CSS class name to the sidebar container

```js
{
  id: "myAddable",
  type: "addable",
  config: {
    // highlight-next-line
    className: "my-custom-sidebar"
  },
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText"
    },
    // ...
  ]
}
```

#### Config `extraLabel` example

Display additional text label next to the icon button

```js
{
  id: "myAddable",
  type: "addable",
  config: {
    // highlight-next-line
    extraLabel: "Manage"
  },
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText"
    },
    // ...
  ]
}
```

#### Disabled examples

Control will be disabled. Normally, here should be your dynamic condition.

```js
{
  id: "myAddable",
  type: "addable",
  // highlight-next-line
  disabled: true
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText"
    },
    // ...
  ]
}
```

#### Devices example

It will be rendered on all devices. This value can be skipped because it is set to `"all"` by default.

```js
{
  id: "myAddable",
  type: "addable",
  // highlight-next-line
  devices: "all"
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText"
    },
    // ...
  ]
}
```

Rendering will occur only on `desktop`.

```js
{
  id: "myAddable",
  type: "addable",
  // highlight-next-line
  devices: "desktop"
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText"
    },
    // ...
  ]
}
```

The display is limited to responsive modes, specifically `tablet` and `mobile`.

```js
{
  id: "myAddable",
  type: "addable",
  // highlight-next-line
  devices: "responsive"
  shape: [
    {
      id: "description",
      label: "description label",
      type: "inputText"
    },
    // ...
  ]
}
```

#### Usage in HTML example

```js
import React from "react";
import { Editor as BrizyEditor } from "@brizy/builder/editor";
import { Preview as BrizyPreview } from "@brizy/builder/preview";
import type { EditorThirdPartyComponents } from "@brizy/builder/editor";
import type { PreviewThirdPartyComponents } from "@brizy/builder/preview";

// Utility function to convert array of strings to camelCase
const camelCase = (strings) => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  return strings.reduce((acc, str) => {
    return acc === "" ? str : acc + capitalize(str);
  }, "");
};

function List(props) {
  const { myAddable } = props;
  // myAddable = [
  //   { id: "zTLVWZ", title: "Widget 0" },
  //   { id: "ellf5q", title: "Widget 1" }
  // ]

  const values = myAddable?.map(({ id: groupId }) => {
    const descriptionKey = camelCase(["myAddable", groupId, "description"]);
    // descriptionKey = "myAddableZTLVWZDescription"

    const scoreKey = camelCase(["myAddable", groupId, "score"]);
    // scoreKey = "myAddableZTLVWZScore"

    return {
      description: props[descriptionKey],
      score: props[scoreKey],
    };
  });

  return (
    <ul className="score-list">
      {values.map((item) => (
        <li>
          desc: {item.description} score:{item.score}
        </li>
      ))}
    </ul>
  );
}

const ListModule = {
  id: "Thirdparty.List", // Ensure this is unique across all module registrations
  component: {
    editor: List,
    view: List,
  },
  title: "Items list",
  category: "custom",
  options: (props) => {
    return [
      {
        selector: ".score-list",
        toolbar: [
          {
            id: "toolbarCurrentElement",
            type: "popover",
            config: {
              icon: "nc-text",
              title: "Text",
            },
            devices: "desktop",
            options: [
              {
                id: "myAddable",
                type: "addable",
                shape: [
                  {
                    id: "description",
                    label: "description label",
                    type: "inputText",
                  },
                  {
                    id: "score",
                    label: "score label",
                    type: "number",
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

const thirdPartyComponents: EditorThirdPartyComponents = {
  [ListModule.id]: ListModule,
};

const pageData = {};
const projectData = {};

// Example usage in Editor mode
const EditorPage = () => {
  return (
    <BrizyEditor
      pageData={pageData}
      projectData={projectData}
      thirdPartyComponents={thirdPartyComponents}
    />
  );
};

// Example usage in Preview mode
const previewThirdPartyComponents: PreviewThirdPartyComponents = {
  [ListModule.id]: ListModule,
};

const PreviewPage = () => {
  return (
    <BrizyPreview
      pageData={pageData}
      projectData={projectData}
      thirdPartyComponents={previewThirdPartyComponents}
    />
  );
};
```
