const CACHE_PREFIX = "tiif-cache-";
const CACHE_NAME = "tiif-cache-v2";
const OFFLINE_URL = "/offline";

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.add(OFFLINE_URL).catch(() => {});
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  // Never cache APIs, authenticated data or Next.js RSC responses.
  const accept = request.headers.get("accept") || "";
  const isRSC =
    request.headers.get("RSC") === "1" ||
    accept.includes("text/x-component") ||
    url.searchParams.has("_rsc");

  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/_next/data/") ||
    isRSC
  ) {
    return;
  }

  // Always request fresh page HTML.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        return (
          (await caches.match(OFFLINE_URL)) ||
          new Response("You are offline. Please reconnect.", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          })
        );
      })
    );
    return;
  }

  // Hashed Next.js build assets can safely use cache-first.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request);

        if (cached) return cached;

        const response = await fetch(request);

        if (response.ok && response.type === "basic") {
          await cache.put(request, response.clone()).catch(() => {});
        }

        return response;
      })()
    );
    return;
  }

  // Public images/fonts use network-first.
  const isPublicAsset =
    /\.(png|jpg|jpeg|webp|avif|svg|ico|woff2?|ttf)$/i.test(url.pathname);

  if (isPublicAsset) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);

        try {
          const response = await fetch(request);

          if (response.ok && response.type === "basic") {
            await cache.put(request, response.clone()).catch(() => {});
          }

          return response;
        } catch {
          return (
            (await cache.match(request)) ||
            Response.error()
          );
        }
      })()
    );
  }
});
