import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Validate the existence of the TOKEN_SECRET
if (!process.env.TOKEN_SECRET) {
  throw new Error('Environment variable TOKEN_SECRET is not set.');
}

// Secret key for JWT
const JWT_SECRET = new TextEncoder().encode(process.env.TOKEN_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected paths
  const protectedPaths = ['/admin', '/user', '/emp',];
  const isProtectedRoute = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtectedRoute) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      
      // Check token expiry
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < currentTime) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
      }

      return NextResponse.next();
    } catch (error:any) {
      console.error('Token verification failed:', error.message);
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/emp/:path*'],
};
