const cacheName = 'aadhiraj-v3'; // अपडेट गर्दा यो नाम सधैं बदल्नुहोस्
const assets = [
  './',
  './index.html',
  './style.css',
  './nepali-stories.js',
  './hindi-stories.js',
  './new-logo.png'
];

// इन्स्टल इभेन्ट
self.addEventListener('install', e => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

// एक्टिभेट इभेन्ट (पुरानो क्यास हटाउन)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
      );
    })
  );
});

// फेच इभेन्ट
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
