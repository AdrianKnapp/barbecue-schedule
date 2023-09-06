import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from './libs/jwt';

export async function middleware(request: NextRequest) {
  let token: string | undefined;

  if (request.cookies.has('bbc-token')) {
    token = request.cookies.get('bbc-token')?.value;
  } else if (request.headers.get('Authorization')?.startsWith('Bearer ')) {
    token = request.headers.get('Authorization')?.substring(7);
  }

  console.log('🚀 ~ file: middleware.ts:14 ~ middleware ~ token:', token);

  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

  if (!token) {
    if (isAuthPage || pathname.startsWith('/api')) {
      console.log('middleware.ts:22 ~ middleware ~ isAuthPage or api');
      return;
    }

    console.log('middleware.ts:26 ~ middleware ~ redirecting to login.');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const { sub } = await verifyJWT<{
      sub: string;
    }>(token);

    if (isAuthPage) {
      console.log('middleware.ts:36 ~ middleware ~ is already authenticated, redirecting to home.');
      return NextResponse.redirect(new URL('/', request.url));
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('user-id', sub);
    console.log('middleware.ts:42 ~ middleware ~ setting user id: ', sub);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error(error);

    if (isAuthPage) {
      console.log('middleware.ts:53 ~ middleware ~ errorOnJwt ~ isAthPage, nothing made.');
      return;
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('user-id', 'undefined');

    if (!pathname.startsWith('/api')) {
      console.log('middleware.ts:61 ~ middleware ~ errorOnJwt ~ is not api route, redirecting to login.');
      return NextResponse.redirect(new URL('/login', request.url), {
        headers: requestHeaders,
      });
    }

    console.log('middleware.ts:68 ~ middleware ~ errorOnJwt ~ nothing done, just setting headers with user-id.');
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
}

export const config = {
  matcher: ['/api/:path*', '/', '/barbecues/:path*', '/login', '/register'],
};
