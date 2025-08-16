// PowerTools RD - Service Worker
// Versión del cache - incrementar para forzar actualizaciones
const CACHE_NAME = 'powertools-rd-v1.0.0';
const OFFLINE_URL = 'offline.html';

// Archivos críticos que siempre deben estar en cache
const CORE_CACHE_FILES = [
  '/',
  '/index.html',
  '/app-simple.js',
  '/styles.css',
  '/manifest.json',
  '/assets/images/powertools-logo.svg',
  '/assets/images/powertools-logo.png'
];

// Archivos adicionales para cache
const CACHE_FILES = [
  ...CORE_CACHE_FILES,
  // Fonts e iconos
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  // Chart.js para gráficos
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Cacheando archivos principales...');
        return cache.addAll(CORE_CACHE_FILES);
      })
      .then(() => {
        console.log('✅ Service Worker: Instalación completada');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Error en instalación:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Eliminar caches antiguos
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Service Worker: Eliminando cache antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activación completada');
        return self.clients.claim();
      })
  );
});

// Interceptar peticiones de red
self.addEventListener('fetch', (event) => {
  // Solo procesar peticiones HTTP/HTTPS
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Si está en cache, devolverlo
        if (cachedResponse) {
          return cachedResponse;
        }

        // Si no está en cache, intentar fetch de red
        return fetch(event.request)
          .then((response) => {
            // Solo cachear respuestas válidas
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clonar la respuesta (solo se puede leer una vez)
            const responseToCache = response.clone();

            // Agregar al cache
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Si falla la red, mostrar página offline para navegación
            if (event.request.destination === 'document') {
              return caches.match(OFFLINE_URL);
            }
            
            // Para otros recursos, devolver respuesta vacía
            return new Response('', {
              status: 408,
              statusText: 'Request Timeout'
            });
          });
      })
  );
});

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Notificaciones Push (para futuras implementaciones)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/assets/icons/icon-192x192.png',
      badge: '/assets/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey || 1
      },
      actions: [
        {
          action: 'explore',
          title: 'Ver en PowerTools',
          icon: '/assets/icons/action-explore.png'
        },
        {
          action: 'close',
          title: 'Cerrar',
          icon: '/assets/icons/action-close.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sincronización en segundo plano
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Aquí se pueden sincronizar datos pendientes
      console.log('🔄 Service Worker: Sincronización en segundo plano')
    );
  }
});

console.log('📱 PowerTools RD Service Worker cargado exitosamente');
