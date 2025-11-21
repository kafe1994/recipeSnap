# Configuración para Cloudflare Pages
# Crear archivo: functions/_worker.js (opcional para funcionalidad avanzada)

export default {
  async fetch(request, env, ctx) {
    // Handle PWA update checks
    if (request.url.includes('/sw.js')) {
      return new Response(await (await fetch(request)).text(), {
        headers: {
          'Content-Type': 'application/javascript',
          'Cache-Control': 'no-cache'
        }
      });
    }
    
    // Handle manifest requests
    if (request.url.includes('/manifest.json')) {
      return new Response(await (await fetch(request)).text(), {
        headers: {
          'Content-Type': 'application/manifest+json',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }
    
    // Default response
    return fetch(request);
  }
};