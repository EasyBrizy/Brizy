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
Install the package

```shell
npm i @brizy/builder -- save
```

Render the editor:

```tsx
import { useEditor } from "@brizy/builder";

// Create Brizy component Config
const config = {
  // Use page builder mode
  mode: "page",

  // Initial Data
  pageData: {},
  projectData: {},

  // Save the data to your database
  onSave(data) {}
};


// Token
const token = "demo";


// Render Brizy editor
export function Editor() {
  const { setNodeRef } = useEditor(token, config);
  return <div ref={setNodeRef} style={{ height: "100vh", overflow: "hidden" }}/>
}
```

Render the page:

```tsx
import { Preview } from "@brizy/builder/Preview";
import "@brizy/builder/previewCSS.css";

// Initial Data
const pageData = {};
const projectData = {};

// Config
const config = {};

export function Page() {
  return (
    <Preview
      mode="page"
      config={config}
      pageData={pageData}
      projectData={projectData}
    />
  );
}
```

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
