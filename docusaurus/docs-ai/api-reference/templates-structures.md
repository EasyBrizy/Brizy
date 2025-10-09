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

**⚠️ Important:** All JSON templates must be created using the **Brizy Editor Builder** (specifically Brizy Local Editor). 

Developers cannot create JSON templates manually - they must use the visual builder interface.

### Step 1: Setup Brizy Local Editor

1. **Install Brizy Local Editor**: Set up the local development environment
2. **Create New Project**: Start a new project in the Brizy Editor (from scratch or using existing templates)
3. **Design Layout**: Use the visual builder to create your template design
4. **Add Placeholders**: Insert placeholder text and images using the builder interface
5. **Style Elements**: Apply styling through the visual editor
6. **Test Layout**: Preview and test your template design

### Step 2: Add Dynamic Content with Placeholders

When creating templates in the Brizy Editor Builder, add placeholders directly in the visual interface to enable AI-generated content.

#### A. Dynamic Text Placeholders

**Step-by-Step Process:**
1. **Add Text Element**: Drag a text element from the elements panel
2. **Insert Placeholder**: Type placeholder text using the format: `{{x="[unique_id]" model="[model_name]"}}`
3. **Apply Styling**: Use the visual style panel to set fonts, colors, and alignment
4. **Preview**: Test how the placeholder looks in different screen sizes

**Placeholder Syntax:**
```
{{x="[unique_id]" model="[model_name]"}}
```

- **x**: A unique identifier for the specific text element. This number does not need to be in sequential order but must be unique for each dynamic text element on the page.
- **model**: The specific AI model that will generate the text.

**Available AI Models:**

| Model Name | Description | Usage | Image |
|------------|-------------|-------|-------|
| `#model-heading` | Main titles | Used for most main headings and primary titles | ![Heading](/img/ai/model-heading.jpg) |
| `#model-heading-loc` | Location-based titles | Used for titles that include business location | - |
| `#model-subhead` | Subtitles | Used for general subtitles | - |
| `#model-subhead-heading` | Header subtitles | Used for subtitles within the main header section | ![Subheading](/img/ai/model-subhead-heading.jpg) |
| `#model-subheading-loc` | Location subtitles | Used for subtitles that include a location | - |
| `#model-subhead-heading-loc` | Header location subtitles | Used for subtitles in the main header that include a location | - |
| `#model-testimonial` | Testimonials | Used for customer testimonial content | ![Testimonial](/img/ai/model-testimonial.jpg) |
| `#model-service-name` | Service names | Used for the name of a service | ![Service Name](/img/ai/model-service-name.jpg) |
| `#model-service-description` | Service descriptions | Used for detailed description of a service | ![Service Description](/img/ai/model-service-description.jpg) |

**Example:**
```
{{x="1" model="#model-heading"}} - Main business heading
{{x="2" model="#model-subhead"}} - Subtitle text
{{x="3" model="#model-service-name"}} - Service name
{{x="4" model="#model-service-description"}} - Service description
{{x="5" model="#model-testimonial"}} - Customer testimonial
```

**Static Text for Translation:**
- Any text that should **not** be dynamic but will be automatically translated into different languages should be enclosed in asterisks `*`
- Example: `*Contact Us*`, `*Learn More*`, `*Get Started*`

![Static Image](/img/ai/static-text.jpg)

#### B. Dynamic Image Placeholders

Placeholder images are used to define where the AI will insert images. These are categorized into non-background and background images.

##### Non-Background Images

**Step-by-Step Process:**
1. **Add Image Element**: Drag an image element from the elements panel
2. **Upload Placeholder**: Upload a placeholder image with a **3:4 aspect ratio**
3. **Set Naming Convention**: Name the image using the format: `placeholder-feature[unique_id].jpg`
4. **Configure Settings**: 
   - Set image settings to **Custom** (not Original)
   - Enable the **Mask** option
5. **Set Alt Text**: Configure appropriate alt text for accessibility

**Naming Convention:**
- Format: `placeholder-feature[unique_id].jpg`
- Examples: `placeholder-feature1.jpg`, `placeholder-feature2.jpg`, `placeholder-feature3.jpg`

**Required Settings:**
- **Image Mode**: Custom (not Original)
- **Mask**: Enabled
- **Aspect Ratio**: 3:4 recommended

![Dynamic Image](/img/ai/dynamic-image.jpg)

##### Background Images

**Step-by-Step Process:**
1. **Add Section Element**: Drag a section/container element from the elements panel
2. **Open Background Settings**: Click on the section and open background settings
3. **Upload Placeholder**: Use a placeholder image with **landscape aspect ratio (16:9)** or similar
4. **Set Naming Convention**: Name the background using the format: `placeholder-bg[unique_id].jpg`
5. **Configure Settings**:
   - Set image settings to **Custom** (not Original)
   - Set size to **Cover**
6. **Add Overlay**: Add color overlays if needed for text readability
7. **Set Responsive**: Configure background behavior on different screen sizes

**Naming Convention:**
- Format: `placeholder-bg[unique_id].jpg`
- Examples: `placeholder-bg1.jpg`, `placeholder-bg2.jpg`, `placeholder-bg3.jpg`

**Required Settings:**
- **Image Mode**: Custom (not Original)
- **Size**: Cover
- **Aspect Ratio**: 16:9 (landscape) recommended

![Dynamic Image BG](/img/ai/dynamic-image-bg.jpg)

#### C. Business Information Placeholders

For content that needs to be populated with specific business information like company names, phone numbers, or emails, use the following placeholder codes. These can be placed anywhere in your template, including in text, on buttons, or within a map element.

