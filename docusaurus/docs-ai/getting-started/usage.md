---
sidebar_position: 3
---

# Usage

This guide shows you how to set up and use Brizy AI with Docker. Brizy AI runs as a containerized service and requires specific environment variables to function properly.

## Quick Setup

### Option 1: Docker Run Command

Run Brizy AI directly using Docker with all required environment variables:

```bash

# Only for development
docker run -d \
  --name brizy-ai \
  -p 80:80 \
  -p APP_HTTP_SCHEME=http \
  -p APP_ENV=dev \
  -e APP_URL=http://localhost \
  -e APP_ENCODE_KEY=base64:dGVzdA== \
  -e AMAZON_S3_REGION=Bucket Region \
  -e AMAZON_S3_BUCKET=Bucket Name \
  -e AMAZON_S3_KEY=EXAMPLE KEY \
  -e AMAZON_S3_SECRET=EXAMPLE KEY \
  -e APP_GPT_MODEL_HEADING=EXAMPLE KEY \
  -e APP_GPT_MODEL_HEADING_LOCATION=EXAMPLE KEY \
  -e APP_GPT_MODEL_SUBHEAD=EXAMPLE KEY \
  -e APP_GPT_MODEL_SUBHEAD_HEADING=EXAMPLE KEY \
  -e APP_GPT_MODEL_SUBHEAD_LOCATION=EXAMPLE KEY \
  -e APP_GPT_MODEL_SUBHEAD_HEADING_LOCATION=EXAMPLE KEY \
  -e APP_GPT_MODEL_TESTIMONIAL=EXAMPLE KEY \
  -e APP_GPT_MODEL_SERVICE_NAME=EXAMPLE KEY \
  -e APP_GPT_MODEL_SERVICE_DESCRIPTION=EXAMPLE KEY \
  -e APP_GPT_MODEL_TRANSLATION=EXAMPLE KEY \
  -e APP_GPT_MODEL_FROM_REVIEWS_TO_BUSINESS_DESC=EXAMPLE KEY \
  -e APP_GPT_MODEL_BUSINESS_NAMES=EXAMPLE KEY \
  -e APP_GPT_MODEL_BUSINESS_TYPE=EXAMPLE KEY \
  -e APP_GOOGLE_PLACES_API_KEY=EXAMPLE KEY \
  -e APP_FACEBOOK_ID=EXAMPLE KEY \
  -e APP_FACEBOOK_CONFIG_ID=EXAMPLE KEY \
  -e APP_FACEBOOK_SECRET=EXAMPLE KEY \
  -e APP_FACEBOOK_API_VERSION=v23.0 \
  -e APP_UNSPLASH_TRAFFIC_SOURCE_URL=http://example.com \
  -e APP_UNSPLASH_API_KEY=EXAMPLE KEY \
  -e APP_GET_TEMPLATE_PROJECT_URL=https://template-mk.b-cdn.net/api/ai-project-template \
  -e APP_GET_TEMPLATE_PAGE_URL=https://template-mk.b-cdn.net/api/ai-page-template \
  -e APP_GET_JSON_HTML_TEMPLATES_URL=https://template-mk.b-cdn.net/api/ai-list-template \
  -e APP_GET_JSON_HTML_STYLES_URL=https://template-mk.b-cdn.net/api/ai-list-styles \
  -e APP_VALIDATE_API_KEY_URL=http://example.com/validate \
  -e SENTRY_LARAVEL_DSN= \
  -e SENTRY_TRACES_SAMPLE_RATE= \
  -e APP_HTTP_SCHEME=http \
  brizy/ai:latest
```

### Option 2: Docker Compose

Create a `docker-compose.yml` file with all environment variables:

