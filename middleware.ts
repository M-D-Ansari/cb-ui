import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'secret123'

// Encode the secret properly
const encoder = new TextEncoder()
const secret = encoder.encode(JWT_SECRET)

const publicPaths = ['/', '/favicon.ico', '/login', '/signup']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow public/static/api routes
  if (
    publicPaths.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next()
  }

  const token = req.cookies.get('token')?.value

  if (!token) {
    console.log('🔒 No token found')
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    // ✅ Use jose to verify token in Edge Runtime
    await jwtVerify(token, secret)
    console.log('✅ Token is valid')
    return NextResponse.next()
  } catch (err: any) {
    console.error('❌ Token verification failed:', err.message)
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|login|signup).*)']
}