| Placeholder | Description | Usage | Format | Image |
|-------------|-------------|-------|--------| ----- |
| `[logo]` | Company Name/Logo | Business branding | `[logo]` | ![Logo](/img/ai/logo.jpg) |
| `[city]` | City/Location | Business location | `[city]` | ![City](/img/ai/city.jpg) |
| `^phone^` | Phone Number | Contact phone | `^phone^` | ![Phone](/img/ai/phone.jpg) |
| `#email#` | Email Address | Contact email | `#email#` | ![Email](/img/ai/email.jpg) |

**Examples:**
- Button text: `Call us at ^phone^`
- Header text: `Welcome to [logo] in [city]`
- Footer text: `Email us: #email#`
- Map element: Use `[city]` for location

### Step 3: Export and Save

After creating your template in the Brizy Editor:

1. **Export Template**: Use the export functionality to generate JSON & HTML
2. **Save to Cloud Storage**: Upload the JSON & HTML template to your AWS S3 bucket or another storage provider
3. **Ensure Public Access**: Make sure templates are publicly accessible via URLs
4. **Configure Environment Variables**: Set up the required environment variables (see Usage Guide)

## Complete Placeholder Reference

### Text Element Placeholders (AI Model-Based)

| Placeholder Syntax | Model | Description |
|-------------------|-------|-------------|
| `{{x="1" model="#model-heading"}}` | Main Heading | Primary page titles and main headings |
| `{{x="2" model="#model-heading-loc"}}` | Location Heading | Titles that include business location |
| `{{x="3" model="#model-subhead"}}` | Subtitle | General subtitles and secondary text |
| `{{x="4" model="#model-subhead-heading"}}` | Header Subtitle | Subtitles within the main header section |
| `{{x="5" model="#model-subheading-loc"}}` | Location Subtitle | Subtitles that include a location |
| `{{x="6" model="#model-subhead-heading-loc"}}` | Header Location Subtitle | Header subtitles with location |
| `{{x="7" model="#model-testimonial"}}` | Testimonial | Customer testimonial content |
| `{{x="8" model="#model-service-name"}}` | Service Name | Name of a service or offering |
| `{{x="9" model="#model-service-description"}}` | Service Description | Detailed service information |

### Image Element Placeholders

| Placeholder | Aspect Ratio | Settings | Description |
|-------------|--------------|----------|-------------|
| `placeholder-feature1.jpg` | 3:4 | Custom, Mask enabled | Non-background images |
| `placeholder-feature2.jpg` | 3:4 | Custom, Mask enabled | Service/feature images |
| `placeholder-feature3.jpg` | 3:4 | Custom, Mask enabled | Gallery/portfolio images |
| `placeholder-bg1.jpg` | 16:9 | Custom, Cover | Hero section background |
| `placeholder-bg2.jpg` | 16:9 | Custom, Cover | Section backgrounds |
| `placeholder-bg3.jpg` | 16:9 | Custom, Cover | Additional backgrounds |

### Business Information Placeholders

| Placeholder | Description | Example Usage |
|-------------|-------------|---------------|
| `[logo]` | Company name/logo | `Welcome to [logo]` |
| `[city]` | City/location | `Serving [city] since 2020` |
| `^phone^` | Phone number | `Call us: ^phone^` |
| `#email#` | Email address | `Contact: #email#` |

### Static Text (For Translation)

Enclose static text in asterisks for automatic translation:
- `*Contact Us*`
- `*Learn More*`
- `*Get Started*`
- `*About Us*`
- `*Our Services*`

## Template Storage

After creating templates, you need to store them in a cloud storage provider (AWS S3 recommended) and configure the AI system to access them via environment variables.

### Storage Requirements

1. **JSON Templates**: Store the exported JSON files
2. **HTML Templates**: Store the compiled HTML files (required by AI system)
3. **Public Access**: Ensure templates are publicly accessible via URLs
4. **Version Control**: Maintain version history of template updates
5. **Placeholder Images**: Store all placeholder images with correct naming conventions

### Environment Variables

The required environment variables for template configuration are documented in the [Usage Guide](../getting-started/usage.md).

## Best Practices

### Template Design
- **Responsive Design**: Ensure templates work on all device sizes
- **Accessibility**: Use proper heading hierarchy and alt text
- **Performance**: Optimize images and minimize code complexity
- **Consistency**: Maintain consistent styling across all templates
- **Global Elements**: Always set headers and footers as global elements

### Placeholder Usage
- **Unique IDs**: Ensure each dynamic text element has a unique `x` value
- **Correct Models**: Use the appropriate AI model for each content type
- **Image Ratios**: Follow the specified aspect ratios (3:4 for features, 16:9 for backgrounds)
- **Image Settings**: Always use Custom mode and enable appropriate settings (Mask or Cover)
- **Static Text**: Remember to wrap translatable static text in asterisks `*`
- **Business Info**: Use the correct bracket format for business information placeholders

### Quality Assurance
- **Test All Placeholders**: Verify that all placeholders are correctly formatted
- **Preview Responsiveness**: Test on multiple device sizes
- **Check Links**: Ensure navigation works across all pages
- **Validate Export**: Confirm both JSON and HTML exports are complete
- **Storage Verification**: Ensure files are accessible from cloud storage URLs

## Troubleshooting

### Common Issues

**Placeholder Not Working:**
- Check the syntax matches exactly: `{{x="[id]" model="[model]"}}`
- Ensure unique IDs are not duplicated
- Verify the model name includes the `#` prefix

**Images Not Replacing:**
- Verify naming convention: `placeholder-feature[id].jpg` or `placeholder-bg[id].jpg`
- Check image settings are set to Custom (not Original)
- Ensure Mask is enabled for feature images and Cover for backgrounds

**Static Text Not Translating:**
- Verify text is enclosed in asterisks: `*text*`
- Check for proper opening and closing asterisks

For more information about API integration, see the [API Reference](./index.md).