```yaml
version: '3.8'
services:
  brizy-ai:
    image: brizy/ai:latest
    container_name: brizy-ai
    ports:
      - "80:80"
    environment:
      # Base Configuration For developmnt
      APP_URL: http://localhost
      APP_ENV: dev
      APP_ENCODE_KEY: base64:dGVzdA==
      APP_HTTP_SCHEME: http
      
      # AWS S3 Configuration
      AMAZON_S3_REGION: Bucket Region
      AMAZON_S3_BUCKET: Bucket Name
      AMAZON_S3_KEY: EXAMPLE KEY
      AMAZON_S3_SECRET: EXAMPLE KEY

      # OpenAI Fine-tuned Models
      # Note: Brizy provides these pre-trained models. Contact support for model IDs.
      APP_GPT_MODEL_HEADING: EXAMPLE KEY
      APP_GPT_MODEL_HEADING_LOCATION: EXAMPLE KEY
      APP_GPT_MODEL_SUBHEAD: EXAMPLE KEY
      APP_GPT_MODEL_SUBHEAD_HEADING: EXAMPLE KEY
      APP_GPT_MODEL_SUBHEAD_LOCATION: EXAMPLE KEY
      APP_GPT_MODEL_SUBHEAD_HEADING_LOCATION: EXAMPLE KEY
      APP_GPT_MODEL_TESTIMONIAL: EXAMPLE KEY
      APP_GPT_MODEL_SERVICE_NAME: EXAMPLE KEY
      APP_GPT_MODEL_SERVICE_DESCRIPTION: EXAMPLE KEY
      APP_GPT_MODEL_TRANSLATION: EXAMPLE KEY
      APP_GPT_MODEL_FROM_REVIEWS_TO_BUSINESS_DESC: EXAMPLE KEY
      APP_GPT_MODEL_BUSINESS_NAMES: EXAMPLE KEY
      APP_GPT_MODEL_BUSINESS_TYPE: EXAMPLE KEY
      
      # Google Places API
      APP_GOOGLE_PLACES_API_KEY: KEY
      
      # Facebook API
      APP_FACEBOOK_API_VERSION: v23.0
      APP_FACEBOOK_ID: EXAMPLE KEY
      APP_FACEBOOK_CONFIG_ID: EXAMPLE KEY
      APP_FACEBOOK_SECRET: EXAMPLE KEY
      
      # Unsplash API
      APP_UNSPLASH_TRAFFIC_SOURCE_URL: http://exmple.com
      APP_UNSPLASH_API_KEY: EXAMPLE KEY
      
      # Template URLs
      APP_GET_TEMPLATE_PROJECT_URL: https://template-mk.b-cdn.net/api/ai-project-template
      APP_GET_TEMPLATE_PAGE_URL: https://template-mk.b-cdn.net/api/ai-page-template
      APP_GET_JSON_HTML_TEMPLATES_URL: https://template-mk.b-cdn.net/api/ai-list-template
      APP_GET_JSON_HTML_STYLES_URL: https://template-mk.b-cdn.net/api/ai-list-styles
      APP_VALIDATE_API_KEY_URL: http://example.com/validate
      
      # Sentry (Optional)
      SENTRY_LARAVEL_DSN: ""
      SENTRY_TRACES_SAMPLE_RATE: ""
    restart: unless-stopped
```

Then run:

```bash
docker-compose up -d
```

## Fine-Tuned Models

:::info Training Your Own Fine-Tuned Models
The OpenAI GPT model IDs (starting with `APP_GPT_MODEL_*`) reference **fine-tuned models that you train using Brizy's provided prompt files** for optimal website content generation. These models should be trained for:

- Business headings and subheadings
- Location-specific content
- Testimonials and reviews
- Service names and descriptions
- Business name generation
- Multi-language translation
- Industry-specific content

**Training Process:**
1. **Contact Brizy support** to receive the training prompt files for each content type
2. **Use OpenAI's fine-tuning API** to train models with the provided prompt datasets
3. **Update environment variables** with your trained model IDs (e.g., `ft:gpt-4o-mini-2024-07-18:your-org:model-name:id`)

### How to Fine-Tune Models

Once you receive the prompt files from Brizy, you'll need to fine-tune models using OpenAI's API. Here's a quick example:

**Step 1: Prepare your training data**
```bash
# Brizy provides JSONL files like:
# - heading_training.jsonl
# - testimonial_training.jsonl
# - service_description_training.jsonl
# etc.
```

**Step 2: Upload training file to OpenAI**
```bash
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "purpose=fine-tune" \
  -F "file=@heading_training.jsonl"
```

**Step 3: Create fine-tuning job**
```bash
curl https://api.openai.com/v1/fine_tuning/jobs \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "training_file": "file-abc123",
    "model": "gpt-4o-mini-2024-07-18"
  }'
```

**Step 4: Get your fine-tuned model ID**
```bash
# After training completes, you'll receive a model ID like:
# ft:gpt-4o-mini-2024-07-18:your-org:heading-model:abc123
```

