const CACHE = 'a320-panels-v1';
const ASSETS = [
  './menu.html',
  './manifest.webmanifest',
  './styles/efb-menu.css',
  './images/favicon.ico',
  './icons/ios-icon.png',
  './icons/favicon.ico'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
