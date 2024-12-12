import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const requestStore = globalThis.__requestStore || {};

export async function POST(req: NextRequest) {
  const { requestId, data } = await req.json();

  if (!requestId || !requestStore[requestId]) {
    return NextResponse.json({ status: 'error', message: 'Invalid requestId' }, { status: 400 });
  }

  const entry = requestStore[requestId];
  entry.clientData = data;

  // Insert into Supabase (via Prisma)
  await prisma.visitorData.create({
    data: {
      ip: entry.ip,
      userAgent: entry.userAgent,
      geoData: entry.geoData as object,
      clientData: entry.clientData as object,
      // timestamp defaults to now, but if you want to use entry.timestamp:
      // timestamp: new Date(entry.timestamp),
    },
  });

  delete requestStore[requestId]; // cleanup

  return NextResponse.json({ status: 'ok', message: 'Data stored in database successfully' });
}
