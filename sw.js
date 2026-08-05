const CACHE_NAME = 'take5-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Saat aplikasi diinstall di HP, simpan file-file penting ke memori
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Saat aplikasi dibuka (online/offline), gunakan cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});