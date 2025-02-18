import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { accessToken, refreshToken } = await request.json();

  const response = NextResponse.json('', {
    status: 200,
    statusText: 'Set cookie successfully',
  });

  response.cookies.set({
    name: 'accessToken',
    value: accessToken,
    maxAge: 60 * 60 * 24, // 1일
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  response.cookies.set({
    name: 'refreshToken',
    value: refreshToken,
    maxAge: 60 * 60 * 24, // 1일
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}

export async function DELETE(request: Request) {
  const response = NextResponse.json('', {
    status: 200,
    statusText: 'Delete cookie successfully',
  });

  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');

  return response;
}
