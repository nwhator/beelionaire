import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public routes that don't require authentication
const publicRoutes = ['/', '/about', '/auth/login', '/auth/register', '/auth/callback', '/auth/reset-password', '/admin/login']
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

  // Check for Supabase auth tokens (more comprehensive check)
  const supabaseAuthCookie = req.cookies.getAll().find(cookie => 
    cookie.name.startsWith('sb-') && cookie.name.includes('auth-token')
  )
  const hasAuthToken = !!supabaseAuthCookie || 
                       req.cookies.has('sb-access-token') || 
                       req.cookies.has('sb-refresh-token')

  // Check for admin auth
  const isAdminPath = pathname.startsWith('/admin') && pathname !== '/admin/login'
  
  // Protect admin routes
  if (isAdminPath) {
    // Admin routes need admin session (we'll check localStorage client-side)
    // For now, redirect to admin login if not authenticated
    return NextResponse.next() // Allow through, admin pages will check localStorage
  }

  // Protect routes that require authentication
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
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

