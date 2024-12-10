import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Extract the IP from the x-forwarded-for header
  const forwardedFor = req.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'Unknown IP';

  const userAgent = req.headers.get('user-agent') || 'Unknown User Agent';

  console.log('Visitor information:');
  console.log(`IP: ${ip}`);
  console.log(`User Agent: ${userAgent}`);

  // ... rest of your code
  return NextResponse.json({ message: 'Info gathered' });
}
