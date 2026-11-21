// offline cache for the prop phone: after one load on Wi-Fi the album opens in airplane mode
var C = 'sil-album-blue-v04';
self.addEventListener('install', function(e){ e.waitUntil(caches.open(C).then(function(c){ return c.addAll(['./', './index.html']); })); self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k!==C; }).map(function(k){ return caches.delete(k); })); })); self.clients.claim(); });
self.addEventListener('fetch', function(e){ e.respondWith(caches.match(e.request, {ignoreSearch:true}).then(function(r){ return r || fetch(e.request); })); });
