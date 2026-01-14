import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { locales, defaultLocale } from './i18n/config'
import type { NextRequest } from 'next/server'

export default createMiddleware({
  ...routing,
  localeDetection: true,
  localePrefix: routing.localePrefix,
  defaultLocale,
  locales,
})

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - files with extensions (e.g. favicon.ico)
  matcher: ['/', '/(es|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
}
