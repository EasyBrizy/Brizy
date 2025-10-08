# Icon Replacement

When using the Brizy builder, icons are typically served from the same origin as your application. However, when icons are placed on a different URL (like a CDN or external service), you may encounter CORS (Cross-Origin Resource Sharing) issues. The icon replacement feature allows you to replace these icons with ones served from your own domain or CDN to avoid these problems.

## Overview

The icon replacement system works by:

1. Configuring a placeholder in the editor that will be used for icons
2. Publishing HTML with encoded icon placeholders
3. Using the Brizy Content Placeholder library to replace these placeholders with actual icon content from your CDN

## Configuration

### Step 1: Configure the Editor

First, configure the editor to use a custom placeholder for icons:

```ts
const config = {
  ...baseConfig,
  urls: {
    ...baseConfig.urls,
    compileTemplateIconsPlaceholder: "{{icon}}", // Custom placeholder for icons
  },
};
```

### Step 2: Define Your CDN URL Structure

Define how your CDN serves icons. The system expects to replace `{type}` and `{name}` placeholders:

```ts
// Example CDN URL structure
const cdnUrl = "https://cdn.example.com/icons/{type}/{name}.svg";
// Where {type} is the icon type (fa, outline, glyph, etc.)
// And {name} is the icon name (tower-cell, dock-top, etc.)
```

## Implementation

### Step 3: Create Base Placeholder Class

Create a base placeholder class that other placeholders will extend:

```ts
import { ContentPlaceholder, ContextInterface, Replacer } from "@brizy/content-placeholder";

export class BasePlaceholder extends ContentPlaceholder {
  private replacer: Replacer | null = null;

  constructor(name: string, placeholder: string) {
    super(name, placeholder);
  }

  support(placeholderName: string): boolean {
    return placeholderName === this.placeholder;
  }

  setLabel(label: string) {
    this.name = label;
  }

  getLabel(): string {
    return this.name;
  }

  getVaryAttributes(): string {
    return "";
  }

  getConfigStructure() {
    return {
      id: this.getUid(),
      label: this.getLabel(),
      name: this.getPlaceholder(),
      placeholder: this.buildPlaceholder(),
      attr: this.getAttributes(),
      varyAttr: this.getVaryAttributes(),
    };
  }

  getFallbackValue() {
    return "fallBack Value";
  }

  shouldFallbackValue() {
    return false;
  }

  setReplacer(replacer: Replacer) {
    this.replacer = replacer;
  }

  getReplacer() {
    return this.replacer;
  }

  public async getValue(context: ContextInterface, placeholder: ContentPlaceholder): Promise<string> {
    return "";
  }
}
```

### Step 4: Create Builder Placeholder

Create a placeholder that handles the builder's encoded placeholders:

```ts
import { BasePlaceholder } from "./BasePlaceholder";
import { ContentPlaceholder, ContextInterface, Extractor } from "@brizy/content-placeholder";

export class BuilderPlaceholder extends BasePlaceholder {
  constructor() {
    super("Builder Placeholder", "placeholder");
  }

  async getValue(context: ContextInterface, placeholder: ContentPlaceholder): Promise<string> {
    const { content, ...attrs } = placeholder.getAttributes() ?? {
      content: "",
    };

    if (typeof content !== "string") {
      return super.getValue(context, placeholder);
    }

    // Decode the Base64 encoded content
    const decodedContent = atob(content);
    const extractor = new Extractor();

    // Extract the actual placeholder from the decoded content
    const [contentPlaceholders] = extractor.extractIgnoringRegistry(decodedContent, null, true);

    if (contentPlaceholders.length === 0) {
      return "";
    }

    const contentPlaceholder = contentPlaceholders[0];
    const placeholderAttrs = contentPlaceholder.getAttributes();

    // Merge attributes and return the built placeholder
    contentPlaceholder.setAttributes({
      ...placeholderAttrs,
      ...attrs,
    });

    return contentPlaceholder.buildPlaceholder();
  }
}
```

### Step 5: Create Icon Placeholder

Create the main icon placeholder that fetches icons from your CDN:

