const CACHE_NAME = "anniv-frere-v1";
const ASSETS = [
  ".",
  "index.html",
  "manifest.json",
  "birthday.mp3",
  "ICONE 1.png",
  "ICONE 2.png"
];

// Installation : on met les fichiers principaux en cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activation : on nettoie les anciens caches si besoin
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

// Réponse aux requêtes : cache d'abord, sinon réseau
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match("index.html")
        )
      );
    })
  );
});
