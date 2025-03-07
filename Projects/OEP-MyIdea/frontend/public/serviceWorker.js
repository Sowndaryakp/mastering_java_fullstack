const CACHE_NAME = 'oep-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/js/main.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico',
];

const API_CACHE_NAME = 'oep-api-cache-v1';
const API_ROUTES = [
  '/api/exams/user-stats',
  '/api/exams/user-exams',
  '/api/users/profile',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== API_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    if (API_ROUTES.some((route) => url.pathname.includes(route))) {
      event.respondWith(handleApiRequest(request));
    } else {
      event.respondWith(fetch(request));
    }
    return;
  }

  // Handle static assets
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request).then((response) => {
        // Cache new static assets
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      });
    })
  );
});

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  try {
    // Try network first
    const response = await fetch(request);
    if (response.status === 200) {
      const responseClone = response.clone();
      const cache = await caches.open(API_CACHE_NAME);
      await cache.put(request, responseClone);
      return response;
    }
    throw new Error('Network response was not ok');
  } catch (error) {
    // If network fails, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Handle sync events for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-updates') {
    event.waitUntil(syncOfflineData());
  }
});

// Sync offline data when back online
async function syncOfflineData() {
  try {
    const offlineData = await getOfflineData();
    for (const data of offlineData) {
      await fetch(data.url, {
        method: data.method,
        headers: data.headers,
        body: data.body,
      });
    }
    await clearOfflineData();
  } catch (error) {
    console.error('Error syncing offline data:', error);
  }
}

// Message event - handle communication with the main thread
self.addEventListener('message', (event) => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 