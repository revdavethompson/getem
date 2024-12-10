import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const jsonData = await req.json();

  console.log('Additional Client Data:', jsonData);

  return NextResponse.json({ status: 'ok' });
}
