const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

// Install SW
self.addEventListener("install", (event) => {
	const setup = async () => {
		const cache = await caches.open(CACHE_NAME);

		console.log("Opened cache");

		const offlineRes = await fetch("offline.html");
		cache.put(new Request("offline.html"), offlineRes);

		const indexRes = await fetch("index.html");
		cache.put(new Request("index.html"), indexRes);

		return cache.addAll(urlsToCache);
	};
	event.waitUntil(setup());
});

self.addEventListener("fetch", (event) => {
	if (event.request.method !== "GET") return;

	event.respondWith(
		(async function () {
			// Try to get the response from a cache.
			const cache = await caches.open(CACHE_NAME);
			const cachedResponse = await cache.match(event.request);

			if (cachedResponse) return cachedResponse;

			// If we didn't find a match in the cache, use the network.
			const networkRes = await fetch(event.request);
			// if (
			// 	networkRes &&
			// 	!networkRes.url.includes("chrome-extension") &&
			// 	!event.request.url.includes("/api") &&
			// 	!event.request.url.includes("main.") &&
			// 	!event.request.url.endsWith("/")
			// )
			// 	event.waitUntil(cache.put(event.request, networkRes.clone()));

			if (networkRes) return networkRes;

			const offline = await cache.match("offline.html");
			if (offline) return offline;

			return undefined;
		})()
	);
});

// Activate the SW
self.addEventListener("activate", (event) => {
	const cacheWhitelist = [];
	cacheWhitelist.push(CACHE_NAME);

	event.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			)
		)
	);
});
