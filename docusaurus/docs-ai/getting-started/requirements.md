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

#### 2. OpenAI API Key
**Purpose**: For AI-powered text generation and content creation

**Setup Instructions**:
1. **Create OpenAI Account**: Sign up at [OpenAI Platform](https://platform.openai.com/)
2. **Get API Key**:
   - Go to [API Keys](https://platform.openai.com/api-keys)
   - Click "Create new secret key"
   - Copy and save the key securely
3. **Add Payment Method**: Required for API usage
4. **Check Usage Limits**: Monitor your usage in the dashboard

**Note**: Free tier available for testing with limited requests

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

# OpenAI Configuration
APP_GPT_MODEL_HEADING=your-openai-model-id
APP_GPT_MODEL_HEADING_LOCATION=your-openai-model-id
# ... (other GPT model variables)

# Google Places
APP_GOOGLE_PLACES_API_KEY=your-google-places-key

# Facebook
APP_FACEBOOK_ID=your-facebook-app-id
APP_FACEBOOK_CONFIG_ID=your-facebook-config-id
APP_FACEBOOK_SECRET=your-facebook-app-secret

# Unsplash
APP_UNSPLASH_API_KEY=your-unsplash-access-key
APP_UNSPLASH_TRAFFIC_SOURCE_URL=your-website-url
```

## Quick Start Checklist

Before proceeding to the [Usage Guide](./usage.md), ensure you have:

- [ ] Docker installed and running
- [ ] AWS S3 bucket created and configured
- [ ] OpenAI API key obtained
- [ ] Google Places API key created
- [ ] Facebook API credentials ready
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

For additional support, see the [API Reference](../api-reference/index.md) or contact our support team.
