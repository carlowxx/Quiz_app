// Nurse GO — service worker mínimo.
// Estratégia: network-first com fallback em cache para a navegação e para
// os ícones estáticos. O progresso do usuário vive em localStorage, não
// aqui — isso só garante que o app abra (mesmo sem rede) depois da
// primeira visita. Não tenta cachear os bundles hasheados do Next.

const CACHE = "nursego-shell-v1";
const SHELL = ["/", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isShellOrIcon =
    url.pathname === "/" ||
    url.pathname === "/manifest.webmanifest" ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/icon.svg";
  if (!isShellOrIcon) return;

  event.respondWith(
    fetch(request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copy));
        return res;
      })
      .catch(() => caches.match(request))
  );
});
