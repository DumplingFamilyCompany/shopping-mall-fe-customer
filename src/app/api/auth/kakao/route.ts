import { NextResponse } from 'next/server';

export async function GET() {
  const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao?redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;

  return NextResponse.redirect(redirectUrl);
}
