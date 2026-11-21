// prop phone cache: online → always the latest page from GitHub; offline → the last saved copy
var C = 'sil-photo-blue-v06b';
self.addEventListener('install', function(e){ e.waitUntil(caches.open(C).then(function(c){ return c.addAll(['./']); })); self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k!==C; }).map(function(k){ return caches.delete(k); })); })); self.clients.claim(); });
self.addEventListener('fetch', function(e){
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request, {cache:'no-store'}).then(function(r){
    var copy = r.clone(); caches.open(C).then(function(c){ c.put(e.request, copy); }); return r;
  }).catch(function(){ return caches.match(e.request, {ignoreSearch:true}).then(function(r){ return r || caches.match('./'); }); }));
});
