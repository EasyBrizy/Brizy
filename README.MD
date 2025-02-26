# Brizy Web Builder

Brizy is embeddable and White Label ready, so it can be seamlessly integrated in your existing products, ensuring optimal user experience. Being installed on-premise, with complete client control, our solution ensures that all GDPR, ISO, data security requirements are 100% met. Perfect for SaaS businesses that need a web-content builder on their own infrastructure.

https://user-images.githubusercontent.com/5760683/206679891-8209b498-5905-42db-8be7-ac2b4d090c2d.mp4

## See Brizy in action
- Pages: https://pages.demo.Brizylocal.com
- Story: https://story.demo.Brizylocal.com
- Popup: https://popup.demo.Brizylocal.com
- Shopify headless storefront: https://shopify-headless-storefront.vercel.app/products/1
- Contentful headless storefront: In progress...
- CMS integration (MongoDB Atlas): https://cms-integration-mongodb-atlas.vercel.app/admin
- Vercel marketing page: https://vercel-marketing-page.vercel.app
- Netlify marketing page: https://netlify-marketing-page.vercel.app
- Render marketing page: https://render-marketing-page.vercel.app

## How Brizy works
Builder seamlessly integrates with your existing site or app, enabling you to visually create and modify code using your current components or our intuitive drag-and-drop editor.
You can then export the code or directly publish updates.

Read about [how Brizy works](https://builder-docs.brizy.io/docs/getting-started/what-is-brizy)

## Documentation

The official Brizy documentation can be found on our [documentation website](https://builder-docs.brizy.io/docs/developer-docs/the-docs-website)

The release notes can be found [here](https://github.com/EasyBrizy/Brizy/releases).

## Quick Start
Install the package via npm:

```bash
npm install @brizy/builder
```

## Available Components

### 1. Preview Component
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

### 2. Editor Mode with Toolbar and Sidebar
The `Editor` component provides a fully interactive editor mode, equipped with both a toolbar and sidebar to enhance editing functionality.
This component is essential for creating and managing content within a structured, user-friendly interface.

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

> **Note:** The `Config` object contains settings for the editor. You can find more details about `Config` in the [Brizy Builder Documentation](https://builder-docs.brizy.io/docs/getting-started/what-is-brizy/).

## Features
- **Preview Mode:** Render content for viewing purposes without editing features.
- **Editor Mode:** Fully interactive editor with a customizable toolbar and sidebar.

## Recipes

Use some of the recipes

- [next](http://example.com): Next.js 13 app example, using App Router and static page generation
- [remix](http://example.com): Remix Run v2 app example, using dynamic routes at root-level

## Bring your own React components

You can register your own arbitrary custom React components for use as building blocks within Brizy.

[Learn more about code components.](https://builder-docs.brizy.io/docs/development/creating-your-first-addon)

## Support
If you have problems or questions go to our forum, we will then try to help you asap:

https://support.Brizy.io

## Development Setup

Have you found a bug 🐛 or perhaps you have a fantastic feature ✨ to contribute?
The [CONTRIBUTING guide](https://github.com/EasyBrizy/Brizy/blob/main/CONTRIBUTING.MD) will help you get your development environment up and running in minutes.

## License
Proprietary licenses are available for enterprise customers. [Get in touch](mailto:support@Brizy.io)

Additional information about the license model can be found in the [docs](https://www.Brizy.io/saas-website-builder).
