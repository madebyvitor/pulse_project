import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for API routes, static files, and Next.js internals
  matcher: [
    '/',
    '/(pt|en)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|logotipo.svg|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js)).*)',
  ],
};
