// ============================================================
// Gaffer — Cloudflare Worker AI Proxy
// ============================================================
// SETUP INSTRUCTIONS:
//   1. Go to https://workers.cloudflare.com and create a free account
//   2. Create a new Worker and paste this entire file
//   3. Go to Settings > Variables > add secret: ANTHROPIC_API_KEY = your key
//   4. Deploy the Worker and copy your Worker URL
//      (looks like: https://gaffer-proxy.YOUR-NAME.workers.dev)
//   5. In app.html, replace GAFFER_API_URL with your Worker URL
// ============================================================

export default {
  async fetch(request, env) {

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      // Parse the incoming request body
      const body = await request.json();

      // Forward to Anthropic API with your secret key
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      // Return with CORS headers so the browser accepts it
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};
