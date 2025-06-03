import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Use your desired credentials here
  if (username === 'KushagraK' && password === 'Trivikr@8') {
    // You can use a better token system in production
    return NextResponse.json({
      success: true,
      token: 'dummy_admin_token'
    });
  }

  return NextResponse.json({
    success: false,
    error: 'Invalid credentials'
  }, { status: 401 });
}
