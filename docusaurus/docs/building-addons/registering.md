---
sidebar_position: 2
---

# Registering

Third-party widgets can be added to the builder via the `thirdPartyComponents` prop.  
Component registration allows the builder to recognize additional widgets beyond the default set.<br/> 
Ensure accurate parameter values for proper functionality.


Example Editor Mode:

```typescript jsx
import { Editor as BrizyEditor } from "@brizy/builder/editor";
import type { EditorThirdPartyComponents } from "@brizy/builder/editor";

// Example of a widget rendered in editor mode
const WidgetEditor = () => <div>Rendered in Editor Mode</div>;

const ContainerModule = {
  id: "Brizy.ThirdParty.Container",
  component: {
    editor: WidgetEditor,
  },
  title: "Container",
  category: "custom",
  options: () => [],
};

const thirdPartyComponents: EditorThirdPartyComponents = {
  [ContainerModule.id]: ContainerModule,
};

const pageData = {};
const projectData = {};

// Example on Editor mode

const EditorPage = () => {
  return (
    <BrizyEditor
      pageData={pageData}
      projectData={projectData}
      thirdPartyComponents={thirdPartyComponents}
    />
  );
};
```

Example Preview Mode:

```typescript jsx
import { Preview as BrizyPreview } from "@brizy/builder/preview";
import type { EditorThirdPartyComponents } from "@brizy/builder/preview";

// Example of a widget rendered in view mode
const WidgetView = () => <div>Rendered in View Mode</div>;

const ContainerModule = {
  id: "Brizy.ThirdParty.Container",
  component: {
    view: WidgetView,
  },
  title: "Container",
  category: "custom",
  options: () => [],
};

const thirdPartyComponents: EditorThirdPartyComponents = {
  [ContainerModule.id]: ContainerModule,
};

const PreviewPage = () => {
  return (
    <BrizyPreview 
      pageData={pageData} 
      projectData={projectData}
      thirdPartyComponents={thirdPartyComponents} 
    />
  );
};
```

## Parameters of `module` (ContainerModule)

- `id` - the unique component ID. While invisible to the user, it's essential for the builder to distinguish this widget from others.
- `component` - An object containing `editor` or `view` keys, depending on where it needs to be sent. Each key specifies the React component to be rendered in the respective mode.
- `title` - the widget's display name within the user interface.
- `category` - the widget category where your custom widget will be grouped.
- `options` - specifies the toolbar controls. Read more [here](/docs-internals/editor-controls/introduction).
