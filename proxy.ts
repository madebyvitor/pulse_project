import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';
import { routing } from './src/i18n/routing';
import { updateSession } from './utils/supabase/middleware';

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);
  return updateSession(request, response);
}

export const config = {
  // Match all pathnames except for API routes, static files, and Next.js internals
  matcher: [
    '/',
    '/(pt|en)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|logotipo.svg|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js)).*)',
  ],
};
