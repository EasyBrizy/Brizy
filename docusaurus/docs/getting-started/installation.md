---
sidebar_position: 2
---

# Installation

### NextJS
Generate a Brizy application

```bash
npx @brizy/create-app my-app
```

### Standalone
Install the package via npm into existing project:

```bash
npm install @brizy/builder
```

## Available Components

### 1. Editor Component
The `Editor` component allow rendering the editor mode, complete with the toolbar and sidebar for editing functionality.

#### Example Usage
```tsx
import React from "react";
import { Editor as BrizyEditor } from "@brizy/builder/editor";
import type { EditorConfig, EditorPage, EditorProject } from "@brizy/builder";

// @import css
import "@brizy/builder/editor/styles.css";

// @import icons
import brizyIcons from "@brizy/builder/editor/icons/icons.svg";

const config: EditorConfig = {
  urls: {
    editorIcons: brizyIcons
  }
};

const pageData: EditorPage = {}
const projectData: EditorProject = {};

const Editor: React.FC = () => {
  return <BrizyEditor pageData={pageData} projectData={projectData} config={config} />;
};

export default Editor;
```

### 2. Preview Component
The `Preview` component allows you to render content in preview mode without editor modules such as the toolbar or sidebar.

#### Example Usage
```tsx
import type { EditorPage, EditorProject } from "@brizy/builder/preview";
import { Preview } from "@brizy/builder/preview";

// @import css
import "@brizy/builder/preview/styles.css";

const pageData: EditorPage = {}
const projectData: EditorProject = {};

const App: React.FC = () => {
  return (
    <div>
      <h1>Preview Mode</h1>
      <Preview pageData={pageData} projectData={projectData} />
    </div>
  );
};

export default App;
```

## Features
- **Editor Mode:** Fully interactive editor with a customizable toolbar and sidebar.
- **Preview Mode:** Render content for viewing purposes without editing features.
