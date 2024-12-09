import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define which routes should be protected
const protectedRoutes = [
    '/dashboard',
    '/dashboard/overview',
    '/dashboard/analytics',
    '/dashboard/settings',
    '/dashboard/users',
    '/admin',
    '/admin/users',
    '/admin/settings',
    '/admin/logs',
    '/admin/permissions',
    '/profile',
    '/settings'
]

export function middleware(request: NextRequest) {
    // Get the pathname of the request
    const path = request.nextUrl.pathname

    // Check if the current path is in protectedRoutes
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

    // Get the session cookie from cookies
    const sessionCookie = request.cookies.get('__session')?.value

    // If it's a protected route and there's no session cookie, redirect to login
    if (isProtectedRoute && !sessionCookie) {
        const url = new URL('/login', request.url)
        // Add the original URL as a redirect parameter
        url.searchParams.set('redirect', path)
        return NextResponse.redirect(url)
    }

    // If there's a session cookie and user tries to access login page, redirect to home
    if (path === '/login' && sessionCookie) {
        const url = new URL('/', request.url)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
} 