---
sidebar_position: 1
---

# Overview

The Brizy AI platform provides a RESTful API for integrating AI-powered project generation into your applications. The API supports session-based workflows and secure authentication using API keys.

## Authentication

All API requests require authentication using an API key in the `X-API-Key` header:

```http
X-API-Key: your-api-key-here
```

## API Endpoints

### Session Management

#### Create Session

Partner X initiates a session by making a POST request to `/api/create-session`:

```http
POST /api/create-session
Headers: { "X-API-Key": "12345" }
```

**Note:** The request body must be empty.

**Response:**
```json
{ 
  "sessionId": "123", 
  "aiUrl": "http://ai.url.example.com"
}
```

JavaScript example:
```javascript
const response = await fetch('http://ai.url.example.com/api/create-session', {
  method: 'POST',
  headers: {
    'X-API-Key': '12345'
  }
});
const { sessionId, aiUrl } = await response.json();
```

#### Step 2: Redirect to AI Platform

Partner X redirects the user to the AI platform using the `aiUrl` from step 1 and the partner's callback URL:

```javascript
// Redirect user to AI platform with callback URL
const redirectUrl = `${aiUrl}?callbackUrl=${'https://your-app.com/callback'}`;
window.location.href = redirectUrl;
```

**Redirect URL Format:**
```
http://ai.url.example.com?callbackUrl=partnerUrl
```

**⚠️ Important:** The `aiUrl` must be concatenated **only** with the `callbackUrl` parameter. Do not modify the URL or add any additional query parameters. Adding extra parameters or modifying the URL structure will cause the AI platform to fail.

#### Step 3: Project Creation in AI Core

- AI redirects the user to its UI interface
- User interacts with the AI platform to create the project
- Once the project is created by **AI Core**, a redirect is triggered back to the partner's callback URL

```
Redirect: callbackUrl
```

#### Step 4: Fetch Generated Template

Partner X fetches the generated output using the session ID:

```javascript
const response = await fetch(`http://ai.url.example.com/api/generated-template/${sessionId}`, {
  headers: {
    'X-API-Key': '12345'
  }
});

const { pages, project } = await response.json();
```

**Response:**
```json
{
  "pages": [""],
  "project": ""
}
```

### Response Structure

#### Project Object
The project object is a string that contains global styles and color configurations used across all pages. This string contains styling data that needs to be sent to the Brizy Editor Builder to apply consistent theming and design elements.

**Note:** This string contains global CSS styles, color schemes, and design tokens that will be applied to all pages in the project.

#### Pages Array
The pages array contains strings that represent page data in a format compatible with the Brizy Editor builder. Each string contains the page structure and content that can be directly imported into the Brizy Editor.

**Note:** These strings are specifically formatted for the Brizy Editor and should be sent directly to the editor for rendering.


### Important Notes

- Make sure to use a valid `apiKey` when creating a session
- `callbackUrl` must be a publicly accessible URL where the partner receives the final notification
- The generated template is available only after the redirect to the callback happens

## Support

For API support and questions:

- **Email Support**: [support@Brizy.io](mailto:support@Brizy.io)
- **GitHub Issues**: [Report Bugs](https://github.com/EasyBrizy/Brizy-Local-Editor/issues)

### Common Issues

- **Authentication Errors**: Verify your API key is correct and included in the `X-API-Key` header
- **Session Timeouts**: Sessions expire after a certain period; create a new session if needed
- **Callback URL Issues**: Ensure your callback URL is publicly accessible and properly formatted
- **Empty Request Body**: The `create-session` endpoint requires an empty request body

### Documentation Resources

- [Usage Guide](../getting-started/usage.md) - Setup and configuration
- [Requirements](../getting-started/requirements.md) - System requirements and API keys