```ts
import { ContentPlaceholder, ContextInterface } from "@brizy/content-placeholder";
import { BasePlaceholder } from "./BasePlaceholder";

export class IconPlaceholder extends BasePlaceholder {
  constructor(private cdnUrl: string) {
    super("Icon Placeholder", "icon");
  }

  /**
   * Fetches an icon from the CDN
   * @param iconName - The name of the icon (e.g., 'tower-cell')
   * @param iconType - The type of the icon (e.g., 'fa', 'outline', 'glyph')
   * @returns Promise<string> - The SVG content of the icon
   */
  async getIcon(iconName: string, iconType: string): Promise<string> {
    try {
      const iconUrl = this.cdnUrl.replace("{type}", iconType).replace("{name}", iconName);

      const response = await fetch(iconUrl);

      if (response.ok) {
        return await response.text();
      }

      console.warn(`Failed to fetch icon: ${iconUrl} (${response.status})`);
      return "";
    } catch (error) {
      console.error(`Error fetching icon ${iconName} of type ${iconType}:`, error);
      return "";
    }
  }

  async getValue(context: ContextInterface, placeholder: ContentPlaceholder): Promise<string> {
    const { class: className, name, type } = placeholder.getAttributes() ?? {};

    if (!name || !type) {
      console.warn("Icon placeholder missing required attributes: name and type");
      return "";
    }

    let svg = await this.getIcon(name, type);

    if (!svg) {
      return "";
    }

    // Inject the CSS class into the SVG element
    if (className) {
      svg = svg.replace(/<svg\b([^>]*)>/, `<svg$1 class="${className}">`);
    }

    return svg;
  }
}
```

### Step 6: Register and Use Placeholders

Create a function to register all placeholders and process HTML:

```ts
import { Registry, Replacer, CollectionContext } from "@brizy/content-placeholder";
import { IconPlaceholder } from "./IconPlaceholder";
import { BuilderPlaceholder } from "./BuilderPlaceholder";

export const replacePlaceholders = async (html: string, cdnUrl: string): Promise<string> => {
  const context = new CollectionContext();
  const registry = new Registry();
  const replacer = new Replacer(registry);

  // Register all placeholder instances
  const iconPlaceholder = new IconPlaceholder(cdnUrl);
  const builderPlaceholder = new BuilderPlaceholder();

  iconPlaceholder.setReplacer(replacer);
  builderPlaceholder.setReplacer(replacer);

  registry.registerPlaceholder(iconPlaceholder);
  registry.registerPlaceholder(builderPlaceholder);

  // First pass: Transform builder placeholders to actual placeholders
  const firstPass = await replacer.replacePlaceholders(html, context);

  // Second pass: Replace actual placeholders with content
  const result = await replacer.replacePlaceholders(firstPass, context);

  return result;
};
```

## Usage Example

Here's a complete example of how to use the icon replacement system:

```ts
// 1. Configure your editor
const editorConfig = {
  ...baseConfig,
  urls: {
    ...baseConfig.urls,
    compileTemplateIconsPlaceholder: "{{icon}}",
  },
};

// 2. Define your CDN URL
const cdnUrl = "https://cdn.example.com/icons/{type}/{name}.svg";

// 3. Process your HTML
const htmlWithPlaceholders = `
<div class="brz-icon__container" data-brz-custom-id="hZbl6kWH73Ty">
  <span class="brz-icon brz-span brz-css-149mgbe brz-css-1wiafwv">
    {{placeholder content='e3tpY29ufX0=' class='brz-icon-svg align-[initial]' name='tower-cell' type='fa'}}
  </span>
</div>
`;

// 4. Replace placeholders with actual icons
const processedHtml = await replacePlaceholders(htmlWithPlaceholders, cdnUrl);
console.log(processedHtml);
```

## HTML Output

### Before Processing

```html
<div class="brz-icon__container" data-brz-custom-id="hZbl6kWH73Ty">
  <span class="brz-icon brz-span brz-css-149mgbe brz-css-1wiafwv">
    {{placeholder content='e3tpY29ufX0=' class='brz-icon-svg align-[initial]' name='tower-cell' type='fa'}}
  </span>
</div>
```

