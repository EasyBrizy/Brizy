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

1. **Install Brizy Local Editor**: Set up the local development environment
2. **Create New Project**: Start a new project in the Brizy Editor
3. **Design Layout**: Use the visual builder to create your template design
4. **Add Placeholders**: Insert placeholder text and images using the builder interface
5. **Style Elements**: Apply styling through the visual editor
6. **Test Layout**: Preview and test your template design

### Placeholders in Builder

When creating templates in the Brizy Editor Builder, add placeholders directly in the visual interface:

#### Text Placeholders
- Use the text editor to add placeholder text like `{{HEADING_MAIN}}`
- Apply styling through the visual style panel
- Set font sizes, colors, and alignment using the builder tools

#### Image Placeholders (Need to review!!!)
- Step By Step
- How o use it

#### Section Background Placeholders (Need to review!!!)
- Add Section element
- Step by Step
- How to use it

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


### Export and Save

After creating your template in the Brizy Editor:

1. **Export Template**: Use the export functionality to generate JSON & HTML
2. **Save to S3**: Upload the JSON & HTML template to your AWS S3 bucket or another storage provider

### Template Storage

After creating templates, you need to store them in a cloud storage provider (AWS S3 recommended) and configure the AI system to access them via environment variables.

### Environment Variables

The required environment variables for template configuration are documented in the [Usage Guide](../getting-started/usage.md).

For more information about API integration, see the [API Reference](./index.md).
