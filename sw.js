// UBAH NAMA CACHE MENJADI VERSI BARU (Misal: v2.0)
const CACHE_NAME = 'bct-portal-v5.0'; 
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './logo-mandiri-putih.png',
  './logo-mandiri-biru.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  // Memaksa service worker baru langsung aktif
  self.skipWaiting(); 
});

self.addEventListener('activate', event => {
  const cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            // Menghapus cache versi lama secara otomatis
            return caches.delete(cacheName); 
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
