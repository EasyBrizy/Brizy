---
sidebar_position: 2
---

# Templates Structures

This document explains how to create JSON templates for Brizy AI and the placeholders needed for AI content replacement.

## Overview

Brizy AI collects the following data from clients:
- **SITE NAME**: The name of the website/business
- **INDUSTRY**: The business industry or sector
- **INFO**: Additional business information and requirements
- **PAGES**: The pages needed for the website

After collecting this data, the AI selects a predefined Brizy JSON template randomly and replaces placeholders with generated content.

### Template Options

You have two options for templates:

1. **Use Brizy Templates**: Utilize our pre-built templates available in the Brizy ecosystem
2. **Create Personal Templates**: Design your own custom templates using the Brizy Local Editor

## Template Creation Workflow

All templates must be created using the **Brizy Local Editor** (not manual JSON creation):

**⚠️ Important:** All JSON templates must be created using the **Brizy Editor Builder** (specifically Brizy Local Editor). Developers cannot create JSON templates manually - they must use the visual builder interface.

### Step 1: Setup Brizy Local Editor

1. **Install Brizy Local Editor**: Set up the local development environment
2. **Create New Project**: Start a new project in the Brizy Editor
3. **Design Layout**: Use the visual builder to create your template design
4. **Add Placeholders**: Insert placeholder text and images using the builder interface
5. **Style Elements**: Apply styling through the visual editor
6. **Test Layout**: Preview and test your template design

### Step 2: Add Placeholders in Builder

When creating templates in the Brizy Editor Builder, add placeholders directly in the visual interface:

#### Text Placeholders

**Step-by-Step Process:**
1. **Add Text Element**: Drag a text element from the elements panel
2. **Insert Placeholder**: Type placeholder text like `{{HEADING_MAIN}}` directly in the text editor
3. **Apply Styling**: Use the visual style panel to set fonts, colors, and alignment
4. **Preview**: Test how the placeholder looks in different screen sizes

**Example:**
```
{{HEADING_MAIN}} - Main business heading
{{DESCRIPTION_MAIN}} - Business description
{{SERVICE_NAME}} - Service name
```

#### Image Placeholders

**Step-by-Step Process:**
1. **Add Image Element**: Drag an image element from the elements panel
2. **Set Placeholder URL**: In the image settings, use a placeholder URL like `{{IMAGE_HERO}}`
3. **Configure Alt Text**: Set alt text with placeholders like `{{SITE_NAME}} hero image`
4. **Set Dimensions**: Configure responsive image sizing
5. **Add Fallback**: Set a default placeholder image for testing

**Example Configuration:**
- **Image URL**: `{{IMAGE_HERO}}`
- **Alt Text**: `{{SITE_NAME}} - Hero Image`
- **Fallback**: `https://via.placeholder.com/1200x600`

#### Section Background Placeholders

**Step-by-Step Process:**
1. **Add Section Element**: Drag a section/container element from the elements panel
2. **Open Background Settings**: Click on the section and open background settings
3. **Set Background Image**: Use placeholder like `{{BACKGROUND_HERO}}` for background images
4. **Configure Overlay**: Add color overlays if needed
5. **Set Responsive**: Configure background behavior on different screen sizes

**Example Configuration:**
- **Background Image**: `{{BACKGROUND_HERO}}`
- **Background Color**: `#f8f9fa` (fallback)
- **Overlay**: `rgba(0,0,0,0.3)` for text readability

### Step 3: Export and Save

After creating your template in the Brizy Editor:

1. **Export Template**: Use the export functionality to generate JSON & HTML
2. **Save to S3**: Upload the JSON & HTML template to your AWS S3 bucket or another storage provider

## Placeholder Reference

### Text Element Placeholders

Use these placeholders in text elements to indicate where AI should replace content:

| Placeholder | Description | AI Generated Content |
|-------------|-------------|---------------------|
| `{{HEADING_MAIN}}` | Main page heading | Business name + tagline |
| `{{HEADING_SECTION}}` | Section headings | Industry-specific headings |
| `{{DESCRIPTION_MAIN}}` | Main description | Business overview |
| `{{DESCRIPTION_SECTION}}` | Section descriptions | Detailed service descriptions |
| `{{TESTIMONIAL}}` | Customer testimonials | Generated testimonials |
| `{{SERVICE_NAME}}` | Service names | Business service names |
| `{{SERVICE_DESCRIPTION}}` | Service descriptions | Detailed service info |
| `{{CONTACT_INFO}}` | Contact information | Phone, email, address |
| `{{BUSINESS_HOURS}}` | Operating hours | Business schedule |
| `{{LOCATION}}` | Location information | Address and map info |
| `{{SITE_NAME}}` | Website/business name | Client's business name |
| `{{INDUSTRY}}` | Industry type | Client's industry |

### Image Element Placeholders

Use these placeholders in image elements:

| Placeholder | Description | AI Generated Content |
|-------------|-------------|---------------------|
| `{{IMAGE_HERO}}` | Hero/banner image | Industry-relevant stock photo |
| `{{IMAGE_SERVICE_1}}` | Service image 1 | Service-specific image |
| `{{IMAGE_SERVICE_2}}` | Service image 2 | Service-specific image |
| `{{IMAGE_ABOUT}}` | About section image | Business/team photo |
| `{{IMAGE_TESTIMONIAL}}` | Testimonial image | Customer/avatar image |
| `{{IMAGE_GALLERY_1}}` | Gallery image 1 | Portfolio/work image |
| `{{IMAGE_GALLERY_2}}` | Gallery image 2 | Portfolio/work image |
| `{{LOGO}}` | Business logo | Generated or placeholder logo |

### Background Placeholders

Use these placeholders for section backgrounds:

| Placeholder | Description | AI Generated Content |
|-------------|-------------|---------------------|
| `{{BACKGROUND_HERO}}` | Hero section background | Industry-relevant background |
| `{{BACKGROUND_SECTION}}` | Section background | Contextual background image |
| `{{BACKGROUND_ABOUT}}` | About section background | Professional background |

## Template Storage

After creating templates, you need to store them in a cloud storage provider (AWS S3 recommended) and configure the AI system to access them via environment variables.

### Storage Requirements

1. **JSON Templates**: Store the exported JSON files
2. **HTML Templates**: Store the compiled HTML files (required by AI system)
3. **Public Access**: Ensure templates are publicly accessible via URLs
4. **Version Control**: Maintain version history of template updates

### Environment Variables

The required environment variables for template configuration are documented in the [Usage Guide](../getting-started/usage.md).

## Best Practices

### Template Design
- **Responsive Design**: Ensure templates work on all device sizes
- **Accessibility**: Use proper heading hierarchy and alt text
- **Performance**: Optimize images and minimize code complexity
- **Consistency**: Maintain consistent styling across all templates

### Placeholder Usage
- **Descriptive Names**: Use clear, descriptive placeholder names
- **Consistent Format**: Follow the `{{PLACEHOLDER_NAME}}` format
- **Contextual Content**: Placeholders should match their intended content type

For more information about API integration, see the [API Reference](./index.md).
