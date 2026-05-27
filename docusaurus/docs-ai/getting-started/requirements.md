---
sidebar_position: 2
---

# Requirements

Before getting started with Brizy AI, ensure you have the following basic requirements and API keys configured.

## System Requirements

### Minimum Requirements
- **Docker**: Version 20.10 or higher
- **Internet Connection**: Required for API access and image downloads
- **Storage**: At least 2GB available disk space
- **Memory**: Minimum 2GB RAM for optimal performance

### Recommended Requirements
- **Docker Compose**: For easier deployment and management
- **Storage**: 5GB+ available disk space for templates and assets
- **Memory**: 4GB+ RAM for better performance
- **Network**: Stable internet connection for API calls

## Database (MySQL)

The **AI** service (Laravel) stores application data in MySQL. For local development, the AI  project’s `docker-compose.yml` defines a `mysql` service that matches the default connection settings below.

**Purpose**: Persistent storage for AI project (jobs metadata, and related application data).

**Setup Instructions**:
1. **Use Docker Compose (recommended)**  
   From the AI project root, start the stack so the `mysql` service is healthy before `ai-core` starts (`depends_on` with health checks).
2. **Database and user**  
   The sample compose file creates database `ai_core` and allows the root user with an empty password for local dev (adjust for production).
3. **Host from inside containers**  
   Set `DB_HOST=mysql` so the app resolves the database service on the Docker network—not `localhost` from inside the `ai-core` container.

**Environment variables**:

| Variable | Description |
| --- | --- |
| `APP_SERVICE` | Service identifier (e.g. `ai-core`). |
| `DB_CONNECTION` | Use `mysql`. |
| `DB_HOST` | Hostname of MySQL (`mysql` when using compose service name). |
| `DB_PORT` | Usually `3306`. |
| `DB_DATABASE` | Database name (e.g. `ai_core`). |
| `DB_USERNAME` | Database user (e.g. `root` in sample compose). |
| `DB_PASSWORD` | User password (empty in local sample; set in production). |

## Message Queue (RabbitMQ)

AI project uses Laravel’s queue system with **RabbitMQ** as the backend. Long-running AI work is dispatched to the queue; the `ai-core-worker` service in `docker-compose.yml` runs a consumer on the `default` queue.

**Purpose**: Reliable asynchronous processing so HTTP requests stay responsive.

**Setup Instructions**:
1. **Start RabbitMQ**  
   The AI project includes a `rabbitmq` service (`rabbitmq:3-management`) with AMQP on port **5672** and the management UI on **15672**.
2. **Credentials**  
   Align `RABBITMQ_USER` / `RABBITMQ_PASSWORD` with `RABBITMQ_DEFAULT_USER` / `RABBITMQ_DEFAULT_PASS` in compose (the sample uses `admin` / `admin`).
3. **Workers**  
   Ensure `ai-core-worker` (or an equivalent `php artisan messenger:consume` process) is running; it waits for RabbitMQ, then consumes the queue named in `RABBITMQ_QUEUE`.
4. **Queue driver**  
   Set `QUEUE_CONNECTION=rabbitmq` so Laravel uses the RabbitMQ connector, not `sync` or `database`.

**Environment variables**:

| Variable | Description |
| --- | --- |
| `QUEUE_CONNECTION` | Must be `rabbitmq` for this setup. |
| `RABBITMQ_HOST` | Broker hostname (Docker Compose service name is usually `rabbitmq`). |
| `RABBITMQ_PORT` | AMQP port, typically `5672`. |
| `RABBITMQ_USER` | RabbitMQ username. |
| `RABBITMQ_PASSWORD` | RabbitMQ password. |
| `RABBITMQ_VHOST` | Virtual host (often `/`). |
| `RABBITMQ_QUEUE` | Queue name workers consume (e.g. `default`). |

## API Keys Setup

To use Brizy AI features, you'll need these API keys configured:

### Required APIs

#### 1. AWS S3 Bucket
**Purpose**: For storing assets, templates, and configurations

