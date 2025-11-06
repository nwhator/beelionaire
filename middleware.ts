import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public routes that don't require authentication
const publicRoutes = ['/', '/about', '/auth/login', '/auth/register', '/admin/login']

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Check if route is public (or static files)
  if (publicRoutes.includes(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // For protected routes, check for Supabase auth token
  const accessToken = req.cookies.get('sb-access-token')?.value || 
                      req.cookies.get('sb-iymhjodxpfzobisbxwdl-auth-token')?.value

  // No token - redirect to login
  if (!accessToken) {
    const loginUrl = new URL('/auth/login', req.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
