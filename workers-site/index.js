import { getAssetFromKV, NotFoundError } from '@cloudflare/kv-asset-handler'

/**
 * The DEBUG flag will do two things:
 * 1. We will skip caching on the edge, making it easier to debug
 * 2. We will return more detailed error messages to the client
 */
const DEBUG = false

/**
 * Handle incoming requests to serve static assets for the SPA
 */
addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

/**
 * Handle the request by serving static assets or falling back to index.html
 * @param {FetchEvent} event - The fetch event
 */
async function handleEvent(event) {
  const url = new URL(event.request.url)
  let options = {}

  try {
    // Try to serve static assets from KV storage
    const page = await getAssetFromKV(event, options)

    // Define cache control for assets
    const ttl = DEBUG ? 1 : 86400
    const response = new Response(page.body, page)

    response.headers.set('Cache-Control', `max-age=${ttl}`)
    return response
  } catch (e) {
    // If the asset is not found, return the SPA index.html for client-side routing
    if (e instanceof NotFoundError) {
      try {
        const notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
        })

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 200, // Return a 200 status rather than 404 for SPA navigation
        })
      } catch (e) {
        return new Response('Page Not Found', { status: 404 })
      }
    } else {
      // For other errors, return an error response
      return new Response(e.message || 'Error', { status: 500 })
    }
  }
}
