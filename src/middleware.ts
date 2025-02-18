import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Tokens } from './entities/auth/types';
import { typedFetch } from './shared/lib/apiClient';

async function getNewTokens(request: NextRequest, refreshToken: string) {
  // 프로토콜과 호스트명을 사용하여 절대 URL 생성
  const { protocol, host } = request.nextUrl;
  const refreshEndpoint = `${protocol}//${host}/api/auth/refresh`;

  return await typedFetch<Tokens>(refreshEndpoint, 'POST', {
    refreshToken,
  });
}

function getNewRequestWithHeader(request: NextRequest, accessToken: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Authorization', `Bearer ${accessToken}`);

  const modifiedRequest = new Request(request.url, {
    ...request,
    headers: requestHeaders,
  });

  return modifiedRequest;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 로그인 페이지와 로그인, 회원가입, 토큰 갱신 등의 API는 미들웨어에서 헤더를 추가하지 않고 그대로 통과
  if (pathname === '/login' || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Access Token이 존재하면 Authorization 헤더에 추가
  if (accessToken) {
    // 새로운 헤더를 포함한 요청 생성
    const modifiedRequest = getNewRequestWithHeader(request, accessToken);

    return NextResponse.next({
      request: modifiedRequest,
    });

    // return NextResponse.rewrite(modifiedRequest.url, {
    //   request: modifiedRequest,
    // });
  }

  // Access Token은 없고, Refresh Token만 있는 경우 Refresh Token을 사용하여 새로운 토큰 발급
  if (refreshToken) {
    try {
      const newTokens = await getNewTokens(request, refreshToken);
      const modifiedRequest = getNewRequestWithHeader(
        request,
        newTokens.accessToken,
      );

      // 새로운 응답 생성 및 쿠키 설정
      const response = NextResponse.next({
        request: modifiedRequest,
      });

      // const response = NextResponse.rewrite(modifiedRequest.url, {
      //   request: modifiedRequest,
      // });

      // 서버간의 요청에서는 브라우저의 쿠키 저장소를 직접 다루지 않기 때문에 /api/auth로 통신하지 않고, 미들웨어 내에서 직접 쿠키 설정
      response.cookies.set({
        name: 'accessToken',
        value: newTokens.accessToken,
        maxAge: 120, // 2분
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      response.cookies.set({
        name: 'refreshToken',
        value: newTokens.refreshToken,
        maxAge: 60 * 60 * 24, // 1일
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      return response;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Access Token과 Refresh Token이 모두 없는 경우 로그인 페이지로 리다이렉트
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
