const CACHE_NAME = 'take5-cache-v4.4';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// 1. Install & Paksa Langsung Aktif (skipWaiting)
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Saat Aktif, Hapus Semua Cache Versi Lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName); 
          }
        })
      );
    })
  );
});

// 3. Gunakan Cache (Offline Mode)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
