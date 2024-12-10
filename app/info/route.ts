import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.ip || 'Unknown IP';
  const userAgent = req.headers.get('user-agent') || 'Unknown User Agent';

  console.log('Visitor information:');
  console.log(`IP: ${ip}`);
  console.log(`User Agent: ${userAgent}`);

  // Attempt IP-based geolocation lookup
  const geoUrl = `https://ipapi.co/${ip}/json/`;
  try {
    const geoResponse = await fetch(geoUrl);
    if (geoResponse.ok) {
      const geoData = await geoResponse.json();
      console.log('GeoData:', geoData);
    } else {
      console.log('Failed to fetch geolocation data');
    }
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
  }

  return new NextResponse(
    `
      <!DOCTYPE html>
      <html lang="en">
      <head><title>Info Gathering</title></head>
      <body>
        <h1>Gathering Info...</h1>
        <script>
          (async () => {
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
              body: JSON.stringify(data)
            });
          })();
        </script>
      </body>
      </html>
    `,
    {
      headers: { 'Content-Type': 'text/html' },
    }
  );
}
