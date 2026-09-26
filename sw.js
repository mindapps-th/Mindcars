// Mind Cars service worker: เปิดแอปได้แม้ออฟไลน์ และดึงเวอร์ชันใหม่อัตโนมัติเมื่อออนไลน์
const CACHE = "mindcars-v9";
const SHELL = ["./", "index.html", "manifest.json", "firebase-config.js", "icon-192.png", "apple-touch-icon.png", "icon.svg", "favicon.ico"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // ไม่ยุ่งกับ Firebase / แผนที่ ให้วิ่งตรง
  if (url.hostname.includes("googleapis.com") && !url.hostname.startsWith("fonts")) return;
  if (url.hostname.includes("overpass-api")) return;
  const sameOrigin = url.origin === location.origin;
  if (sameOrigin) {
    // หน้าแอป: เอาของใหม่จากเน็ตก่อน ถ้าออฟไลน์ใช้ที่เก็บไว้
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; }).catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
  } else if (/gstatic\.com|cdnjs\.cloudflare\.com|fonts\.googleapis\.com/.test(url.hostname)) {
    // ไลบรารีและฟอนต์: ใช้ที่เก็บไว้ก่อน
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })));
  }
});
