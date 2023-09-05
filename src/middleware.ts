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

  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

  if (!token) {
    if (isAuthPage || pathname.startsWith('/api')) {
      return;
    }

    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const { sub } = await verifyJWT<{
      sub: string;
    }>(token);

    if (isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('user-id', sub);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error(error);

    if (isAuthPage) {
      return;
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('user-id', 'undefined');

    if (!pathname.startsWith('/api')) {
      return NextResponse.redirect(new URL('/login', request.url), {
        headers: requestHeaders,
      });
    }

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
