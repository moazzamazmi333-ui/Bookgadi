const CACHE_NAME = 'bookgadi-note-v1';
const assets = [
  '/note/',
  '/note/index.html',
  '/note/manifest.json',
  'https://static.wixstatic.com/media/843689_5136ef824c644479aa524cfe04cf1cf7~mv2.jpg'
];

// Service worker install hote hi files ko cache mein save karta hai
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching shell assets');
      return cache.addAll(assets);
    })
  );
});

// Purane cache ko delete karne ke liye
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Offline hone par bhi app ko load karne ke liye
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request);
    })
  );
});
