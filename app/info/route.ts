import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const requestStore = globalThis.__requestStore ?? {};
if (!globalThis.__requestStore) {
  globalThis.__requestStore = requestStore;
}

export async function GET(req: NextRequest) {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'Unknown IP';
  const userAgent = req.headers.get('user-agent') || 'Unknown User Agent';

  let geoData = null;
  if (ip !== 'Unknown IP' && !ip.startsWith('::1') && !ip.startsWith('127.0.0.1')) {
    const geoUrl = `https://ipapi.co/${ip}/json/`;
    try {
      const geoResponse = await fetch(geoUrl);
      if (geoResponse.ok) {
        geoData = await geoResponse.json();
      } else {
        console.log('Failed to fetch geolocation data');
      }
    } catch (error) {
      console.error('Error fetching geolocation data:', error);
    }
  }

  const requestId = uuidv4();
  requestStore[requestId] = {
    ip,
    userAgent,
    geoData,
    timestamp: new Date().toISOString(),
    clientData: null
  };

  return new NextResponse(
    `
      <!DOCTYPE html>
      <html lang="en">
      <head><title>Info Gathering</title></head>
      <body>
        <h1>Gathering Info...</h1>
        <script>
          (async () => {
            const requestId = "${requestId}";
            const data = {
              screenWidth: window.screen.width,
              screenHeight: window.screen.height,
              platform: navigator.platform,
              language: navigator.language,
              cookiesEnabled: navigator.cookieEnabled,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };
            await fetch('/info-collector', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ requestId, data })
            });
          })();
        </script>
      </body>
      </html>
    `,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
