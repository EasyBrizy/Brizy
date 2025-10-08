---
title: Dynamic Content
---

When using the builder, certain strings in the HTML output may appear in the following format:

`{{ placeholder content='Base64(SOME EXTERNAL PLACEHOLDER)' }}`

This structure occurs because the builder wraps all external placeholders within its own placeholder syntax.
These placeholders are encoded in Base64 for processing and are designed to represent dynamic content.


## Replacing Placeholders
To replace the content of builder placeholders with their actual values, you can use the [Brizy-Content-Placeholder](https://www.npmjs.com/package/@brizy/content-placeholder) library.
This library is specifically designed to decode and replace such placeholders dynamically, ensuring that the final rendered HTML displays the intended content seamlessly.

Example usage:

```ts
import {
  ContentPlaceholder,
  ContextInterface,
  Extractor,
  Registry,
  Replacer,
  EmptyContext
} from "@brizy/content-placeholder";

export class BuilderPlaceholder extends ContentPlaceholder {
  constructor() {
    super("Builder Placeholder", "placeholder");
  }

  support(placeholderName: string): boolean {
    return placeholderName === this.placeholder;
  }

  async getValue(context: ContextInterface, placeholder: ContentPlaceholder): Promise<string> {
    const { content, ...attrs } = placeholder.getAttributes() ?? {
      content: "",
    };

    if (!content)
    {
      return "";
    }

    const decodedContent = atob(content);
    const extractor = new Extractor();

    const [contentPlaceholders] = extractor.extractIgnoringRegistry(decodedContent);

    if (contentPlaceholders.length === 0) {
      return "";
    }

    const contentPlaceholder = contentPlaceholders[0];
    const placeholderAttrs = contentPlaceholder.getAttributes();

    contentPlaceholder.setAttributes({
      ...placeholderAttrs,
      ...attrs,
    });

    return contentPlaceholder.buildPlaceholder();
  }

  getConfigStructure(): any {
    return {
      id: this.getUid(),
      label: this.getLabel(),
      name: this.getPlaceholder(),
      placeholder: this.buildPlaceholder(),
      attr: this.getAttributes(),
      varyAttr: this.getVaryAttributes(),
    };
  }

  getFallbackValue(context: ContextInterface, placeholder: ContentPlaceholder): string {
    return "";
  }

  getLabel(): string {
    return "";
  }

  getVaryAttributes(): string {
    return "";
  }

  setLabel(label: string): void {}

  shouldFallbackValue(value: string, context: ContextInterface, placeholder: ContentPlaceholder): boolean {
    return false;
  }
}

export const replacePlaceholders =  async (html:string): Promise<string> => {
  const context = new EmptyContext();

  const registry = new Registry();
  const builderInstance = new BuilderPlaceholder();
  registry.registerPlaceholder(builderInstance);

  const replacer = new Replacer(registry);

  return await replacer.replacePlaceholders(html, context);
};
```

This code snippet demonstrates how to use the `Brizy-Content-Placeholder` library to replace builder placeholders in HTML content.
The `replacePlaceholders` function decodes and replaces the placeholders dynamically, ensuring that the final HTML output displays the intended content.

For example, given the following HTML content with builder placeholders:
```html
<div>
  <p>Hi {{placeholder content='e3t1c2VybmFtZX19'}}</p>
  <p>I wanted to personally welcome you to {{placeholder content="e3tjb21wYW55LW5hbWV9fQ=="}}</p>
  <p>If you have any questions, you can always email us to {{placeholder content="e3tvdXItZW1haWx9fQ=="}}</p>
  <span>Best Regards.</span>
</div>
```
The `replacePlaceholders` function will replace the placeholders with their actual values, resulting in the following output:
```html
<div>
  <p>Hi {{username}}</p>
  <p>I wanted to personally welcome you to {{company-name}}</p>
  <p>If you have any questions, you can always email us to {{our-email}}</p>
  <span>Best Regards.</span>
</div>
```

## Examples

### Menu Placeholders

For more information about Menu Placeholders, please refer to the [Menu Placeholders](/api-reference/dynamic-content/menu-dynamic-content) documentation.

### Icon Replacement

For more information about Icon Replacement, please refer to the [Icon Replacement](/api-reference/dynamic-content/icon-replacement) documentation.
