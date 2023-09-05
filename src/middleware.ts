import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from './libs/jwt';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('bbc-token');

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
    }>(token.value);

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
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/api/:path*', '/', '/barbecues/:path*', '/login', '/register'],
};
