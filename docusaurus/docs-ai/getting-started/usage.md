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
  -e APP_URL=http://localhost \
  -e APP_ENV=dev \
  -e APP_ENCODE_KEY=base64:dGVzdA== \
  -e APP_HTTP_SCHEME=http \
  -e APP_CUSTOM_FORM_URL=https://your-app.com/ai-onboarding \
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
  -e APP_OPENAI_API_KEY=EXAMPLE KEY \
  -e APP_OPENAI_ORGANIZATION= \
  -e APP_CEREBRAS_API_KEY= \
  -e APP_AI_PROVIDER=openai \
  -e APP_GOOGLE_PLACES_API_KEY=EXAMPLE KEY \
  -e APP_FACEBOOK_ID=EXAMPLE KEY \
  -e APP_FACEBOOK_CONFIG_ID=EXAMPLE KEY \
  -e APP_FACEBOOK_SECRET=EXAMPLE KEY \
  -e APP_FACEBOOK_API_VERSION=v23.0 \
  -e APP_INSTAGRAM_ID= \
  -e APP_INSTAGRAM_TOKEN= \
  -e APP_UNSPLASH_TRAFFIC_SOURCE_URL=http://example.com \
  -e APP_UNSPLASH_API_KEY=EXAMPLE KEY \
  -e APP_BLOCKS_API_URL=https://template-mk.b-cdn.net \
  -e APP_VALIDATE_API_KEY_URL=http://example.com/validate \
  -e APP_SERVICE=brizy-ai \
  -e DB_CONNECTION=mysql \
  -e DB_HOST=mysql \
  -e DB_PORT=3306 \
  -e DB_DATABASE=brizy_ai \
  -e DB_USERNAME=root \
  -e DB_PASSWORD= \
  -e QUEUE_CONNECTION=rabbitmq \
  -e RABBITMQ_HOST=rabbitmq \
  -e RABBITMQ_PORT=5672 \
  -e RABBITMQ_USER=admin \
  -e RABBITMQ_PASSWORD=admin \
  -e RABBITMQ_VHOST=/ \
  -e RABBITMQ_QUEUE=default \
  -e SENTRY_LARAVEL_DSN= \
  -e SENTRY_TRACES_SAMPLE_RATE= \
  brizyai/official:latest
```

### Option 2: Docker Compose

Create a `docker-compose.yml` file with MySQL, RabbitMQ, the app, and a queue worker. Shared app variables live under `x-brizy-environment` and are merged into both `brizy-ai` and `brizy-ai-worker` via `<<: *brizy-environment`. Adjust the worker `command` to match your image (Laravel Messenger example below).

```yaml
version: '3.8'

# Shared env for brizy-ai and brizy-ai-worker (Compose extension field; ignored by Docker)
x-brizy-environment: &brizy-environment
  # Base Configuration For developmnt
  APP_URL: http://localhost
  APP_ENV: dev
  APP_ENCODE_KEY: base64:dGVzdA==
  APP_HTTP_SCHEME: http
  APP_SERVICE: brizy-ai
  APP_CUSTOM_FORM_URL: https://your-app.com/ai-onboarding

  # AWS S3 Configuration
  AMAZON_S3_REGION: Bucket Region
  AMAZON_S3_BUCKET: Bucket Name
  AMAZON_S3_KEY: EXAMPLE KEY
  AMAZON_S3_SECRET: EXAMPLE KEY

  # OpenAI Fine-tuned Models (when APP_AI_PROVIDER is openai)
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

  # AI provider (openai or cerebras)
  APP_OPENAI_API_KEY: EXAMPLE KEY
  APP_OPENAI_ORGANIZATION: ""
  APP_CEREBRAS_API_KEY: ""
  APP_AI_PROVIDER: openai

  # Google Places API
  APP_GOOGLE_PLACES_API_KEY: KEY

  # Facebook API
  APP_FACEBOOK_API_VERSION: v23.0
  APP_FACEBOOK_ID: EXAMPLE KEY
  APP_FACEBOOK_CONFIG_ID: EXAMPLE KEY
  APP_FACEBOOK_SECRET: EXAMPLE KEY
  APP_INSTAGRAM_ID: ""
  APP_INSTAGRAM_TOKEN: ""

  # Unsplash API
  APP_UNSPLASH_TRAFFIC_SOURCE_URL: http://exmple.com
  APP_UNSPLASH_API_KEY: EXAMPLE KEY

  # Block URLs
  APP_BLOCKS_API_URL: https://template-mk.b-cdn.net
  APP_VALIDATE_API_KEY_URL: http://example.com/validate

  # Database
  DB_CONNECTION: mysql
  DB_HOST: mysql
  DB_PORT: 3306
  DB_DATABASE: brizy_ai
  DB_USERNAME: root
  DB_PASSWORD: ""

  # Queue (RabbitMQ)
  QUEUE_CONNECTION: rabbitmq
  RABBITMQ_HOST: rabbitmq
  RABBITMQ_PORT: 5672
  RABBITMQ_USER: admin
  RABBITMQ_PASSWORD: admin
  RABBITMQ_VHOST: "/"
  RABBITMQ_QUEUE: default

  # Sentry (Optional)
  SENTRY_LARAVEL_DSN: ""
  SENTRY_TRACES_SAMPLE_RATE: ""

