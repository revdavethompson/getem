import HomeContent from "./components/home-content";
import { headers } from "next/headers";
import Script from "next/script";

export default async function InfoPage() {
  // Wait for the headers() promise to resolve
  const hdrs = await headers();
  const forwardedFor = hdrs.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'Unknown IP';
  const userAgent = hdrs.get('user-agent') || 'Unknown User Agent';

  // If you need a requestId
  const requestId = Math.random().toString(36).slice(2);

  return (
    <>
      <HomeContent />
      <Script id="gather-info" strategy="afterInteractive">
        {`
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
              body: JSON.stringify({ requestId: '${requestId}', ip: '${ip}', userAgent: '${userAgent}', data })
            });
          })();
        `}
      </Script>
    </>
  );
}
