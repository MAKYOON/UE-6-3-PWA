const CACHE_NAME = "LPDWCA20";
const URLS_TO_CACHE = [
  './index.html',
  './index.css',
  './index.js',
  './sw.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/@pwabuilder/pwainstall@latest/dist/pwa-install.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js',
  './manifest.webmanifest'
];

const cacheUrls = async () => {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(URLS_TO_CACHE);
}

//A l'installation, on va mettre en cache tous les fichiers utilisés
self.addEventListener('install', event => {
    event.waitUntil(cacheUrls());
  }
);

const handleFetch = async (req) => {
  //Si on a la même ressource en cache que celle demandée alors on retourne celle du cache
  const matchedResources = await caches.match(req);
  if (matchedResources) return matchedResources;
  //Sinon il faut la fetch
  else {
    const response = await fetch(req);
    //On vérifie que la réponse est valide
    if (!response || response.status !== 200 || response.type !== 'basic') return response;

    //On la clone pour pouvoir être consumée par le cache ET pouvoir la retournée en réponse
    const responseToCache = response.clone();
    //On stocke la nouvelle ressource dans le cache
    const cache = await caches.open(CACHE_NAME);
    cache.put(req, responseToCache);

    return response;
  }
}

self.addEventListener('fetch', function(event) {
    event.respondWith(handleFetch(event.request));
  }
);