### After Processing

```html
<div class="brz-icon__container" data-brz-custom-id="hZbl6kWH73Ty">
  <span class="brz-icon brz-span brz-css-149mgbe brz-css-1wiafwv">
    <svg id="fa_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="brz-icon-svg align-[initial]">
      <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc.-->
      <path
        d="M62.6 2.3C46.2-4.3 27.6 3.6 20.9 20 7.4 53.4 0 89.9 0 128s7.4 74.6 20.9 108c6.6 16.4 25.3 24.3 41.7 17.7s24.3-25.3 17.7-41.7C69.8 186.1 64 157.8 64 128s5.8-58.1 16.3-84C86.9 27.6 79 9 62.6 2.3zm450.8 0C497 9 489.1 27.6 495.7 44c10.5 25.9 16.3 54.2 16.3 84s-5.8 58.1-16.3 84c-6.6 16.4 1.3 35 17.7 41.7s35-1.3 41.7-17.7c13.5-33.4 20.9-69.9 20.9-108s-7.4-74.6-20.9-108c-6.7-16.4-25.3-24.3-41.7-17.7zM340.1 165.2c7.5-10.5 11.9-23.3 11.9-37.2 0-35.3-28.7-64-64-64s-64 28.7-64 64c0 13.9 4.4 26.7 11.9 37.2l-137 301.6c-7.3 16.1-.2 35.1 15.9 42.4s35.1.2 42.4-15.9l20.5-45.3h220.6l20.6 45.2c7.3 16.1 26.3 23.2 42.4 15.9s23.2-26.3 15.9-42.4L340.1 165.2zM369.2 384H206.8l14.5-32h133.4l14.5 32zM288 205.3l37.6 82.7h-75.2l37.6-82.7zM163.3 73.6c5.3-12.1-.2-26.3-12.4-31.6s-26.3.2-31.6 12.4C109.5 77 104 101.9 104 128s5.5 51 15.3 73.6c5.3 12.1 19.5 17.7 31.6 12.4s17.7-19.5 12.4-31.6c-7.3-16.6-11.3-35-11.3-54.4s4-37.8 11.3-54.4zm293.4-19.2c-5.3-12.1-19.5-17.7-31.6-12.4s-17.7 19.5-12.4 31.6c7.3 16.6 11.3 35 11.3 54.4s-4 37.8-11.3 54.4c-5.3 12.1.2 26.3 12.4 31.6s26.3-.2 31.6-12.4C466.5 179 472 154.1 472 128s-5.5-51-15.3-73.6z"
      ></path>
    </svg>
  </span>
</div>
```

## Icon Types and Names

The system supports various icon types and names:

- **Font Awesome (fa)**: `tower-cell`, `home`, `user`, etc.
- **Outline (outline)**: `dock-top`, `menu`, `close`, etc.
- **Glyph (glyph)**: `favourite-28`, `star`, `heart`, etc.

## Best Practices

1. **Error Handling**: Always implement proper error handling for failed icon fetches
2. **Caching**: Consider implementing caching for frequently used icons
3. **Fallbacks**: Provide fallback icons for missing or failed icon requests
4. **Performance**: Use appropriate CDN settings for optimal icon loading performance
5. **Security**: Ensure your CDN is properly configured with appropriate CORS headers

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your CDN is configured with proper CORS headers
2. **Missing Icons**: Check that your CDN URL structure matches the expected format
3. **Base64 Decoding Errors**: Verify that the placeholder content is properly encoded
4. **Network Issues**: Implement retry logic for failed icon fetches

### Debug Tips

- Enable console logging to track icon fetching
- Verify CDN URLs are accessible
- Check that icon names and types match your CDN structure
- Test with a simple icon first before implementing the full system

## Related Documentation

- [Dynamic Content](/api-reference/dynamic-content) - General dynamic content handling
- [Menu Dynamic Content](/api-reference/dynamic-content/menu-dynamic-content) - Menu-specific placeholders
- [Brizy Content Placeholder Library](https://www.npmjs.com/package/@brizy/content-placeholder) - Official library documentation
