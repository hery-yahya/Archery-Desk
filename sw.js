const V='archerydesk-v3',CDN='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(async c=>{await c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png']);try{await c.add(CDN)}catch(_){}}).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{if(x.ok||x.type=='opaque'){const c=x.clone();caches.open(V).then(h=>h.put(e.request,c))}return x}).catch(()=>caches.match('index.html'))))});
