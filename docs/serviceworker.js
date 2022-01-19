// Install event creates a cache and populates it
self.addEventListener('install', (event) => {
  event.waitUntil(
    // `./hash.json` is an object containing Webpack's fullhash as the `hash` keys value
    fetch('/todo-pwa/hash.json').then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((obj) => {
      const hash = obj.hash;

      caches.open('todo-pwa-v1').then((cache) => {
        return cache.addAll([
          '/todo-pwa/index.html',
          '/todo-pwa/404.html',
          '/todo-pwa/assets/img/header-bg.jpg',
          '/todo-pwa/favicon.ico',
          `/todo-pwa/assets/js/dist/main.${hash}.js`,
          `/todo-pwa/assets/js/dist/main.${hash}.css`,
          `/todo-pwa/assets/js/dist/29.${hash}.js`,
          `/todo-pwa/assets/js/dist/79.${hash}.js`,
          `/todo-pwa/assets/js/dist/314.${hash}.js`,
          `/todo-pwa/assets/js/dist/410.${hash}.js`,
          `/todo-pwa/assets/js/dist/509.${hash}.js`,
          `/todo-pwa/assets/js/dist/544.${hash}.js`,
          `/todo-pwa/assets/js/dist/658.${hash}.js`,
          `/todo-pwa/assets/js/dist/671.${hash}.js`,
          `/todo-pwa/assets/js/dist/704.${hash}.js`,
          `/todo-pwa/assets/js/dist/823.${hash}.js`,
          `/todo-pwa/assets/js/dist/922.${hash}.js`,
          `/todo-pwa/assets/js/dist/939.${hash}.js`,
        ]);
      });
    })
    .catch((err) => {
      console.error(`Error in service worker's pre-install tasks: \n${err}`, err);
    })
  );
});

// Fetch event serves resources from the cache first, or 
// fetches it and adds it to the cache if it doesn't exist:
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        let responseClone = response.clone();

        caches.open('todo-pwa-v1').then((cache) => {
          cache.put(event.request, responseClone);
          return response;
        }).catch(err => console.error('Not found in cache and no network', err))
      });
    })
  );
});

// Activate event is used to delete old caches once a new service worker is activated:
self.addEventListener('activate', (event) => {
  const cacheKeeplist = ['todo-pwa-v1']; // Array of cache versions to keep

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});