# Blocks Creation

This document explains how to create JSON blocks for Brizy.

## Overview

Brizy AI collects the following data from clients:
- **SITE NAME**: The name of the website/business
- **INDUSTRY**: The business industry or sector
- **INFO**: Additional business information and requirements
- **PAGES**: The pages needed for the website

After collecting this data, the AI chooses blocks for each page, generates on-brand content based on provided info, and injects them into each block to produce the Brizy JSON (and compiled output) for the site.

### Blocks Options

You have two options for blocks:

1. **Use Brizy Blocks**: Utilize our pre-built blocks available in the Brizy ecosystem
2. **Create Personal Blocks**: Design your own custom blocks using the Brizy Local Editor

## Block Creation Workflow

**⚠️ Important:** All JSON blocks must be created using the **Brizy Editor Builder** (specifically Brizy Local Editor). 

Developers cannot create JSON blocks manually - they must use the visual builder interface.

### Step 1: Setup Brizy Local Editor

1. **Install Brizy Local Editor**: Set up the local development environment
2. **Create New Project**: Start a new project in the Brizy Editor (from scratch or using existing templates)
3. **Design Layout**: Use the visual builder to create your block design
5. **Style Elements**: Apply styling through the visual editor
6. **Test Layout**: Preview and test your block design

**⚠️ Warning:** Each block must be exported from its **own page**. Put **only one block (one section) per page**—do not combine multiple blocks on a single page.

### Step 2: Export and Save

After creating your block in the Brizy Editor:

1. **Export block**: Use the export functionality to generate JSON & HTML
2. **Save to Cloud Storage**: Upload the JSON & HTML block to your AWS S3 bucket or another storage provider
3. **Ensure Public Access**: Make sure blocks are publicly accessible via URLs
4. **Configure Environment Variables**: Set up the required environment variables (see Usage Guide)

## Blocks Storage

After creating blocks, you need to store them in a cloud storage provider (AWS S3 recommended) and configure the AI system to access them via environment variables (will need a small api).

### Storage Requirements

1. **JSON blocks**: Store the exported JSON files
2. **HTML blocks**: Store the compiled HTML files (required by AI system)
3. **Public Access**: Ensure blocks are publicly accessible via URLs

### Environment Variables

The required environment variables for blocks configuration are documented in the [Usage Guide](../getting-started/usage.md).

## Best Practices

### Block Design
- **Responsive Design**: Ensure block work on all device sizes
- **Accessibility**: Use proper heading hierarchy and alt text
- **Performance**: Optimize images and minimize code complexity
- **Consistency**: Maintain consistent styling across all blocks

### Quality Assurance
- **Preview Responsiveness**: Test on multiple device sizes
- **Validate Export**: Confirm both JSON and HTML exports are complete
- **Storage Verification**: Ensure files are accessible from cloud storage URLs

For more information about API integration, see the [API Reference](./index.md).
