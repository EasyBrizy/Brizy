---
sidebar_position: 6
---

# Widget Model

The widget model is the foundation of any widget. It defines the data structure and behavior of the widget. The model is responsible for managing the data and providing the necessary methods to interact with it.


## Understanding Widget Components

Widgets require two separate components to function properly:

- **Editor Component**: Used during editing in the Brizy builder. This component supports interactive editing and receives all model props including the `onChange` callback.
- **View Component**: Used on the published frontend. This component is optimized for rendering and receives the same model props (excluding `onChange`).

Both components receive the same model data, ensuring consistency between the editing experience and the final published page.

## Toolbar Options

One method of interacting with the model is via the toolbar or sidebar by defining option types. Widget components receive props that define the widget's state. The `id` of every toolbar option corresponds to a key in the model, which is automatically passed as a prop to your component.

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
  const { title, isVisible, count, lastUpdated, clickCount } = props;

 
  if (isVisible === "off") {
    return <div>Counter is hidden</div>;
  }

  return (
    <div className="counter-widget">
      <h3>{title}</h3>
      <p>Count: {count}</p>
      <p>Total clicks: {clickCount || 0}</p>
      {lastUpdated && <p>Last updated: {new Date(lastUpdated).toLocaleString()}</p>}
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
              type: "inputText", // defined a option to change the `title` key
              default: { value: "My Counter" },
            },
            {
              id: "isVisible",
              label: "Visible",
              type: "switch", // defined a option to change the `isVisible` key
              default: { value: "on" },
            },
            {
              id: "count",
              label: "Initial Count",
              type: "number", // defined a option to change the `count` key
              default: { value: 0 },
            },
          ],
        },
      ],
    },
  ],
};
```

**Note:** The `default` value for each toolbar option is used as the initial value in the model when the widget is first added to the page. These defaults are automatically merged into the widget's props, so `title` will initially be "My Counter", `isVisible` will be "on", and `count` will be 0.

## Custom Change model via event

Another method to change the model is via the `onChange` event callback: `onChange({ [key]: value })`.
This method is useful for updating the model dynamically in response to user interactions, without relying solely on toolbar options.

**Important:** The `onChange` callback is automatically provided by the Brizy builder and injected into your component's props. You don't need to pass it manually during registration.

**Same Example but with custom onChange + Toolbar:**

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

## Model Persistence

The widget model is automatically managed and persisted by the Brizy builder:

- **Automatic Saving**: Changes made via `onChange` or toolbar controls are saved immediately to the model
- **Persistent Storage**: Model data persists across page refreshes, editing sessions, and when the page is published
- **Data Type Restrictions**: Only primitive values (string, number, boolean) are persisted in the model
- **Automatic Filtering**: Complex objects, functions, arrays, and other non-primitive data types are automatically filtered out and will not be saved
- **Merge Behavior**: Updates are merged with existing model data, so you only need to specify the fields that changed
- **Initial State**: When a widget is first added to the page, the model is initialized with the `default` values defined in toolbar options

This automatic persistence ensures that your widget's state is reliably maintained throughout the entire lifecycle, from editing to publishing.

## See Also

- [Introduction](./introduction.md) - Overview of Brizy widget development
- [Toolbar Configuration](./toolbar-configuration.md) - Detailed guide on available toolbar options and configuration
- [Registering Widgets](./registering.md) - Complete widget registration process
- [Dynamic Content](./dynamic-content.md) - Working with dynamic placeholders in widgets
- [Editor Controls Documentation](/docs-internals/brizy-editor/introduction) - Complete reference for all available option types
