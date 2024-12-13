import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { requestId, data, ip, userAgent } = await req.json();

  // You can validate requestId, ip, userAgent if needed
  if (!requestId || !data || !ip || !userAgent) {
    return NextResponse.json({ status: 'error', message: 'Missing required data' }, { status: 400 });
  }

  // Directly create a record in the database
  await prisma.visitorData.create({
    data: {
      ip: ip,
      userAgent: userAgent,
      clientData: data as object, // ensure data is parsed as JSON object
      // geoData if you need it, fetch on server or omit if no longer needed
    },
  });

  return NextResponse.json({ status: 'ok', message: 'Data stored in database successfully' });
}
