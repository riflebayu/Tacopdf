import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['id', 'es', 'fr', 'de', 'pt', 'ja'];
const defaultLocale = 'en';

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Ignore static paths and assets
  if (pathname.match(/\.(.*)$/) || pathname.startsWith('/_next')) return;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // REWRITE URL (not Redirect). User and Googlebot see /merge
    // But internal Next.js renders app/[lang]/[tool] with params.lang = 'en'
    return NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}`, request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
