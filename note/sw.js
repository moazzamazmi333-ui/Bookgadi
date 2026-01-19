// Service Worker Name and Version
const CACHE_NAME = 'bookgadi-note-v1';

// Files to Cache (Offline support ke liye)
const urlsToCache = [
  '/note/',
  '/note/index.html',
  '/note/manifest.json'
];

// Install Event: Files ko cache mein save karta hai
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate Event: Purane cache ko delete karta hai
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Event: Isse "Install Popup" trigger hota hai
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
