/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'ktm-roast-brew-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/manifest.json',
];

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: network-first for API calls, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Always go network-first for API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ error: 'You are offline' }), {
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );
    return;
  }

  // For navigation requests (page loads), serve index.html from cache if available
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // For all other requests: try network, fall back to cache
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