services:
  mysql:
    image: mysql/mysql-server:8.0
    container_name: brizy-ai-mysql
    environment:
      MYSQL_DATABASE: brizy_ai
      MYSQL_ALLOW_EMPTY_PASSWORD: 1
      MYSQL_ROOT_HOST: "%"
    ports:
      - "3306:3306"
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    restart: unless-stopped

  rabbitmq:
    image: rabbitmq:3-management
    container_name: brizy-ai-rabbitmq
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: admin
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    restart: unless-stopped

  brizy-ai:
    image: brizyai/official:latest
    container_name: brizy-ai
    ports:
      - "80:80"
    depends_on:
      mysql:
        condition: service_healthy
      rabbitmq:
        condition: service_healthy
    environment:
      <<: *brizy-environment
    restart: unless-stopped

  brizy-ai-worker:
    image: brizyai/official:latest
    container_name: brizy-ai-worker
    depends_on:
      mysql:
        condition: service_healthy
      rabbitmq:
        condition: service_healthy
    environment:
      <<: *brizy-environment
    # Example for Laravel Messenger + RabbitMQ; replace with your image entrypoint if different
    command: ["/bin/bash", "-c", "bin/wait-for-rabbitmq.sh && bin/messenger-consume-infinite.sh default -v"]
    restart: unless-stopped
```

Then run:

```bash
docker-compose up -d
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| **APP_URL** | The public base URL where Brizy AI will be accessible. Set this to the domain or IP where users will access the service. | `https://example.com` |
| **APP_ENV** | Environment mode (`dev` or `prod`). Use `dev` in development and `prod` in production for security. | `dev` |
| **APP_ENCODE_KEY** | Secret key used for encrypting sensitive data (e.g., cookies, tokens). Must start with `base64:` followed by your base64-encoded key. Should be a secure, random string. Never share or expose this value. | `base64:dGVzdA==` |
| **APP_HTTP_SCHEME** | Protocol scheme for the app (`http` or `https`). Use `https` in production for security. | `http` |
| **APP_CUSTOM_FORM_URL** | Public URL of your custom AI intake form. Set this after your form is deployed so the AI Builder redirects users to your UI instead of the default hosted flow. Required for [Custom Form Integration](../api-reference/custom-form-integration.md); leave empty when using the built-in form. | `https://your-app.com/ai-onboarding` |
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
| **APP_OPENAI_API_KEY** | OpenAI API key. Used when `APP_AI_PROVIDER` is `openai` (or unset). | — |
| **APP_OPENAI_ORGANIZATION** | Optional OpenAI organization id. | — |
| **APP_CEREBRAS_API_KEY** | Cerebras API key. Used when `APP_AI_PROVIDER` is `cerebras`. | — |
| **APP_AI_PROVIDER** | LLM backend: `openai` or `cerebras`. | `openai` |
| **APP_GOOGLE_PLACES_API_KEY** | API key for Google Places integration. Enables location search and autocomplete features. Obtain from Google Cloud Console. | `1234` |
| **APP_FACEBOOK_ID** | Facebook ID for Facebook integration. | `1234` |
| **APP_FACEBOOK_CONFIG_ID** | Facebook Config ID for Facebook integration. | `1234` |
| **APP_FACEBOOK_SECRET** | Facebook Secret for Facebook integration. | `1234` |
| **APP_FACEBOOK_API_VERSION** | Facebook api version for Facebook integration. | `v23.0` |
| **APP_INSTAGRAM_ID** | Optional Instagram id for Instagram-related features. | — |
| **APP_INSTAGRAM_TOKEN** | Optional Instagram access token. | — |
| **APP_UNSPLASH_API_KEY** | API key for Unsplash image search. Required for fetching stock images. Obtain from Unsplash Developers portal. | `1234` |
| **APP_UNSPLASH_TRAFFIC_SOURCE_URL** | The URL reported to Unsplash as the traffic source. Set to your app or company website. | `https://example.com` |
| **APP_BLOCKS_API_URL** | Base URL for the blocks API. | `https://template-mk.b-cdn.net` |
| **APP_VALIDATE_API_KEY_URL** | Endpoint to validate API keys. Used for internal or admin validation of API access. | `https://example.com/validate-key` |
| **APP_SERVICE** | Service identifier (e.g. `brizy-ai`). | `brizy-ai` |
| **DB_CONNECTION** | Database driver. | `mysql` |
| **DB_HOST** | MySQL host (Compose service name, e.g. `mysql`). | `mysql` |
| **DB_PORT** | MySQL port. | `3306` |
| **DB_DATABASE** | Database name. | `brizy_ai` |
| **DB_USERNAME** | Database user. | `root` |
| **DB_PASSWORD** | Database password. | `""` |
| **QUEUE_CONNECTION** | Queue driver; use `rabbitmq` with RabbitMQ. | `rabbitmq` |
| **RABBITMQ_HOST** | RabbitMQ host (Compose service name, e.g. `rabbitmq`). | `rabbitmq` |
| **RABBITMQ_PORT** | AMQP port. | `5672` |
| **RABBITMQ_USER** | RabbitMQ username. | `admin` |
| **RABBITMQ_PASSWORD** | RabbitMQ password. | `admin` |
| **RABBITMQ_VHOST** | RabbitMQ virtual host. | `/` |
| **RABBITMQ_QUEUE** | Queue name consumed by workers. | `default` |
| **SENTRY_LARAVEL_DSN** | DSN for Sentry error tracking. Leave empty if not using Sentry. | `""` |
| **SENTRY_TRACES_SAMPLE_RATE** | Sentry traces sample rate (0-1). Controls how much tracing data is sent. | `""` |

## Next Steps

After you get Brizy AI running with Docker, follow the [API Reference](../api-reference/index.md) to understand the complete flow and API endpoints for integration.
