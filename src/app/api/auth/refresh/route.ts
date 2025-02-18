import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { refreshToken } = await request.json();

  const response = NextResponse.json({
    accessToken: 'newAccessToken',
    refreshToken: 'newRefreshToken',
  });

  return response;
}
