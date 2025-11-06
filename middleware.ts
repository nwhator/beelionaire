import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public routes that don't require authentication
const publicRoutes = ['/', '/about', '/auth/login', '/auth/register', '/admin/login']
const protectedRoutes = ['/dashboard', '/tasks', '/quiz', '/leaderboard', '/profile', '/wallet']
const adminRoutes = ['/admin']

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Allow public routes and static files
  if (
    publicRoutes.includes(pathname) || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico)$/)
  ) {
    return NextResponse.next()
  }

  // Check for Supabase auth tokens
  const hasAuthToken = req.cookies.has('sb-access-token') || 
                       req.cookies.has('sb-refresh-token') ||
                       req.cookies.getAll().some(cookie => cookie.name.includes('auth-token'))

  // Protect routes that require authentication
  if (protectedRoutes.some(route => pathname.startsWith(route)) || 
      adminRoutes.some(route => pathname.startsWith(route))) {
    if (!hasAuthToken) {
      const loginUrl = new URL('/auth/login', req.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // If logged in and trying to access auth pages, redirect to dashboard
  if ((pathname === '/auth/login' || pathname === '/auth/register') && hasAuthToken) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