**Resources:**
- [OpenAI Fine-Tuning Guide](https://platform.openai.com/docs/guides/fine-tuning)
- [Fine-Tuning API Reference](https://platform.openai.com/docs/api-reference/fine-tuning)
- [Preparing Your Dataset](https://platform.openai.com/docs/guides/fine-tuning/preparing-your-dataset)

**Note:** You'll need to repeat this process for each content type (headings, testimonials, services, etc.) and update the corresponding environment variables with your trained model IDs.
:::

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| **APP_URL** | The public base URL where Brizy AI will be accessible. Set this to the domain or IP where users will access the service. | `https://example.com` |
| **APP_ENV** | Environment mode (`dev` or `prod`). Use `dev` in development and `prod` in production for security. | `dev` |
| **APP_ENCODE_KEY** | Secret key used for encrypting sensitive data (e.g., cookies, tokens). Must start with `base64:` followed by your base64-encoded key. Should be a secure, random string. Never share or expose this value. | `base64:dGVzdA==` |
| **APP_HTTP_SCHEME** | Protocol scheme for the app (`http` or `https`). Use `https` in production for security. | `http` |
| **AMAZON_S3_REGION** | AWS region where your S3 bucket is hosted. Must match your actual AWS S3 region. | `region` |
| **AMAZON_S3_BUCKET** | Name of the AWS S3 bucket used for storing user assets, uploads, and configuration files. | `buket name` |
| **AMAZON_S3_KEY** | AWS access key ID for S3 access. Should have permissions for the specified bucket. | `1234` |
| **AMAZON_S3_SECRET** | AWS secret access key for S3 access. Keep this value secure and never commit to version control. | `1234` |
| **APP_GPT_MODEL_HEADING** | Fine-tuned OpenAI model for generating business headings. Change only if you have a custom model. | `ft:gpt-4o-mini-2024-07-18:1234` |
| **APP_GPT_MODEL_HEADING_LOCATION** | Fine-tuned model for generating location-specific headings. Useful for local businesses. | `ft:gpt-4o-mini-2024-07-18:1234` |
| **APP_GPT_MODEL_SUBHEAD** | Model for generating subheadings. Used for section titles or taglines. | `ft:gpt-4o-mini-2024-07-18:1234` |
| **APP_GPT_MODEL_SUBHEAD_HEADING** | Model for subheadings that relate to a main heading. | `ft:gpt-4o-mini-2024-07-18:1234` |
| **APP_GPT_MODEL_SUBHEAD_LOCATION** | Model for subheadings with a location context. | `ft:gpt-4o-mini-2024-07-18:1234` |
| **APP_GPT_MODEL_SUBHEAD_HEADING_LOCATION** | Model for subheadings that combine heading and location context. | `ft:gpt-4o-mini-2024-07-18:1234` |
| **APP_GPT_MODEL_TESTIMONIAL** | Model for generating customer testimonials. Useful for social proof sections. | `ft:gpt-4o-mini-2024-07-18:1234` |
| **APP_GPT_MODEL_SERVICE_NAME** | Model for generating names of services offered by a business. | `ft:gpt-4o-mini-2024-07-18:1234` |
| **APP_GPT_MODEL_SERVICE_DESCRIPTION** | Model for generating descriptions of business services. | `ft:gpt-4o-mini-2024-07-18:1234` |
| **APP_GPT_MODEL_TRANSLATION** | Model for translating content into different languages. Set to your custom translation model if needed. | `ft:gpt-4o-mini-2024-07-18:1234` |
| **APP_GPT_MODEL_FROM_REVIEWS_TO_BUSINESS_DESC** | Model for generating business descriptions from customer reviews. | `ft:gpt-4o-mini-2024-07-18:1234` |
| **APP_GPT_MODEL_BUSINESS_NAMES** | Model for generating business names. | `ft:gpt-4o-mini-2024-07-18:1234` |
| **APP_GPT_MODEL_BUSINESS_TYPE** | Model for classifying or suggesting business types. | `ft:gpt-4o-mini-2024-07-18:1234` |
| **APP_GOOGLE_PLACES_API_KEY** | API key for Google Places integration. Enables location search and autocomplete features. Obtain from Google Cloud Console. | `1234` |
| **APP_FACEBOOK_ID** | Facebook ID for Facebook integration. | `1234` |
| **APP_FACEBOOK_CONFIG_ID** | Facebook Config ID for Facebook integration. | `1234` |
| **APP_FACEBOOK_SECRET** | Facebook Secret for Facebook integration. | `1234` |
| **APP_FACEBOOK_API_VERSION** | Facebook api version for Facebook integration. | `v23.0` |
| **APP_UNSPLASH_API_KEY** | API key for Unsplash image search. Required for fetching stock images. Obtain from Unsplash Developers portal. | `1234` |
| **APP_UNSPLASH_TRAFFIC_SOURCE_URL** | The URL reported to Unsplash as the traffic source. Set to your app or company website. | `https://example.com` |
| **APP_GET_TEMPLATE_PROJECT_URL** | Endpoint to fetch project templates (JSON). Used for project scaffolding. | `https://template-mk.b-cdn.net/api/ai-project-template` |
| **APP_GET_TEMPLATE_PAGE_URL** | Endpoint to fetch page templates (JSON). Used for page generation. | `https://template-mk.b-cdn.net/api/ai-page-template` |
| **APP_GET_JSON_HTML_TEMPLATES_URL** | Endpoint to fetch all HTML preview templates (JSON). Used for template previews. | `https://template-mk.b-cdn.net/api/ai-list-template` |
| **APP_GET_JSON_HTML_STYLES_URL** | Endpoint to fetch all global style templates (JSON). Used for style/theme selection. | `https://template-mk.b-cdn.net/api/ai-list-styles` |
| **APP_VALIDATE_API_KEY_URL** | Endpoint to validate API keys. Used for internal or admin validation of API access. | `https://example.com/validate-key` |
| **SENTRY_LARAVEL_DSN** | DSN for Sentry error tracking. Leave empty if not using Sentry. | `""` |
| **SENTRY_TRACES_SAMPLE_RATE** | Sentry traces sample rate (0-1). Controls how much tracing data is sent. | `""` |

## Next Steps

After you get Brizy AI running with Docker, follow the [API Reference](../api-reference/index.md) to understand the complete flow and API endpoints for integration.