**Setup Instructions**:
1. **Create AWS Account**: Sign up at [AWS Console](https://aws.amazon.com/)
2. **Create S3 Bucket**: 
   - Go to S3 service in AWS Console
   - Click "Create bucket"
   - Choose a unique bucket name
   - Select your preferred region
3. **Configure CORS**: Add CORS policy for web access
4. **Create IAM User**:
   - Go to IAM service
   - Create a new user with programmatic access
   - Attach S3 permissions policy
   - Save Access Key ID and Secret Access Key

#### 2. AI Provider (OpenAI or Cerebras)
**Purpose**: Large-language-model inference for text generation, structured content, and all related AI features inside project.

AI supports **two providers**, selected with `APP_AI_PROVIDER`:

- **`openai`** (default when unset or set to `openai`): Uses the OpenAI API. Pair with `APP_OPENAI_API_KEY` and optionally `APP_OPENAI_ORGANIZATION`. Fine-tuned and model-specific IDs are configured via the `APP_GPT_MODEL_*` variables (see the environment example below).
- **`cerebras`**: Uses the Cerebras inference API. Set `APP_AI_PROVIDER=cerebras` and `APP_CEREBRAS_API_KEY`.

**Choosing Cerebras**

| | |
| --- | --- |
| **Pros** | Typically **lower latency / faster** generation for supported models—useful when throughput or responsiveness matters. |
| **Cons** | **Pricing and quotas** differ from OpenAI; cost at scale should be validated against your workload and budget. |

You only need credentials for the provider you enable; the other provider’s keys can remain empty.

**OpenAI — setup**:
1. **Create OpenAI Account**: Sign up at [OpenAI Platform](https://platform.openai.com/)
2. **Get API Key**:
   - Go to [API Keys](https://platform.openai.com/api-keys)
   - Click "Create new secret key"
   - Copy and save the key securely
3. **Organization (optional)**: Set `APP_OPENAI_ORGANIZATION` if the key belongs to an organization.
4. **Add Payment Method**: Required for API usage beyond free trial limits
5. **Check Usage Limits**: Monitor your usage in the dashboard

**Cerebras — setup**:
1. Obtain an API key from [Cerebras](https://www.cerebras.ai/) (per current account and product docs).
2. Set `APP_CEREBRAS_API_KEY` and `APP_AI_PROVIDER=cerebras`.

**Note**: OpenAI may offer limited free credits for new accounts; always check the latest pricing for both providers.

#### 3. Google Places API Key
**Purpose**: For location-based data and search functionality

**Setup Instructions**:
1. **Create Google Cloud Account**: Sign up at [Google Cloud Console](https://console.cloud.google.com/)
2. **Create Project**: Create a new project or select existing
3. **Enable Places API**:
   - Go to APIs & Services > Library
   - Search for "Places API"
   - Click "Enable"
4. **Create Credentials**:
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "API Key"
   - Copy the generated key
5. **Restrict Key** (Recommended):
   - Click on the created key
   - Add restrictions for security

**Note**: Free tier includes 100 requests per day

#### 4. Facebook API Key
**Purpose**: For social media integration and user data

**Setup Instructions**:
1. **Create Facebook Developer Account**: Go to [Facebook Developers](https://developers.facebook.com/)
2. **Create App**:
   - Click "Create App"
   - Choose "Business" type
   - Fill in app details
3. **Get App Credentials**:
   - Note down App ID and App Secret
   - Configure OAuth settings if needed
4. **Set Permissions**: Configure required permissions for your use case
5. **API version**: Set `APP_FACEBOOK_API_VERSION` (e.g. `v23.0`) to match your app.
6. **Instagram (optional)**: If you use Instagram-related features, configure `APP_INSTAGRAM_ID` and `APP_INSTAGRAM_TOKEN`.

**Note**: Free tier includes 100 requests per day

#### 5. Unsplash API Key
**Purpose**: For high-quality stock images

**Setup Instructions**:
1. **Create Unsplash Account**: Sign up at [Unsplash](https://unsplash.com/)
2. **Register as Developer**:
   - Go to [Unsplash Developers](https://unsplash.com/developers)
   - Click "Register as a developer"
   - Fill in application details
3. **Create Application**:
   - Provide app name and description
   - Set traffic source URL
   - Submit for approval
4. **Get API Key**: Copy the Access Key from your application dashboard

**Note**: Free tier includes 50 requests per hour

## Environment Configuration

### Required Environment Variables

After obtaining your API keys, you'll need to configure these environment variables:

```bash
# AWS S3 Configuration
AMAZON_S3_REGION=your-bucket-region
AMAZON_S3_BUCKET=your-bucket-name
AMAZON_S3_KEY=your-access-key-id
AMAZON_S3_SECRET=your-secret-access-key

# Fine-tuned / model IDs when using OpenAI only (omit if cerebras)
APP_GPT_MODEL_HEADING=your-openai-model-id
APP_GPT_MODEL_HEADING_LOCATION=your-openai-model-id
APP_GPT_MODEL_SUBHEAD=your-openai-model-id
APP_GPT_MODEL_SUBHEAD_HEADING=your-openai-model-id
APP_GPT_MODEL_SUBHEAD_LOCATION=your-openai-model-id
APP_GPT_MODEL_SUBHEAD_HEADING_LOCATION=your-openai-model-id
APP_GPT_MODEL_TESTIMONIAL=your-openai-model-id
APP_GPT_MODEL_SERVICE_NAME=your-openai-model-id
APP_GPT_MODEL_SERVICE_DESCRIPTION=your-openai-model-id
APP_GPT_MODEL_TRANSLATION=your-openai-model-id
APP_GPT_MODEL_FROM_REVIEWS_TO_BUSINESS_DESC=your-openai-model-id
APP_GPT_MODEL_BUSINESS_NAMES=your-openai-model-id
APP_GPT_MODEL_BUSINESS_TYPE=your-openai-model-id

## OPENAI
APP_OPENAI_API_KEY=your-openai-api-key
APP_OPENAI_ORGANIZATION=your-openai-org-id

## CEREBRAS
APP_CEREBRAS_API_KEY=your-cerebras-api-key
APP_AI_PROVIDER=cerebras

## GOOGLE PLACES
APP_GOOGLE_PLACES_API_KEY=your-google-places-key

## FACEBOOK
APP_FACEBOOK_ID=your-facebook-app-id
APP_FACEBOOK_CONFIG_ID=your-facebook-config-id
APP_FACEBOOK_SECRET=your-facebook-app-secret
APP_FACEBOOK_API_VERSION=v23.0
APP_INSTAGRAM_ID=your-instagram-id
APP_INSTAGRAM_TOKEN=your-instagram-token

## UNSPLASH
APP_UNSPLASH_API_KEY=your-unsplash-access-key
APP_UNSPLASH_TRAFFIC_SOURCE_URL=your-website-url

# URL to API for blocks
APP_BLOCKS_API_URL=

# URL to validate API keys (your gateway endpoint)
APP_VALIDATE_API_KEY_URL=

# Custom AI intake form (required for custom form integration)
APP_CUSTOM_FORM_URL=https://your-app.com/ai-onboarding

## DB
APP_SERVICE=ai-core
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=ai_core
DB_USERNAME=root
DB_PASSWORD=

## QUEUE
QUEUE_CONNECTION=rabbitmq

RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_USER=admin
RABBITMQ_PASSWORD=admin
RABBITMQ_VHOST=/
RABBITMQ_QUEUE=default
```

Use `APP_AI_PROVIDER=openai` when using OpenAI; use `cerebras` with `APP_CEREBRAS_API_KEY` as shown above. Only one provider is active at a time.

## Quick Start Checklist

Before proceeding to the [Usage Guide](./usage.md), ensure you have:

- [ ] Docker installed and running
- [ ] MySQL available and `DB_*` variables set
- [ ] RabbitMQ running (e.g. `rabbitmq` service healthy) and `QUEUE_CONNECTION=rabbitmq` with matching `RABBITMQ_*` values
- [ ]  queue worker running if you rely on async jobs
- [ ] AWS S3 bucket created and configured
- [ ] AI provider configured: OpenAI (`APP_OPENAI_API_KEY`, optional org, `APP_GPT_MODEL_*`) **or** Cerebras (`APP_CEREBRAS_API_KEY`, `APP_AI_PROVIDER=cerebras`)
- [ ] Google Places API key created
- [ ] Facebook API credentials ready (and Instagram vars if needed)
- [ ] Unsplash API key registered
- [ ] All environment variables documented
- [ ] Network access to all required services

## Next Steps

Once you have your API keys ready, proceed to the [Usage Guide](./usage.md) to learn how to integrate Brizy AI into your project.

## Troubleshooting

### Common Issues

**API Key Errors**:
- Verify keys are correctly copied (no extra spaces)
- Check if keys have proper permissions
- Ensure services are enabled in respective dashboards

**S3 Access Issues**:
- Verify bucket name and region match
- Check IAM user permissions
- Ensure CORS is properly configured

**Rate Limiting**:
- Monitor usage in respective dashboards
- Implement proper error handling for rate limits
- Consider upgrading plans if needed

**Database connection errors**:
- Confirm `DB_HOST` matches the Docker service name from the app container’s network
- Ensure MySQL finished startup (health check passed) before `ai-core` requests the DB

**Queue / RabbitMQ issues**:
- Verify `QUEUE_CONNECTION=rabbitmq` and broker host/port from inside the worker container
- Confirm the worker process is running and consuming `RABBITMQ_QUEUE`
- Use the management UI on port `15672` (when enabled) to inspect queues and consumers

For additional support, see the [API Reference](../api-reference/index.md) or contact our support team.
