import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

// This function will check the token before allowing access to protected routes
export function middleware(req: NextRequest) {
  const resetPasswordToken = req.cookies.get('resetPasswordAllowed')
  const token = req.cookies.get('accessToken') // Assume authToken contains user information

  // If the user is accessing /reset-password
  if (req.nextUrl.pathname === '/reset-password') {
    // If there is no resetPasswordToken, redirect to /login
    if (!resetPasswordToken) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // If the user is accessing /dashboard or related routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // If there is no token, redirect to /login
      return NextResponse.redirect(new URL('/login', req.url))
    }

    try {
      // Decode the token
      interface DecodedToken {
        role: string
      }

      const decodedToken: DecodedToken = jwtDecode(token.value)

      // Check if role is an array and the user has access rights
      if (decodedToken.role !== 'user') {
        // Allow to proceed if the role is valid
        return NextResponse.next()
      } else {
        // If no access rights, redirect to not authorized page
        return NextResponse.redirect(new URL('/not-authorized', req.url))
      }
    } catch (error) {
      // If there is an error decoding the token, redirect to /login
      console.error('Error decoding token:', error)
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // If not the routes that need middleware protection, continue access
  return NextResponse.next()
}

// List of routes where the middleware will be active
export const config = {
  matcher: ['/reset-password', '/dashboard/:path*'], // Middleware will apply to all routes related to /dashboard
}
