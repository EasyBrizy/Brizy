---
id: screenshot-caching
title: CDN Caching for Screenshot API
sidebar_label: CDN Screenshot Caching
slug: /guides/performance/screenshot-caching
description: Optimize screenshot delivery using a CDN as a caching layer over your screenshot API.
---

To reduce latency and offload your backend, it’s recommended to serve screenshot responses through a Content Delivery Network (CDN).

This guide explains how to configure a CDN to cache responses from your `/api/screenshots` endpoint, using **BunnyCDN** as an example.

---

## 🚀 Overview: How CDN Screenshot Caching Works

1. The frontend requests a screenshot via a CDN-backed URL:

   ```
   https://cdn.example.net/api/screenshots/<screenshot_id>
   ```

2. The CDN checks its cache:

- **If cached**: The image is served immediately from the edge.
- **If not cached**: The CDN fetches it from your origin (the API), caches it, and then serves the response.

This approach greatly improves image delivery times and reduces backend load.

---

## ⚙️ Step 1: Expose the Screenshot API

Ensure your API serves screenshot images publicly at:

```
https://yourdomain.com/api/screenshots/<screenshot_id>
```

**Requirements**:

- Serve correct headers: `Content-Type: image/jpeg`
- Responses must be cacheable:
  - Status: `200 OK`
  - Avoid headers like `Cache-Control: no-store`

Example of headers you can find [here](https://github.com/EasyBrizy/Brizy/tree/main/recipes/next/src/app/api/screenshots/[id]/route.ts).

## 🌐 Step 2: Configure Your CDN (Using BunnyCDN)

While this works with any CDN provider (Cloudflare, Fastly, etc.), here’s how to set it up with **BunnyCDN**:

### 🐰 Create a Pull Zone

1. Visit [bunny.net](https://bunny.net)
2. Go to **Pull Zones → Add Pull Zone**
3. Configure:

- **Name**: `screenshots`
- **Origin URL**: `https://yourdomain.com/api/screenshots`
- BunnyCDN will generate a CDN endpoint like:
  ```
  https://your-zone.b-cdn.net
  ```

💡 _Optional_: You can configure a custom domain (e.g., `cdn.yourdomain.com`) using a CNAME.

⚠️ Important: Configure "Query String Vary Parameters"
To ensure the CDN serves updated screenshots when content changes, configure Query String Vary Parameters in your BunnyCDN Pull Zone settings.

Add the parameter: t

This t parameter represents a timestamp appended to the screenshot URL whenever the image is updated.

Example:

```
https://your-zone.b-cdn.net/api/screenshots/1234?t=1723382100
```

When t changes, the CDN treats it as a new file and fetches the latest version from your origin instead of serving the cached copy.

## 🖼️ Step 3: Update Editor screenshotUrl config key to Use CDN URLs

Replace direct API URLs with your CDN endpoint to leverage caching.

```ts
// Example configuration

const config = {
  // ... other keys
  api: {
    // ... other keys
    screenshots: {
      // ... other keys
      screenshotUrl: "https://your-zone.b-cdn.net/",
    },
  },
};
```

The CDN will automatically cache the screenshot on first access and serve it from the cache on subsequent requests.

For more config details, check screenshot configuration [docs](https://builder-free-docs.brizy.io/getting-started/brizy-config#example-api-screenshots)

## 🧪 Optional: Testing with ngrok in Local Development

You can simulate CDN caching locally by exposing your dev API using **ngrok**.

### 1. Install ngrok

```bash
npm install -g ngrok
# or download manually from https://ngrok.com/download
```

### 2. Authenticate ngrok

Get your token from the ngrok dashboard and set it up:

```bash
ngrok config add-authtoken YOUR_AUTHTOKEN
```

### 3. Reserve a Static Domain (Optional)

Avoid changing URLs between sessions by reserving a static domain:

- In ngrok dashboard → **Domains → Create Domain**
- Copy the assigned domain, e.g.:
  ```
  https://seasnail-cheerful-sincerely.ngrok-free.app
  ```

![Create Domain](/img/guides/performance/create_domain.png)
![Copy Domain](/img/guides/performance/copy_domain.png)

### 4. Start the Tunnel

Expose your local server (e.g., on port 3000) with a clean URL:

```bash
ngrok http --url=seasnail-cheerful-sincerely.ngrok-free.app 3000 --request-header-remove ngrok-skip-browser-warning
```

Resulting in a public endpoint like:

```
https://seasnail-cheerful-sincerely.ngrok-free.app/
```

### 5. Use ngrok as CDN Origin (for Testing)

Update your CDN Pull Zone temporarily:

- **Origin URL**: `https://seasnail-cheerful-sincerely.ngrok-free.app/api/screenshots`
- **CDN Endpoint**: `https://your-zone.b-cdn.net`

This setup allows you to test caching behavior exactly as it works in production.

## ✅ Summary

- CDN caching boosts screenshot delivery speed and lowers backend usage.
- Your screenshot API must be publicly accessible and return cacheable image responses.
- Configure any CDN with a pull zone targeting your `/api/screenshots` endpoint.
- For local testing, ngrok provides a reliable public origin for your development server.
